import { Container, Filters, ProductsGroupList, Title, TopBar } from "../components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Всі піцци" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фільтрація товарів */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товарів */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">

              <ProductsGroupList title="Піцци" items={[
                {
                  id: 1,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 2,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 3,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 4,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 5,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 6,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 7,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 8,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
              ]} 
              categoryId={1} 
            />

              <ProductsGroupList title="Комбо" items={[
                {
                  id: 1,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 2,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 3,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 4,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 5,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 6,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 7,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 8,
                  name: "",
                  imageUrl: "/assets/peperci.jpg",
                  price: 550,
                  items: [{ price: 550 }]
                },
              ]} 
              categoryId={2} 
            />

            </div>
          </div>
        </div>
      </Container>

    </>
  );
}