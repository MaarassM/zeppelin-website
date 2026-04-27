export interface MenuItem {
  name_hr: string
  name_en: string
  price: string
  image?: string
}

export interface MenuCategory {
  id: string
  label_hr: string
  label_en: string
  items: MenuItem[]
}

export const barMenu: MenuCategory[] = [
  {
    id: 'cocktails',
    label_hr: 'Kokteli',
    label_en: 'Cocktails',
    items: [
      { name_hr: 'Mojito',            name_en: 'Mojito',            price: '9€' },
      { name_hr: 'Aperol Spritz',     name_en: 'Aperol Spritz',     price: '8€' },
      { name_hr: 'Piña Colada',       name_en: 'Piña Colada',       price: '10€' },
      { name_hr: 'Sex on the Beach',  name_en: 'Sex on the Beach',  price: '9€' },
    ],
  },
  {
    id: 'beer',
    label_hr: 'Pivo',
    label_en: 'Beer',
    items: [
      { name_hr: 'Točeno pivo 0.5L', name_en: 'Draft beer 0.5L', price: '4€' },
      { name_hr: 'Corona Extra',     name_en: 'Corona Extra',     price: '5€' },
    ],
  },
  {
    id: 'soft',
    label_hr: 'Bezalkoholna pića',
    label_en: 'Soft Drinks',
    items: [
      { name_hr: 'Coca-Cola 0.33L', name_en: 'Coca-Cola 0.33L', price: '3€' },
      { name_hr: 'Voda 0.5L',       name_en: 'Water 0.5L',       price: '2€' },
      { name_hr: 'Svježi sokovi',   name_en: 'Fresh juices',      price: '5€' },
    ],
  },
  {
    id: 'coffee',
    label_hr: 'Kava',
    label_en: 'Coffee',
    items: [
      { name_hr: 'Espresso',    name_en: 'Espresso',    price: '2€' },
      { name_hr: 'Cappuccino',  name_en: 'Cappuccino',  price: '3€' },
      { name_hr: 'Ledena kava', name_en: 'Iced coffee', price: '4€' },
    ],
  },
]
