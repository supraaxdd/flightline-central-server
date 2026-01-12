export interface IUserRoleRepository {
    assign(userId: number, roleId: number): void;
    userHasRole(userId: number, roleId: number): boolean;   
}