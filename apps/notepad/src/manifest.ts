export default {
  id: 'app.notepad',
  name: 'Notepad',
  version: '1.0.0',
  entry: {
    scope: 'notepadApp',
    url: '/remoteEntry.js',
    module: './App'
  },
  window: {
    title: 'Untitled - Notepad',
    defaultSize: { width: 660, height: 500 },
    defaultOffset: { x: 270, y: 60 },
    resizable: true
  },
  multiInstance: true
} as const;