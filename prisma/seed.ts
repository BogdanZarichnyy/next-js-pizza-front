import { Prisma } from '@prisma/client';
import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, ingredients, products } from "./constants";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
  imageUrl
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
  imageUrl?: string;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
    imageUrl
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'Admin',
        email: 'admin@admin.ua',
        password: hashSync('admin', 10),
        verified: new Date(),
        role: 'ADMIN'
      },
      {
        fullName: 'Test Pizza',
        email: 'test@test.ua',
        password: hashSync('123123', 10),
        verified: new Date(),
        role: 'USER'
      },
      {
        fullName: 'Vasya Pupkin',
        email: 'test1@test.ua',
        password: hashSync('123123', 10),
        verified: new Date(),
        role: 'USER'
      },
      {
        fullName: 'Petya Dyubel',
        email: 'test2@test.ua',
        password: hashSync('123123', 10),
        verified: new Date(),
        role: 'USER'
      },
      {
        fullName: 'Vitalik Ruletka',
        email: 'test3@test.ua',
        password: hashSync('123123', 10),
        verified: new Date(),
        role: 'USER'
      },
      {
        fullName: 'Ivan Vaservaga',
        email: 'test4@test.ua',
        password: hashSync('123123', 10),
        verified: new Date(),
        role: 'USER'
      }
    ]
  });

  await prisma.category.createMany({
    data: categories
  });

  await prisma.ingredient.createMany({
    data: ingredients
  });

  await prisma.product.createMany({
    data: products
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пеппероні фреш',
      info: 'Збільшена порція моцарелли, фірмовий томатний соус, пікантна пеппероні із свіжими томатами.',
      imageUrl: '/assets/pizza/Пеппероні фреш середня традиційна.webp',
      categoryId: 1,
      ingredients: {
        // connect: ingredients.slice(0, 5),
        connect: [{id:1}, {id:2}, {id:5}, {id:10}, {id:13}],
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сирна',
      info: 'Моцарелла, фірмовий соус альфредо із сирами чеддер і пармезан.',
      imageUrl: '/assets/pizza/Сирна середня традиційна.webp',
      categoryId: 1,
      ingredients: {
        // connect: ingredients.slice(5, 10),
        connect: [{id:1}, {id:2}, {id:3}],
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чорізо фреш',
      info: 'Моцарелла, фірмовий томатний соус, гостра чорізо із солодким перцем.',
      imageUrl: '/assets/pizza/Чорізо фреш середня традиційна.webp',
      categoryId: 1,
      ingredients: {
        // connect: ingredients.slice(10, 15),
        connect: [{id:1}, {id:2}, {id:5}, {id:11}, {id:17}],
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: 'Арріва',
      info: 'Свіжі томати, червона цибуля, соковиті ананаси, італійські трави, солодкий перець, кубики бринзи, мітболи.',
      imageUrl: '/assets/pizza/Арріва середня традиційна.webp',
      categoryId: 1,
      ingredients: {
        // connect: ingredients.slice(15, 20),
        connect: [{id:1}, {id:13}, {id:14}, {id:15}, {id:16}, {id:17}, {id:18}, {id:19}],
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: 'Харків 1654',
      info: 'Пікантна пеппероні, гостра чорізо, мариновані огірочки, свіжі томати, червона цибуля, соковиті ананаси, італійські трави.',
      imageUrl: '/assets/pizza/Харків 1654 середня традиційна.webp',
      categoryId: 1,
      ingredients: {
        // connect: ingredients.slice(20, 25),
        connect: [{id:1}, {id:5}, {id:10}, {id:11}, {id:12}, {id:13}, {id:14}, {id:15}, {id:16}],
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: 'М\'ясний мікс з яловичиною і ковбасками',
      info: 'Ніжне курча, шампіньйони, бекон, яловичина, пікантна пеппероні.',
      imageUrl: '/assets/pizza/М\'ясний мікс з яловичиною і ковбасками середня традиційна.webp',
      categoryId: 1,
      ingredients: {
        // connect: ingredients.slice(25, 30),
        connect: [{id:1}, {id:6}, {id:7}, {id:8}, {id:9}, {id:10}, {id:20}],
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: 'Мисливська',
      info: 'Соус барбекю, моцарелла, фірмовий томатний соус, свіжі томати, червона цибуля, баварські ковбаски.',
      imageUrl: '/assets/pizza/Мисливска середня традиційна.webp',
      categoryId: 1,
      ingredients: {
        // connect: ingredients.slice(1, 10),
        connect: [{id:1}, {id:2}, {id:9}, {id:13}, {id:14}, {id:22}],
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: 'Чотири сири',
      info: 'Сир блю чіз, фірмовий соус альфредо, вершкова моцарелла, сири чеддер і пармезан.',
      imageUrl: '/assets/pizza/Чотири сири середня традиційна.webp',
      categoryId: 1,
      ingredients: {
        // connect: ingredients.slice(10, 20),
        connect: [{id:1}, {id:2}, {id:3}, {id:4}],
      },
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: 'Креветки блю чіз',
      info: 'Сир блю чіз, моцарелла, фірмовий соус альфредо, креветки.',
      imageUrl: '/assets/pizza/Креветки блю чіз середня традиційна.webp',
      categoryId: 1,
      ingredients: {
        // connect: ingredients.slice(20, 30),
        connect: [{id:1}, {id:2}, {id:4}, {id:21}],
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Піцца "Пеппероні фреш"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20, imageUrl: '/assets/pizza/Пеппероні фреш маленька традиційна.webp' }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 30, imageUrl: '/assets/pizza/Пеппероні фреш середня традиційна.webp' }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30, imageUrl: '/assets/pizza/Пеппероні фреш середня тонка.webp' }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 40, imageUrl: '/assets/pizza/Пеппероні фреш велика традиційна.webp' }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40, imageUrl: '/assets/pizza/Пеппероні фреш велика тонка.webp' }),

      // Піцца "Сирна"
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20, imageUrl: '/assets/pizza/Сирна маленька традиційна.webp' }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30, imageUrl: '/assets/pizza/Сирна середня традиційна.webp' }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30, imageUrl: '/assets/pizza/Сирна середня тонка.webp' }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40, imageUrl: '/assets/pizza/Сирна велика традиційна.webp' }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40, imageUrl: '/assets/pizza/Сирна велика тонка.webp' }),

      // Піцца "Чорізо фреш"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20, imageUrl: '/assets/pizza/Чорізо фреш маленька традиційна.webp' }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 30, imageUrl: '/assets/pizza/Чорізо фреш середня традиційна.webp' }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30, imageUrl: '/assets/pizza/Чорізо фреш середня тонка.webp' }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 40, imageUrl: '/assets/pizza/Чорізо фреш велика традиційна.webp' }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40, imageUrl: '/assets/pizza/Чорізо фреш велика тонка.webp' }),

      // Піцца "Арріва"
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 20, imageUrl: '/assets/pizza/Арріва маленька традиційна.webp' }),
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 30, imageUrl: '/assets/pizza/Арріва середня традиційна.webp' }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 30, imageUrl: '/assets/pizza/Арріва середня тонка.webp' }),
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 40, imageUrl: '/assets/pizza/Арріва велика традиційна.webp' }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 40, imageUrl: '/assets/pizza/Арріва ведика тонка.webp' }),

      // Піцца "Харків 1654"
      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 20, imageUrl: '/assets/pizza/Харків 1654 маленька традиційна.webp' }),
      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 30, imageUrl: '/assets/pizza/Харків 1654 середня традиційна.webp' }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 30, imageUrl: '/assets/pizza/Харків 1654 середня тонка.webp' }),
      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 40, imageUrl: '/assets/pizza/Харків 1654 велика традиційна.webp' }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 40, imageUrl: '/assets/pizza/Харків 1654 велика тонка.webp' }),

      // Піцца "М'ясний мікс з яловичиною і ковбасками"
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 20, imageUrl: '/assets/pizza/М\'ясний мікс з яловичиною і ковбасками маленька традиційна.webp' }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 30, imageUrl: '/assets/pizza/М\'ясний мікс з яловичиною і ковбасками середня традиційна.webp' }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 30, imageUrl: '/assets/pizza/М\'ясний мікс з яловичиною і ковбасками середня тонка.webp' }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 40, imageUrl: '/assets/pizza/М\'ясний мікс з яловичиною і ковбасками велика традиційна.webp' }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 40, imageUrl: '/assets/pizza/М\'ясний мікс з яловичиною і ковбасками велика тонка.webp' }),      

      // Піцца "Мисливська"
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 20, imageUrl: '/assets/pizza/Мисливска маленька традиційна.webp' }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 30, imageUrl: '/assets/pizza/Мисливска середня традиційна.webp' }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 30, imageUrl: '/assets/pizza/Мисливска середня тонка.webp' }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 40, imageUrl: '/assets/pizza/Мисливска велика традиційна.webp' }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 40, imageUrl: '/assets/pizza/Мисливска велика тонка.webp' }),

      // Піцца "Чотири сири"
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 20, imageUrl: '/assets/pizza/Чотири сири маленька традиційна.webp' }),
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 30, imageUrl: '/assets/pizza/Чотири сири середня традиційна.webp' }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 30, imageUrl: '/assets/pizza/Чотири сири середня тонка.webp' }),
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 40, imageUrl: '/assets/pizza/Чотири сири велика традиційна.webp' }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 40, imageUrl: '/assets/pizza/Чотири сири велика тонка.webp' }),      

      // Піцца "Креветки блю чіз"
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 20, imageUrl: '/assets/pizza/Креветки блю чіз маленька традиційна.webp' }),
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 30, imageUrl: '/assets/pizza/Креветки блю чіз середня традиційна.webp' }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 30, imageUrl: '/assets/pizza/Креветки блю чіз середня тонка.webp' }),
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 40, imageUrl: '/assets/pizza/Креветки блю чіз велика традиційна.webp' }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 40, imageUrl: '/assets/pizza/Креветки блю чіз велика тонка.webp' }),      
      
      // Інші продукти
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
      generateProductItem({ productId: 18 }),
      generateProductItem({ productId: 19 }),
      generateProductItem({ productId: 20 }),
      generateProductItem({ productId: 21 }),
      generateProductItem({ productId: 22 }),
      generateProductItem({ productId: 23 }),
      generateProductItem({ productId: 24 }),
      generateProductItem({ productId: 25 }),
      generateProductItem({ productId: 26 }),
      generateProductItem({ productId: 27 }),
      generateProductItem({ productId: 28 }),
      generateProductItem({ productId: 29 }),
      generateProductItem({ productId: 30 }),
    ]
  });

  // await prisma.cart.createMany({
  //   data: [
  //     {
  //       userId: 1,
  //       totalAmount: 0,
  //       token: "11111"
  //     },
  //     {
  //       userId: 2,
  //       totalAmount: 0,
  //       token: "22222"
  //     },
  //   ]
  // });

  // await prisma.cartItem.create({
  //   data: {
  //     productItemId: 1,
  //     cartId: 1,
  //     quantity: 2,
  //     ingredients: { 
  //       connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] 
  //     }
  //   },
  // });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl: '/assets/stories/ebbdzavlhwk32bkcxvn7.webp',
        name: 'Додай інгредієнт'
      },
      {
        previewImageUrl: '/assets/stories/qkyaxwpqitjdrw57h4eu.webp',
        name: 'Солодкі новинки'
      },
      {
        previewImageUrl: '/assets/stories/cr57bqwdvtgxituwgql0.webp',
        name: 'Топ неділі'
      },
      {
        previewImageUrl: '/assets/stories/kjhuvkvrocpsccifz13z.webp',
        name: 'Ситний сніданок'
      },
      {
        previewImageUrl: '/assets/stories/xozsy9pdyl6xonotj32z.webp',
        name: 'Гарячі закуски'
      },
      {
        previewImageUrl: '/assets/stories/hzm1w8qxx0ugvrli5rxs.webp',
        name: 'Улюблена кава'
      },
      {
        previewImageUrl: '/assets/stories/hesjhbfbc5mbbuonfpou.webp',
        name: 'Цікаві факти'
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: '/assets/stories/ebbdzavlhwk32bkcxvn7.webp',
        title: 'Традиційна піцца із сирним бортиком',
        text: 'Додай сирний бортик до улюбленої піцци на традиційному тісті - м\'ягко, соковито, із сирною скоринкою до останього шматочка.'
      },
      {
        storyId: 2,
        sourceUrl: '/assets/stories/l4a3qdj34uyubvxaxarb.webp',
        title: 'Новинка для любителів чізкейків',
        text: 'Шоколадний чізкейк з ніжним фісташковим прошарком.'
      },
      {
        storyId: 3,
        sourceUrl: '/assets/stories/xfg0qm9gxnwhvxlel2do.webp',
        title: 'Тільки сир. Тільки хардкор.',
        text: '«Сирна» і «Чотири сири» - ніжний соус альфредо, тягуча моцарелла, пікантний блю чіз, а також насичені нотки чеддера і пармезана. Все, що потрібно справжньому сироману.'
      },
      {
        storyId: 4,
        sourceUrl: '/assets/stories/ciuuvftuhrmuturvz2mk.webp',
        title: 'Не забудь перекусити',
        text: 'Омлет із пеппероні, томатами і моцареллою - ситний перекус з хрусткою скоринкою і яскравим смаком. Ідеально, коли потрібен заряд енергії.'
      },
      {
        storyId: 4,
        sourceUrl: '/assets/stories/oq7wpp9oltjcoqvp5zzl.webp',
        title: 'Гарячий, одразу з печі',
        text: 'Піджарена чіабатта з шинкою, курчам, моцареллою, свіжими томатами, соусом ранч і часником.'
      },
      {
        storyId: 5,
        sourceUrl: '/assets/stories/qttwkz4u6zcazzh6fywe.webp',
        title: 'Класика перекусу - наггетси і фрі',
        text: 'Золотисті наггетси із хрумкою скоринкою і ароматною картоплею фрі - ідеальний тандем для швидкого і смачного перекусу. Спробуй із соусом на вибір.'
      },
      {
        storyId: 6,
        sourceUrl: '/assets/stories/qfxjb5ejs8b7lb2u0zzu.webp',
        title: 'Любителям хорошої кави',
        text: 'Насолоджуйся горіховим капучіно, карамельним латте, класичним амерікано та іншими смаками - кава для кожного дня.'
      },
      {
        storyId: 7,
        sourceUrl: '/assets/stories/hesjhbfbc5mbbuonfpou.webp',
        title: 'Цікавий факт про піццу',
        text: 'Вважається, що перша сучасна піцца була приготована в Неаполі в 1889 році. Її приготували в честь королеви Маргарити - з томатами, моцареллою і базилікою, які символізують кольори італійського прапору.'
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });