import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DataCache } from './DataCache';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public cache: DataCache, public router: Router) { }
    canActivate(): boolean {
        if (!this.cache.isAuthenticated)
        {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}