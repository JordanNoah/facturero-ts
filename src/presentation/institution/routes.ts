import {Context, Env, Hono} from "hono"
import {InstitutionDatasourceImpl} from "../../infrastructure/datasources/institution.datasource.impl";
import {InstitutionRepositoryImpl} from "../../infrastructure/repositories/institution.repository.impl";
import { RegisterInstitutionDto } from "../../domain/dtos/institution/register-institution.dto";
import { InstitutionEntity } from "../../domain/entities/institution.entity";
import { BlankInput } from "hono/types";
import { UpdateInstitutionDto } from "../../domain/dtos/institution/update-institution.dto";

export class InstitutionRoutes {
    constructor() {}
    public get routes(): Hono{
        const router = new Hono()
        const datasource = new InstitutionDatasourceImpl()
        const institutionRepository = new InstitutionRepositoryImpl(datasource)

        router.post('/', async (c) =>  {
            try {
                const [error,registerInstitutionDto] = RegisterInstitutionDto.create(await c.req.raw.clone().json())
                const institution = await institutionRepository.register(registerInstitutionDto!)
                if(error) return c.status(400)
                return c.json(institution)
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/', async (c) => {
            try {
                return c.json(await institutionRepository.getAll())
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/uuid/:uuid', async (c) => {
            try {
                return c.json(await institutionRepository.getByUuid(c.req.param('uuid')))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/id/:id', async (c) => {
            try {
                return c.json(await institutionRepository.getById(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json(error)
            }
        })

        router.put('/', async (c) => {
            try {
                const [error,updateInstitutionDto] = UpdateInstitutionDto.create(await c.req.raw.clone().json())
                if(error) return c.status(400)
                return c.json(await institutionRepository.update(updateInstitutionDto!))
            } catch (error) {
                return c.json(error)
            }
        })
        return router
    }
}