import { Hono } from "hono"
import { RoleDatasourceImpl } from "../../infrastructure/datasources/role.datasource.impl"
import { RoleRepositoryImpl } from "../../infrastructure/repositories/role.repository.impl"
import { RegisterRoleDto } from "../../domain/dtos/role/register-role.dto"
import { UpdateRoleDto } from "../../domain/dtos/role/update-role.dto"

export class RoleRoutes {
    constructor() {}
    public get routes(): Hono{
        const router = new Hono()
        const datasource = new RoleDatasourceImpl()
        const roleRepository = new RoleRepositoryImpl(datasource)

        router.post('/', async (c) =>  {
            try {               
                const [error,registerRoleDto] = RegisterRoleDto.create(await c.req.raw.clone().json())
                console.log(error);
                const role = await roleRepository.register(registerRoleDto!)
                if(error) return c.status(400)
                return c.json(role)
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/', async (c) => {
            try {
                return c.json(await roleRepository.getAll())
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/uuid/:uuid', async (c) => {
            try {
                return c.json(await roleRepository.getByUuid(c.req.param('uuid')))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/id/:id', async (c) => {
            try {
                return c.json(await roleRepository.getById(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json(error)
            }
        })

        router.put('/', async (c) => {
            try {
                const [error,updateRoleDto] = UpdateRoleDto.create(await c.req.raw.clone().json())
                if(error) return c.status(400)
                return c.json(await roleRepository.update(updateRoleDto!))
            } catch (error) {
                return c.json(error)
            }
        })
        return router
    }
}