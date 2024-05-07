import { Hono } from "hono"
import { UserRoleAssignDatasourceImpl } from "../../infrastructure/datasources/userRoleAssign.datasource.impl"
import { UserRoleAssignRepositoryImpl } from "../../infrastructure/repositories/userRoleAssign.repository.impl"
import { RegisterAssignRoleDto } from "../../domain/dtos/assignrole/register-assignrole.dto"
import { RemoveAssignRoleDto } from "../../domain/dtos/assignrole/remove-assignrole.dto"

export class AssignRoleRoutes {
    constructor() {}

    public get routes(): Hono{
        const router = new Hono()
        const datasource = new UserRoleAssignDatasourceImpl()
        const repository = new UserRoleAssignRepositoryImpl(datasource)

        router.post('/assign', async (c) =>  {
            try {
                const [error,registerAssignRoleDto] = RegisterAssignRoleDto.create(await c.req.raw.clone().json())
                if(error) return c.json(error)
                return c.json(await repository.assignRole(registerAssignRoleDto!))
            } catch (error) {
                console.log(error);
                
                return c.json(error)
            }
        })

        router.post('/unassign', async (c) => {
            try {
                const [error,removeAssignRoleDto] = RemoveAssignRoleDto.create(await c.req.raw.clone().json())
                if(error) return c.json(error)
                return c.json(await repository.unassignRole(removeAssignRoleDto!))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/userid/:userId', async (c) => {
            try {
                const userId = parseInt(c.req.param('userId'))
                return c.json(await repository.getAssignedRoles(userId))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/roleid/:roleId', async (c) => {
            try {
                const roleId = parseInt(c.req.param('roleId'))
                return c.json(await repository.getAssignedUsers(roleId))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/id/:id', async (c) => {
            try {
                return c.json(await repository.getById(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json(error)
            }
        })
        return router
    }
}