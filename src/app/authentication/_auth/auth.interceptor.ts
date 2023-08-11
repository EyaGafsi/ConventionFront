import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators"
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userAuthService: UserAuthService,
        private router: Router) { }
    /**
     * The intercept function is used to handle HTTP requests and add authentication tokens, handle
     * errors, and redirect to appropriate pages based on the response status.
     * @param req - The `req` parameter is an instance of the `HttpRequest` class, which represents an
     * HTTP request. It contains information such as the request method, URL, headers, and body.
     * @param {HttpHandler} next - `next` is an instance of the `HttpHandler` class, which represents the
     * next handler in the chain. It is responsible for forwarding the request to the next interceptor or
     * the backend server.
     * @returns The intercept method returns an Observable of type HttpEvent<any>.
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get("No-Auth") === "True") {
            return next.handle(req.clone());
        }
        const token = this.userAuthService.getToken();
        req = this.addToken(req, token);
        return next.handle(req).pipe(
            catchError(
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    if (err.status === 401) {
                        this.router.navigate(['/login']);
                    }
                    else if (err.status === 403) {
                        this.router.navigate(['/accessDenied'])
                    }
                    return throwError("Some thing is wrong");
                }
            )
        );
    }
    /**
     * The function `addToken` takes an HTTP request and a token, and returns a clone of the request
     * with the Authorization header set to the provided token.
     * @param request - The `request` parameter is an instance of the `HttpRequest` class, which
     * represents an HTTP request made by the client. It contains information such as the request
     * method, URL, headers, and body.
     * @param {string} token - The token parameter is a string that represents the authentication token
     * that will be added to the request headers.
     * @returns a cloned HttpRequest object with the Authorization header set to the provided token.
     */
    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone(
            {
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            }

        );
    }
}