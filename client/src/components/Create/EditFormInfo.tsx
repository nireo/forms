import React, { useState, useEffect } from 'react';
import { FormInput } from './FormInput';

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

  const handleFormInfoUpdate = (event: any) => {
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
        onBlur={handleFormInfoUpdate}
      />
      <FormInput
        placeholder="Form description"
        value={description}
        setValue={setDescription}
      />
    </div>
  );
};
