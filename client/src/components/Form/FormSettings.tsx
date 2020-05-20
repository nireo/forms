import React, { useState } from "react";
import { ContainerWrapper } from '../Layout/ContainerWrapper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export const FormSettings: React.FC = () => {
  const [customMessage, setCustomMessage] = useState<string>(""); 

  return (
    <ContainerWrapper>
      <Typography variant="h5">Form settings</Typography> 
      <Divider />
        <input value={customMessage} onChange={({ target }) => setCustomMessage(target.value)}/>
      <button>Change custom message</button>
    </ContainerWrapper>
  )
}
