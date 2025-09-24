import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma/prisma-client";
import { ChooseProductModal } from "../../../../../shared/components/shared";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductModalPage({ params }: Props) {
  // const awaitedParams = await params; // ⚠ обов'язково await
  // const awaitedParams = params; // без await для build vercel
  // const id = awaitedParams.id;

  const { id } = await params; // ⚠ обов'язково await

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