import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HeaderComponent } from './header.component'
import { provideApi, provideAppConstants } from '@constants'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { PipesModule } from '@libs/pipes/pipes.module'
import { TranslocoModule } from '@ngneat/transloco'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, PipesModule, TranslocoModule],
      declarations: [HeaderComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
