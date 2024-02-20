import { app } from '../app/model/constants/app';
import GlagolProduct from 'glagol-video';
import GlagolDev from '../../glagol/index';
import process from 'process';

function getGlagol(mode: string | undefined) {
    if (mode == 'product') {
        console.log('production');
        return GlagolProduct;
    } else {
        console.log('developmetn');
        return GlagolDev;
    }
}

const Glagol = getGlagol(process.env.GLAGOL);
// Glagol.setHandler('addTrack', (...args) => console.log(args));
// Glagol.setHandler('roomOn', roomOn);

function creatingGlagol(roomName:string, displayName: string) {
    return new Glagol({
        roomName: roomName,
        displayName: displayName,
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
    });
}



export { creatingGlagol }