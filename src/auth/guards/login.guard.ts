/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class LoginGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        return true;
    }
}
