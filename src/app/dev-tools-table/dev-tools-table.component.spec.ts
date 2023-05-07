import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevToolsTableComponent } from './dev-tools-table.component';

describe('DevToolsTableComponent', () => {
  let component: DevToolsTableComponent;
  let fixture: ComponentFixture<DevToolsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevToolsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevToolsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
