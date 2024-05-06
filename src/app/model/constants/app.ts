import { getRandomText } from "../../../features/plugins/getRandomText";

interface IApp {
  userNode: string;
  roomName: string;
  displayName: string;
  glagolVC: any;
  appCreated: boolean;
  startingParameters: {
    quantity: MediaTrackConstraints;
    cameraIsWorking: boolean;
    microphoneIsWorking: boolean;
  };
}

const app: IApp = {
  startingParameters: {
    quantity: {
      width: 320,
      height: 240,
      frameRate: 30,
    },
    cameraIsWorking: true,
    microphoneIsWorking: true,
  },
  userNode: getRandomText(5),
  roomName: getRandomText(5),
  displayName: "i am incognito",
  glagolVC: null,
  appCreated: false,
};
export { app };
