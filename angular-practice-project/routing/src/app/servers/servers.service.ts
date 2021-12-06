import { Server } from "./server.model";

export class ServersService {
  private servers = [ 
    new Server(1, 'Production Server', 'online'),
    new Server(2, 'Test Server', 'offline'),
    new Server(3, 'Dev Server', 'offline')
  ];

  getServers() {
    return this.servers;
  }

  getServer(id: number) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    return server;
  }

  updateServer(id: number, serverInfo: {name: string, status: string}) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}
