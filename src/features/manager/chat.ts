import {glagol} from '../../shared/conference/glagol';

class Chat {
  sendMessage(text: string) {
    const message = new Strophe.Builder('message', {
      from: `${glagol.params.userNode}@prosolen.net/${glagol.params.userNode}`,
      id: glagol.params.userNode,
      to: `${glagol.params.roomName}@conference.prosolen.net`,
      type: 'groupchat'
    }).c('body').t(text).up().c('jingle', {
      id: glagol.params.userNode,
      authorName: glagol.params.displayName,
    });
  }
}
const chat=new Chat()
export {chat}
