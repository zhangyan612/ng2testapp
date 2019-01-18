import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from '../services/data.service'
import "ag-grid-community";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from '../services/alert.service';
import { tipsData } from "../shared/fields-config";

// import 'pivottable/dist/pivot.min.css';
// import 'pivottable/dist/plotly_renderers.min.js';
//import * as pivotModule from 'pivottable';

// class ColumnDefination {
//   headerName: string;
//   field: string;
//   width: number;
//   filterParams: object;
//   constructor(headerName: string, field: string, width:number, filterParams: any = { newRowsAction: "keep" }) {
//     this.headerName = headerName
//     this.field = field;
//     this.width = width;
//     this.filterParams = filterParams;
//   }
// } 

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent {
  gridApi;
  // gridColumnApi;
  rowData: any[];
  columnDefs;
  rowSelection;
  // pinnedTopRowData;
  // pinnedBottomRowData;
  // autoGroupColumnDef;
  // rowGroupPanelShow;
  // pivotPanelShow;
  // defaultColDef;

  errorMessage: string;
  formPath: string;
  formName: string;
  formItemPath: string;
  selectedItemId: number;
  //getFormDefination: any;
  pivotData: any[];
  defObj: any = {};

  generateColumns(data: any[]) {
    let columnDefinitions = [];
    let dfObj = {}
    data.forEach(function (obj) {
      if(obj.name){
        let mappedColumn = {
          headerName: obj.label,
          field: obj.name
        }

        dfObj[obj.name] = obj.label;
        columnDefinitions.push(mappedColumn);
      }
    }); 
    
    this.defObj = dfObj;
    // method based on data key
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

  buildDataSet(defObj: {}, data: any[]){
    console.log(defObj)
    let finalData = [];

    for(let i =0; i<data.length; i++){
      let newObj = this.renameKeys(data[i], defObj);
      finalData.push(newObj);
    }
    return finalData;
  }

  renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey] : obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }

  
  parseObjectData(data: any[]) {
    data.forEach(function (obj) {
      Object
        .keys(obj)
        .map(key => {
          let value = obj[key];
          if(typeof value === 'object' && value != null){
            // prase date assumping that's only object we have
            // if(value.hasOwnProperty('year')){
            //   console.log(value)
            // }
            obj[key] = value.month +'/' + value.day +'/'+ value.year;
          }
        })
    })
    return data;
  }

  constructor(private dataService: DataService, private route: ActivatedRoute, private alertService: AlertService) {

    this.formPath = this.route.snapshot.paramMap.get('name');
    
    this.dataService.getFilter('forms','formPath', this.formPath)
        .subscribe(data => {
          this.formName =  data[0].formName;
          this.formPath =  data[0].formPath;

          if(data[0].fields){
            this.columnDefs = this.generateColumns(data[0].fields);
          }

          this.dataService.getAll(this.formPath)
          .subscribe(data => {
            this.rowData = this.parseObjectData(data);
            this.pivotData = this.buildDataSet(this.defObj, this.rowData);

            //generate columns from row data
            // if (this.rowData) {
            //   this.columnDefs = this.generateColumns(this.rowData);
            // }
        
          }, error => this.errorMessage = <any>error);

    }, error => this.errorMessage = <any>error);

    this.rowSelection = "single";

    //this.pivotData = tipsData; 
    // [["Form Of Organization","Line 1","Line 2","Line 3","Start Date","End Date","State","Self-employed?","Form of organization"],
    // ["tes save data","232","1232","232","11/10/2018","11/18/2018","IL","true","Association"],
    // ["New Form ","2321","3321","231","12/2/2018","11/8/2018","IL","true","Trust"],
    // ["test save data","232","1232","232","11/10/2018","11/18/2018","IL","true","Association"],
    // ["New Form Test","2321","3321","231","12/2/2018","11/8/2018","IL","true","Trust"],
    // ["test update","111","1111","121","1/9/2019","","IL","true","Corporation"],
    // ["test more","2322","3322","323","1/18/2019","1/12/2019","IL","true","Trust"]];

    //this.pivotData = [{"text3":"tes save data","line4":"232","line5":1232,"line6":"232","date7":{"year":2018,"month":11,"day":10},"date8":{"year":2018,"month":11,"day":18},"select9":"IL","checkbox10":true,"radio11":"Association","id":0},{"text3":"New Form ","line4":"2321","line5":3321,"line6":"231","date7":{"year":2018,"month":12,"day":2},"date8":{"year":2018,"month":11,"day":8},"select9":"IL","checkbox10":true,"radio11":"Trust","id":1},{"text3":"test save data","line4":"232","line5":1232,"line6":"232","date7":{"year":2018,"month":11,"day":10},"date8":{"year":2018,"month":11,"day":18},"select9":"IL","checkbox10":true,"radio11":"Association","id":2},{"text3":"New Form Test","line4":"2321","line5":3321,"line6":"231","date7":{"year":2018,"month":12,"day":2},"date8":{"year":2018,"month":11,"day":8},"select9":"IL","checkbox10":true,"radio11":"Trust","id":3},{"text3":"test update","line4":"111","line5":1111,"line6":"121","date7":{"year":2019,"month":1,"day":9},"date8":null,"select9":"IL","checkbox10":true,"radio11":"Corporation","id":5},{"text3":"test more","line4":"2322","line5":3322,"line6":"323","date7":{"year":2019,"month":1,"day":18},"date8":{"year":2019,"month":1,"day":12},"select9":"IL","checkbox10":true,"radio11":"Trust","id":7}];
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

  ngOnInit(): void {

    // $(document).ready(function(){
    //   //debugger
    //   // $("#output").html("Hello World");
    //   var utils = $.pivotUtilities;;
    //   var heatmap =  utils.renderers["Heatmap"];
    //   var sumOverSum =  utils.aggregators["Sum over Sum"];

    //   // $("#output").pivotUI(
    //   //   tipsData, {
    //   //     rows: ["sex", "smoker"],
    //   //     cols: ["day", "time"],
    //   //     aggregator: sumOverSum(["tip", "total_bill"]),
    //   //     renderer: heatmap
    //   //   });

    //     // $("#output").pivotUI(
    //     //   $.pivotUtilities.tipsData, {
    //     //     rows: ["sex", "smoker"],
    //     //     cols: ["day", "time"],
    //     //     vals: ["tip", "total_bill"],
    //     //     aggregatorName: "Sum over Sum",
    //     //     rendererName: "Heatmap"
    //     //   });

    //     $("#output").pivotUI(
    //       [
    //           {color: "blue", shape: "circle"},
    //           {color: "red", shape: "triangle"}
    //       ],
    //       {
    //           rows: ["color"],
    //           cols: ["shape"]
    //       }
    //   );
    // });
  }

  onBtExport() {
    var params = {
      skipHeader: false,
      // columnGroups: getBooleanValue("#columnGroups"),
      // skipFooters: getBooleanValue("#skipFooters"),
      // skipGroups: getBooleanValue("#skipGroups"),
      // skipPinnedTop: getBooleanValue("#skipPinnedTop"),
      // skipPinnedBottom: getBooleanValue("#skipPinnedBottom"),
      // allColumns: getBooleanValue("#allColumns"),
      // onlySelected: getBooleanValue("#onlySelected"),
      // suppressQuotes: getBooleanValue("#suppressQuotes"),
      fileName: "test file",
      columnSeparator: ","
    };
    
    this.gridApi.exportDataAsCsv(params);
  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    this.selectedItemId = selectedRows[0].id;
    this.formItemPath = this.formPath + '/' + this.selectedItemId;
  }

  onItemDelete(){
    //console.log(this.formItemPath)
    this.dataService.delete(this.formItemPath).subscribe(
      response => {
        this.rowData = this.rowData.filter(obj => obj.id !== this.selectedItemId);
        this.alertService.success("Data is deleted");
      },
      error => {
        this.errorMessage = <any>error;
        this.alertService.error(error);
      }
    );
  }


  onGridReady(params) {
    this.gridApi = params.api;
  }

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


// function getBooleanValue(cssSelector) {
//   return document.querySelector(cssSelector).checked === true;
// }

// function getDatePicker() {
//   function Datepicker() {}
//   Datepicker.prototype.init = function(params) {
//     this.eInput = document.createElement("input");
//     this.eInput.value = params.value;
//     //$(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
//   };
//   Datepicker.prototype.getGui = function() {
//     return this.eInput;
//   };
//   Datepicker.prototype.afterGuiAttached = function() {
//     this.eInput.focus();
//     this.eInput.select();
//   };
//   Datepicker.prototype.getValue = function() {
//     return this.eInput.value;
//   };
//   Datepicker.prototype.destroy = function() {};
//   Datepicker.prototype.isPopup = function() {
//     return false;
//   };
//   return Datepicker;
// }



// Any reporting code

