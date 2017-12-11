import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "MyDrawer",
    moduleId: module.id,
    templateUrl: "my-drawer.component.html",
    styleUrls: ["my-drawer.component.scss"]
})
export class MyDrawerComponent implements OnInit {
    
    @Input() public selectedPage: string;

    public ngOnInit(): void {}

    public isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }
}
