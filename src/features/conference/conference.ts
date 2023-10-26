import { IParamsConference, TCallbackConference } from '../../app/types';
import { peerConnection } from './peerConnection';


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
    peerConnection.on('localStreamDepended', this.localStreamDepended)
  }

  initialization(params: IParamsConference) {
    this.roomName = params.roomName;
    this.userNode = params.userNode;
    this.displayName = params.displayName;
    peerConnection.addHandlers();
    this.createConnection()
  }
createConnection() {
    peerConnection.setLocalStream()
}
localStreamDepended=()=> {
    this.emit('localStreamDepended')
}
  on(name: string, callback: TCallbackConference) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);
  }

  emit(name: string, args?: TCallbackConference[]) {
    if (!this.listeners[name]) {
      console.error(new Error(`Слушатель ${name} не существует`));
    }else {
      this.listeners[name].forEach((listener)=>{
        listener(name, args)
      })
    }
  }
}

const conference = new Conference();
export { conference };
