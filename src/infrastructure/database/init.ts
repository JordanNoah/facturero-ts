import { ConfigurationInstitutionSequelize } from "./models/ConfigInstitution";
import {InstitutionSequelize} from "./models/Institution";
import { ProductSequelize } from "./models/Product";
import {RoleSequelize} from "./models/Role";
import {UserSequelize} from "./models/User";
import {UserRoleSequelize} from "./models/UserRoleAssign";
import { AdditionalInfoSequelize } from "./models/invoice/AdditionalInfo";
import { FinancialInformationSequelize } from "./models/invoice/FinancialInformation";
import { InfoInvoiceSequelize } from "./models/invoice/InfoInvoice/InfoInvoice";
import { PaymentDetailInvoiceSequelize } from "./models/invoice/InfoInvoice/PaymentDetailInvoice";
import { TotalTaxDetailInvoiceSequelize } from "./models/invoice/InfoInvoice/TotalTaxDetailInvoice";
import { InvoiceSequelize } from "./models/invoice/Invoice";
import { AdditionalDetailSequelize } from "./models/invoice/detail/AdditionalDetailDetail";
import { DetailSequelize } from "./models/invoice/detail/Detail";
import { DetailTaxSequelize } from "./models/invoice/detail/DetailTax";

export const DbSequelize = (): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await RoleSequelize.sync()
            await InstitutionSequelize.sync()
            await UserSequelize.sync()
            await UserRoleSequelize.sync()
            await ConfigurationInstitutionSequelize.sync()
            await ProductSequelize.sync()
            //invoice
            await InvoiceSequelize.sync()
            await FinancialInformationSequelize.sync()
            await AdditionalInfoSequelize.sync()
            await InfoInvoiceSequelize.sync()
            await PaymentDetailInvoiceSequelize.sync()
            await TotalTaxDetailInvoiceSequelize.sync()
            await DetailSequelize.sync()
            await AdditionalDetailSequelize.sync()
            await DetailTaxSequelize.sync()
            resolve();
        }catch (error){
            reject(error);
        }
    })
}