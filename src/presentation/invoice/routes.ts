import { Hono } from "hono";
import { InvoiceDatasourceImpl } from "../../infrastructure/datasources/invoice/invoice.datasource.impl";
import { InvoiceRepositoryImpl } from "../../infrastructure/repositories/invoice/invoice.repository.impl";
import { FinancialInformationRoutes } from "./financialInformation/routes";
import { CreateInvoiceDto } from "../../domain/dtos/invoice/create-invoice.dto";

export class InvoiceRoutes {
    constructor() {}
    public get routes(): Hono{
        const router = new Hono()
        const datasource = new InvoiceDatasourceImpl()
        const invoiceRepository = new InvoiceRepositoryImpl(datasource)

        router.post('/create', async (c) => {
            try {
                return c.json(await invoiceRepository.createInvoice())
            } catch (error) {
                return c.json(error)
            }
        })

        router.post('/save', async (c) =>  {
            try {
                const body = await c.req.json()

                const [error, invoice] = CreateInvoiceDto.create(body)
                
                return c.json(invoice)
            } catch (error) {
                return c.json(error)
            }
        })

        router.delete('/id/:id', async (c) => {
            try {
                return c.json(await invoiceRepository.deleteInvoice(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/uuid/:uuid', async (c) => {
            try {
                return c.json(await invoiceRepository.getInvoiceByUuid(c.req.param('uuid')))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/id/:id', async (c) => {
            try {
                return c.json(await invoiceRepository.getInvoiceById(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json(error)
            }
        })

        router.get('/', async (c) => {
            try {
                return c.json(await invoiceRepository.getInvoices())
            } catch (error) {
                return c.json(error)
            }
        })

        router.put('/', async (c) => {
            try {
                return c.json({"?":"?"})
            } catch (error) {
                return c.json(error)
            }
        })

        router.route('/financialinformation', new FinancialInformationRoutes().routes)
        router.route('/additionalinformation', new FinancialInformationRoutes().routes)
        return router
    }
}