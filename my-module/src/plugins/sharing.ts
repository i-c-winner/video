import { IMyTrack, IMySender } from "../components/types";

interface ISharing {
  start: () => void;
  stop: () => void;
}

const sharing: ISharing = {
  start: function () {
    const context: any = this;
    const message = $msg({
      to: `${context.roomName}@conference.prosolen.net/focus`,
      type: "chat",
    })
      .c("x", { xmlns: "http://jabber.org/protocol/muc#user" })
      .up()
      .c("body")
      .t("offer_dashboard")
      .up()
      .c("jimble", { xmlns: "urn:xmpp:jimble", ready: "true" });
    context.sendMessage(message);
  },
  stop: function () {
    const context: any = this;
    const sender = context.webRtc
      .getSenders()
      .find((sender: IMySender) =>
        sender?.track?.hasOwnProperty("iSharingScreen"),
      ) as IMySender;

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
        return context.webRtc.createOffer({ iceRestart: false });
      })
      .then((offer: RTCOfferOptions) => {
        context.webRtc.setLocalDescription(offer);
        const offerB64 = btoa(JSON.stringify({ offer: offer }));
        const message = $msg({
          to: `${context.roomName}@conference.prosolen.net/focus`,
          type: "chat",
        })
          .c("x", { xmlns: "http://jabber.org/protocol/muc#user" })
          .up()
          .c("body")
          .t("remove_dashboard")
          .up()
          .c("jimble", { xmlns: "urn:xmpp:jimble", ready: "true" })
          .t(offerB64);
        context.sendMessage(message);
      });
  },
};
export { sharing };
