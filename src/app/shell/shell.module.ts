import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[NavigationComponent, SubNavigationComponent],
  declarations: [NavigationComponent, SubNavigationComponent]
})
export class ShellModule { }
