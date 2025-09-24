import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma/prisma-client";
import { ChooseProductModal } from "../../../../../shared/components/shared";

interface Props {
  params: Promise<{ id: string }>; // для динамічних параметрів потрібен такий тип
}

export default async function ProductModalPage({ params }: Props) {
  const { id } = await params; // ⚠ а тут обов'язково потрібен await, інакше білд не пройде

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