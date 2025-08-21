import { Container, Filters, ProductsGroupList, Title, TopBar } from "../../shared/components/shared";
import { prisma } from "../../prisma/prisma-client";

export default async function Home() {
  // const categories = await prisma.category.findMany({});
  const categories = await prisma.category.findMany({ 
    include: {
      products: {
        include: {
          ingredients: true,
          items: true
        }
      }
    }
   });

  // console.log(categories);
  // console.log(categories[0].products);

  return (
    <>
      <Container className="mt-10">
        <Title text="Всі піцци" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">

          {/* Фільтрація товарів */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товарів */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">

              {
                categories.map((category) => category.products.length > 0 && (
                  <ProductsGroupList key={category.id}
                    title={category.name}
                    items={category.products}                  
                    categoryId={category.id}
                  />
                ))
              }

            </div>
          </div>
        </div>
      </Container>

    </>
  );
}