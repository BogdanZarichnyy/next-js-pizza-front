import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/prisma-client";
import { Container, GroupVariants, PizzaImage, Title } from "../../../../shared/components/shared";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} size={40} />    
        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title className="font-extrabold mb-1" text={product.name} size="md" />

          <p className="text-gray-400">Lorem ipsum dolor, sit amet consectetur</p>

          <GroupVariants 
            selectedValue="2"
            items={[
              { name: "Маленька", value: "1" },
              { name: "Середня", value: "2" },
              { name: "Велика", value: "3", disabled: true },
            ]} 
          />
        </div>  
      </div>
    </Container>
  );
}