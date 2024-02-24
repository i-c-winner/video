import React, { useEffect, useRef } from 'react'
import { getRandomText } from '../../features/plugins/getRandomText';

function BigScreen (props: {
    stream: MediaStream
}) {
    const refVideo=useRef<HTMLVideoElement>(null)
    useEffect(()=>{
        if (refVideo.current!==null) refVideo.current.srcObject=props.stream
    })
    return <React.Fragment>
        <video key={getRandomText(5)} className="video video_my-video" autoPlay={true} ref={refVideo}/>
    </React.Fragment>
}
export {BigScreen}