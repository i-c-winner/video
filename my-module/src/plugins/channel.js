class Channel {
    constructor() {
        Object.defineProperty(this, "_instance", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "files", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sendFile", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (ev) => {
            }
        });
        this._instance = null;
        this.files = [];
    }
    init(chanel) {
        this._instance = chanel;
        this._instance.onmessage = (e) => {
            console.log("Received message", e);
        };
        this._instance.onbufferedamountlow = () => {
            console.log("Received bufferedamountlow");
        };
        this._instance.onerror = (e) => {
            console.log("Received error");
        };
        this._instance.onopen = () => {
            console.log("Received open");
        };
        this._instance.onclose = () => {
            console.log("Received close");
        };
    }
}
export { Channel };
