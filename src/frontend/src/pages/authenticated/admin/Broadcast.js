import { toast } from 'react-toastify';
import SendIcon from '@mui/icons-material/Send';
import WarningIcon from '@mui/icons-material/Warning';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BodyText from 'components/atoms/BodyText';
import Button from 'components/atoms/Button';
import PageTitle from 'components/atoms/PageTitle';
import api from 'utils/api';

export default function Broadcast() {
  const handleBroadcast = async () => {
    await api.post('/notifications/test');
    toast('Broadcast successful', { type: 'success' });
  };

  return (
    <Container>
      <Alert icon={<WarningIcon fontSize="inherit" />} severity="error" sx={{ mb: 2 }}>
        For Demo Purposes Only. Please remove this page on actual Project Implementation.
      </Alert>

      <Box>
        <PageTitle title="Test Broadcast" align="center" />

        <BodyText>
          This page is intended for you to broadcast sample real-time notifications to all other
          users except you. Before clicking the button below, make sure to log in with another
          existing user account in a different browser to see if you receive the notification in
          real-time without refreshing the page.
        </BodyText>

        <Button onClick={handleBroadcast} endIcon={<SendIcon />}>
          Send Broadcast
        </Button>
      </Box>
    </Container>
  );
}
