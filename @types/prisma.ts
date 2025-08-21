import { Product, ProductItem, Ingredient } from "@prisma/client";

export type ProductWithRalationsType = Product & { items: ProductItem[], ingredients: Ingredient[] };