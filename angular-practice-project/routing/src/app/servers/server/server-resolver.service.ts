import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Server } from "../server.model";
import { ServersService } from "../servers.service";

@Injectable()
export class ServerResolver implements Resolve<Server>{
    constructor(private serversService: ServersService) {

    }

    // Used to load or fetch data before accessing a route
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
        return this.serversService.getServer(+route.params["id"]);
    }
}