import React from 'react';
import { useAsync } from 'react-async';
import { glagol } from '../../shared/conference/glagol';

const connection = async () => {
  return glagol.setLocalStream();
};
const CreateDisplayName = React.forwardRef<HTMLInputElement>((props, ref) => {
  const { data, error, isPending } = useAsync({ promiseFn: connection });
  if (isPending) {
    return <p>...Pending</p>;
  }
  if (data) {
    data.getTracks().forEach((track) => {
      glagol.peerConnection.addTrack(track);
    });
    glagol.peerConnectionAddHandlers();
    // glagol.peerConnection.createOffer().then((offer)=>{
    //   glagol.peerConnection.setLocalDescription(offer)
    // })
    return <div>
      <input ref={ref}/>
    </div>;
  }
  if (error) {
    return <p>error</p>;
  }
  return <p>start</p>;
});
export { CreateDisplayName };
