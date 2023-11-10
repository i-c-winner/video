import React, { ForwardedRef } from 'react';
const  LocalStream= React.forwardRef((props, ref: ForwardedRef<HTMLVideoElement>)=>{
  return  <video className="video video_local" ref={ref} autoPlay={true}/>
})
export {LocalStream}
