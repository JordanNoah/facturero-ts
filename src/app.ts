import {Server} from "./presentation/server"
import {AppRoutes} from "./presentation/routes"

(()=>{
    main()
})()

function main() {
    new Server({}).start()
}