import { getRandomText } from '../../../features/plugins/getRandomText';
interface IApp {
  userNode: string,
  roomName: string,
  displayName: string,
  glagolVC:any,
  setHandler?: (...args: any[])=>void,
  streams: {
    localStream: MediaStream,
    remoteStreams: MediaStream[]
  }
}
const app: IApp = {
  userNode: getRandomText(5),
  roomName: getRandomText(5),
  displayName: 'i am incognito',
  glagolVC: null,
  streams: {
    localStream: new MediaStream,
    remoteStreams: []
  }
}
export {app}
