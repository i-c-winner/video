import { getRandomText } from '../../../features/plugins/getRandomText';
interface IApp {
  userNode: string
  roomName: string,
  displayName: string,
  glagolVC: any,
  appCreated: boolean
}
const app: IApp = {
  userNode: getRandomText(5),
  roomName: getRandomText(5),
  displayName: 'i am incognito',
  glagolVC: null,
  appCreated: false
}
export {app}
