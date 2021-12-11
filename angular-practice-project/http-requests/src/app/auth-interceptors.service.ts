import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    // Runs before each request (Http request) leaves the app (restrict which url this interceptor ignores through an if check)
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Manipulating Request Objects
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', '123')});
        
        console.log(req.headers);
        
        return next.handle(modifiedRequest);
    }
}