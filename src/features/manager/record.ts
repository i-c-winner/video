class Recording {
  private options: string;
  private chunks: Blob[];
  private mediaRecorder: MediaRecorder | null;

  constructor() {
    this.options = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm";
    this.chunks = [];
    this.mediaRecorder = null;
    this.createListeners = this.createListeners.bind(this);
    this.createListeners = this.createListeners.bind(this);
  }

  init() {
    return new Promise<MediaStream>((resolve) => {
      resolve(
        navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        }),
      );
    });
  }

  createRecorder(stream: MediaStream) {
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: this.options,
    });
    return this.mediaRecorder;
  }

  createListeners() {
    if (this.mediaRecorder !== null) {
      this.mediaRecorder.ondataavailable = (ev) => this.chunks.push(ev.data);
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, {
          type: this.chunks[0].type,
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "video.webm";
        a.click();
      };
    }
  }

  start() {
    this.mediaRecorder?.start();
  }

  stop() {
    this.mediaRecorder?.stop();
    this.mediaRecorder?.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
}

export { Recording };
