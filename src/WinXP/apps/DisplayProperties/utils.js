import ascent from 'assets/properties/displayProperties/backgrounds/ascent.jpg';
import autumn from 'assets/properties/displayProperties/backgrounds/autumn.jpg';
import azul from 'assets/properties/displayProperties/backgrounds/azul.jpg';
import bliss from 'assets/properties/displayProperties/backgrounds/bliss.bmp';
import crystal from 'assets/properties/displayProperties/backgrounds/crystal.jpg';
import follow from 'assets/properties/displayProperties/backgrounds/follow.jpg';
import friend from 'assets/properties/displayProperties/backgrounds/friend.jpg';
import home from 'assets/properties/displayProperties/backgrounds/home.jpg';
import moonFlower from 'assets/properties/displayProperties/backgrounds/moon-flower.jpg';
import peace from 'assets/properties/displayProperties/backgrounds/peace.jpg';
import power from 'assets/properties/displayProperties/backgrounds/power.jpg';
import purpleFlower from 'assets/properties/displayProperties/backgrounds/purple-flower.jpg';
import radiance from 'assets/properties/displayProperties/backgrounds/radiance.jpg';
import redMoonDesert from 'assets/properties/displayProperties/backgrounds/red-moon-desert.jpg';
import ripple from 'assets/properties/displayProperties/backgrounds/ripple.jpg';
import stonehenge from 'assets/properties/displayProperties/backgrounds/stonehenge.jpg';
import tulips from 'assets/properties/displayProperties/backgrounds/tulips.jpg';
import vortecSpace from 'assets/properties/displayProperties/backgrounds/vortec-space.jpg';
import wind from 'assets/properties/displayProperties/backgrounds/wind.jpg';
import windowsXp from 'assets/properties/displayProperties/backgrounds/windows-xp.jpg';
import blueLace from 'assets/properties/displayProperties/backgrounds/tiles/blue-lace-16.bmp';
import coffeeBean from 'assets/properties/displayProperties/backgrounds/tiles/coffee-bean.bmp';
import featherTexture from 'assets/properties/displayProperties/backgrounds/tiles/feather-texture.bmp';
import goneFishing from 'assets/properties/displayProperties/backgrounds/tiles/gone-fishing.bmp';
import greenStone from 'assets/properties/displayProperties/backgrounds/tiles/greenstone.bmp';
import prairieWind from 'assets/properties/displayProperties/backgrounds/tiles/prairie-wind.bmp';
import rhododendron from 'assets/properties/displayProperties/backgrounds/tiles/rhododendron.bmp';
import riverSumida from 'assets/properties/displayProperties/backgrounds/tiles/river-sumida.bmp';
import santaFeStucco from 'assets/properties/displayProperties/backgrounds/tiles/santa-fe-stucco.bmp';
import soapBubbles from 'assets/properties/displayProperties/backgrounds/tiles/soap-bubbles.bmp';
import zapotec from 'assets/properties/displayProperties/backgrounds/tiles/zapotec.bmp';

const backgroundsObj = [
  { title: '(None)', defaultPosition: 'stretch' },
  { title: 'Ascent', background: ascent, defaultPosition: 'center' },
  { title: 'Autumn', background: autumn, defaultPosition: 'center' },
  { title: 'Azul', background: azul, defaultPosition: 'center' },
  { title: 'Bliss', background: bliss, defaultPosition: 'center' },
  { title: 'Blue Lace 16', background: blueLace, defaultPosition: 'tile' },
  { title: 'Coffee Bean', background: coffeeBean, defaultPosition: 'tile' },
  { title: 'Follow', background: follow, defaultPosition: 'center' },
  { title: 'Crystal', background: crystal, defaultPosition: 'center' },
  { title: 'Friend', background: friend, defaultPosition: 'center' },
  { title: 'Home', background: home, defaultPosition: 'center' },
  { title: 'Moon Flower', background: moonFlower, defaultPosition: 'center' },
  { title: 'Peace', background: peace, defaultPosition: 'center' },
  { title: 'Power', background: power, defaultPosition: 'center' },
  {
    title: 'purple Flower',
    background: purpleFlower,
    defaultPosition: 'center',
  },
  { title: 'Radiance', background: radiance, defaultPosition: 'center' },
  {
    title: 'RedMoon Desert',
    background: redMoonDesert,
    defaultPosition: 'center',
  },
  { title: 'Ripple', background: ripple, defaultPosition: 'center' },
  { title: 'Stonehenge', background: stonehenge, defaultPosition: 'center' },
  { title: 'Tulips', background: tulips, defaultPosition: 'center' },
  {
    title: 'Vortec Space',
    background: vortecSpace,
    defaultPosition: 'center',
  },
  { title: 'Wind', background: wind, defaultPosition: 'center' },
  { title: 'Windows XP', background: windowsXp, defaultPosition: 'center' },
  {
    title: 'Feather Texture',
    background: featherTexture,
    defaultPosition: 'tile',
  },
  {
    title: 'Gone Fishing',
    background: goneFishing,
    defaultPosition: 'tile',
  },
  { title: 'GreenStone', background: greenStone, defaultPosition: 'tile' },
  {
    title: 'Prairie Wind',
    background: prairieWind,
    defaultPosition: 'tile',
  },
  {
    title: 'Rhododendron',
    background: rhododendron,
    defaultPosition: 'tile',
  },
  {
    title: 'River Sumida',
    background: riverSumida,
    defaultPosition: 'tile',
  },
  {
    title: 'Santa Fe Stucco',
    background: santaFeStucco,
    defaultPosition: 'tile',
  },
  {
    title: 'Soap Bubbles',
    background: soapBubbles,
    defaultPosition: 'tile',
  },
  { title: 'Zapotec', background: zapotec, defaultPosition: 'tile' },
];

const initializeBackgrounds = backgroundsObj => {
  return backgroundsObj.map((item, index) => ({ ...item, id: index }));
};

export const backgrounds = initializeBackgrounds(backgroundsObj);

export const defaultDesktop = {
  id: 4,
  position: 'stretch',
  image: bliss,
  color: '#2f71cd',
};

export const defaultScreenSaver = {
  value: 'WindowsXP',
  wait: '5',
};

export const DISPLAY_PROPERTIES = 'DISPLAY_PROPERTIES';
export const DESKTOP = 'DESKTOP';
export const CHANGE = 'CHANGE';
export const FIRST_CHANGE = 'FIRST_CHANGE';
export const RESET_FIRST_CHANGE = 'RESET_FIRST_CHANGE';
export const SCREEN_SAVER = 'SCREEN_SAVER';
