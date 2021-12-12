import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSummeryDialogComponent } from './product-summery-dialog.component';

describe('ProductSummeryDialogComponent', () => {
  let component: ProductSummeryDialogComponent;
  let fixture: ComponentFixture<ProductSummeryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSummeryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSummeryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
