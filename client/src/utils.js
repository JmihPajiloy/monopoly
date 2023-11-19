export const getRowByID = id => {
  if (id > 0 && id < 10) return "bottom";
  if (id > 10 && id < 20) return "left";
  if (id > 20 && id < 30) return "top";
  if (id > 30 && id < 40) return "right";
};

export const getColor = colorName => {
  switch (colorName) {
    case "red":
      return { light: "#FFBDBF", normal: "#FF595E" };
    case "green":
      return { light: "#B8E471", normal: "#8AC926" };
    case "blue":
      return { light: "#58B1EA", normal: "#1982C4" };
    case "yellow":
      return { light: "#FFE59E", normal: "#FFCA3A" };
  }
};

export const isVertical = id => {
  return ((getRowByID(id) === "left") || (getRowByID(id) === "right"));
};