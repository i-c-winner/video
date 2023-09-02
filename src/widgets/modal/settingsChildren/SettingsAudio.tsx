import { ISettingsProps } from '../../types';

function SettingsAudio(props: ISettingsProps) {
  const { value, index } = props;
  return value === index && (
    <p>audio</p>
  );
}

export { SettingsAudio };
