import React, { useState, ChangeEvent } from "react";
import { ContainerWrapper } from '../Layout/ContainerWrapper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const FormSettings: React.FC = () => {
  const [customMessage, setCustomMessage] = useState<string>(""); 
  const [receiveMessages, setReceiveMessages] = useState<boolean>(false);

  const handleSettingsUpdate = (event: ChangeEvent<HTMLFormElement>) =>  {
    event.preventDefault(); 
  }

  return (
    <ContainerWrapper>
      <Typography variant="h4">Form settings</Typography> 
      <Divider style={{ marginTop: "2rem", marginBottom: "2rem"}} />
      <Typography variant="h5">Custom message</Typography> 
      <form onSubmit={handleSettingsUpdate}>
        <TextField 
            value={customMessage}
            onChange={({ target }) => setCustomMessage(target.value)}
            placeholder="Custom message"
            style={{ width: "100%", marginTop: "2rem", marginBottom: "2rem" }}
        /> 
        <Button variant="contained">Update custom message</Button>
      </form>
      <Divider style={{ marginTop: "2rem", marginBottom: "2rem"}} />
      <Typography variant="h5">Other settings</Typography>
      <form onSubmit={handleSettingsUpdate}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={receiveMessages}
              onChange={() => setReceiveMessages(!receiveMessages)}
              name="receive-messages-checkbox"
              color="primary"
            />
          }
          label="Receive messages when form is answered"
        />
      </form> 
    </ContainerWrapper>
  )
}
