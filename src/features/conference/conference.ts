import { IParamsConference, TCallbackConference } from '../../app/types';
import { xmpp } from './xmpp';


class Conference {

  private listeners: {
    [key: string]: TCallbackConference[]
  };
  private roomName: string;
  private userNode: string;
  private displayName: string;

  constructor() {
    this.roomName = '';
    this.userNode = '';
    this.displayName = '';
    this.listeners = {};
  }

  inizialization(params: IParamsConference) {
    this.roomName = params.roomName;
    this.userNode = params.userNode;
    this.displayName = params.displayName;
  }

  on(name: string, callback: TCallbackConference) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);
  }

  emit(name: string) {
    if (!this.listeners[name]) {
      console.error(new Error(`Слушатель ${name} не существует`));
    }

  }
}
const conference= new Conference()
export {conference}
