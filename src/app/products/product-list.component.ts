import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle : string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 20;
    showImage: boolean = false;
    errorMessage: string;

    // filtering logic
    _listFilter : string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService){
    }

    ngOnInit(): void{
        this.productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = products;
            },
            error => this.errorMessage = <any>error
        );
    }

    onRatingClicked(message: string): void{
        this.pageTitle = 'Product List: ' + message;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
    }
}