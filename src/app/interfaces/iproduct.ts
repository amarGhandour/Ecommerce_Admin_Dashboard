import {ICategory} from "@/interfaces/icategory";

export interface IProduct {
  _id: string,
  title: string,
  slug?: string,
  description: string
  quantity: number,
  sold?: number,
  price: number,
  priceAfterDiscount?: number,
  colors?: string[],
  imageCover: string,
  images?: string[],
  category: ICategory,
  subcategories?: string[],
  ratingsAverage?: number,
  ratingsQuantity?: number,
  brand?: string
}
