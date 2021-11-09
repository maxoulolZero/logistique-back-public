import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class KongService {
  constructor(private readonly httpService: HttpService) {}

  public getRoutes(server) {
    const router = server._events.request._router;
    const availableRoutes: [] = router.stack
      .map(layer => {
        if (layer.route) {
          return {
            route: {
              path: layer.route?.path,
              method: layer.route?.stack[0].method,
            },
          };
        }
      })
      .filter(item => item !== undefined);
    return availableRoutes;
  }

  public registerKongService(routes): void {

    this.httpService
      .post('http://kong:8081/services/', {
        name: 'logistique-back',
        // Generalisation of host in prod deployement
        host: '192.168.2.2',
        // Port to be defined better (env variable) (IP address of hosted API, Hosted address of kong, Kong Port, Application port, Service of the name)
        url: 'http://192.168.2.2:6007',
      })
      .toPromise()
      .then(() => {
        console.log('logistique-back' + ' service created');
        this.registerKongRoutes(routes);
      })
      .catch(() => {
        this.registerKongRoutes(routes);
        console.error('logistique-back' + ' service creation failed, probably already created.');
      });
  }

  public async registerKongRoutes(routes) {
    for (const current_route of routes) {
      const route = current_route.route;
      const method = route.method.toUpperCase();
      const routeName = beautifyName(route.path, method);

      const regexPath = /(\:[a-z]*)/;

      const routePath = route.path.replace(regexPath, '\\d+');

      const kongObject = {
        paths: [routePath],
        methods: [method, "OPTIONS"],
        name: routeName,
        strip_path: false,
      };

      await this.httpService
        .post('http://kong:8081/services/' + 'logistique-back' + '/routes', kongObject)
        .toPromise()
        .then()
        .catch(() => {
          console.error(route.path + ' route creation failed');
        });
    }
  }
}
function beautifyName(routePath: string, method: string): string {
  let routeName = routePath;

  for (let i = 0; i < routeName.length; i++) {
    if ((routeName[i] == '/' && routeName[i + 1] != ':') || routeName[i] == ':') {
      i += 1;
      routeName = routeName.substring(0, i) + routeName.charAt(i).toUpperCase() + routeName.slice(i + 1);
    }
  }

  routeName = routeName.replace(/(\/)/g, '').replace(/(:)/g, '');
  return routeName + method;
}
