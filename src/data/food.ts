import type { MenuCategory } from "./menu";

export interface FoodCategory extends MenuCategory {
  photo?: string;
}

export const foodMenu: FoodCategory[] = [
  {
    id: "fastfood",
    label_hr: "Fast Food",
    label_en: "Fast Food",
    photo: "/assets/food/DSC09590.jpg",
    items: [
      {
        name_hr: "Cheeseburger",
        name_en: "Cheeseburger",
        price: "8€",
        image: "/assets/food/DSC09600.jpg",
      },
      {
        name_hr: "BBQ Burger",
        name_en: "BBQ Burger",
        price: "10€",
        image: "/assets/food/DSC09581.jpg",
      },
      {
        name_hr: "Pommes frites",
        name_en: "French fries",
        price: "4€",
        image: "/assets/food/DSC09578.jpg",
      },
      {
        name_hr: "Sendvič s piletinom",
        name_en: "Chicken sandwich",
        price: "7€",
        image: "/assets/food/DSC09592.jpg",
      },
    ],
  },
  {
    id: "gelato",
    label_hr: "Gelaterija",
    label_en: "Ice Cream & More",
    items: [
      {
        name_hr: "Sladoled 1 kugla",
        name_en: "Ice cream 1 scoop",
        price: "2€",
      },
      {
        name_hr: "Sladoled 2 kugle",
        name_en: "Ice cream 2 scoops",
        price: "3.5€",
      },
      { name_hr: "Smoothie bowl", name_en: "Smoothie bowl", price: "7€" },
      { name_hr: "Waffle s kuglom", name_en: "Waffle with scoop", price: "5€" },
    ],
  },
];
