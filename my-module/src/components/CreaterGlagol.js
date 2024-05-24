import * as strophe from "strophe.js";
import { setRegister } from "../plugins/rigester";
import { Glagol } from "./Glagol";
import { getRandomText } from "../plugins/getRandomText";
setRegister(strophe);
// @ts-ignore
const { Strophe } = strophe;
class CreaterGlagol {
    constructor(props) {
        Object.defineProperty(this, "glagol", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "CreaterGlagol", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "xmpp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "roomName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "userNode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "emit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "displayName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "strophe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "webRtc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.emit = (name, ...args) => {
            try {
                CreaterGlagol.handlers[name].forEach((handler) => {
                    handler(args);
                });
            }
            catch (e) {
                console.info(`Listener ${name} note found: `, e);
            }
        };
        this.strophe = new Strophe.Connection(props.xmppUrl);
        this.webRtc = new RTCPeerConnection(props.webUrl);
        this.roomName = props.roomName;
        this.userNode = getRandomText(5);
        this.displayName = props.displayName;
        this.webRtc.ondatachannel = (event) => this.glagol.pcHandlerDataChannel(event);
        this.webRtc.onicecandidate = (event) => this.glagol.pcHandlerIceCandidate(event);
        this.webRtc.ontrack = (event) => this.glagol.pcHandlerOnTrack(event);
    }
    createGlagol() {
        this.glagol = new Glagol({
            xmpp: this.strophe,
            webRtc: this.webRtc,
            userNode: this.userNode,
            roomName: this.roomName,
            displayName: this.displayName,
            handlers: CreaterGlagol.handlers,
        });
        this.glagol.addHandlers();
    }
    register() {
        this.glagol.register().then((result) => {
            this.emit("connectionOn");
            if (result)
                this.glagol.createRoom();
            this.emit("connectionOn");
        });
    }
    xmppHandlerMessage(stanza) {
        this.glagol.xmppHandlerMessage(stanza);
        return true;
    }
    xmppHandlerPresence(stanza) {
        this.glagol.xmppHandlerPresence(stanza);
        return true;
    }
    xmppHandlerIqTypeResult(stanza) {
        this.glagol.xmppHandlerIqTypeResult(stanza);
        return true;
    }
    getGlagol() {
        return this.glagol;
    }
}
Object.defineProperty(CreaterGlagol, "handlers", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {}
});
Object.defineProperty(CreaterGlagol, "setHandler", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function (name, handler) {
        if (!CreaterGlagol.handlers[name])
            CreaterGlagol.handlers[name] = [];
        CreaterGlagol.handlers[name].push(handler);
    }
});
export default CreaterGlagol;
