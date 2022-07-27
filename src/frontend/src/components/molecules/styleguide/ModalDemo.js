import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Box from '@mui/material/Box';
import BodyText from 'components/atoms/BodyText';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Modal from 'components/organisms/Modal';

function ModalDemo() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Heading variant="h4" align="center">
        Modal
      </Heading>

      <BodyText>
        Usually, the default MUI Modal is used in forms and other parts of the site. However, there
        are cases where developer tends to override it causing inconsistensy on other pages.
      </BodyText>

      <BodyText>
        Therefore, we will use our custom Modal component with initial styling derived from the{' '}
        <strong>Modal</strong> component of MUI with additional styling that will match our system
        needs.
      </BodyText>

      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal open={open} handleClose={handleClose} title="Sample Modal">
        <Box sx={{ p: 4 }}>This is my modal content.</Box>
      </Modal>

      <SyntaxHighlighter language="javascript" style={monokai}>
        {`import Modal from 'components/organisms/Modal';
import Button from 'components/atoms/Button';
import Box from '@mui/material/Box';

const [open, setOpen] = useState(false);
const handleClose = () => setOpen(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>

<Modal open={open} handleClose={handleClose} title="Sample Modal">
  <Box sx={{ p: 4 }}>
    <BodyText>This is my modal content.</BodyText>
  </Box>
</Modal>`}
      </SyntaxHighlighter>
    </Box>
  );
}

export default ModalDemo;
