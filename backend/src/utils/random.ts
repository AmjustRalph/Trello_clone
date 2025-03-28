

import {colors,images} from "../utils/colorsAndImg";
   

const getRandomElement = (arr: string[]): any => arr[Math.floor(Math.random() * arr.length)];

const getRandomBackground = () => {
  return Math.random() < 0.5
    ? { background_color: getRandomElement(colors) }
    : { background_image: getRandomElement(images) };
};

export default getRandomBackground;

