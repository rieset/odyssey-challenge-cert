import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { PreloaderService } from '@services/preloader/preloader.service'

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent implements OnInit {
  ngOnInit (): void {}

  constructor (
      private preloaderService: PreloaderService
  ) {
    this.preloaderService.load()
  }
}
