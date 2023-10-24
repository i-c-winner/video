import { getRandomText } from '../../features/plugins/getRandomText';
import { IConfig } from '../index';

const config: IConfig = {
  conference: {
    user: {
      roomName: getRandomText(5),
      userName: getRandomText(5),
      userNode: '',
      displayName: getRandomText(5)
    }
  }
};

export { config };
