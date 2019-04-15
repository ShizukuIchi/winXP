import InternetExplorer from "./InternetExplorer";
import Minesweeper from "./Minesweeper";

import Solitaire from "./Solitaire/index.js";

import ErrorBox from "./ErrorBox";
import MyComputer from "./MyComputer";
import iePaper from "src/assets/windowsIcons/ie-paper.png";
import ie from "src/assets/windowsIcons/ie.png";
import mine from "src/assets/minesweeper/mine-icon.png";

import solitaireIcon from "src/assets/windowsIcons/solitaire.png";

import error from "src/assets/windowsIcons/897(16x16).png";
import computer from "src/assets/windowsIcons/676(16x16).png";
import computerLarge from "src/assets/windowsIcons/676(32x32).png";

export const defaultAppState = [
  {
    title: "Internet Explorer",
    component: InternetExplorer,
    defaultSize: {
      width: 700,
      height: 500
    },
    defaultOffset: {
      x: 130,
      y: 20
    },
    resizable: true,
    headerIcon: iePaper,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: 0
  },
  {
    component: Minesweeper,
    title: "Minesweeper",
    defaultSize: {
      width: 0,
      height: 0
    },
    defaultOffset: {
      x: 180,
      y: 170
    },
    resizable: false,
    headerIcon: mine,
    minimized: false,
    maximized: false,
    id: 1
  },
  {
    component: MyComputer,
    title: "My Computer",
    defaultSize: {
      width: 660,
      height: 500
    },
    defaultOffset: {
      x: 250,
      y: 40
    },
    resizable: true,
    headerIcon: computer,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: 2
  },
  {
    component: Solitaire,
    title: "Solitaire",
    defaultSize: {
      width: 600,
      height: 400
    },
    defaultOffset: {
      x: 180,
      y: 170
    },
    resizable: false,
    headerIcon: solitaireIcon,
    minimized: false,
    maximized: false,
    id: 3
  }
];

export const defaultIconState = [
  {
    id: 0,
    icon: ie,
    title: "Internet Explorer",
    component: InternetExplorer,
    isFocus: false
  },
  {
    id: 1,
    icon: mine,
    title: "Minesweeper",
    component: Minesweeper,
    isFocus: false
  },
  {
    id: 2,
    icon: computerLarge,
    title: "My Computer",
    component: MyComputer,
    isFocus: false
  },
  {
    id: 3,
    icon: solitaireIcon,
    title: "Solitaire",
    component: Solitaire,
    isFocus: false
  }
];

export const appSettings = {
  "Internet Explorer": {
    headerIcon: iePaper,
    title: "Internet Explorer",
    component: InternetExplorer,
    defaultSize: {
      width: 700,
      height: 500
    },
    defaultOffset: {
      x: 140,
      y: 30
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800
  },
  Minesweeper: {
    headerIcon: mine,
    title: "Minesweeper",
    component: Minesweeper,
    defaultSize: {
      width: 0,
      height: 0
    },
    defaultOffset: {
      x: 190,
      y: 180
    },
    resizable: false,
    minimized: false,
    maximized: false
  },
  Error: {
    headerIcon: error,
    title: "C:\\",
    component: ErrorBox,
    defaultSize: {
      width: 380,
      height: 120
    },
    defaultOffset: {
      x: window.innerWidth / 2 - 190,
      y: window.innerHeight / 2 - 60
    },
    resizable: false,
    minimized: false,
    maximized: false
  },
  "My Computer": {
    component: MyComputer,
    title: "My Computer",
    defaultSize: {
      width: 660,
      height: 500
    },
    defaultOffset: {
      x: 260,
      y: 50
    },
    resizable: true,
    headerIcon: computer,
    minimized: false,
    maximized: window.innerWidth < 800
  },
  Solitaire: {
    headerIcon: solitaireIcon,
    title: "Solitaire",
    component: Solitaire,
    defaultSize: {
      width: 600,
      height: 400
    },
    defaultOffset: {
      x: 190,
      y: 180
    },
    resizable: false,
    minimized: false,
    maximized: false
  }
};

export { InternetExplorer, Minesweeper, ErrorBox, MyComputer, Solitaire };
