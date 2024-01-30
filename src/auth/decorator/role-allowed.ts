import { SetMetadata } from "@nestjs/common";

export enum Role  {
    ADMIN= "admin",
    USER = "user"
}

const ROLE_BASE ="role_base"

export const RoleAllowed = (role: Role[]) => SetMetadata(ROLE_BASE, role);