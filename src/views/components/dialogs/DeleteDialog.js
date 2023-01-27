// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DeleteDialog = (props) => {

  const { title, subtitle, deleteRecord, recordId, open, setOpen } = props
  // ** State
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(null)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {subtitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button color='secondary' onClick={handleClose}>Cancel</Button>
        <Button color='error' onClick={() => {
          deleteRecord(recordId)
          handleClose()
        }}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
