import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss']
})
export class ShowDataComponent implements OnInit {
  public pinnedBottomRowData: any;
  public defaultColDef: any;
  private totalPrice = 0;
  public columnDefs = [
    {
      headerName: 'make',
      field: 'make',
      sortable: true
    },
    { headerName: 'model', field: 'model', sortable: true },
    {
      headerName: 'price',
      field: 'price',
      sortable: true
    }
  ];
  rowData: any;

  constructor(private http: HttpClient, private titleService: Title) {
    this.titleService.setTitle('Welcome to Table page');
    this.defaultColDef = {
      editable: this.checkEditFunction.bind(this)
    };
  }

  ngOnInit() {
    this.getClientData().subscribe(data => {
      this.rowData = data;
      this.rowData.forEach((o: any) => {
        this.totalPrice = this.totalPrice + o.price;
      });
      this.pinnedBottomRowData = this.createData();
    });
  }

  checkEditFunction(params: any): boolean {
    if (params.node.rowPinned && params.node.isRowPinned()) {
      return false;
    } else {
      return true;
    }
  }

  getClientData(): Observable<any> {
    return this.http.get('./assets/data.json');
  }

  createData() {
    const result = [
      {
        price: 'Total Price: ' + this.totalPrice
      }
    ];
    return result;
  }
}
