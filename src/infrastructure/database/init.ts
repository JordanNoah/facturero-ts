import {InstitutionSequelize} from "./models/Institution";
import {RoleSequelize} from "./models/Role";
import {UserSequelize} from "./models/User";
import {UserRoleSequelize} from "./models/UserRoleAssign";

export const DbSequelize = (): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await RoleSequelize.sync()
            await InstitutionSequelize.sync()
            await UserSequelize.sync()
            await UserRoleSequelize.sync()
            resolve();
        }catch (error){
            reject(error);
        }
    })
}