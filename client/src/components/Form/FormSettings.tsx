import React, { useState, ChangeEvent } from 'react';
import { ContainerWrapper } from '../Layout/ContainerWrapper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { updateFormSettings } from '../../services/form.service';
import { FormSettingsStringFormat } from '../../interfaces/Form';
import { FormInput } from '../Create/FormInput';

type Props = {
  id: string;
};

export const FormSettings: React.FC<Props> = ({ id }) => {
  const [customMessage, setCustomMessage] = useState<string>('');
  const [receiveMessages, setReceiveMessages] = useState<boolean>(false);

  const handleSettingsUpdate = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newSettings: FormSettingsStringFormat = {
      customMessage,
      receiveMessages: receiveMessages ? 'true' : 'false',
    };

    updateFormSettings(newSettings, id);
  };

  return (
    <ContainerWrapper>
      <Typography variant="h4">Form settings</Typography>
      <Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      <form onSubmit={handleSettingsUpdate}>
        <Typography variant="h5">Custom message</Typography>
        <div style={{ width: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
          <FormInput
            value={customMessage}
            setValue={setCustomMessage}
            placeholder="Custom message"
          />
        </div>

        <Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
        <Typography variant="h5">Other settings</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={receiveMessages}
              onChange={() => setReceiveMessages(!receiveMessages)}
              name="receive-messages-checkbox"
              style={{ color: '#ff9999' }}
            />
          }
          label="Receive messages when form is answered"
        />
        <Button type="submit" variant="contained">
          Update custom message
        </Button>
      </form>
    </ContainerWrapper>
  );
};
