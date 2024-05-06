# Создание Glagol

1. Импортировать Glagol

   ```javascript
   import Clagol from "glagol-video";
   ```

2. После чего можно создавать слушателей для Glagol
   ```javascript
   Glagol.setHandler(name, (...args) => {
     /**
   тут функция слушатель
   */
   });
   ```
3. Затем можно иницилизировать соединение
   ```typescript
   new CreaterGlagol({
   roomName: string,
   xmppUrl: string,
   webUrl: {
     iceCandidatePoolSize: number,
    iceServers: {
      urls: string,
      username?: string,
      credential?: string
                }[]
           }
   })
   ```
4. В дальнейшем в компоненте можно добавлять слушатели согласно п.2 и использовать их. Важно сначало создать, затем
   использовать.

## Список создаваемых хендлеров:

- connectionOn: Подключение создано,
- roomOn: Создана комната,
- addTrack: Добавлен трак,
- removeTrack: Удален трак,
- sendSharing: Шаринг экрана отправлен
- changeBigScreen: Изменит отображение большого экрана
- sendFile: Отправит файл на сервер
  ```typescript
  import { string } from "prop-types";
  glagol.sendFile(event: any ,{
      file_name: string,
      file_size: number,
      timestamp: string
  } ) {
  /**
    your code hear
  */
  }
  ```
- saveFile: Сохранит файл на локальную машину
  ```typescript
  import { string } from "prop-types";
  glagol.saveFile({
  idRemote: string,
  text: string
  }[], text: string) {
  /**  your code here
  */
  }
  ```
  где idRemote - id приодящий в stanza - ответе от
  XMPP сервера, text - сообщение приходящее там же как body для
  аргумента jimble
