/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const role = this.reflector.get<string[]>('role', context.getHandler());
        if (!role) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const requestRoles = request.user?.role;
        return role.includes(requestRoles);
    }
}
