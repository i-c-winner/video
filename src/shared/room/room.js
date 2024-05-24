class Room {
    constructor() {
        Object.defineProperty(this, "xmpp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // @ts-ignore
        Object.defineProperty(this, "roomName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // @ts-ignore
        Object.defineProperty(this, "displayName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // @ts-ignore
        Object.defineProperty(this, "userNode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // @ts-ignore
        Object.defineProperty(this, "listeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (Room.instance) {
            return Room.instance;
        }
        Room.instance = this;
        this.listeners = {};
        this.roomName = "";
        this.userNode = "";
        this.displayName = "";
        return Room.instance;
    }
    create(action, roomName, userNode) {
        const message = new Strophe.Builder("presence", {
            to: `${roomName}@conference.prosolen.net/${userNode}`,
        }).c("x", {
            xmlns: "http://jabber.org/protocol/muc",
        });
        action(message);
    }
    validate(action, roomName, userNode) {
        const message = new Strophe.Builder("iq", {
            from: `${roomName}@prosolen.net/${userNode}`,
            id: this.userNode,
            to: `${roomName}@conference.prosolen.net`,
            type: "set",
        })
            .c("query", {
            xmlns: "http://jabber.org/protocol/muc#owner",
        })
            .c("x", {
            xmlns: "jabber:x:data",
            type: "submit",
        });
        action(message);
    }
    invite(action, roomName, displayName) {
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
            jid: `${roomName}@conference.prosolen.net`,
        })
            .up()
            .c("nick", {
            xmlns: "http://jabber.org/protocol/nick",
        })
            .t(displayName)
            .up()
            .c("jimble")
            .t(inviteMessageB64);
        action(message);
    }
}
export { Room };
