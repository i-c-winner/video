import * as strophe from "strophe.js"
import { setRegister } from "../../shared/lib/setRegister";

const { Strophe }: any = strophe
setRegister(strophe)
console.log(Strophe)
type Callback=(...args:any[])=>void
class Xmpp {
  private connection: any;
  private static instance: any;
  private listeners: {
    [key: string]: Callback[]
  };

  constructor(url: string) {
    if (!Xmpp.instance) {
      Xmpp.instance = this

    }
    this.listeners={}
    this.connection = new Strophe.Connection(url)
    return Xmpp.instance
  }

  register(userNode: string, password: string) {
    const callback = (status: number) => {
      //@ts-ignore
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
        console.log("Registration form not properly filled out.")
        //@ts-ignore
      } else if (status === Strophe.Status.REGIFAIL) {
        console.log("The Server does not support In-Band Registration")
      } else if (status === Strophe.Status.CONNECTED) {
        console.log('connected')
        // do something after successful authentication
      } else {
        // Do other stuff
      }
    }
    this.connection.register.connect("prosolen.net", callback)
  }
  on(name: string, callback: Callback){
    if (!this.listeners[name]) {
      this.listeners[name]=[]
    }
    this.listeners[name].push(callback)
  }
  emit(name: string, ...args: any[]) {
    this.listeners[name].forEach((listener)=>listener(args))
  }
}

export { Xmpp }
