import { Component } from '@angular/core';
import { filterBy, distinct } from '@progress/kendo-data-query';
import { products } from './products';
import { Product, Category } from './model';

/**
 * NOTE: Interface declaration here is for demo compilation purposes only!
 * In the usual case include it as an import from the data query package:
 *
 * import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
 */
interface CompositeFilterDescriptor {
  logic: 'or' | 'and';
  filters: Array<any>;
}

@Component({
  selector: 'my-app',
  template: `
        <kendo-grid
            [data]="gridData"
            [filter]="filter"
            filterable="menu"
            (filterChange)="filterChange($event)"
            [height]="400"
        >
        <kendo-grid-column field="ProductName" title="Product Name">
          <ng-template kendoGridFilterMenuTemplate
                let-column="column"
                let-filter="filter"
                let-filterService="filterService"
                >
                <multicheck-filter
                    [isPrimitive]="true"
                    [field]="column.field"
                    [filterService]="filterService"
                    [currentFilter]="filter"
                    [data]="distinctPrimitive(column.field)"></multicheck-filter>
            </ng-template>
        </kendo-grid-column>
        <kendo-grid-column field="UnitPrice" title="Unit Price" [width]="130" format="{0:c}" filter="numeric">
          <ng-template kendoGridFilterMenuTemplate
                let-column="column"
                let-filter="filter"
                let-filterService="filterService"
                >
                <multicheck-filter
                    [isPrimitive]="true"
                    [field]="column.field"
                    [filterService]="filterService"
                    [currentFilter]="filter"
                    [data]="distinctPrimitive(column.field)"></multicheck-filter>
            </ng-template>
        </kendo-grid-column>
        <kendo-grid-column field="CategoryID" title="Category" [width]="180">
            <ng-template kendoGridFilterMenuTemplate
                let-column="column"
                let-filter="filter"
                let-filterService="filterService"
                >
                <multicheck-filter
                    [isPrimitive]="false"
                    [field]="column.field"
                    [currentFilter]="filter"
                    [filterService]="filterService"
                    textField="CategoryName"
                    valueField="CategoryID"
                    [data]="categories"></multicheck-filter>
            </ng-template>
            <ng-template kendoGridCellTemplate let-dataItem>
                {{dataItem.Category?.CategoryName}}
            </ng-template>
        </kendo-grid-column>
        <kendo-grid-column field="Discontinued" [width]="160" filter="boolean">
            <ng-template kendoGridCellTemplate let-dataItem>
                <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
            </ng-template>
        </kendo-grid-column>
    </kendo-grid>
    `,
})
export class AppComponent {
  public filter: CompositeFilterDescriptor = { logic: 'and', filters: [] };
  public gridData: Product[];
  public categories: Category[];
  public data: Product[];

  constructor() {
    this.data = [];
    for (let i = 0; i < 5000; i++) {
      this.data.push({
        ProductID: 'item' + i,
        ProductName: 'Original Frankfurter grüne Soße' + i,
        UnitPrice: 13.0,
        UnitsInStock: 32,
        Discontinued: false,
        Category: {
          CategoryID: 2,
          CategoryName: 'Condiments',
        },
      });
    }

    this.gridData = filterBy(this.data, this.filter);
    this.categories = distinct(this.data, 'CategoryID').map(
      (item) => (item as Product).Category
    );
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.gridData = filterBy(this.data, filter);
  }

  public distinctPrimitive(fieldName: string): unknown[] {
    return distinct(this.data, fieldName).map((item) => item[fieldName]);
  }
}
