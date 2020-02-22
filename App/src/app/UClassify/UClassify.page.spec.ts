//-----------------------------------------------------------------------------------------------------------------
// CS 5551
// Lab 4
// Jonathan Wolfe
// Bill Yerkes
// Create a simple ionic application using any of the ionic templates [tabs, sidemenu]
//     Make changes to the template to display
//     1. Login and Registration Activities
//     The application must have a sign up and login activities.
//
//     2. A Main page
//     The Page should be Mashup of at least Two Web Services (refer to the web services
//     from the spreadsheet). One of them should be from the list of knowledge/Machine
//     learning/AI services and that you haven’t used in your previous work.
//
//     3. Testing
//     Write at least 3-unit test cases related to your application.
//
//     Deploy the application to android device/ web/ ionic lab
//-----------------------------------------------------------------------------------------------------------------
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
  
  it('should have expected <ion-title> text', () => {
    fixture.detectChanges();
    const title = de.nativeElement;
    expect(title.innerText).toMatch('UClassify',
        '<ion-title> should say "UClassify"');
  });
  
});
