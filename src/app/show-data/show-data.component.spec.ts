import { AgGridModule } from 'ag-grid-angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowDataComponent } from './show-data.component';

describe("ShowDataComponent", () => {
  let component: ShowDataComponent;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<ShowDataComponent>;
  let data = [
    {
      make: "Toyota",
      model: "Celica",
      price: 35000
    },
    {
      make: "Porsche",
      model: "Boxter",
      price: 72000
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AgGridModule.withComponents([]), HttpClientTestingModule],
      declarations: [ShowDataComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(ShowDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("Class", () => {
    it("should send a get request (getClientData) to the correct rest url", () => {
      // Given
      const req = httpTestingController.expectOne("./assets/data.json");
      expect(req.request.method).toEqual("GET");

      // When
      component.getClientData().subscribe(data => {
        // Then
        expect(data).toEqual(
          jasmine.objectContaining({
            make: "Toyota"
          })
        );
      });

      // When
      req.flush(data);
    });
  });

  describe("DOM", () => {
    it("should contain Overview Table", () => {
      // Given
      const overviewTable: HTMLElement = fixture.nativeElement;

      // Then
      expect(overviewTable.querySelector("ag-grid-angular")).toBeTruthy();
    });

    it("should have check for columns headings present in the table", () => {
      const elm = fixture.nativeElement;
      const grid = elm.querySelector("ag-grid-angular");
      const headerCells = grid.querySelectorAll(".ag-header-cell-text");

      // When
      const headerTitles = Array.from(headerCells).map((cell: any) => {
        return cell.textContent;
      });

      // Then
      expect(headerTitles).toEqual(["make", "model", "price"]);
    });
  });
});
