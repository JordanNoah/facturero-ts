import { Hono } from "hono"
import { AdditionalInfoDataSourceImpl } from "../../../infrastructure/datasources/invoice/additionalInfo.datasource.impl"
import { AdditionalInformationRepositoryImpl } from "../../../infrastructure/repositories/invoice/additionalInformation.repository.impl"
import { RegisterAdditionalInformationDto } from "../../../domain/dtos/invoice/additionalInfo/register-additionalInformation.dto"
import { UpdateAdditionalInfoDto } from "../../../domain/dtos/invoice/additionalInfo/update-additionalInformation.dto"

export class AdditionalInformationRoutes {
    constructor() {}
    public get routes(): Hono{
        const router = new Hono()
        const datasource = new AdditionalInfoDataSourceImpl()
        const additionalInformationRepository = new AdditionalInformationRepositoryImpl(datasource)

        router.post('/', async (c) =>  {
            try {
                const [error,registerAdditionalInformationDto] = RegisterAdditionalInformationDto.create(await c.req.raw.clone().json())
                if(error) return c.json(error)
                return c.json(await additionalInformationRepository.createAdditionalInformation(registerAdditionalInformationDto!,null))
            } catch (error) {
                return c.json(error)
            }
        })

        router.delete('/id/:id', async (c) => {
            try {
                return c.json(await additionalInformationRepository.deleteAdditionalInformationById(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/uuid/:uuid', async (c) => {
            try {
                return c.json(await additionalInformationRepository.getAdditionalInformationByUuid(c.req.param('uuid')))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/id/:id', async (c) => {
            try {
                return c.json(await additionalInformationRepository.getAdditionalInformationById(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/invoiceid/:invoiceid', async (c) => {
            try {
                return c.json(await additionalInformationRepository.getAdditionalInformationByInvoiceId(parseInt(c.req.param('invoiceid'))))
            } catch (error) {
                return c.json(error)
            }
        })

        router.put('/', async (c) => {
            try {
                const [error,updateAdditionalInformationDto] = UpdateAdditionalInfoDto.create(await c.req.raw.clone().json())
                if(error) return c.json(error)
                return c.json(await additionalInformationRepository.updateAdditionalInformation(updateAdditionalInformationDto!))
            } catch (error) {
                return c.json(error)
            }
        })

        return router
    }
}