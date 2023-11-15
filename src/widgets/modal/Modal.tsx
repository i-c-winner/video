import { Modal } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../app/types';
import { openModal } from '../../app/store/interfaceSlice';
import { Settings } from './Settings';
import { ReactElement, ReactNode } from 'react';
import {Error} from './Error';

const allChildren: {
  [key: string]: ReactElement
} = {
  settings: <Settings/>,
  error: <Error />
};

function ModalWindow() {

  const dispatch = useDispatch();

  const { modalIsOpen, typeModal } = useSelector((state: IStore) => state.interface);

  function handleClose() {
    dispatch(openModal(false));
  }
function getChildren() {
   return  allChildren[typeModal]?allChildren[typeModal]:allChildren.error
}

  return (
    <Modal
      // @ts-ignore
      children={getChildren()}
      open={modalIsOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    </Modal>
  );
}

export { ModalWindow };
