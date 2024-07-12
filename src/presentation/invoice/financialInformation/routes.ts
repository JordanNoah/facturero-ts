import { Hono } from "hono";
import { RegisterFinancialInformationDto } from "../../../domain/dtos/invoice/register-financialInformation.dto";
import { FinancialInformationDataSourceImpl } from "../../../infrastructure/datasources/invoice/financialInformation.datasource.impl";
import { FinancialInformationRepositoryImpl } from "../../../infrastructure/repositories/invoice/financialInformation.repository.impl";
import { UpdateFinancialInformationDto } from "../../../domain/dtos/invoice/update-financialInformation.dto";

export class FinancialInformationRoutes {
    constructor(){}
    public get routes(): Hono{
        const router = new Hono()
        const datasource = new FinancialInformationDataSourceImpl()
        const repository = new FinancialInformationRepositoryImpl(datasource)

        router.post('/', async (c) =>  {
            try {
                const [error,registerFinancialInformationDto] = RegisterFinancialInformationDto.create(await c.req.raw.clone().json())
                if(error) return c.json(error)
                return c.json(await repository.createFinancialInformation(registerFinancialInformationDto!,null))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/invoiceid/:invoiceId', async (c) => {
            try {
                return c.json(await repository.getFinancialInformationByInvoiceId(parseInt(c.req.param('invoiceId'))))
            } catch (error) {
                return c.json(error)
            }
        })

        router.put('/', async (c) => {
            try {
                const [error,updateFinancialInformation] = UpdateFinancialInformationDto.create(await c.req.raw.clone().json())
                if(error) return c.json(error)
                return c.json(await repository.updateFinancialInformation(updateFinancialInformation!,null))
            } catch (error) {
                return c.json(error)
            }
        })

        return router
    }
}