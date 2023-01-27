import { useState, forwardRef } from 'react'
import React from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Close from 'mdi-material-ui/Close'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import LoadForm from './Form'
import { DialogTitle } from '@mui/material'

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

const LoadFormDialog = (props) => {

    const report = useSelector(state => state.report)

    const dispatch = useDispatch()

    const [ business, setBusiness ] = useState(null) 

    return (
        <Dialog
            fullWidth
            open={props.open}
            scroll='body'
            maxWidth='md'
            onClose={()=>{
                props.setOpen(false)
            }}
            onBackdropClick={()=>{
                props.setOpen(false)
            }}
            TransitionComponent={Transition}
        >
            <DialogTitle id='form-dialog-title'>Add Load</DialogTitle>
            <DialogContent>
                {/* <IconButton size='small' onClick={()=>{
                   props.setIsDialogOpen(false)
                }} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                    <Close />
                </IconButton> */}
                
                <LoadForm 
                    reload={props.reload}
                    handleClose={
                        ()=>{
                            props.setOpen(false)
                        }
                    }
                />
            </DialogContent> 
        </Dialog>
    )
}

export default LoadFormDialog