import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/prisma-client";
import crypto from "crypto";
import { findOrCreateCart, updateCartTotalAmount } from "../../../shared/lib";
import { CreateCartItemValues } from "../../../shared/servises/dto/cart.dto";

export async function GET(req: NextRequest) {
  try {
    // const userId = 1;
    const token = req.cookies.get('cartToken')?.value;

    if(!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          // { userId },
          { token },
        ]
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              }
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.error('[CART_GET] Server error', error);
    return NextResponse.json({ message: "Не вдалося отримати кошик" }, { status: 500 } );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;
  
    if(!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: {
              in: data.ingredients
            },
          },
        },
        // ingredients: data.ingredients ? {
        //   every: {
        //     id: {
        //       in: data.ingredients
        //     },
        //   },
        // } : undefined,
        // ...(data.ingredients ? { ingredients: { some: { id: { in: data.ingredients } } } } : {} ),
      },
    });

    // Якщо товар був знайдений, робимо + 1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else { // Якщо товар не був знайдений, тоді створюємо кошик і додаємо туди продукти
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          // quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) }
        }
      });
    }

    const updateUserCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updateUserCart);
    response.cookies.set('cartToken', token); // відсилаємо токен в кукі перед відправкою відповіді
    return response;
  } catch (error) {
    console.error('[CART_POST] Server error', error);
    return NextResponse.json({ message: "Не вдалося створити кошик" }, { status: 500 } );
  }
}