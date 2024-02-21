import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { glagol } from '../conference/glagol';


function RemoteStream(props: { stream: MediaStream }) {
    const refVideo = useRef<HTMLVideoElement>(null);
    const [kind, setKind] = useState<string>('');


    useEffect(() => {
        props.stream.getTracks().forEach((track) => {
            if (refVideo.current !== null) refVideo.current.srcObject = props.stream;
            setKind(track.kind);
        })


    }, []);


    function getClasses(type: string) {
        if (type === 'audio') {
            return 'video_remote video_remote_audio';
        } else if (type === 'video') {
            return 'video_remote video_remote_video';
        }
        return 'video_remote';
    }

    function getBoxClasses(kind: string) {
        if (kind === 'audio') {
            return 'remote-box remote-box_audio';
        } else if (kind === 'video') {
            return 'remote-box remote-box_video';
        }
    }

    return <Box className={ getBoxClasses(kind) }>
        <video className={ getClasses(kind) } autoPlay={ true } ref={ refVideo }/>
    </Box>;
}

export { RemoteStream };
