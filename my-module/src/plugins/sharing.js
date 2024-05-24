const sharing = {
    start: function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        const message = $msg({
            to: `${context.roomName}@conference.prosolen.net/focus`,
            type: "chat",
        })
            .c("x", {
            xmlns: "http://jabber.org/protocol/muc#user",
        })
            .up()
            .c("body")
            .t("offer_dashboard")
            .up()
            .c("jimble", {
            xmlns: "urn:xmpp:jimble",
            ready: "true",
        });
        context.sendMessage(message);
    },
    stop: function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        const sender = context.webRtc.getSenders().find((sender) => {
            if (sender.track !== null) {
                return sender?.track?.hasOwn("iSharingScreen");
            }
            return false;
        });
        // context.webRtc.getSenders().forEach((sender: RTCRtpSender)=>{
        sender.track?.stop();
        context.webRtc.removeTrack(sender);
        // })
        navigator.mediaDevices
            .getUserMedia({
            video: {
                width: 1200,
                height: 800,
            },
            audio: false,
        })
            .then((stream) => {
            stream.getTracks().forEach((track) => {
                // track.applyConstraints({deviceId: 'mySharingScreen'});
                context.webRtc.addTrack(track);
            });
            context.emit("roomOn", stream);
            return context.webRtc.createOffer({
                iceRestart: false,
            });
        })
            .then((offer) => {
            context.webRtc.setLocalDescription(offer);
            const offerB64 = btoa(JSON.stringify({ offer: offer }));
            const message = $msg({
                to: `${context.roomName}@conference.prosolen.net/focus`,
                type: "chat",
            })
                .c("x", {
                xmlns: "http://jabber.org/protocol/muc#user",
            })
                .up()
                .c("body")
                .t("remove_dashboard")
                .up()
                .c("jimble", {
                xmlns: "urn:xmpp:jimble",
                ready: "true",
            })
                .t(offerB64);
            context.sendMessage(message);
        });
    },
};
export { sharing };
