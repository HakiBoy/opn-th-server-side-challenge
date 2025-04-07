import { Controller, Post, Body, Get, Param, Put, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.interface';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { UpdateUserDto } from './update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // retrieve the list of user
    @UseGuards(AuthGuard)
    @Get()
    async getAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserDto })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        return this.userService.createUser(createUserDto);
    }

    // api login
    @ApiOperation({ summary: 'Login user' })
    @ApiBody({
        schema: {
            example: {
                email: 'john.doe@example.com',
                password: 'password123',
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Post('login')
    async login(@Body() user: { email: string; password: string }): Promise<{ access_token: string, name: string } | null> {
        const existingUser = await this.userService.validatePassword(user.email, user.password);
        if (!existingUser) {
            return null;
        }
        return {
            access_token: 'faketoken_user1',
            name: existingUser.name
        };
    }

    // get profle
    @UseGuards(AuthGuard)
    @Get(':id/profile')
    async getProfile(@Param('id') id: number): Promise<User | undefined> {
        return this.userService.findById(id);
    }

    // update profile
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update user profile' })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'User profile updated', type: UserDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Put(':id/profile')
    async updateUserProfile(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<UserDto> {
        const updatedUser = await this.userService.updateUserProfile(id, updateUserDto);
        return {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            dateOfBirth: updatedUser.dateOfBirth,
            gender: updatedUser.gender,
            address: updatedUser.address,
            subscribeToNewsletter: updatedUser.subscribeToNewsletter,
        };
    }

    // update password
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update user password' })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiBody({
        schema: {
            example: {
                oldPassword: 'oldPassword1111',
                newPassword: 'newPassword2222',
                newPasswordConfirm: 'newPassword2222',
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Password updated', type: UserDto })
    @ApiResponse({ status: 401, description: 'Invalid old password' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Put(':id/password')
    async updatePassword(
        @Param('id') id: number,
        @Body() { oldPassword, newPassword, newPasswordConfirm }: { oldPassword: string; newPassword: string; newPasswordConfirm: string },
    ): Promise<UserDto> {
        if (newPassword !== newPasswordConfirm) {
            throw new BadRequestException('New passwords do not match');
        }
        const updatedUser = await this.userService.updatePassword(id, oldPassword, newPassword);
        return {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            dateOfBirth: updatedUser.dateOfBirth,
            gender: updatedUser.gender,
            address: updatedUser.address,
            subscribeToNewsletter: updatedUser.subscribeToNewsletter,
        };
    }
}
