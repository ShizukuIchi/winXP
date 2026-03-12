import InternetExplorer from './InternetExplorer';
import Minesweeper from './Minesweeper';
import ErrorBox from './ErrorBox';
import MyComputer from './MyComputer';
import Notepad from './Notepad';
import Winamp from './Winamp';
import Paint from './Paint';
import AngelInvestments from './AngelInvestments';
import AboutMe from './AboutMe';
import Writing from './Writing';
import Telegram from './Telegram';
import Email from './Email';
import Airdrop from './Airdrop';
import SpiderSolitaire from './SpiderSolitaire';
import MessariResearch from './MessariResearch';
import Crypto4Gaza from './Crypto4Gaza';
import VibeCoded from './VibeCoded';

import iePaper from 'assets/windowsIcons/ie-paper.png';
import ie from 'assets/windowsIcons/ie.png';
import mine from 'assets/minesweeper/mine-icon.png';
import error from 'assets/windowsIcons/897(16x16).png';
import computer from 'assets/windowsIcons/676(16x16).png';
import computerLarge from 'assets/windowsIcons/676(32x32).png';
import notepad from 'assets/windowsIcons/327(16x16).png';
import notepadLarge from 'assets/windowsIcons/327(32x32).png';
import winamp from 'assets/windowsIcons/winamp.png';
import paintLarge from 'assets/windowsIcons/680(32x32).png';
import paint from 'assets/windowsIcons/680(16x16).png';
import spider from 'assets/windowsIcons/spider.png';

import { 
  investmentsFolderIcon,
  bioFolderIcon,
  writingFolderIcon,
  investmentsFolderIcon32,
  bioFolderIcon32,
  writingFolderIcon32,
  telegramFolderIcon32,
  emailFolderIcon32,
  airdropFolderIcon32,
  messariFolderIcon32,
  crypto4GazaFolderIcon32,
  investmentsFolderIcon16,
  bioFolderIcon16,
  writingFolderIcon16,
  telegramFolderIcon16,
  emailFolderIcon16,
  airdropFolderIcon16,
  messariFolderIcon16,
  crypto4GazaFolderIcon16,
  vibecodedFolderIcon32,
  vibecodedFolderIcon16
} from 'assets/personalIcons';

const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};
const genId = gen();
const genIndex = gen();

export const defaultAppState = [
  // Removed Winamp from default apps - it will only open when user clicks it
];

export const defaultIconState = [
  {
    id: 0,
    icon: investmentsFolderIcon32,
    title: 'Angel Investments',
    component: AngelInvestments,
    isFocus: false,
  },
  {
    id: 1,
    icon: bioFolderIcon32,
    title: 'About Me',
    component: AboutMe,
    isFocus: false,
  },
  {
    id: 2,
    icon: writingFolderIcon32,
    title: 'Writing',
    component: Writing,
    isFocus: false,
  },
  {
    id: 3,
    icon: telegramFolderIcon32,
    title: 'Text me on telegram',
    component: Telegram,
    isFocus: false,
  },
  {
    id: 4,
    icon: emailFolderIcon32,
    title: 'Email me',
    component: Email,
    isFocus: false,
  },
  {
    id: 5,
    icon: airdropFolderIcon32,
    title: 'Click here for an airdrop!',
    component: Airdrop,
    isFocus: false,
  },
  {
    id: 6,
    icon: messariFolderIcon32,
    title: 'Messari Research',
    component: MessariResearch,
    isFocus: false,
  },
  {
    id: 7,
    icon: crypto4GazaFolderIcon32,
    title: 'Crypto 4 Gaza',
    component: Crypto4Gaza,
    isFocus: false,
  },
  {
    id: 8,
    icon: vibecodedFolderIcon32,
    title: 'Vibecoded Projects',
    component: VibeCoded,
    isFocus: false,
  },
  {
    id: 9,
    icon: ie,
    title: 'Internet Explorer',
    component: InternetExplorer,
    isFocus: false,
  },
  {
    id: 10,
    icon: paintLarge,
    title: 'Paint',
    component: Paint,
    isFocus: false,
  },
  {
    id: 11,
    icon: mine,
    title: 'Minesweeper',
    component: Minesweeper,
    isFocus: false,
  },
  {
    id: 12,
    icon: spider,
    title: 'Spider Solitaire',
    component: SpiderSolitaire,
    isFocus: false,
  },
];

export const appSettings = {
  'Internet Explorer': {
    header: {
      icon: iePaper,
      title: 'Internet Explorer',
    },
    component: InternetExplorer,
    defaultSize: {
      width: 800,
      height: 600,
    },
    defaultOffset: {
      x: 190,
      y: 180,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  'Angel Investments': {
    header: {
      icon: investmentsFolderIcon16,
      title: 'Angel Investments',
    },
    component: AngelInvestments,
    defaultSize: {
      width: 660,
      height: 450,
    },
    defaultOffset: {
      x: 200,
      y: 60,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
  'About Me': {
    header: {
      icon: bioFolderIcon16,
      title: 'About Me - Notepad',
    },
    component: AboutMe,
    defaultSize: {
      width: 500,
      height: 400,
    },
    defaultOffset: {
      x: 200,
      y: 100,
    },
    resizable: true,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  'Writing': {
    header: {
      icon: writingFolderIcon16,
      title: 'Writing - Internet Explorer',
    },
    component: Writing,
    defaultSize: {
      width: 800,
      height: 600,
    },
    defaultOffset: {
      x: 100,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 900,
    multiInstance: false,
  },
  'Text me on telegram': {
    header: {
      icon: telegramFolderIcon16,
      title: 'Telegram',
    },
    component: Telegram,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  'Email me': {
    header: {
      icon: emailFolderIcon16,
      title: 'Email',
    },
    component: Email,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  'Click here for an airdrop!': {
    header: {
      icon: airdropFolderIcon16,
      title: 'Airdrop - Internet Explorer',
    },
    component: Airdrop,
    defaultSize: {
      width: 800,
      height: 600,
    },
    defaultOffset: {
      x: 100,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 900,
    multiInstance: false,
  },
  'Messari Research': {
    header: {
      icon: messariFolderIcon16,
      title: 'Messari Research - Internet Explorer',
    },
    component: MessariResearch,
    defaultSize: {
      width: 800,
      height: 600,
    },
    defaultOffset: {
      x: 120,
      y: 80,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 900,
    multiInstance: false,
  },
  'Crypto 4 Gaza': {
    header: {
      icon: crypto4GazaFolderIcon16,
      title: 'Crypto 4 Gaza',
    },
    component: Crypto4Gaza,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  'Vibecoded Projects': {
    header: {
      icon: vibecodedFolderIcon16,
      title: 'Vibecoded Projects',
    },
    component: VibeCoded,
    defaultSize: {
      width: 660,
      height: 450,
    },
    defaultOffset: {
      x: 220,
      y: 70,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
  'Paint': {
    header: {
      icon: paint,
      title: 'untitled - Paint',
    },
    component: Paint,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 200,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  Minesweeper: {
    header: {
      icon: mine,
      title: 'Minesweeper',
    },
    component: Minesweeper,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 190,
      y: 180,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  'Spider Solitaire': {
    header: {
      icon: spider,
      title: 'Spider Solitaire - Internet Explorer',
    },
    component: SpiderSolitaire,
    defaultSize: {
      width: 800,
      height: 600,
    },
    defaultOffset: {
      x: 150,
      y: 100,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 900,
    multiInstance: false,
  },
  Error: {
    header: {
      icon: error,
      title: 'C:\\',
    },
    component: ErrorBox,
    defaultSize: {
      width: 380,
      height: 200,
    },
    defaultOffset: {
      x: Math.floor(Math.random() * 200),
      y: Math.floor(Math.random() * 200),
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  'My Computer': {
    header: {
      icon: computer,
      title: 'My Computer',
    },
    component: MyComputer,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 250,
      y: 40,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
  Notepad: {
    header: {
      icon: notepad,
      title: 'Untitled - Notepad',
    },
    component: Notepad,
    defaultSize: {
      width: 500,
      height: 400,
    },
    defaultOffset: {
      x: 200,
      y: 100,
    },
    resizable: true,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  Winamp: {
    header: {
      icon: winamp,
      title: 'Winamp',
      invisible: true,
    },
    component: Winamp,
    defaultSize: {
      width: 275,
      height: 116,
    },
    defaultOffset: {
      x: window.innerWidth - 275, // Position on the right side
      y: 100,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
};

export { InternetExplorer, Minesweeper, ErrorBox, MyComputer, Notepad, Winamp };
