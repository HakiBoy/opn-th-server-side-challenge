import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
    
        if (!authHeader) {
          throw new UnauthorizedException('Unauthorized');
        }
    
        const [bearer, token] = authHeader.split(' ');
    
        if (bearer !== 'Bearer' || token !== 'faketoken_user1') {
          throw new UnauthorizedException('Invalid token');
        }
    
        return true; // Authentication successful
    }

}