import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from '../services/data.service'

import "ag-grid-community";
import { ActivatedRoute } from "@angular/router";

class ColumnDefination {
  headerName: string;
  field: string;
  width: number;
  filterParams: object;
  constructor(headerName: string, field: string, width:number, filterParams: any = { newRowsAction: "keep" }) {
    this.headerName = headerName
    this.field = field;
    this.width = width;
    this.filterParams = filterParams;
  }
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent {
  // gridApi;
  // gridColumnApi;
  rowData: any[];
  columnDefs;
  // rowSelection;
  // pinnedTopRowData;
  // pinnedBottomRowData;
  // autoGroupColumnDef;
  // rowGroupPanelShow;
  // pivotPanelShow;
  // defaultColDef;


  errorMessage: string;
  formPath: string;
  formName: string;
  getFormDefination: any;

  generateColumns(data: any[]) {
    let columnDefinitions = [];

    data.forEach(function (obj) {
      if(obj.name){
        let mappedColumn = {
          headerName: obj.label,
          field: obj.name
        }

        columnDefinitions.push(mappedColumn);
      }
    }); 
    
    // data.map(object => {
    //   Object
    //     .keys(object)
    //     .map(key => {
    //       let mappedColumn = {
    //         headerName: key.toUpperCase(),
    //         field: key
    //       }
    //       columnDefinitions.push(mappedColumn);
    //     })
    // })
    // //Remove duplicate columns
    // columnDefinitions = columnDefinitions.filter((column, index, self) =>
    //   index === self.findIndex((colAtIndex) => (
    //     colAtIndex.field === column.field
    //   ))
    // )

    return columnDefinitions;
  }

  constructor(private dataService: DataService, private route: ActivatedRoute) {

    // this.columnDefs = [
    //   {
    //     width: 40,
    //     checkboxSelection: function(params) {
    //       return params.columnApi.getRowGroupColumns().length === 0;
    //     },
    //     headerCheckboxSelection: function(params) {
    //       return params.columnApi.getRowGroupColumns().length === 0;
    //     }
    //   }
      // {
      //   headerName: "Age",
      //   field: "age",
      //   width: 90,
      //   filterParams: { newRowsAction: "keep" }
      // },
      // {
      //   headerName: "Country",
      //   field: "country",
      //   width: 120,
      //   filterParams: { newRowsAction: "keep" }
      // },
      // {
      //   headerName: "Year",
      //   field: "year",
      //   width: 90,
      //   filterParams: { newRowsAction: "keep" }
      // },
      // {
      //   headerName: "Date",
      //   field: "date",
      //   width: 110,
      //   filterParams: { newRowsAction: "keep" }
      // },
      // {
      //   headerName: "Sport",
      //   field: "sport",
      //   width: 110,
      //   filterParams: { newRowsAction: "keep" }
      // },
      // {
      //   headerName: "Gold",
      //   field: "gold",
      //   width: 100,
      //   filterParams: { newRowsAction: "keep" }
      // },
      // {
      //   headerName: "Silver",
      //   field: "silver",
      //   width: 100,
      //   filterParams: { newRowsAction: "keep" }
      // },
      // {
      //   headerName: "Bronze",
      //   field: "bronze",
      //   width: 100,
      //   filterParams: { newRowsAction: "keep" }
      // }
      // ,
      // {
      //   headerName: "Total",
      //   field: "total",
      //   width: 100,
      //   filterParams: { newRowsAction: "keep" }
      // }
    //];
    
    // this.rowData = [
    //   {
    //     "id": "12345",
    //     "firstName": "Mark",
    //     "lastName": "Mcfakeson"
    //   },
    //   {
    //     "id": "12345"
    //   },
    //   {
    //     "id": "67890",
    //     "hurray": "hurrayValue"
    //   }
    // ];

    this.formPath = this.route.snapshot.paramMap.get('name');
    
    this.dataService.getFilter('forms','formPath', this.formPath)
        .subscribe(data => {
          console.log(data);
          this.formName =  data[0].formName;
          this.formPath =  data[0].formPath;

          if(data[0].fields){
            this.columnDefs = this.generateColumns(data[0].fields);
          }

    }, error => this.errorMessage = <any>error);

    this.dataService.getAll(this.formPath)
    .subscribe(data => {
      this.rowData = data;

      //generate columns from row data
      // if (this.rowData) {
      //   this.columnDefs = this.generateColumns(this.rowData);
      // }
  
    }, error => this.errorMessage = <any>error);


    // this.getFormDefination = new Promise((resolve, reject) => {
    //   this.dataService.getFilter('forms','formPath', this.formPath)
    //       .subscribe(data => {
    //         resolve(data);
    //       }, error => reject(error));
    // });


    // this.dataService.getFilter('forms','formPath', this.formPath).subscribe(
    //   f => {
    //     this.updatecolumnDefs(f);

    //   },
    //   error => this.errorMessage = <any>error
    // );

    // this.getFormDefination.then(response => {
    //   debugger
    //   this.updatecolumnDefs(response);
  
    // })

    //var def = new ColumnDefination("Form Of Organization", "line4", 100)
    // var def = new ColumnDefination("Total", "total", 100)
    // this.columnDefs.push(def);
    // this.gridApi.edit.on.beginCellEdit($scope, function(rowEntity, colDef) { ... });

    // this.rowSelection = "multiple";
    // this.rowGroupPanelShow = "always";
    // this.pivotPanelShow = "always";
    // this.defaultColDef = {
    //   editable: true,
    //   enableValue: true
    // };

    
  }

  // ngOnInit(): void {
  //   debugger

  // }


  // onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;


    

  //   // this.dataService.getExternal("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json").subscribe(
  //   //   data => {
  //   //     this.rowData = data;
  //   //   },
  //   //   error => this.errorMessage = <any>error
  //   // );


  //   // var getFormDefination = new Promise((resolve, reject) => {
  //   //   this.dataService.getFilter('forms','formPath', this.formPath)
  //   //       .subscribe(data => {
  //   //         resolve(data);
  //   //       }, error => reject(error));
  //   // });
    
  //   // this.getFormDefination.then(response => {
  //   //   debugger
  //   //   this.updatecolumnDefs(response);

  //     //this.gridApi.refreshHeader();
  

  //   // })

  //   params.api.sizeColumnsToFit();

  //   // var cellDefs = this.gridApi.cellValueChanged();
  //   // cellDefs.forEach( function(cellDef) {
  //   //     console.log(cellDef.rowIndex);
  //   //     console.log(cellDef.column.getId());
  //   //     console.log(cellDef.floating);
  //   // });
  // }

  // updatecolumnDefs(data){
  //   debugger
  //   for(let i of data[0].fields) {
  //     if(i.type =='input' || i.type == 'select' || i.type =='radiobutton'){
  //       var def = new ColumnDefination(i.label, i.name, 100)
  //       this.columnDefs.push(def);
  //     }
  //   }
  // }

  

}


function getBooleanValue(cssSelector) {
  return document.querySelector(cssSelector).checked === true;
}

function getDatePicker() {
  function Datepicker() {}
  Datepicker.prototype.init = function(params) {
    this.eInput = document.createElement("input");
    this.eInput.value = params.value;
    //$(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
  };
  Datepicker.prototype.getGui = function() {
    return this.eInput;
  };
  Datepicker.prototype.afterGuiAttached = function() {
    this.eInput.focus();
    this.eInput.select();
  };
  Datepicker.prototype.getValue = function() {
    return this.eInput.value;
  };
  Datepicker.prototype.destroy = function() {};
  Datepicker.prototype.isPopup = function() {
    return false;
  };
  return Datepicker;
}


