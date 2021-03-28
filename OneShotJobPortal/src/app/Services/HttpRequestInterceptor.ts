import { Injectable }
    from '@angular/core';
import { Observable } from 'rxjs';
import {
    HttpEvent, HttpInterceptor,
    HttpHandler, HttpRequest
}
    from '@angular/common/http';
import { DataCache } from './DataCache';


@Injectable()
export class HttpRequestInterceptor
    implements HttpInterceptor {

    constructor(private cache: DataCache) { }

    intercept(req: HttpRequest<any>,
        next: HttpHandler):
        Observable<HttpEvent<any>> {
        var token =
            this.cache.token;

        if (token)
        {
            const newReq = req.clone(
                {
                    headers: req.headers
                        .set('Authorization',
                            'Bearer ' + token)
                });

            return next.handle(newReq);
        }
        else
        {
            return next.handle(req);
        }
    }
};