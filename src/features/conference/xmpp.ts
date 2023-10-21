import * as strophe from 'strophe.js';
import { setRegister } from '../plugins/register';
import getRandomText from '../plugins/getRandomText';

// @ts-ignore
const { Strophe } = strophe;
setRegister(strophe);
const userNode = getRandomText(5);
const password = getRandomText(8);

class Xmpp {
  private connection: any;

  constructor() {
    this.connection = new Strophe.Connection('https://xmpp.prosolen.net:5281/http-bind');
  }

  init() {
    const callback = (status: number): void => {
      if (status === Strophe.Status.REGISTER) {
        // fill out the fields
        this.connection.register.fields.username = userNode;
        this.connection.register.fields.password = password;
        // calling submit will continue the registration process
        this.connection.register.submit();
        //@ts-ignore
      } else if (status === Strophe.Status.REGISTERED) {
        console.log("registered!");
        // calling login will authenticate the registered JID.
        this.connection.authenticate();
        //@ts-ignore
      } else if (status === Strophe.Status.CONFLICT) {
        console.log("Contact already existed!");
        //@ts-ignore
      } else if (status === Strophe.Status.NOTACCEPTABLE) {
        console.log("Registration form not properly filled out.");
        //@ts-ignore
      } else if (status === Strophe.Status.REGIFAIL) {
        console.log("The Server does not support In-Band Registration");
      } else if (status === Strophe.Status.CONNECTED) {
        console.log('connected');
        // do something after successful authentication
      } else {
        // Do other stuff
      }
    };
    this.connection.register.connect('prosolen.net', callback);
  }
}
const xmpp= new Xmpp()
export {xmpp}
