import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInputDirective } from './directives/number-input.directive';
import { MaterialModule } from './modules/material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NumberInputDirective],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NumberInputDirective, MaterialModule, RouterModule],
})
export class SharedModule {}
