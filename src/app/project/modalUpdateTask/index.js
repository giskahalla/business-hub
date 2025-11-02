
'use client';

import { Box, Button, ModalDialog, Modal, Typography, List, ListItem, Checkbox, Input } from '@mui/joy';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { useModal, MainButton } from '@/components'

import { project } from '@/services/redux/actions'


export default function ModalUpdateTask() {

  const dispatch = useDispatch()

  const { open, handleOpen, content } = useModal();

  const [checked, setChecked] = useState(content?.tasks || []);
  const [spent, setSpent] = useState(content?.spending || 0);

  useEffect(() => {
    setChecked(content?.tasks || [])
    setSpent(content?.spending || 0)
  }, [content])
  
  const handleConfirm = () => {
    dispatch(project.update_project_request({ ...content, tasks: checked }))
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
            Update Project
          </Typography>

          <Typography level="h5" sx={{ fontWeight: '500' }}>
            Total Spending
          </Typography>
          <Input
            type="number"
            variant="outlined"
            value={content?.spending || ''}
            onChange={(e) => setSpent(e.target.value)}
            startDecorator="$"
          />

          <Typography level="h5" sx={{ fontWeight: '500' }}>
            Progress
          </Typography>
          <List>
            {content?.tasks?.map((item, index) => (
              <ListItem variant="plain" key={index}>
                <Checkbox
                  label={item.title}
                  overlay
                  disabled={item?.status === 'done'}
                  checked={item?.status}
                  onChange={() =>
                    setChecked(prevChecked =>
                      prevChecked.map(task =>
                        task.title === item.title
                          ? { ...task, status: 'done' } 
                          : task                        
                      )
                    )
                  }
                  sx={{ color: 'inherit' }}
                />
              </ListItem>
          ))}
          </List>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <MainButton onClick={handleConfirm} title='Confirm'/>
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