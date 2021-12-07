import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})
export class UserService {
    /* 
    * Subject more "active" than regular observable and can be triggered from code
    * Subject is a special type of Observable recommended to be used over EventEmitters, since its
    * more efficient behind the scenes and have access to operators  
    */
    activatedEmitter = new Subject<boolean>();
}