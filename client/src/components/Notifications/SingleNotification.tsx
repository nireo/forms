import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';

type Props = {
  id: string;
};

export const SingleNotification: React.FC<Props> = ({ id }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!loaded) {
    }
  }, []);
  return <Container maxWidth="md"></Container>;
};
