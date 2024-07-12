import {InstitutionRoutes} from "./institution/routes";
import { Hono } from "hono"
import { RoleRoutes } from "./role/routes";
import { UserRoutes } from "./user/routes";
import { AssignRoleRoutes } from "./assignrole/routes";
import { ProductRoutes } from "./product/routes";
import { InvoiceRoutes } from "./invoice/routes";

export class AppRoutes {
    constructor() {}
    public get routes(): Hono {
        const router = new Hono()
        router.route('/institution', new InstitutionRoutes().routes)
        router.route('/role', new RoleRoutes().routes)
        router.route('/user', new UserRoutes().routes)
        router.route('/roleaction', new  AssignRoleRoutes().routes)
        router.route('/product', new ProductRoutes().routes)
        router.route('/invoice', new InvoiceRoutes().routes)
        return router
    }
}