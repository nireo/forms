import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  handleClose: () => void;
  show: boolean;
  children: ReactNode;
};

export const Modal: React.FC<Props> = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <IconButton
          onClick={() => handleClose()}
          aria-label="close-icon"
          component="span"
        >
          <CloseIcon />
        </IconButton>
        <div style={{ padding: '2rem' }}>{children}</div>
      </div>
    </div>
  );
};
