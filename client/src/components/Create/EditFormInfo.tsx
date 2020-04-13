import React, { useState, useEffect, ChangeEvent } from 'react';
import { FormInput } from './FormInput';
import Button from '@material-ui/core/Button';

type Props = {
  title: string;
  description: string;
  updateFormInfo: (newTitle: string, newDescription: string) => void;
};

export const EditFormInfo: React.FC<Props> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded && props.title !== 'Untitled Form') {
      setTitle(props.title);
      setDescription(props.description);
      setLoaded(true);
    }
  }, [props, loaded]);

  const handleFormInfoUpdate = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.updateFormInfo(title, description);
  };

  return (
    <div>
      <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        style={{
          border: 'none',
          fontSize: '36px',
          fontFamily: 'Roboto',
          width: '100%',
        }}
        placeholder="Title..."
        maxLength={50}
      />
      <FormInput
        placeholder="Form description"
        value={description}
        setValue={setDescription}
      />

      <form onSubmit={handleFormInfoUpdate}>
        <Button
          variant="contained"
          style={{
            color: 'white',
            marginTop: '1rem',
            marginBottom: '1rem',
            backgroundColor: '#ff9999',
          }}
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};
