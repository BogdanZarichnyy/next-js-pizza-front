import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/prisma-client";
import { Container, ProductForm } from "../../../../shared/components/shared";

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props ) {
  const awaitedParams = await params; // ⚠ обов'язково await
  const id = awaitedParams.id;

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
      //     createAt: 'desc',
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