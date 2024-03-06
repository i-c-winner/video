import { Box, useTheme } from '@mui/material';
import { ModalWindow } from '../modal/ModalWindow';
import { styles } from '../styles/styles';
import {
    ChatBubbleOvalLeftEllipsisIcon,
    FolderPlusIcon,
    MicrophoneIcon,
    ShareIcon,
    StopCircleIcon,
    VideoCameraIcon
} from '@heroicons/react/16/solid';
import { ButtonWrapper } from '../../entity/model/UI/button/ButtonWrapper';
import {
    changeAudio,
    changeChatsBox,
    changeIsRecording,
    changeTypeModal,
    changeVideo,
    openModal
} from '../../app/store/interfaceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IInterface, IStore } from '../../app/types';
import { useEffect, useState } from 'react';
import { Recording } from '../../features/manager/record';
import { MicOff } from '@mui/icons-material';
import { VideoCameraSlashIcon } from '@heroicons/react/24/solid';
import { app } from '../../app/model/constants/app';
import { addFile } from "../../app/store/filesSlice";
import { addChat } from "../../app/store/chatsSlice";

let recording: Recording | null = null;

function Toolbox() {
    const glagolVC = app.glagolVC
    const [iSharing, setISharing] = useState<boolean>(false)
    const {chatsBoxVisible, tileMode, isRecording, modalIsOpen} = useSelector((state: IStore) => state.interface);
    const {audio, video} = useSelector((state: IStore) => state.interface.conference.quality);
    const [cameraIsWorking, setCameraIsWorking]= useState<boolean>(app.glagolVC.glagolManager.getStateCamera())
    const [microphoneIsWorking, setMicrophoneIsWorking] =useState<boolean>(false)
    const dispatch = useDispatch();
    const [colorText, setColorText] = useState<'grey' | 'black'>('grey');
    const theme = useTheme();

    function openChat() {
        dispatch(changeChatsBox(!chatsBoxVisible));
    }

    function recordAction() {
        dispatch(changeIsRecording(!isRecording));
    }

    function sharingAction() {
        if (iSharing) {
            glagolVC.sharingStop();
            setISharing(false)
        } else {
                setISharing(true)
                glagolVC.sharingStart()
        }
    }

    function openingModal(this: { type: IInterface['typeModal'] }) {
        dispatch(changeTypeModal(this.type));
        dispatch(openModal(!modalIsOpen));
    }

    function toggledCamera() {
        const {cameraIsWorking}=app.glagolVC.glagolManager.getStateCamera()
        setCameraIsWorking(!cameraIsWorking)
        // app.glagolVC.setParams('cameraIsWorking', !cameraIsWorking)

    }

    // function toggledMicrophone() {
    //     const {microphoneIsWorking}=app.glagolVC.getParams()
    //     setMicrophoneIsWorking(!microphoneIsWorking)
    //     app.glagolVC.setParams('microphoneIsWorking', !microphoneIsWorking)
    // }

    function fileDownload (args: [string, string]) {
        dispatch(addFile({
            text: args[0],
            idRemote: args[1]
        }))
    }
    function abortingSharing() {
        setISharing(false)
    }
    function setMessageChat(chat: [{text: string, author: string, id?: string}]) {
        dispatch(addChat(chat[0]))
    }
    useEffect(()=>{
        glagolVC.setHandler('abortingSharing', abortingSharing)
        glagolVC.setHandler('fileDownload', fileDownload)
        glagolVC.setHandler('setMessageChat', setMessageChat)
        return ()=>{
            /**
             * TODO remove handler
             */
        }
    },[])
    useEffect(() => {
        setColorText(() => {
            return theme.palette.mode === 'dark' ? 'grey' : 'black';
        });
    }, [theme]);

    useEffect(() => {
        if (isRecording) {
            const rec = new Recording();
            rec.init().then((result) => {
                rec.createRecorder(result);
                rec.createListeners();
                rec.start();
                recording = rec;
            }).catch((error) => {
                dispatch(changeIsRecording(false));
            });
        } else {
            recording?.stop();
        }
    }, [isRecording]);

    return <Box
        sx={ styles.toolboxLayer }>
        <ModalWindow/>
        <Box sx={ {
            ...styles.toolboxLayer.toolbox,
            color: colorText
        } }>
            <ButtonWrapper
                text="chat"
                action={ openChat }>
                <ChatBubbleOvalLeftEllipsisIcon
                    color={ colorText }
                />
            </ButtonWrapper>
            <ButtonWrapper
                text="file"
                action={ openingModal.bind({type: 'file'}) }>
                <FolderPlusIcon
                    color={ colorText }
                />
            </ButtonWrapper>
            <ButtonWrapper
                toggled={ iSharing }
                text="share"
                action={ sharingAction }>
                <ShareIcon
                    color={ colorText }
                />
            </ButtonWrapper>
            <ButtonWrapper
                text={ 'record' }
                action={ recordAction }>
                <StopCircleIcon
                    color={ colorText }
                />
            </ButtonWrapper>
            <ButtonWrapper
                text={ 'mic' }
                toggled={microphoneIsWorking}
                action={ ()=>{}}>
                {microphoneIsWorking ? <MicrophoneIcon
                    color={ colorText }
                /> : <Box sx={ {color: 'white'} }><MicOff/></Box> }
            </ButtonWrapper>
            <ButtonWrapper
                text={ 'camera' }
                toggled={cameraIsWorking}
                action={ toggledCamera }>
                { cameraIsWorking ? <VideoCameraIcon
                    color={ colorText }
                /> : <VideoCameraSlashIcon color="white"/> }
            </ButtonWrapper>
        </Box>
    </Box>;
}

export { Toolbox };
