import {ISettingsProps} from '../../types';

function SettingsVideo(props: ISettingsProps) {
const {value, index}=props

 return value===index&& (
   <p>video</p>
 )


}

export {SettingsVideo}
