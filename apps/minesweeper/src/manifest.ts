export default {
  id: 'app.minesweeper',
  name: 'Minesweeper',
  version: '1.0.0',
  entry: {
    scope: 'minesweeperApp',
    url: '/remoteEntry.js',
    module: './App'
  },
  window: {
    title: 'Minesweeper',
    defaultSize: { width: 300, height: 450 },
    defaultOffset: { x: 190, y: 180 },
    resizable: false
  },
  multiInstance: true
} as const;