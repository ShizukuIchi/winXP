declare module 'webamp' {
  interface WebampTrackMeta {
    title?: string;
    artist?: string;
    album?: string;
  }

  interface WebampTrack {
    url: string;
    duration?: number;
    metaData?: WebampTrackMeta;
  }

  interface WebampOptions {
    initialTracks?: WebampTrack[];
  }

  type WebampListener = () => void;

  export default class Webamp {
    constructor(options?: WebampOptions);
    renderWhenReady(container: HTMLElement): Promise<void>;
    dispose(): void;
    onClose(listener: WebampListener): void;
    onMinimize(listener: WebampListener): void;
  }
}
