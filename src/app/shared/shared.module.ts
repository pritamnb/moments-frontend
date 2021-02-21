import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInputDirective } from './directives/number-input.directive';
import { MaterialModule } from './modules/material/material.module';
import { RouterModule } from '@angular/router';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
const components = [SidenavbarComponent, NavbarComponent];
@NgModule({
  declarations: [NumberInputDirective, components],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NumberInputDirective, MaterialModule, RouterModule, components],
})
export class SharedModule {}
