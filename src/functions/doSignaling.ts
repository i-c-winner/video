import { glagol } from "../entities/glagol/glagol";

function doSignaling(answer: string) {

  const message: Strophe.Builder = new Strophe.Builder('message', {
    to: `${glagol.roomName}@conference.prosolen.net/focus`,
    type: 'chat'
  }).c('body').t(answer)
  return message
}

export { doSignaling }
