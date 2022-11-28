import { useState, forwardRef, useEffect, useRef } from 'react'
import React from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Close from 'mdi-material-ui/Close'
import DialogTabBrokerDetails from './components/create-business-tabs/DialogReviewForm'
import { useSelector } from 'react-redux'
import { closeReviewDialog } from 'src/store/apps/business'
import { useDispatch } from 'react-redux'
import ReviewForm from './ReviewForm'
import { isEmpty } from 'lodash'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { businessService } from 'services/business.service'
import { useDebounce } from 'use-debounce';
import ReviewFormAutocomplete from './ReviewFormAutocomplete'

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

const ReviewFormDialog = (props) => {

    const store = useSelector(state => state.business)

    const dispatch = useDispatch()

    const [ business, setBusiness ] = useState(null) 

    return (
        <Dialog
            fullWidth
            open={store.isReviewDialogOpen}
            scroll='body'
            maxWidth='md'
            onClose={()=>{{
                dispatch(closeReviewDialog())
                setTimeout(() => {
                    setBusiness(null)
                }, 500);
            }}}
            onBackdropClick={()=>{
                dispatch(closeReviewDialog())
                setTimeout(() => {
                    setBusiness(null)
                }, 500);
            }}
            TransitionComponent={Transition}
        >
            <DialogContent
                sx={{
                    position: 'relative',
                    pr: { xs: 5, sm: 12 },
                    pl: { xs: 4, sm: 11 },
                    pt: { xs: 8, sm: 12.5 },
                    pb: { xs: 5, sm: 12.5 }
                }}
            >
                <IconButton size='small' onClick={()=>{
                    dispatch(closeReviewDialog())
                    setTimeout(() => {
                        setBusiness(null)
                    }, 500);
                }} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                    <Close />
                </IconButton>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography variant='h5' sx={{ mb: 4, lineHeight: '2rem' }}>
                        Leave a Review
                    </Typography>
                </Box>
                {
                    !isEmpty(business) ? (
                        <ReviewForm 
                            business={business} 
                            allowResetBusiness={true}
                            setBusiness={setBusiness}
                            handleClose={
                                ()=>{
                                    dispatch(closeReviewDialog())
                                    setTimeout(() => {
                                        setBusiness(null)
                                    }, 500)
                                }
                            }
                        />
                    ) : (
                        <ReviewFormAutocomplete
                            setBusiness={setBusiness}
  
                        />
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default ReviewFormDialog
