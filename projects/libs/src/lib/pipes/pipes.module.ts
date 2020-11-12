import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RelativeRoutePipe, RoutePipe, RoutesPipe } from './route-path.pipe'
import { SafeHtmlPipe } from './safe-html.pipe'

@NgModule({
  declarations: [
    RoutePipe,
    RoutesPipe,
    RelativeRoutePipe,
    SafeHtmlPipe
  ],
  imports: [CommonModule],
  exports: [
    RoutePipe,
    RoutesPipe,
    RelativeRoutePipe,
    SafeHtmlPipe
  ]
})
export class PipesModule {}
