import getRandomText from '../plugins/getRandomText';
const name= getRandomText(5)
const roomName=getRandomText(5)
class Conference {
  private static instance: any;
  constructor() {
    if (!Conference.instance) {
      Conference.instance=this
    }
    return Conference.instance
  }

}
