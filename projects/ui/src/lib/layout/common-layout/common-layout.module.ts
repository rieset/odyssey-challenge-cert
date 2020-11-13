import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CommonLayoutComponent } from './common-layout.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [CommonLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [CommonLayoutComponent]
})
export class CommonLayoutModule {}
