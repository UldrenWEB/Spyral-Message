import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { StatesPage } from './states.page';

describe('Tab3Page', () => {
  let component: StatesPage;
  let fixture: ComponentFixture<StatesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatesPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
