import { useEffect, useRef } from 'react';
import { conference } from '../../functions/Conference';


function SharingScreenMode(props: { type: 'add_dashboard' | 'send_dashboard' }) {

  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    switch (props.type) {
      case 'send_dashboard': {
        const senders = conference.getPeerConnection().getSenders().filter((sender) => {
          if (sender.track !== null) return sender.track.contentHint === 'detail';
        });
        if (senders[0].track !== null) {
          const stream = new MediaStream();
          stream.addTrack(senders[0].track);
          if (refVideo.current !== null) refVideo.current.srcObject = stream;
        }
        break
      }
      case 'add_dashboard': {
        const receivers = conference.getPeerConnection().getReceivers().filter((receiver) => {
          if (receiver.track !== null) return receiver.track.id.indexOf('dashboard')>=0;
        });
        if (receivers[0].track !== null) {
          const stream = new MediaStream();
          stream.addTrack(receivers[0].track);
          if (refVideo.current !== null) refVideo.current.srcObject = stream;
        }
        break
      }
    }
  });
  return (
    <video className="video__bigscreen video__bigscreen_sharing" autoPlay={true} ref={refVideo}/>
  );
}

export { SharingScreenMode };
