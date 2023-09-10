class Recording {
  private promiseStream: any;
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
    return new Promise((resolve: any, reject: any) => {
      resolve(navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }));
    });
  }

  createRecorder(stream: any) {
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: this.options
    });
    return this.mediaRecorder;
  }
  chunksListener(e: BlobEvent) {
    this.chunks.push(e.data);
  }
  downloadField() {
    let blob = new Blob(this.chunks, {
      type: this.chunks[0].type
    });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'video.webm';
    a.click();
  }

  createListeners() {
    if (this.mediaRecorder !== null) {
      this.mediaRecorder.addEventListener('dataavailable', this.chunksListener);
      this.mediaRecorder.addEventListener('stop', this.downloadField);
    }
  }
  removeListeners() {
    if (this.mediaRecorder !== null) {
      this.mediaRecorder.removeEventListener('dataavailable', this.chunksListener);
      this.mediaRecorder.removeEventListener('stop', this.downloadField);
    }
  }

  start() {
    this.mediaRecorder?.start();
  }

  stop() {
    this.mediaRecorder?.stop();
  }
}

export { Recording };
