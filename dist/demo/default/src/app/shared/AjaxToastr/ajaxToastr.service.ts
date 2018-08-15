import { Injectable } from '@angular/core';

declare let toastr: any;

@Injectable()
export class AjaxToastrService {
    constructor() { }

    error(e, message) {
        toastr.error(e.message && e.message.length > 0 ? e.message : message);
    }
}
