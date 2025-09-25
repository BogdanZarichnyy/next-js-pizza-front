import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/prisma-client";
import { Container, ProductForm } from "../../../../shared/components/shared";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params; // ⚠ обов'язково await

  const product = await prisma.product.findFirst({ 
    where: { 
      id: Number(id) 
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
      // items: {
      //   orderBy: {
      //     createdAt: 'desc',
      //   },
      //   include: {
      //     product: {
      //       include: {
      //         items: true,
      //       },
      //     },
      //   },
      // },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}