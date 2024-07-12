import { RegisterAdditionalInformationDto } from "./additionalInfo/register-additionalInformation.dto";
import { RegisterDetailDto } from "./detail/register-detail.dto";
import { RegisterInfoInvoiceDto } from "./infoInvoice/register-infoInvoice.dto";
import { RegisterFinancialInformationDto } from "./register-financialInformation.dto";

export class CreateInvoiceDto {
    constructor(
        public invoice: InvoiceSave | null,
        public taxInfo: RegisterFinancialInformationDto,
        public invoiceInfo: RegisterInfoInvoiceDto,
        public details: RegisterDetailDto[],
        public additionalInfo: RegisterAdditionalInformationDto[]
    ){}

    static create (object:{[key:string]:any}):[string?,CreateInvoiceDto?]{
        const {
            invoice,
            taxInfo,
            invoiceInfo,
            details,
            additionalInfo
        } = object
        
        return [
            undefined,
            new CreateInvoiceDto(
                invoice,
                taxInfo,
                invoiceInfo,
                details,
                additionalInfo
            )
        ]
    }
}

export class InvoiceSave{
    constructor(
        public uuid: string
    ){}
}