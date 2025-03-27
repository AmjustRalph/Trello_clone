

import {colors,images} from "../utils/colorsAndImg";
   
function getRandomBackground() {
  return Math.random() <= 0.5
    ? { background_color: colors[Math.floor(Math.random() * colors.length)] }
    : { background_image: images[Math.floor(Math.random() * images.length)] };
}


export default getRandomBackground;