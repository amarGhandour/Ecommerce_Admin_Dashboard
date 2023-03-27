import {IUser} from "@/interfaces/iuser";
import {PaymentMethod} from "@/interfaces/PaymentMethod"
export interface IOrder {
  _id: string,
  user: IUser,
  cartItems: any[],
  taxPrice: number,
  shippingPrice: number,
  totalOrderPrice: number,
  paymentMethodType: PaymentMethod,
  isPaid: boolean,
  isDelivered: boolean,
}
