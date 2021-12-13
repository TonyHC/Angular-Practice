import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;

    private authSubscription!: Subscription;


    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {

    }

    ngOnInit(): void {
        this.authSubscription = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true; // equaivalent to !!user
        });
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    onSaveRecipes() {
        this.dataStorageService.saveRecipes();
    }

    onFetchRecipes() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}