import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: `.active {
    background-color: #f699cd;
    border-color: #f699cd;
  }`,
})
export class SidebarComponent {}
