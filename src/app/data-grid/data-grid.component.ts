import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from '../services/data.service'

import "ag-grid-community";

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent {
  private gridApi;
  private gridColumnApi;
  private rowData: any[];
  private columnDefs;
  private rowSelection;
  private pinnedTopRowData;
  private pinnedBottomRowData;
  private autoGroupColumnDef;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private defaultColDef;

  errorMessage: string;

  constructor(private dataService: DataService) {
    this.columnDefs = [
      {
        headerName: "Athlete",
        field: "athlete",
        width: 150,
        filterParams: { newRowsAction: "keep" },
        checkboxSelection: function(params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function(params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        }
      },
      {
        headerName: "Age",
        field: "age",
        width: 90,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Country",
        field: "country",
        width: 120,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Year",
        field: "year",
        width: 90,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Date",
        field: "date",
        width: 110,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Sport",
        field: "sport",
        width: 110,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Gold",
        field: "gold",
        width: 100,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Silver",
        field: "silver",
        width: 100,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Bronze",
        field: "bronze",
        width: 100,
        filterParams: { newRowsAction: "keep" }
      },
      {
        headerName: "Total",
        field: "total",
        width: 100,
        filterParams: { newRowsAction: "keep" }
      }
    ];
    
    this.autoGroupColumnDef = {
      headerName: "Group",
      width: 200,
      field: "athlete",
      valueGetter: function(params) {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: { checkbox: true }
    };
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";
    this.pivotPanelShow = "always";
    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true
    };
  

    // this.columnDefs = [
    //   {
    //     headerName: "GroupA",
    //     children: [
    //       {
    //         headerName: "Group1",
    //         children: [
    //           {
    //             headerName: "Group",
    //             valueGetter: "data.country.charAt(0)",
    //             width: 75
    //           },
    //           {
    //             headerName: "Year",
    //             field: "year",
    //             width: 75
    //           }
    //         ]
    //       },
    //       {
    //         headerName: "Group2",
    //         children: [
    //           {
    //             headerName: "Date",
    //             field: "date",
    //             width: 110
    //           },
    //           {
    //             headerName: "Sport",
    //             field: "sport",
    //             width: 110
    //           },
    //           {
    //             headerName: "Gold",
    //             field: "gold",
    //             width: 100
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     headerName: "GroupB",
    //     children: [
    //       {
    //         headerName: "Group11",
    //         children: [
    //           {
    //             headerName: "Athlete",
    //             field: "athlete",
    //             width: 150
    //           },
    //           {
    //             headerName: "Age",
    //             field: "age",
    //             width: 90,
    //             cellClassRules: {
    //               lessThan23IsGreen: function(params) {
    //                 return params.value < 23;
    //               },
    //               lessThan20IsBlue: function(params) {
    //                 return params.value < 20;
    //               }
    //             }
    //           },
    //           {
    //             headerName: "Country",
    //             field: "country",
    //             width: 120
    //           }
    //         ]
    //       },
    //       {
    //         headerName: "Group2",
    //         children: [
    //           {
    //             headerName: "Silver",
    //             field: "silver",
    //             width: 100
    //           },
    //           {
    //             headerName: "Bronze",
    //             field: "bronze",
    //             width: 100
    //           },
    //           {
    //             headerName: "Total",
    //             field: "total",
    //             width: 100
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ];


  //   this.rowSelection = "multiple";
  //   this.pinnedTopRowData = [
  //     {
  //       athlete: "Floating Top Athlete",
  //       age: 999,
  //       country: "Floating Top Country",
  //       year: 2020,
  //       date: "01-08-2020",
  //       sport: "Floating Top Sport",
  //       gold: 22,
  //       silver: 33,
  //       bronze: 44,
  //       total: 55
  //     }
  //   ];
  //   this.pinnedBottomRowData = [
  //     {
  //       athlete: "Floating Bottom Athlete",
  //       age: 888,
  //       country: "Floating Bottom Country",
  //       year: 2030,
  //       date: "01-08-2030",
  //       sport: "Floating Bottom Sport",
  //       gold: 222,
  //       silver: 233,
  //       bronze: 244,
  //       total: 255
  //     }
  //   ];
  // }

  // onBtExport() {
  //   var params = {
  //     skipHeader: getBooleanValue("#skipHeader"),
  //     columnGroups: getBooleanValue("#columnGroups"),
  //     skipFooters: getBooleanValue("#skipFooters"),
  //     skipGroups: getBooleanValue("#skipGroups"),
  //     skipPinnedTop: getBooleanValue("#skipPinnedTop"),
  //     skipPinnedBottom: getBooleanValue("#skipPinnedBottom"),
  //     allColumns: getBooleanValue("#allColumns"),
  //     onlySelected: getBooleanValue("#onlySelected"),
  //     suppressQuotes: getBooleanValue("#suppressQuotes"),
  //     fileName: document.querySelector("#fileName"),
  //     columnSeparator: document.querySelector("#columnSeparator")
  //   };
    // if (getBooleanValue("#skipGroupR")) {
    //   params.shouldRowBeSkipped = function(params) {
    //     return params.node.data.country.charAt(0) === "R";
    //   };
    // }
    // if (getBooleanValue("#useCellCallback")) {
    //   params.processCellCallback = function(params) {
    //     if (params.value && params.value.toUpperCase) {
    //       return params.value.toUpperCase();
    //     } else {
    //       return params.value;
    //     }
    //   };
    // }
    // if (getBooleanValue("#useSpecificColumns")) {
    //   params.columnKeys = ["country", "bronze"];
    // }
    // if (getBooleanValue("#processHeaders")) {
    //   params.processHeaderCallback = function(params) {
    //     return params.column.getColDef().headerName.toUpperCase();
    //   };
    // }
    // if (getBooleanValue("#customHeader")) {
    //   params.customHeader = "[[[ This ia s sample custom header - so meta data maybe?? ]]]\n";
    // }
    // if (getBooleanValue("#customFooter")) {
    //   params.customFooter = "[[[ This ia s sample custom footer - maybe a summary line here?? ]]]\n";
    // }
    //this.gridApi.exportDataAsCsv(params);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.dataService.getExternal("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json").subscribe(
      data => {
        this.rowData = data;
      },
      error => this.errorMessage = <any>error
    );

  }
}

function getBooleanValue(cssSelector) {
  return document.querySelector(cssSelector).checked === true;
}


