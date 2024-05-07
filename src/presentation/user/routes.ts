import { Hono } from "hono"
import { UserDatasourceImpl } from "../../infrastructure/datasources/user.datasource.impl"
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl"
import { RegisterUserDto } from "../../domain/dtos/user/register-user.dto"
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto"

export class UserRoutes {
    constructor() {}
    public get routes(): Hono{
        const router = new Hono()
        const datasource = new UserDatasourceImpl()
        const userRepository = new UserRepositoryImpl(datasource)

        router.post('/', async (c) =>  {
            try {               
                const [error,registerUserDto] = RegisterUserDto.create(await c.req.raw.clone().json())
                console.log(registerUserDto);
                const user = await userRepository.register(registerUserDto!)
                console.log(user);
                
                if(error) return c.status(400)
                return c.json(user)
            } catch (error) {               
                return c.json(error)
            }
        })

        router.get('/', async (c) => {
            try {
                return c.json(await userRepository.getAll())
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/uuid/:uuid', async (c) => {
            try {
                return c.json(await userRepository.getByUuid(c.req.param('uuid')))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/id/:id', async (c) => {
            try {
                return c.json(await userRepository.getById(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json(error)
            }
        })

        router.put('/', async (c) => {
            try {
                const [error,updateUserDto] = UpdateUserDto.create(await c.req.raw.clone().json())
                if(error) return c.status(400)
                return c.json(await userRepository.update(updateUserDto!))
            } catch (error) {
                return c.json(error)
            }
        })
        return router
    }
}