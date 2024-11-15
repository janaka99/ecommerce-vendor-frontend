interface IProductImage {
  url: string;
  main: boolean;
  _id: stirng;
}

interface IProduct {
  _id: string;
  sku: string;
  name: string;
  qty: number;
  description: string;
  price: number;
  isFavourite: boolean;
  images: IProductImage[];
}
