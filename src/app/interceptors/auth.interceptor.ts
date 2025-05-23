import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Console } from 'console';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();
    console.log('PASSOU PELO INTERCEPTOR')

    const isAuthEndpoint = req.url.includes('/user/authenticate');


    if (token && !isAuthEndpoint) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        console.log(authReq);
        return next(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    // authService.logout();
                    // router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401 || error.status === 403) {
                authService.logout();
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
}; 