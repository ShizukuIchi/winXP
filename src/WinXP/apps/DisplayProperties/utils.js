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

const backgroundsObj = [
  { title: '(None)' },
  { title: 'Ascent', background: ascent },
  { title: 'Autumn', background: autumn },
  { title: 'Azul', background: azul },
  { title: 'Bliss', background: bliss },
  { title: 'Blue Lace 16', background: blueLace },
  { title: 'Coffee Bean', background: coffeeBean },
  { title: 'Follow', background: follow },
  { title: 'crystal', background: crystal },
  { title: 'friend', background: friend },
  { title: 'home', background: home },
  { title: 'moonFlower', background: moonFlower },
  { title: 'peace', background: peace },
  { title: 'power', background: power },
  { title: 'purpleFlower', background: purpleFlower },
  { title: 'radiance', background: radiance },
  { title: 'redMoonDesert', background: redMoonDesert },
  { title: 'ripple', background: ripple },
  { title: 'stonehenge', background: stonehenge },
  { title: 'tulips', background: tulips },
  { title: 'vortecSpace', background: vortecSpace },
  { title: 'wind', background: wind },
  { title: 'WindowsXP', background: windowsXp },
];

const initializeBackgrounds = backgroundsObj => {
  return backgroundsObj.map((item, index) => ({ ...item, id: index + 1 }));
};

export const backgrounds = initializeBackgrounds(backgroundsObj);
