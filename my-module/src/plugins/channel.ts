import { SentFile } from "../components/SentFile";

class Channel {
  private _instance: RTCDataChannel | null;
  private files: { fileId: number, instanceFile: SentFile, file: File }[];

  constructor() {
    this._instance = null;
    this.files = [];
  }

  init(chanel: RTCDataChannel) {
    this._instance = chanel;
    this._instance.onmessage = (ev) => {
      const message = new Response(ev.data).text();
      message.then((result) => {
        const message = JSON.parse(atob(result));
        const file = this.files.filter((file) => {
          return file.fileId === message.file_id;
        });
        if (file.length>0) {
          file[0].instanceFile.createDataForSend().then((data) => {
            this._instance?.send(data);
          }).catch((err) => {
            this.files=this.files.filter((file) => {
              return file.fileId!==err.id
            })
            console.info(err.error)});
        }
      });
    };
  }

  sendFile(file: File) {
    const fileId = Math.floor(Math.random() * 1000000 + 1);
    const sentFile = new SentFile({ fileId, file });
    this.files.push({
      fileId,
      instanceFile: sentFile,
      file
    });
    sentFile.createDataForSend().then((data) => {
      if (data) this._instance?.send(data);
      return sentFile.createDataForSend;
      /**
       * Повторно получаем подготовленные данные и отправляем их
       * потому что бек сделан так, что channel.onmessage срабатывает
       * только на второй вызов функции pc.send()
       * Дальше подготовка и отправка происходит через слушатель channel.onmessage
       */
    }).then((createDataForSend: () => Promise<string>) => {
      createDataForSend().then((data) => {
          this._instance?.send(data);
      });
    }).catch((error) => {
      new Error(error);
    });
  }
  saveFile(blobFile: string) {
    console.log(blobFile)
    const blob= new Blob([blobFile]);
    console.log(blob)
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.txt';
    link.click();

  }
}

export { Channel };
