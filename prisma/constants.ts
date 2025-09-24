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
    price: 179,
    imageUrl: '/assets/Сирный бортик.jpg',
  },
  {
    name: 'Вершкова моцарелла',
    price: 79,
    imageUrl: '/assets/Вершкова моцарелла.jpg',
  },
  {
    name: 'Сир чеддер',
    price: 79,
    imageUrl: '/assets/Сир чеддер.jpeg',
  },
  {
    name: 'Сир пармезан',
    price: 79,
    imageUrl: '/assets/Сир пармезан.jpg',
  },
  {
    name: 'Гострий перець халапеньйо',
    price: 59,
    imageUrl: '/assets/Гострий перець халапеньйо.jpg',
  },
  {
    name: 'Ніжне курча',
    price: 79,
    imageUrl: '/assets/Ніжне курча.jpg',
  },
  {
    name: 'Шампіньони',
    price: 59,
    imageUrl: '/assets/Шампіньони.jpg',
  },
  {
    name: 'Шинка',
    price: 79,
    imageUrl: '/assets/Шинка.jpg',
  },
  {
    name: 'Пікантна пеппероні',
    price: 79,
    imageUrl: '/assets/Пікантна пеппероні.jpg',
  },
  {
    name: 'Гостра чорізо',
    price: 79,
    imageUrl: '/assets/Гостра чорізо.jpg',
  },
  {
    name: 'Мариновані огірочки',
    price: 59,
    imageUrl: '/assets/Мариновані огірочки.jpg',
  },
  {
    name: 'Свіжі томати',
    price: 59,
    imageUrl: '/assets/Свіжі томати.jpg',
  },
  {
    name: 'Червона цибуля',
    price: 59,
    imageUrl: '/assets/Червона цибуля.jpg',
  },
  {
    name: 'Соковиті ананаси',
    price: 59,
    imageUrl: '/assets/Соковиті ананаси.jpeg',
  },
  {
    name: 'Італійські трави',
    price: 39,
    imageUrl: '/assets/Італійські трави.jpg',
  },
  {
    name: 'Сололодкий перець',
    price: 59,
    imageUrl: '/assets/Солодкий перець.jpg',
  },
  {
    name: 'Кубики бринзи',
    price: 79,
    imageUrl: '/assets/Кубики бринзи.jpg',
  },
  {
    name: 'Мітболи',
    price: 79,
    imageUrl: '/assets/Мітболи.jpg',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: 'Омлет з шинкою та грибами',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 2,
  },
  {
    name: 'Омлет з пеппероні',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 2,
  },
  {
    name: 'Кава Латте',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 2,
  },
  {
    name: 'Денвіч шинка і сир',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 3,
  },
  {
    name: 'Курячі наггетси',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 3,
  },
  {
    name: 'Картопля із печі із соусом 🌱',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 3,
  },
  {
    name: 'Додстер',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 3,
  },
  {
    name: 'Гострий Додстер 🌶️🌶️',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 3,
  },
  {
    name: 'Банановий молочний коктейль',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 4,
  },
  {
    name: 'Карамельне яблуко молочний коктейль',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 4,
  },
  {
    name: 'Молочний коктейль із печеням Орео',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 4,
  },
  {
    name: 'Класичний молочний коктейль 👶',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 4,
  },
  {
    name: 'Ірландский Капучіно',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 5,
  },
  {
    name: 'Кава Карамельний капучіно',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 5,
  },
  {
    name: 'Кава Кокосовий латте',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 5,
  },
  {
    name: 'Кава Амерікано',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 5,
  },
  {
    name: 'Кава Латте',
    imageUrl: '/assets/peperci.jpg',
    categoryId: 5,
  },
];