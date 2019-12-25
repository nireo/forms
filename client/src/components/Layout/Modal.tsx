import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';

type Props = {
  handleClose: () => void;
  show: boolean;
  children: ReactNode;
};

const Modal: React.FC<Props> = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div style={{ padding: '2rem' }}>{children}</div>
        <div>
          <Button variant="contained" color="primary">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
