import React, { useEffect, useRef } from 'react';
import { glagol } from '../../entities/glagol/glagol';
import { useSelector } from 'react-redux';
import { IRootState } from '../../app/types';
function SingleStreamMode() {
  const {localComponentMode}= useSelector((state: IRootState)=>state.config.UI)
  useEffect(() => {
    if (localComponentMode.singleStreamMode) {
      if (refVideo.current !== null) refVideo.current.srcObject = glagol.localStream;
    } 
  }, [localComponentMode]);
  const refVideo=useRef<HTMLVideoElement>(null)
return <video autoPlay={true} ref={refVideo} className="video__bigscreen"/>
}
export {SingleStreamMode}
