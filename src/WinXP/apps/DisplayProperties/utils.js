import ascent from '../../../assets/properties/displayProperties/wallpapers/ascent.jpg';
import autumn from '../../../assets/properties/displayProperties/wallpapers/autumn.jpg';
import azul from '../../../assets/properties/displayProperties/wallpapers/azul.jpg';
import bliss from '../../../assets/properties/displayProperties/wallpapers/bliss.bmp';
import crystal from '../../../assets/properties/displayProperties/wallpapers/crystal.jpg';
import follow from '../../../assets/properties/displayProperties/wallpapers/follow.jpg';
import friend from '../../../assets/properties/displayProperties/wallpapers/friend.jpg';
import home from '../../../assets/properties/displayProperties/wallpapers/home.jpg';
import moonFlower from '../../../assets/properties/displayProperties/wallpapers/moon-flower.jpg';
import peace from '../../../assets/properties/displayProperties/wallpapers/peace.jpg';
import power from '../../../assets/properties/displayProperties/wallpapers/power.jpg';
import purpleFlower from '../../../assets/properties/displayProperties/wallpapers/purple-flower.jpg';
import radiance from '../../../assets/properties/displayProperties/wallpapers/radiance.jpg';
import redMoonDesert from '../../../assets/properties/displayProperties/wallpapers/red-moon-desert.jpg';
import ripple from '../../../assets/properties/displayProperties/wallpapers/ripple.jpg';
import stonehenge from '../../../assets/properties/displayProperties/wallpapers/stonehenge.jpg';
import tulips from '../../../assets/properties/displayProperties/wallpapers/tulips.jpg';
import vortecSpace from '../../../assets/properties/displayProperties/wallpapers/vortec-space.jpg';
import wind from '../../../assets/properties/displayProperties/wallpapers/wind.jpg';
import windowsXp from '../../../assets/properties/displayProperties/wallpapers/windows-xp.jpg';
import blueLace from '../../../assets/properties/displayProperties/wallpapers/tiles/blue-lace-16.bmp';
import coffeeBean from '../../../assets/properties/displayProperties/wallpapers/tiles/coffee-bean.bmp';
import featherTexture from '../../../assets/properties/displayProperties/wallpapers/tiles/feather-texture.bmp';
import goneFishing from '../../../assets/properties/displayProperties/wallpapers/tiles/gone-fishing.bmp';
import greenStone from '../../../assets/properties/displayProperties/wallpapers/tiles/greenstone.bmp';
import prairieWind from '../../../assets/properties/displayProperties/wallpapers/tiles/prairie-wind.bmp';
import rhododendron from '../../../assets/properties/displayProperties/wallpapers/tiles/rhododendron.bmp';
import riverSumida from '../../../assets/properties/displayProperties/wallpapers/tiles/river-sumida.bmp';
import santaFeStucco from '../../../assets/properties/displayProperties/wallpapers/tiles/santa-fe-stucco.bmp';
import soapBubbles from '../../../assets/properties/displayProperties/wallpapers/tiles/soap-bubbles.bmp';
import zapotec from '../../../assets/properties/displayProperties/wallpapers/tiles/zapotec.bmp';

const backgroundsObj = [
  { title: '(None)' },
  { title: 'Ascent', background: ascent },
  { title: 'Autumn', background: autumn },
  { title: 'Azul', background: azul },
  { title: 'Bliss', background: bliss },
  { title: 'Blue Lace 16', background: blueLace },
  { title: 'Coffee Bean', background: coffeeBean },
  { title: 'Follow', background: follow },
  { title: 'Crystal', background: crystal },
  { title: 'Friend', background: friend },
  { title: 'Home', background: home },
  { title: 'Moon Flower', background: moonFlower },
  { title: 'Peace', background: peace },
  { title: 'Power', background: power },
  { title: 'purple Flower', background: purpleFlower },
  { title: 'Radiance', background: radiance },
  { title: 'RedMoon Desert', background: redMoonDesert },
  { title: 'Ripple', background: ripple },
  { title: 'Stonehenge', background: stonehenge },
  { title: 'Tulips', background: tulips },
  { title: 'Vortec Space', background: vortecSpace },
  { title: 'Wind', background: wind },
  { title: 'Windows XP', background: windowsXp },
  { title: 'Feather Texture', background: featherTexture },
  { title: 'Gone Fishing', background: goneFishing },
  { title: 'GreenStone', background: greenStone },
  { title: 'Prairie Wind', background: prairieWind },
  { title: 'Rhododendron', background: rhododendron },
  { title: 'River Sumida', background: riverSumida },
  { title: 'Santa Fe Stucco', background: santaFeStucco },
  { title: 'Soap Bubbles', background: soapBubbles },
  { title: 'Zapotec', background: zapotec },
];

const initializeBackgrounds = backgroundsObj => {
  return backgroundsObj.map((item, index) => ({ ...item, id: index + 1 }));
};

export const backgrounds = initializeBackgrounds(backgroundsObj);
