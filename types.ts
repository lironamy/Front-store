export interface Product {
  orderQuantity: any;
  orderSize: any;
  id: string;
  category: Category;
  name: string;
  descriptionHeader: string;
  description: string;
  price: string;
  salePrice: string;
  isFeatured: boolean;
  size: Size[];
  color: Color;
  images: Image[]
  productSizes : ProductSize[];
};

export interface ProductSize {
  id: string;
  productId: Product[];
  sizeId: Size[];
  sizeName: string;
  quantity: number;
};

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  heroImages: []
};

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface Color {
  id: string;
  name: string;
  value: string;
};
