import { Component, Input, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "MyDrawerItem",
    moduleId: module.id,
    templateUrl: "my-drawer-item.component.html",
    styleUrls: ["my-drawer-item.component.scss"]
})
export class MyDrawerItemComponent implements OnInit {
    @Input() title: string;
    @Input() route: string;
    @Input() icon: string;
    @Input() isSelected: boolean;

    constructor(private routerExtensions: RouterExtensions) {}

    ngOnInit(): void {}

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
    }
}
