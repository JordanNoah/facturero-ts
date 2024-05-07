import {Hono} from "hono";
import {DbSequelize} from "../infrastructure/database/init";
import {AppRoutes} from "./routes"
import { InstitutionRoutes } from "./institution/routes";
import { serve } from "@hono/node-server";

interface Options {
    port?: number
}

export class Server {
    public readonly app: Hono
    private readonly port: number

    constructor(options:Options) {
        const {port = 3030} = options
        this.app = new Hono()
        this.port = port
    }

    public start(){
        try {
            DbSequelize().then(() => {
                this.app.route('/api', new AppRoutes().routes)
                serve({
                    fetch: this.app.fetch,
                    port: this.port
                },(info)=>{
                    console.log(`Server running on port ${info.port}`);
                })
            }).catch((error) => { 
                console.log(error);
            })
        } catch (error) {
          console.log(error);   
        }
    }
}