import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.interface';
import * as mockUsers from './mock-users.json';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    private users: User[] = (mockUsers as any).default.map((user: any) => ({ // Parse the json file
        ...user,
        dateOfBirth: new Date(user.dateOfBirth),
        id: Number(user.id)
      }));

    findAll(): User[] {
        return this.users;
    }

    findByEmail(email: string): User | undefined {
        return this.users.find((user) => user.email === email) || undefined;
    }

    findById(id: number): User | undefined {
        return this.users.find((user) => user.id === Number(id));
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const checkExistingUser = this.findByEmail(createUserDto.email);
        if(checkExistingUser) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
        const newUser = {
            id: this.users.length + 1,
            ...createUserDto,
            password: hashedPassword
        };

        this.users.push(newUser); 
        return newUser;
    }

    async updatePassword(id: number, oldPassword: string, newPassword: string): Promise<User> {
      const user = this.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // Verify old password
      const passwordMatch = oldPassword === user.password;
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid old password');
      }
  
      // Hash and update new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      return user;
    }

    async updateUserProfile(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = this.findById(id);
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        // Update user properties if provided
        if (updateUserDto.name) {
          user.name = updateUserDto.name;
        }
        if (updateUserDto.dateOfBirth) {
          user.dateOfBirth = updateUserDto.dateOfBirth;
        }
        if (updateUserDto.gender) {
          user.gender = updateUserDto.gender;
        }
        if (updateUserDto.address) {
          user.address = updateUserDto.address;
        }
        if (updateUserDto.subscribeToNewsletter !== undefined) {
          user.subscribeToNewsletter = updateUserDto.subscribeToNewsletter;
        }
    
        return user;
    }

    async validatePassword(email: string, password: string): Promise<User | null> {
        const user = this.findByEmail(email);
        
        if(!user) {
            throw new NotFoundException('User not found');
        }

        if(password === user.password) {
            return user;
        }
        
        throw new UnauthorizedException('Unauthorized');
    }
}
