import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma/prisma-client";
import { ChooseProductModal } from "../../../../../shared/components/shared";

interface Props {
  params: { id: string };
}

export default async function ProductModalPage({ params }: Props) {
  const awaitedParams = await params; // ⚠ обов'язково await
  // const awaitedParams = params; // без await
  const id = awaitedParams.id;

  const product = await prisma.product.findFirst({ 
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <ChooseProductModal product={product} />
  );
}