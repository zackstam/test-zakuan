import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AppInterceptor implements HttpInterceptor {
    constructor(
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          // Promise.resolve(null).then(() => {
          //   this.store.dispatch(new AppActions.SetLoading(true));
          // });
          if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
          }
          return next.handle(request);
    }
};