import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from './product';
import {ProductService} from './product.service';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  public pageTitle = 'Product List';
  public imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  sub!: Subscription;

  private _listFilter = '';

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    this.sub = this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = this.products;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredProducts = this.performFilter(value);
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  public onRatingClicked(message: string): void {
    this.pageTitle = 'Product List:' + message;
  }


}
