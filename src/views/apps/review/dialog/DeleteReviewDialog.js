import { Fragment, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { reviewService } from 'services/review.service'
import toast from 'react-hot-toast'

const DeleteReviewDialog = (props) => {

    const { open, setOpen, data, reload } = props
    const [ loading, setLoading ] = useState(false)
    const handleClose = () => setOpen(false)

    const handleDelete = async () => {
        try {
            setLoading(true)
            await reviewService.delete(data.id)
            setLoading(false)
            toast.success(`Review #${data.id} deleted`)
            reload()
            handleClose()
        } catch (er) {
            console.log(er)
            setLoading(false)
            if(er && er.errors && er.errors[0] && er.errors[0]['message']){
              toast.error(er.errors[0]['message'])
            } else {
              toast.error(`Couldn't delete reply... Contact support.`)
            }
        }
    }

    return (
        <Dialog
            open={open}
            disableEscapeKeyDown
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleClose()
                }
            }}  
        >
            <DialogTitle id='alert-dialog-title'>Are you sure you want to delete this review?</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    Click <strong>YES</strong> and your review will be permanently deleted.
                </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
                <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                <Button disabled={loading} color='error' onClick={handleDelete}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteReviewDialog
