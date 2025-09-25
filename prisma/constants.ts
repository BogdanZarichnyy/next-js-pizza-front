export const categories = [
  {
    name: "Піцци"
  },
  {
    name: "Комбо"
  },
  {
    name: "Закуски"
  },
  {
    name: "Коктейлі"
  },
  {
    name: "Кава"
  },
  {
    name: "Напої"
  },
  {
    name: "Десерти"
  }
];

export const ingredients = [
  {
    name: 'Сирный бортик',
    price: 80,
    imageUrl: '/assets/ingredients/Сирний бортик.webp',
  },
  {
    name: 'Вершкова моцарелла',
    price: 50,
    imageUrl: '/assets/ingredients/Вершкова моцарелла.webp',
  },
  {
    name: 'Сир чеддер і пармезан',
    price: 60,
    imageUrl: '/assets/ingredients/Сир чеддер і пармезан.webp',
  },
  {
    name: 'Сир блю чіз',
    price: 145,
    imageUrl: '/assets/ingredients/Сир блю чіз.webp',
  },
  {
    name: 'Гострий перець халапеньйо',
    price: 30,
    imageUrl: '/assets/ingredients/Гострий перець халапеньо.webp',
  },
  {
    name: 'Ніжне курча',
    price: 55,
    imageUrl: '/assets/ingredients/Ніжне курча.webp',
  },
  {
    name: 'Шампіньони',
    price: 40,
    imageUrl: '/assets/ingredients/Шампіньйони.webp',
  },
  {
    name: 'Бекон',
    price: 55,
    imageUrl: '/assets/ingredients/Бекон.webp',
  },
  {
    name: 'Шинка',
    price: 55,
    imageUrl: '/assets/ingredients/Шинка.webp',
  },
  {
    name: 'Пікантна пеппероні',
    price: 55,
    imageUrl: '/assets/ingredients/Пікантна пеппероні.webp',
  },
  {
    name: 'Гостра чорізо',
    price: 55,
    imageUrl: '/assets/ingredients/Гостра чорізо.webp',
  },
  {
    name: 'Мариновані огірочки',
    price: 25,
    imageUrl: '/assets/ingredients/Мариновані огірочки.webp',
  },
  {
    name: 'Свіжі томати',
    price: 30,
    imageUrl: '/assets/ingredients/Свіжі томати.webp',
  },
  {
    name: 'Червона цибуля',
    price: 25,
    imageUrl: '/assets/ingredients/Червона цибуля.webp',
  },
  {
    name: 'Соковиті ананаси',
    price: 30,
    imageUrl: '/assets/ingredients/Соковиті ананаси.webp',
  },
  {
    name: 'Італійські трави',
    price: 15,
    imageUrl: '/assets/ingredients/Італійські трави.webp',
  },
  {
    name: 'Сололодкий перець',
    price: 30,
    imageUrl: '/assets/ingredients/Солодкий перець.webp',
  },
  {
    name: 'Кубики бринзи',
    price: 55,
    imageUrl: '/assets/ingredients/Кубики бринзи.webp',
  },
  {
    name: 'Мітболи',
    price: 70,
    imageUrl: '/assets/ingredients/Мітболи.webp',
  },
  {
    name: 'Пряна яловичина',
    price: 60,
    imageUrl: '/assets/ingredients/Пряна яловичина.webp',
  },
  {
    name: 'Креветки',
    price: 100,
    imageUrl: '/assets/ingredients/Креветки.webp',
  },
  {
    name: 'Баварскі ковбаски',
    price: 45,
    imageUrl: '/assets/ingredients/Баварскі ковбаски.webp',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  // Закуски
  {
    name: 'Омлет з шинкою та грибами',
    info: 'Гарячий ситний омлет з хрумкою скоринкою, шинка, шапмпіньйони і моцарелла.',
    imageUrl: '/assets/appetizer/Омлет із шинкою та грибами.webp',
    categoryId: 3,
  },
  {
    name: 'Омлет з пеппероні',
    info: 'Ситний і збалансований сніданок - омлет з хрумкою скоринкоюб пікантна пеппероні, томати і моцарелла.',
    imageUrl: '/assets/appetizer/Омлет із пеппероні.webp',
    categoryId: 3,
  },
  {
    name: 'Денвіч шинка і сир',
    info: 'Піджарена чіабатта із шинкою, курчам, моцареллою, свіжими томатами, соусом ранч і часником.',
    imageUrl: '/assets/appetizer/Денвіч шинка і сир.webp',
    categoryId: 3,
  },
  {
    name: 'Курячі наггетси',
    info: 'Ніжне куряче м\'ясо в хрумкій скоринці, ідеальне для перекусу.',
    imageUrl: '/assets/appetizer/Курячі наггетси.webp',
    categoryId: 3,
  },
  {
    name: 'Картопля із печі із соусом',
    info: 'Запечена картопля з фірмовим ароматним та соковитим соусом.',
    imageUrl: '/assets/appetizer/Картопля із печі із соусом.webp',
    categoryId: 3,
  },
  {
    name: 'Некстер Чілл Грілл',
    info: 'Гаряча закуска з курячим філе, соусом гриль, цибулею, маринованимиогірочками і моцареллою в тонкому пшеничному коржику.',
    imageUrl: '/assets/appetizer/Некстер Чілл Грілл.webp',
    categoryId: 3,
  },
  {
    name: 'Гострий Некстер',
    info: 'Пікантна гаряча закуска з курячим м\'ясом, гострим соусом, цибулею та моцареллою в тонкому пшеничному коржику.',
    imageUrl: '/assets/appetizer/Гострий Некстер.webp',
    categoryId: 3,
  },
  {
    name: 'Ланчбокс Мисливський',
    info: 'Гарячий ситний обід з картоплею із печі, класичними ковбасками, маринованими огірочками із соусом барбекю.',
    imageUrl: '/assets/appetizer/Ланчбокс Мисливський.webp',
    categoryId: 3,
  },
  {
    name: 'Паста з креветками',
    info: 'Паста із печі з креветками, томатами, моцареллою, соусом альфредо і часником.',
    imageUrl: '/assets/appetizer/Паста з креветками.webp',
    categoryId: 3,
  },
  {
    name: 'Додстер',
    info: 'Роли з тонкого пшеничного коржика з м\'ясною начинкою, свіжими овочами, соусом та сиром моцарелла.',
    imageUrl: '/assets/appetizer/Додстер.webp',
    categoryId: 3,
  },
  {
    name: 'Гострий Додстер',
    info: 'Гарячі роли у пшеничному коржику із шматочками курки, томатами, сиром моцарела та гострим соусом запечені в печі.',
    imageUrl: '/assets/appetizer/Гострий додстер.webp',
    categoryId: 3,
  },
  // Кокьейлі
  {
    name: 'Банановий молочний коктейль',
    info: 'Ніжний молочний коктейль з натуральним смаком банана.',
    imageUrl: '/assets/cocktails/Банановий молочний коктейль.webp',
    categoryId: 4,
  },
  {
    name: 'Карамельне яблуко молочний коктейль',
    info: 'Солодкий коктейль з карамелью та соковитим смаком яблука.',
    imageUrl: '/assets/cocktails/Карамельне яблуко молочний коктейль.webp',
    categoryId: 4,
  },
  {
    name: 'Молочний коктейль із печеням Орео',
    info: 'Кремовий коктейль із шматочками печеня Орео для любителів солодкого.',
    imageUrl: '/assets/cocktails/Молочний коктейль з печеням Орео.webp',
    categoryId: 4,
  },
  {
    name: 'Класичний молочний коктейль',
    info: 'Традиційний молочний коктейль з ніжним вершковим смаком.',
    imageUrl: '/assets/cocktails/Класичний молочний коктейль.webp',
    categoryId: 4,
  },
  {
    name: 'Персиковий молочний коктейль',
    info: 'Соковитий, спілий персик і приємна свіжість морозива.',
    imageUrl: '/assets/cocktails/Персиковий молочний коктейль.webp',
    categoryId: 4,
  },
  {
    name: 'Молочний коктейль Фісташка',
    info: 'Поєднання ніжності, вершкової текстури і тонкого смаку фісташки.',
    imageUrl: '/assets/cocktails/Молочний коктейль Фісташка.webp',
    categoryId: 4,
  },
  // Кава
  {
    name: 'Ірландский Капучіно',
    info: 'Дуже яскравий смак, що запам\'ятовується, з ароматом вершкового лікеру.',
    imageUrl: '/assets/coffee/Ірландський капучіно.webp',
    categoryId: 5,
  },
  {
    name: 'Кава Латте',
    info: 'Класична м\'ягка кава латте з насиченим вершковим смаком.',
    imageUrl: '/assets/coffee/Кава Латте.webp',
    categoryId: 5,
  },
  {
    name: 'Горіховий капучіно',
    info: 'Капучіно з м\'ягким горіховим ароматом і ніжною пінкою.',
    imageUrl: '/assets/coffee/Горіховий капучіно.webp',
    categoryId: 5,
  },
  {
    name: 'Кава Карамельний капучіно',
    info: 'Ароматний капучіно з карамельним сиропом і кремовою пінкою.',
    imageUrl: '/assets/coffee/Кава Карамельний капучіно.webp',
    categoryId: 5,
  },
  {
    name: 'Кава Кокосовий латте',
    info: 'Ніжний латте з кокосовим смаком і оксамитовою структурою.',
    imageUrl: '/assets/coffee/Кава Кокосовий латте.webp',
    categoryId: 5,
  },
  {
    name: 'Кава Амерікано',
    info: 'Класичний амерікано з насиченим смаком і легкою гірчинкою.',
    imageUrl: '/assets/coffee/Кава Амерікано.webp',
    categoryId: 5,
  },
  {
    name: 'Капучіно Яблучний пиріг',
    info: 'Класичний капучіно з молочною пінкою і яскравим сиропом - нагадує своїм смаком домашню шарлотку.',
    imageUrl: '/assets/coffee/Капучіно Яблучний пиріг.webp',
    categoryId: 5,
  },
  // Десерти
  {
    name: 'Чізкейк Призма',
    info: 'Шар за шаром - ідеальна структура: м\'ягка текстура, насичений фісташковий смак і глянець глазурі. Простий, як запит до бази даних, і потужний як хороша ORM. Цей чізкейк - як Prisma: один раз спробуєш - і більше не захочеш без нього.',
    imageUrl: '/assets/desserts/Чізкейк Призма.webp',
    categoryId: 7,
  },
  {
    name: 'Тістечко СвітХук',
    info: 'Як самий надійний хук - зберігає баланс смаку і настрою. Три кульки сметанного меченя з вареним згущеним молоком і медом - легко «монтуються» в будь-яку чайну перерву. Ідеальний снек для твого «реактивного» дня.',
    imageUrl: '/assets/desserts/Тістечко СвітХук.webp',
    categoryId: 7,
  },
  {
    name: 'Карамельний Чізкейк',
    info: 'Вершковий десерт з дуже маленькою начинкою, шоколадним печеням і горіхами.',
    imageUrl: '/assets/desserts/Карамельний Чізкейк.webp',
    categoryId: 7,
  },
  {
    name: 'Чорничний маффін',
    info: '«Повітряний» кекс с ароматною начинкою з натуральною черникою.',
    imageUrl: '/assets/desserts/Чорничний маффін.webp',
    categoryId: 7,
  },
  {
    name: 'Тирамісу',
    info: 'Багатошаровий десерт в найкращих італійських традиціях: легкий аромат какао, просочений кавою, бісквітний прошарок і ніжний крем.',
    imageUrl: '/assets/desserts/Тирамісу.webp',
    categoryId: 7,
  },
  {
    name: 'Макарон манго-маракуйя',
    info: 'Відомий французький десерт із смаком тропічних фруктів. Bon appétit!',
    imageUrl: '/assets/desserts/Макарон манго-маракуйя.webp',
    categoryId: 7,
  },
];