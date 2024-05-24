const videoQuantity = {
    height: {
        width: 800,
        height: 520,
        frameRate: 60,
    },
    middle: {
        width: 640,
        height: 480,
        frameRate: 50,
    },
    low: {
        width: 320,
        height: 240,
        frameRate: 30,
    },
};
class GlagolManager {
    constructor(webRtc, xmpp) {
        Object.defineProperty(this, "webRtc", {
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
        Object.defineProperty(this, "cameraIsWorking", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "currentCameraQuantity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "microphoneIsWorking", {
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
        this.webRtc = webRtc;
        this.xmpp = xmpp;
        this.cameraIsWorking = true;
        this.microphoneIsWorking = true;
        this.currentCameraQuantity = "low";
        this.handlers = {};
    }
    switchOnCamera() {
        this.webRtc.getSenders().forEach((sender) => {
            if (sender.track !== null)
                if (sender.track.kind === "video") {
                    sender.track.enabled = true;
                }
        });
        this.cameraIsWorking = true;
        this.emit("cameraSwitchOn");
    }
    switchOffCamera() {
        this.webRtc.getSenders().forEach((sender) => {
            if (sender.track !== null)
                if (sender.track.kind === "video") {
                    sender.track.enabled = false;
                }
        });
        this.cameraIsWorking = false;
        this.emit("cameraSwitchOff");
    }
    switchOffMic() {
        this.webRtc.getSenders().forEach((sender) => {
            if (sender.track !== null)
                if (sender.track.kind === "audio") {
                    sender.track.enabled = false;
                }
        });
        this.microphoneIsWorking = false;
        this.emit("microphoneSwitchOff");
    }
    switchOnMic() {
        this.webRtc.getSenders().forEach((sender) => {
            if (sender.track !== null)
                if (sender.track.kind === "audio") {
                    sender.track.enabled = true;
                }
        });
        this.microphoneIsWorking = true;
        this.emit("microphoneSwitchOn");
    }
    applyConstraints(params) {
        const constraints = videoQuantity[params];
        this.webRtc.getSenders().forEach((sender) => {
            if (sender.track !== null)
                if (sender.track.kind === "video") {
                    if (sender.track !== null)
                        sender.track.applyConstraints(constraints).then(() => { });
                }
        });
        this.currentCameraQuantity = params;
    }
    setHandler(name, handler) {
        if (!this.handlers[name]) {
            this.handlers[name] = [];
        }
        this.handlers[name].push(handler);
    }
    changeDevices(deviceId, type) {
        const constraints = {
            video: type === "video" ? { deviceId } : true,
            audio: type === "audio" ? { deviceId } : true,
        };
        navigator.mediaDevices.getUserMedia(constraints).then((streams) => {
            streams.getTracks().forEach((track) => {
                if (track.kind === type) {
                    this.webRtc.getSenders().forEach((sender) => {
                        if (sender.track?.id === deviceId) {
                            this.webRtc.removeTrack(sender);
                        }
                    });
                    this.webRtc.addTrack(track);
                }
            });
        });
    }
    changeAudioOutput(deviceId) {
        this.webRtc.getReceivers().forEach((receiver) => {
            if (receiver.track?.kind === "audio") {
                receiver.track
                    ?.applyConstraints({
                    deviceId: deviceId,
                })
                    .then(() => { })
                    .catch((error) => console.error("Error audoout", error));
            }
        });
        console.log(deviceId);
    }
}
export { GlagolManager };
