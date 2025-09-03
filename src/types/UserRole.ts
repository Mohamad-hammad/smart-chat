export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager'
}

export type UserRoleType = UserRole.USER | UserRole.ADMIN | UserRole.MANAGER;
