import { CanActivate } from '@angular/router';

export class AutenticacaoGuardService implements CanActivate {

    canActivate(): boolean {
        return true;
    }

}
