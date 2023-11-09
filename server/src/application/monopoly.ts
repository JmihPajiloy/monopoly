import { FieldGroups, StreetConstructorObject } from "./fields/porperty-fields/Street";
import { ShoppingMallConstructorObject } from "./fields/porperty-fields/ShoppingMall";
import { UtilityConstructorObject } from "./fields/porperty-fields/Utility";
import { ChanceConstructorObject } from "./fields/Chance";
import { EmptyFieldConstructorObject } from "./fields/EmptyField";
import { TaxConstructorObject } from "./fields/Tax";
import { ToJailConstructorObject } from "./fields/ToJail";

type ConstructorObject = (ShoppingMallConstructorObject |
  StreetConstructorObject | UtilityConstructorObject |
  ChanceConstructorObject | EmptyFieldConstructorObject |
  TaxConstructorObject | ToJailConstructorObject)
export const fields: ConstructorObject[] = [
  {
    name: "Старт",
    pos: 0
  },
  {
    name: "ул. Старцева",
    pos: 1,
    buyCost: 60,
    sellCost: 30,
    buildingCost: 50,
    rentList: [2, 4, 10, 30, 90, 160, 260],
    color: FieldGroups.BROWN
  },
  {
    pos: 2
  },
  {
    name: "ул. Чкалова",
    pos: 3,
    buyCost: 60,
    sellCost: 30,
    buildingCost: 50,
    rentList: [4, 8, 20, 60, 180, 320, 450],
    color: FieldGroups.BROWN
  },
  {
    name: "Подоходный налог",
    pos: 4,
    amount: 300
  },
  {
    name: "ТРК Семья",
    pos: 5
  },
  {
    name: "Метро",
    pos: 6,
    buyCost: 100,
    sellCost: 50,
    buildingCost: 50,
    rentList: [6, 12, 30, 90, 270, 400, 550],
    color: FieldGroups.LIGHT_BLUE
  },
  {
    pos: 7
  },
  {
    name: "Аквапарк",
    pos: 8,
    buyCost: 100,
    sellCost: 50,
    buildingCost: 50,
    rentList: [6, 12, 30, 90, 270, 400, 550],
    color: FieldGroups.LIGHT_BLUE
  },
  {
    name: "Зоопарк",
    pos: 9,
    buyCost: 120,
    sellCost: 60,
    buildingCost: 50,
    rentList: [8, 16, 40, 100, 300, 450, 600],
    color: FieldGroups.LIGHT_BLUE
  },
  {
    name: "Тюрьма",
    pos: 10
  },
  {
    name: "ул. Маршала Рыбалко",
    pos: 11,
    buyCost: 140,
    sellCost: 70,
    buildingCost: 100,
    rentList: [10, 20, 50, 150, 450, 625, 750],
    color: FieldGroups.PINK
  },
  {
    name: "ГРЭС",
    pos: 12
  },
  {
    name: "ул. Адмирала Ушакова",
    pos: 13,
    buyCost: 140,
    sellCost: 70,
    buildingCost: 100,
    rentList: [10, 20, 50, 150, 450, 625, 750],
    color: FieldGroups.PINK
  },
  {
    name: "ул. Светлогорская",
    pos: 14,
    buyCost: 160,
    sellCost: 80,
    buildingCost: 100,
    rentList: [12, 24, 60, 180, 500, 700, 900],
    color: FieldGroups.PINK
  },
  {
    name: "ТЦ Спешилов",
    pos: 15
  },
  {
    name: "ул. Пушкарская",
    pos: 16,
    buyCost: 180,
    sellCost: 90,
    buildingCost: 100,
    rentList: [14, 28, 70, 200, 550, 750, 950],
    color: FieldGroups.ORANGE
  },
  {
    pos: 17
  },
  {
    name: "ул. Уинская",
    pos: 18,
    buyCost: 180,
    sellCost: 90,
    buildingCost: 100,
    rentList: [14, 28, 70, 200, 550, 750, 950],
    color: FieldGroups.ORANGE
  },
  {
    name: "ул. Юрша",
    pos: 19,
    buyCost: 200,
    sellCost: 100,
    buildingCost: 100,
    rentList: [16, 32, 80, 220, 600, 800, 1000],
    color: FieldGroups.ORANGE
  },
  {
    name: "Стоянка",
    pos: 20
  },
  {
    name: "ул. Пожарского",
    pos: 21,
    buyCost: 220,
    sellCost: 110,
    buildingCost: 150,
    rentList: [18, 36, 90, 250, 700, 875, 1050],
    color: FieldGroups.RED
  },
  {
    pos: 22
  },
  {
    name: "ул. Желябова",
    pos: 23,
    buyCost: 220,
    sellCost: 110,
    buildingCost: 150,
    rentList: [18, 36, 90, 250, 700, 875, 1050],
    color: FieldGroups.RED
  },
  {
    name: "Парковый проспект",
    pos: 24,
    buyCost: 240,
    sellCost: 120,
    buildingCost: 150,
    rentList: [20, 40, 100, 300, 750, 925, 1100],
    color: FieldGroups.RED
  },
  {
    name: "ТРК Планета",
    pos: 25
  },
  {
    name: "ул. Леонова",
    pos: 26,
    buyCost: 260,
    sellCost: 130,
    buildingCost: 150,
    rentList: [22, 44, 110, 330, 800, 975, 1150],
    color: FieldGroups.YELLOW
  },
  {
    name: "ул. Геологов",
    pos: 27,
    buyCost: 260,
    sellCost: 130,
    buildingCost: 150,
    rentList: [22, 44, 110, 330, 800, 975, 1150],
    color: FieldGroups.YELLOW
  },
  {
    name: "ГЭС",
    pos: 28
  },
  {
    name: "мкр. Нагорный",
    pos: 29,
    buyCost: 280,
    sellCost: 140,
    buildingCost: 150,
    rentList: [24, 48, 120, 360, 850, 1025, 1200],
    color: FieldGroups.YELLOW
  },
  {
    name: "В тюрьму",
    pos: 30
  },
  {
    name: "Шоссе космонавтов",
    pos: 31,
    buyCost: 300,
    sellCost: 150,
    buildingCost: 200,
    rentList: [26, 52, 130, 390, 900, 1100, 1275],
    color: FieldGroups.GREEN
  },
  {
    name: "ул. Революции",
    pos: 32,
    buyCost: 300,
    sellCost: 150,
    buildingCost: 200,
    rentList: [26, 52, 130, 390, 900, 1100, 1275],
    color: FieldGroups.GREEN
  },
  {
    pos: 33
  },
  {
    name: "ул. Попова",
    pos: 34,
    buyCost: 320,
    sellCost: 160,
    buildingCost: 200,
    rentList: [28, 56, 150, 450, 1000, 1200, 1400],
    color: FieldGroups.GREEN
  },
  {
    name: "IMall",
    pos: 35
  },
  {
    pos: 36
  },
  {
    name: "Комсомольский проспект",
    pos: 37,
    buyCost: 350,
    sellCost: 175,
    buildingCost: 200,
    rentList: [35, 70, 175, 500, 1100, 1300, 1500],
    color: FieldGroups.DARK_BLUE
  },
  {
    name: "Сверхналог",
    pos: 38,
    amount: 100
  },
  {
    name: "ул. Ленина", pos: 39,
    buyCost: 400,
    sellCost: 200,
    buildingCost: 200,
    rentList: [50, 100, 200, 600, 1400, 1700, 2000],
    color: FieldGroups.DARK_BLUE
  }
];