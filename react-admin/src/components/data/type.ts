export interface TypeProduct {
  _id: string;
  productName: string;
  category: { _id: string; categoryName: string };
  brandId: string;
  price: number;
  sort: number;
  discount: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
  time: string;
  stock: number;
  modelYear: number;
  thumbnail?: string;
  slug: string;
  isHome?: boolean;
  createAt: string;
  isHot?: boolean;
  isBest?: boolean;
}
interface DataOderdetail {
  product: string;
  quantity: number;
  price: number;
  discount: number;
}
interface Dataaction {
  staff: { _id: string; email: string };
  action: string;
  orderStatus: string;
  note: string;
}
export interface TypeOrder {
  _id: string;
  orderDate: string;
  orderStatus: string;
  paymentType: string;
  customer: { _id: string; phone: string };
  orderItems: DataOderdetail[];
  action: Dataaction[];
  time: string;
  total: number;
}
