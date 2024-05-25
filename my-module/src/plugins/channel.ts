import { SentFile } from "../components/SentFile";

class Channel {
  private _instance: RTCDataChannel | null;
  private files: { fileId: number, instanceFile: SentFile, file: File }[];
  private receivedFileBuffer: any[];
  private receivedSizes: number;
  private startingDownload: boolean;

  constructor() {
    this._instance = null;
    this.files = [];
    this.receivedFileBuffer=[]
    this.receivedSizes=0
    this.startingDownload=true
  }

  init(chanel: RTCDataChannel) {
    this._instance = chanel;

    this._instance.onmessage = (ev) => {
      const message = new Response(ev.data).text();
      message.then((result) => {
        const message = JSON.parse(atob(result));
        /**
         * Я не знаю почему по этому параметру проходит проверка
         * Но бекенд сделан так, что наличие поля file_name определяет
         * это сообщение приходит в момент загрузки файла, или в момент
         * скачивания
         */
        if (!message.file_name) {
          const file = this.files.filter((file) => {
            return file.fileId === message.file_id;
          });
          if (file.length > 0) {
            file[0].instanceFile.createDataForSend().then((data) => {
              this._instance?.send(data);
            }).catch((err) => {
              this.files = this.files.filter((file) => {
                return file.fileId !== err.id;
              });
              console.info(err.error);
            });
          }
          console.log('Message sent', message);
        } else {
          if (this.startingDownload) {
            this.startingDownload=false
          } else {
            this.receivedFileBuffer.push(message.chunk);
          }

          console.log(message, 'Message received');
          this.receivedSizes+=message.chunk.length
          console.log('получено данных',this.receivedSizes, 'всего данных ',message.file_size)
          if(this.receivedSizes>=message.file_size) {
            const receivedBlob = new Blob(this.receivedFileBuffer);
            const url = URL.createObjectURL(receivedBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = message.file_name; // use the filename from the message
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(this.receivedFileBuffer)
            this.receivedFileBuffer = [];
            this.startingDownload=true
          }
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
}

export { Channel };
