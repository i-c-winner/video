import { getRandomText } from '../../../features/plugins/getRandomText';
interface IApp {
  userNode: string
  roomName: string,
  displayName: string,
  glagolVC: any,
  appCreated: boolean,
 params : {
    videoQuality: MediaTrackConstraints|boolean,
    cameraIsWorking: boolean,
    microphoneIsWorking: boolean
  }
}
const app: IApp = {
  params:{
    videoQuality: {
      width: 320,
      height: 240,
      frameRate: 30
    },
    cameraIsWorking: true,
    microphoneIsWorking: true
  },
  userNode: getRandomText(5),
  roomName: getRandomText(5),
  displayName: 'i am incognito',
  glagolVC: null,
  appCreated: false
}
export {app}
