import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UClassifyPage } from './UClassify.page';

describe('Tab1Page', () => {
  let component: UClassifyPage;
  let fixture: ComponentFixture<UClassifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UClassifyPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UClassifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
