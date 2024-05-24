interface ISentFile {

}

class SentFile implements ISentFile {
  private static chunkSize = 12000;
  private currentChunk: number;
  private preparedData: string;
  private _offset: number;
  private props: { file: File };
  private fileId: number;
  private timestamp: number;

  constructor(props: { file: File }) {
    this.fileId = Math.floor(Math.random() * 1000000 + 1);
    this.props = props;
    this.preparedData = "";
    this._offset = 0;
    this.currentChunk = 0;
    this.timestamp = Date.now();
  }

  getSlice() {
    return this.props.file.slice(this._offset, (this._offset += SentFile.chunkSize));
  }

  createDataForSend = () => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const chunkData = event.target?.result as ArrayBuffer;
        const typedArray = new Uint8Array(chunkData);
        const arrayU8 = [...typedArray];
        const data = {
          fileId: this.fileId,
          chunk_number: this.currentChunk,
          chunk: arrayU8,
          file_name: this.props.file.name,
          file_size: this.props.file.size,
          timestamp: this.timestamp,
          lifetime: 60 * 60 * 24 * 1000
        };
        resolve(window.btoa(JSON.stringify(data)))
        reject(new Error(`Error while creating chunk "${chunkData}"`));
      };
      reader.readAsDataURL(this.getSlice());
      this._offset += this.props.file.size;
      this.currentChunk += 1;
    });
  };
}

export { SentFile };