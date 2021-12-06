import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Server } from './server.model';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: Server[] = [];

  // ActivatedRoute: injects the current active routes based on component loaded
  constructor(private serversService: ServersService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // navigate(): does not know the current route you are in (knows component template)
    /* this.router.navigate(["servers"], {relativeTo: this.route}); */
  }
}
