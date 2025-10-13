
'use client';

import { Box, Button, ModalDialog, Modal, Typography } from '@mui/joy';
import { useDispatch } from 'react-redux';

import { useModal } from '../../components'

import { customer } from '@/services/redux/actions'


export const ModalStatus = () => {

  const dispatch = useDispatch()

  const { open, handleOpen, content } = useModal();
  
  const handleConfirm = () => {
    if(content.type === 'customer') dispatch(customer.update_customer_request(content?.data))
    handleOpen()
  }

  return (
      <Modal open={open} onClose={handleOpen}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            {content?.title}
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            {content?.desc}
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button variant="solid" color="primary" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={handleOpen}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
  );
}