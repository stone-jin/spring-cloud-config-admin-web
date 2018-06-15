import {
    Injectable,
    ComponentFactoryResolver,
    ComponentFactory,
} from '@angular/core';

@Injectable()
export class ModelService {
    constructor(private resolver: ComponentFactoryResolver) {}

    openDialog(options: any) {}
}
