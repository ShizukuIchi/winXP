// Served from public/music, so the file ships with the site rather than being
// hotlinked. Duration is left out on purpose: webamp reads it off the file.
export const initialTracks = [
  {
    url: `${process.env.PUBLIC_URL}/music/dreamscape.mp3`,
    metaData: {
      title: 'Dreamscape',
      artist: '009 Sound System',
    },
  },
];
