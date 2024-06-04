import { Channel } from "./channel";

class LoadedIndicator {
  private _fileName: string | undefined;
  private _allSizes: number | undefined;
  private _status: string | undefined;
  private _oneBox: number=1;
  private _allBox: number=10;

  init(name: string, allSizes: number): void {

    this._fileName = name;
    this._allSizes = allSizes;
    this._oneBox = this._allSizes / this._allBox;
    this.start();
  }

  start() {
    const fileName = this._fileName;
    const allBox = this._allBox;
    Channel.changeIndicators!({ fileName, allBox, status: "start"});
  }

  progress(receivedSizes: number): void {
    const oneBox = this._oneBox ;
    console.log(receivedSizes, oneBox);
    Channel.changeIndicators!({ progress: Math.floor((receivedSizes/oneBox)), status: "progress" });
  }

  finish() {
    Channel.changeIndicators!({ status: "finish" });
  }

}


export { LoadedIndicator };