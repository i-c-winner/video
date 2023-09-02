import {ISettingsProps} from '../../types';

function SettingsUser(props: ISettingsProps) {
  const {value, index}= props
  return  value===index&& (
    <p>USer</p>
  )

}
export {SettingsUser}
