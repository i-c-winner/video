import { useDispatch, useSelector } from "react-redux";
import { changeIsChatVisible } from "../../app/store/UISlice/UiSlice";
import { ButtonInstance } from "../../shared";
import { iconChat, iconExit, iconSettings } from "../../shared/img/svg/index"
import { PeerConnection } from "../index";
import { changeModal } from "../../app/store/UISlice/UiSlice";
import { constants } from "../../shared";

const peerConnection = new PeerConnection()

function Toolbox() {
  const dispatch = useDispatch()
  const visibleChat = useSelector((state: any) => {
    return state.UI.isChatVisible
  })

  function openChat() {
    dispatch(changeIsChatVisible(!visibleChat))
  }

  function openModal() {
    dispatch(changeModal({
      type: "settings",
      isOpen: true,
    }))
  }

  return (
    <div className="toolbox">
      <ButtonInstance
        action={openChat}
        variant="text"
        icon={iconChat}
      />
      <ButtonInstance
        icon={iconSettings}
        action={openModal}
      />
      <ButtonInstance

        variant="text"
        icon={iconExit}
        styles={{
          color: 'red'
        }
        }
      />
    </div>
  )
}

export { Toolbox }
