import { prisma } from "../../prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(',').map(Number);
  const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
  const ingredientsIdArr = params.ingredients?.split(',').map(Number);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({ 
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsIdArr ? { 
            some: {
              id: {
                in : ingredientsIdArr
              }
            }
          } : undefined,
          items: {
            some: {
              size: {
                in: sizes
              },
              pizzaType: {
                in: pizzaTypes
              },
              price: {
                gte: minPrice, // >=
                lte: maxPrice, // <=
              },
            }
          },
        },
        include: {
          ingredients: true,
          // items: true, // буде показувати рандомні або найвищі ціни варіантів піцц без сортування
          items: {
            where: {  // це потрібно, щоб при фільтрації по цінам, не показувало інші варіанти піцц, які не входять в цей діапазон
              price: {
                gte: minPrice,
                lte: maxPrice,
              }
            },
            orderBy: {
              price: 'asc' // відсортує по мінімальним цінам і буде показувати мінімальні ціни варіантів піцц в каталозі
            }
          }
        }
      }
    }
  });
  
  return categories;
}