import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { glagol } from '../../entity/conference/glagol';
import { CreateRoomName } from '../../page/model/CreateRoomName';
import { RoomPage } from '../../page/model/RoomPage';
import { CreateDisplayName } from '../../page/model/CreateDisplayName';
import { Box, Button, createTheme, ThemeProvider } from '@mui/material';
import { styles } from '../styles';
import { useTranslation } from 'react-i18next';
import { myTheme } from '../../shared/styles/theme';
import { app } from './constants/app';
import GlagolProduct from 'glagol-video';
import GlagolDev from '../../../glagol-module/index';
import process from 'process';

// function getGlagol(mode: string | undefined) {
//     if (mode == 'product') {
//         console.log('production');
//         return GlagolProduct;
//     } else {
//         console.log('developmetn');
//         return GlagolDev;
//     }
// }
//
// const Glagol = getGlagol(process.env.GLAGOL);
const ThemeContext = React.createContext({
    toggleTheme: () => {
    }
});
const Glagol = GlagolDev

function App() {
    const {t} = useTranslation();
    const [state, setState] = useState<any>('createRoomName');
    const refRoomName = useRef<HTMLInputElement>(null);
    const refDisplayName = useRef<HTMLInputElement>(null);
    const [revirced, setReciverd] = useState(false);
    const refBox = useRef<any>();
    const [mode, setMode] = useState<'dark' | 'light'>('dark');


    const colorMode = React.useMemo(
        () => ({
            toggleTheme: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme(mode === 'dark' ? myTheme.dark : myTheme.light),
        [mode],
    );

    function getChildren() {
        switch (state) {
            case 'createUserName' :
                return <CreateDisplayName changeDisplayName={ changingInput } ref={ refDisplayName }/>;
            case 'createRoomName':
                return <CreateRoomName changeRoomName={ changingInput } ref={ refRoomName }/>;
            case 'roomPage':
                return <RoomPage/>;
            default:
                return <p>unknown children</p>;
        }
    }

    function changingInput(event: (BaseSyntheticEvent | string), type: string) {
        setReciverd(true);
        if (type === 'roomName') {
            if (typeof event !== 'string') app.roomName = event.target.value;
        } else if (type === 'displayName') {
            if (typeof event !== 'string') app.displayName = event.target.value;
        }
    }

    function changeState() {
        setReciverd(false);
        if (state === 'createRoomName') {
            const path = window.location.pathname;
            if (refRoomName.current) {
                history.replaceState(null, '', path.split('/')[0]
                    + app.roomName);
            }
            setState('createUserName');
        } else if (state === 'createUserName') {
            const createrGlagol = new Glagol({
                roomName: app.roomName,
                displayName: app.displayName,
                xmppUrl: 'https://xmpp.prosolen.net:5281/http-bind',
                webUrl: {
                    iceCandidatePoolSize: 5,
                    iceServers: [
                        {urls: 'stun:stun.l.google.com:19302'},
                        {urls: 'stun:vks.knodl.tech:80'},

                        {
                            urls: 'turn:vks.knodl.tech:80',
                            username: 'nehy$.pth-3084659',
                            credential: 'l@g&wojmv-po5924rufjmfvoi%np58igvao$ifv'
                        },

                        {
                            urls: 'turns:vks.knodl.tech:443',
                            username: 'nehy$.pth-3084659',
                            credential: 'l@g&wojmv-po5924rufjmfvoi%np58igvao$ifv'
                        },

                        {
                            urls: 'turns:vks.knodl.tech:443?transport=tcp',
                            username: 'nehy$.pth-3084659',
                            credential: 'l@g&wojmv-po5924rufjmfvoi%np58igvao$ifv'
                        },
                    ]
                }
            })
            createrGlagol.createGlagol()
            createrGlagol.register()
            app.glagolVC=createrGlagol.getGlagol()
        }
    }


    function getButtonText() {
        if (state === 'createRoomName') {
            return 'interface.buttons.createRoomName';
        }
        return 'interface.buttons.createDisplayName';
    }

    function getStyleButton() {
        if (window.screen.width > 720) {
            return {};
        } else {
            return {
                width: '80%',
                fontSize: '2em',
                height: '60px'
            };
        }
    }

    function connectionOn(...args: any[]) {
        console.log(args, 'Connectiona')
    }

    function roomOn(...args: any[]) {
        console.log('roomOn', args)
        setState('roomPage')
    }
    function streamStarted (...args: any[]) {
        console.log(args)
    }

    useEffect(() => {
        const roomName = window.location.pathname.split('/')[1];

        if (roomName !== '') {
            glagol.params.roomName = roomName;
            setState('createUserName');
        }
        setReciverd(true)
        Glagol.setHandler('addTrack', (...args) => console.log(args));
        Glagol.setHandler('roomOn', roomOn)
        Glagol.setHandler('streamStarted', streamStarted)
    }, []);

    return <ThemeContext.Provider value={ colorMode }>
        <ThemeProvider theme={ theme }>
            <Box
                ref={ refBox }

                sx={
                    styles.main
                }>
                { getChildren() }
                { state !== 'roomPage' && <Button
                    disabled={ !revirced }
                    sx={ getStyleButton() }
                    variant="contained"
                    onClick={ changeState }>{ t(getButtonText()) }</Button> }
            </Box>
        </ThemeProvider>

    </ThemeContext.Provider>;


}

export { App, ThemeContext };
