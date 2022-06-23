export class Product {
  public ProductID: string;
  public ProductName = '';
  public Discontinued? = false;
  public UnitsInStock?: number;
  public UnitPrice = 0;
  public Category = {
    CategoryID: 0,
    CategoryName: '',
  };
}

export class Category {
  public CategoryID?: number;
  public CategoryName?: string;
  public Description?: string;
}
