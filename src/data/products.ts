export type Product = {
  id: string
  image: string
  category: string
  brand: string
  price: number
  gallery: string[]
  description: string
  our?: boolean
  new?: boolean
  sale?: number
}

export const products: Product[] = [
  {
    id: 'p1',
    image: '/products/ANY_BUDDYMOOD_FUEL_BOTTLE.webp',
    gallery: ['/products/ANY_BUDDYMOOD_FUEL_BOTTLE(1).webp', '/products/ANY_BUDDYMOOD_FUEL_BOTTLE(2).webp', '/products/ANY_BUDDYMOOD_FUEL_BOTTLE.webp'],
    category: 'бутылка',
    brand: 'ANY BUDDYMOOD',
    price: 2490,
    description: 'Mood Fuel Bottle создана для тех, кто выбирает заботу о себе. От дома до офиса, от пробежки до вечерней встречи — она всегда рядом.',
    our: true,
    new: true
  },
  {
    id: 'p2',
    image: '/products/VT_REEDLE_SHOT(1).webp',
    gallery: ['/products/VT_REEDLE_SHOT(1).webp', '/products/VT_REEDLE_SHOT.webp', '/products/VT_REEDLE_SHOT(2).webp'],
    category: 'сыворотка',
    brand: 'VT',
    price: 3190,
    description: 'Сыворотка для лица с микроиглами 300 REEDLE SHOT делает кожу более упругой, гладкой и плотной, помогает визуально сузить поры и улучшить текстуру кожи.'
  },
  {
    id: 'p3',
    image: '/products/VIVIENNE_SABO_SKINCARE(1).webp',
    gallery: ['/products/VIVIENNE_SABO_SKINCARE (2).webp', '/products/VIVIENNE_SABO_SKINCARE(1).webp', '/products/VIVIENNE_SABO_SKINCARE (3).webp'],
    category: 'крем',
    brand: 'VIVIENNE SABO',
    price: 4509,
    description: 'Интенсивное увлажнение для сухой кожи. Гиалуроновая кислота и витамин B5.',
    our: true,
    sale: 30
  },
  {
    id: 'p4',
    image: '/products/Dolce&Gabbana_VELVET_MUGHETTO(1).webp',
    gallery: ['/pics/p1.webp', '/pics/p1-2.webp', '/pics/p1-3.webp'],
    category: 'духи',
    brand: 'Dolce & Gabbana',
    price: 34509,
    description: 'Чарующий аромат VELVET MUGHETTO – это ода пробуждающейся весенней природе.'
  },
    {
    id: 'p5',
    image: '/products/cenyekks.webp',
    gallery: ['/products/cenyekks1.webp', '/products/cenyekks.webp', '/products/cenyekks3.webp'],
    category: 'мицелярная вода',
    brand: 'NUNKOROCleancare',
    price: 8564,
    description: 'Многофункциональная освежающая мицеллярная вода сочетает в себе деликатное очищение с увлажнением. Она эффективно удаляет макияж и загрязнения, предотвращая появление черных точек.',
    new: true
  },
    {
    id: 'p6',
    image: '/products/tinted-balm.webp',
    gallery: ['/products/tinted-balm.webp', '/products/tinted-balm1.webp', '/products/tinted-balm2.webp'],
    category: 'тинт для губ',
    brand: 'LOVE REPUBLIC',
    price: 999,
    description: 'Глубоко питает, защищает и восстанавливает нежную кожу губ, придает деликатное сияние.',
    our: true,
    sale: 20
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}