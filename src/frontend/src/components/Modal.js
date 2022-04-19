import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '4px',
};

Modal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  children: PropTypes.any,
  handleClose: PropTypes.func,
};

Modal.defaultProps = {
  open: false,
};

export default function Modal({ title, open, children, handleClose }) {
  const handleOnClose = (event, reason) => {
    // prevent close on backdrop click
    if (reason && reason == 'backdropClick') return;
    handleClose();
  };

  return (
    <StyledModal
      open={open}
      onClose={handleOnClose}
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
      BackdropComponent={Backdrop}
    >
      <Box sx={style}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 1,
            borderBottom: 1,
            borderColor: 'text.primary',
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={handleClose} sx={{ p: 0 }} disableRipple={true}>
            <CloseIcon />
          </IconButton>
        </Box>

        {children}
      </Box>
    </StyledModal>
  );
}
