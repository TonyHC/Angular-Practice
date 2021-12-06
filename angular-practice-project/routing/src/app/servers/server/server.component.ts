import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Server } from '../server.model';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: Server;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    /*     const id = +this.route.snapshot.params["id"];
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params["id"]);
      }
    ); */

    // Retrieve the dynamic data from the resolver (resolve guard) instead of retrieving from params
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data["server"];
      }
    );
  }

  onEdit() {
    // Preserve the query parameters from the server component route to the edit server component route
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: "preserve"});
  }
}
