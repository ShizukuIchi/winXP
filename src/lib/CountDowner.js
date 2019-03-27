class CountDowner {
  constructor(till) {
    this.till = till;
    this.callbacks = {
      stop: [],
      second: [],
    };
    this.interval = null;
    this.origin = new Date();
    this.start();
  }
  progress() {
    const now = new Date();
    const total = this.till - this.origin;
    const percentage = (now - this.origin) / total;
    return now > this.till ? 1 : percentage;
  }
  getLast() {
    const last = this.till - new Date();
    const diffDays = Math.floor(last / (1000 * 3600 * 24));
    const diffHours = Math.floor(last / (1000 * 3600));
    const diffMinutes = Math.floor(last / (1000 * 60));
    const diffSeconds = Math.floor(last / 1000);
    return [
      diffDays,
      diffHours - diffDays * 24,
      diffMinutes - diffHours * 60,
      diffSeconds - diffMinutes * 60,
    ];
  }
  start() {
    this.interval = setInterval(() => {
      const last = this.till - new Date();
      if (last < 0) {
        this.stop();
      } else {
        this.callbacks.second.forEach(cb => cb(this.getLast()));
      }
    }, 1000);
  }
  stop() {
    this.clear();
    this.callbacks.stop.forEach(cb => cb());
  }
  clear() {
    clearInterval(this.interval);
  }
  on(str, cb) {
    if (str in this.callbacks) {
      this.callbacks[str].push(cb);
    } else {
      throw Error(`no ${str} type callback`);
    }
  }
}

export default CountDowner;
