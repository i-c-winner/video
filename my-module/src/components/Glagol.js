import { getRandomText } from "../plugins/getRandomText";
import { sharing } from "../plugins/sharing";
import { Channel } from "../plugins/channel";
import { GlagolManager } from "./GlagolManager";
const channel = new Channel();
class Glagol {
    constructor(props) {
        Object.defineProperty(this, "xmpp", {
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
        Object.defineProperty(this, "userNode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "candidates", {
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
        Object.defineProperty(this, "displayName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "glagolManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "xmppHandlerMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (stanza) => {
                const bodyText = Strophe.getText(stanza.getElementsByTagName("body")[0]);
                const jimble = stanza.getElementsByTagName("jimble")[0];
                const jimbleText = Strophe.getText(jimble);
                switch (bodyText) {
                    case "add_dashboard": {
                        this.connectdWasChanged(jimbleText);
                        break;
                    }
                    case "invitation_reply":
                        navigator.mediaDevices
                            .getUserMedia({
                            video: {
                                width: 320,
                                height: 240,
                                frameRate: 30,
                            },
                            audio: true,
                        })
                            .then((stream) => {
                            stream.getTracks().forEach((track) => {
                                this.webRtc.addTrack(track);
                            });
                            this.connectdWasChanged(jimbleText);
                            this.emit("roomOn", stream);
                        });
                        break;
                    case "add_track": {
                        this.connectdWasChanged(jimbleText);
                        break;
                    }
                    case "ice_candidate": {
                        const candidate = new RTCIceCandidate(JSON.parse(atob(jimbleText)));
                        if (this.webRtc.remoteDescription) {
                            this.webRtc.addIceCandidate(candidate);
                        }
                        else {
                            this.setCandidate(candidate);
                        }
                        break;
                    }
                    case "remove_track": {
                        this.connectdWasChanged(jimbleText);
                        break;
                    }
                    case "offer_dashboard": {
                        navigator.mediaDevices
                            .getDisplayMedia({
                            video: {
                                width: 1200,
                                height: 800,
                            },
                            audio: false,
                        })
                            .then((stream) => {
                            stream.getTracks().forEach((track) => {
                                if (track.kind === "video") {
                                    track.iSharingScreen = true;
                                    this.webRtc.addTrack(track);
                                }
                            });
                            this.emit("sendSharing", stream);
                            return this.webRtc.createOffer({
                                iceRestart: false,
                            });
                        })
                            .then((offer) => {
                            this.webRtc.setLocalDescription(offer);
                            const offer64 = btoa(JSON.stringify({
                                offer,
                            }));
                            const message = $msg({
                                to: `${this.roomName}@conference.prosolen.net/focus`,
                                type: "chat",
                            })
                                .c("x", {
                                xmlns: "http://jabber.org/protocol/muc#user",
                            })
                                .up()
                                .c("body")
                                .t("send_dashboard")
                                .up()
                                .c("jimble", {
                                xmlns: "urn:xmpp:jimble",
                                ready: "true",
                            })
                                .t(offer64);
                            this.sendMessage(message);
                        })
                            .catch((error) => {
                            this.emit("abortingSharing");
                            console.error(`This is Error by sharing ${error}`);
                        });
                        break;
                    }
                    case "send_dashboard": {
                        break;
                    }
                    case "remove_dashboard": {
                        if (this.webRtc.signalingState !== "have-local-offer") {
                            this.connectdWasChanged(jimbleText);
                            const stream = new MediaStream();
                            this.webRtc.getSenders().forEach((sender) => {
                                if (sender.track !== null) {
                                    stream.addTrack(sender.track);
                                }
                            });
                            this.emit("changeBigScreen", stream);
                        }
                        break;
                    }
                    case "offer_download": {
                        const idRemote = jimble.getAttribute("id_remote");
                        this.emit("fileDownload", jimbleText, idRemote);
                        break;
                    }
                    default: {
                        console.info("message with unknown action");
                    }
                }
                console.log(stanza, "Stanza message");
                return true;
            }
        });
        Object.defineProperty(this, "xmppHandlerMessageGroupChat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (stanza) => {
                try {
                    const fromAttribute = stanza.getAttribute("from");
                    if (fromAttribute !== null) {
                        const from = fromAttribute.split("/")[1];
                        if (from !== this.userNode) {
                            const bodyText = Strophe.getText(stanza.getElementsByTagName("body")[0]);
                            const jingle = stanza.getElementsByTagName("jingle")[0];
                            this.emit("setMessageChat", {
                                text: bodyText,
                                author: jingle.getAttribute("author"),
                            });
                            console.log(stanza, "this is Chat Message");
                        }
                    }
                }
                catch (e) {
                    console.log(stanza, "STANZA");
                    console.error(e);
                }
                return true;
            }
        });
        Object.defineProperty(this, "xmppHandlerPresence", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (stanza) => {
                try {
                    const x = stanza.getElementsByTagName("x");
                    try {
                        const statuses = Array.from(x[1].getElementsByTagName("status"));
                        if (statuses[0] !== null) {
                            if (Number(statuses[0].getAttribute("code")) === 201) {
                                this.validateRoom();
                            }
                            else if (Number(statuses[0].getAttribute("code")) === 100) {
                                this.invitateRoom();
                            }
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
                catch (e) {
                    console.error(e);
                }
                console.log(stanza, "Stanza");
                return true;
            }
        });
        Object.defineProperty(this, "xmppHandlerIqTypeResult", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (stanza) => {
                try {
                    if (stanza !== null) {
                        const attribute = stanza.getAttribute("from");
                        if (attribute) {
                            const roomName = attribute.split("@")[0];
                            if (roomName === this.roomName)
                                this.invitateRoom();
                        }
                    }
                }
                catch (e) {
                    console.error(e);
                }
                return true;
            }
        });
        Object.defineProperty(this, "emit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name, ...args) => {
                try {
                    this.handlers[name].forEach((handler) => {
                        handler(args);
                    });
                }
                catch (e) {
                    console.info(`Listener ${name} note found: `, e);
                }
            }
        });
        this.xmpp = props.xmpp;
        this.webRtc = props.webRtc;
        this.userNode = props.userNode;
        this.roomName = props.roomName;
        this.displayName = props.displayName;
        this.handlers = props.handlers;
        this.candidates = [];
        this.glagolManager = null;
    }
    addHandlers() {
        this.xmpp.addHandler(this.xmppHandlerMessage, null, "message");
        this.xmpp.addHandler(this.xmppHandlerPresence, null, "presence");
        this.xmpp.addHandler(this.xmppHandlerIqTypeResult, null, "iq", "result");
        this.xmpp.addHandler(this.xmppHandlerMessageGroupChat, null, "message", "groupchat");
    }
    register() {
        return new Promise((resolve) => {
            const callback = (status) => {
                // @ts-ignore
                if (status === Strophe.Status.REGISTER) {
                    // fill out the fields
                    this.xmpp.register.fields.username = this.userNode;
                    this.xmpp.register.fields.password = getRandomText(5);
                    // calling submit will continue the registration process
                    this.xmpp.register.submit();
                    //@ts-ignore
                }
                else if (status === Strophe.Status.REGISTERED) {
                    console.info("registered!");
                    // calling login will authenticate the registered JID.
                    this.xmpp.authenticate();
                    //@ts-ignore
                }
                else if (status === Strophe.Status.CONFLICT) {
                    console.info("Contact already existed!");
                    //@ts-ignore
                }
                else if (status === Strophe.Status.NOTACCEPTABLE) {
                    console.info("Registration form not properly filled out.");
                    //@ts-ignore
                }
                else if (status === Strophe.Status.REGIFAIL) {
                    console.info("The Server does not support In-Band Registration");
                }
                else if (status === Strophe.Status.CONNECTED) {
                    console.info("Соединение XMPP установленно");
                    this.glagolManager = new GlagolManager(this.webRtc, this.xmpp);
                    resolve(true);
                }
                else {
                    // Do other stuff
                }
            };
            this.xmpp.register.connect("prosolen.net", callback);
        });
    }
    setCandidate(candidate) {
        this.candidates.push(candidate);
    }
    resetCandidates() {
        this.candidates = [];
    }
    getCandidates() {
        return this.candidates;
    }
    pcHandlerIceCandidate(event) {
        if (event.candidate) {
            // @ts-ignore
            const candidate = btoa(JSON.stringify({ candidate: event.candidate }));
            const message = new Strophe.Builder("message", {
                to: `${this.roomName}@conference.prosolen.net/focus`,
                type: "chat",
            })
                .c("body")
                .t(candidate);
            this.sendMessage(message);
        }
        return true;
    }
    pcHandlerOnTrack(event) {
        if (event.streams[0].id.indexOf("dashboard") >= 0) {
            this.emit("sendSharing", event.streams[0]);
        }
        else {
            this.emit("addTrack", event.streams[0]);
        }
        event.streams[0].onremovetrack = () => {
            this.emit("removeTrack", event.streams[0]);
        };
        return true;
    }
    pcHandlerDataChannel(event) {
        event.channel.onmessage = (message) => {
            console.log('OVMESSAGE');
        };
        channel.init(event.channel);
    }
    sendMessage(message) {
        this.xmpp.send(message);
    }
    connectdWasChanged(description) {
        this.webRtc
            .setRemoteDescription(JSON.parse(atob(description)))
            .then(() => {
            this.getCandidates().forEach((candidate) => this.webRtc.addIceCandidate(candidate));
            this.resetCandidates();
            return this.webRtc.createAnswer({
                iceRestart: true,
            });
        })
            .then((answer) => {
            const answer64 = btoa(JSON.stringify({ answer }));
            this.webRtc
                .setLocalDescription(answer)
                .then(() => {
                const message = new Strophe.Builder("message", {
                    to: `${this.roomName}@conference.prosolen.net/focus`,
                    type: "chat",
                })
                    .c("body")
                    .t(answer64);
                this.sendMessage(message);
            })
                .catch((error) => {
                console.error(new Error("error"), error);
            });
        });
    }
    createRoom() {
        const message = new Strophe.Builder("presence", {
            to: `${this.roomName}@conference.prosolen.net/${this.userNode}`,
        }).c("x", {
            xmlns: "http://jabber.org/protocol/muc",
        });
        this.sendMessage(message);
    }
    validateRoom() {
        const message = new Strophe.Builder("iq", {
            // from: `${this.roomName}@prosolen.net/${this.userNode}`,
            id: this.userNode,
            to: `${this.roomName}@conference.prosolen.net`,
            type: "set",
        })
            .c("query", {
            xmlns: "http://jabber.org/protocol/muc#owner",
        })
            .c("x", {
            xmlns: "jabber:x:data",
            type: "submit",
        });
        this.sendMessage(message);
    }
    invitateRoom() {
        const invitation = {
            action: "INVITATION",
            tracks: {
                audio: true,
                video: true,
            },
        };
        const inviteMessageB64 = btoa(JSON.stringify(invitation));
        const message = new Strophe.Builder("message", {
            to: "focus@prosolen.net/focus",
            type: "chat",
            xmlns: "jabber:client",
        })
            .c("x", {
            xmlns: "jabber:x:conference",
            jid: `${this.roomName}@conference.prosolen.net`,
        })
            .up()
            .c("nick", {
            xmlns: "http://jabber.org/protocol/nick",
        })
            .t(this.displayName)
            .up()
            .c("jimble")
            .t(inviteMessageB64);
        this.sendMessage(message);
    }
    sharingStart() {
        sharing.start.apply(this);
    }
    sharingStop() {
        sharing.stop.apply(this);
    }
    sendFile(event) {
        channel.sendFile(event);
        // channel.sendData(JSON.stringify(props.params));
        // channel.sendBodyFile(props.event.target.files[0]);
    }
    saveFile(files, fileForRemove) {
        const message = new Strophe.Builder("message", {
            to: `${this.roomName}@conference.prosolen.net/focus`,
            type: "chat",
        })
            .c("x", {
            xmlns: "http://jabber.org/protocol/muc#user",
        })
            .up()
            .c("body", {}, "start_download")
            .c("jimble", {
            xmlns: "urn:xmpp:jimble",
            ready: "true",
        })
            .t(files[0].text);
        this.sendMessage(message);
        // channel.createFileDescription(params)
        this.emit("removeFile", fileForRemove);
    }
    sendChatMessage(text) {
        const message = new Strophe.Builder("message", {
            from: `${this.userNode}@prosolen.net/${this.userNode}`,
            id: this.userNode,
            to: `${this.roomName}@conference.prosolen.net`,
            type: "groupchat",
        })
            .c("body")
            .t(text)
            .up()
            .c("jingle", {
            id: this.userNode,
            author: this.displayName,
        });
        this.sendMessage(message);
    }
    setHandler(name, handler) {
        if (!this.handlers[name]) {
            this.handlers[name] = [];
        }
        this.handlers[name].push(handler);
    }
}
export { Glagol };