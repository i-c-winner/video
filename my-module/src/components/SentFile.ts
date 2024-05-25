interface ISentFile {

}

class SentFile implements ISentFile {
  private static chunkSize = 12000;
  private currentChunk: number;
  private _offset: number;
  private props: { file: File };
  private fileId: number;
  private timestamp: number;
  private sizeData: number;

  constructor(props: { file: File, fileId: number }) {
    this.fileId = props.fileId;
    this.props = props;
    this._offset = 0;
    this.currentChunk = 0;
    this.timestamp = Date.now();
    this.sizeData = 0;
  }

  getSlice() {
    return this.props.file.slice(this._offset, (this._offset += SentFile.chunkSize));
  }

  createDataForSend = () => {
    return new Promise<string>((resolve, reject) => {
      if (this._offset > this.props.file.size) {
        reject(new Error(`File size ${this.props.file.size} is too large`));
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const chunkData = event.target?.result as ArrayBuffer;
        const typedArray = new Uint8Array(chunkData);
        const arrayU8 = [...typedArray];
        const data = {
          file_id: this.fileId,
          chunk_number: this.currentChunk,
          chunk: arrayU8,
          file_name: this.props.file.name,
          file_size: this.props.file.size,
          timestamp: this.timestamp,
          lifetime: 60 * 60 * 24 * 1000
        };
        this.currentChunk += 1;
        resolve(window.btoa(JSON.stringify(data)));
      };
      reader.onerror = (error) => {
        reject(new Error(`Error while creating chunk \"${error}\"`));
      };
      reader.readAsArrayBuffer(this.getSlice());
    });
  };
}

export { SentFile };