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
import { closeReviewDialog } from 'src/store/apps/business'
import { useDispatch } from 'react-redux'
import ReviewForm from './ReviewForm'
import { isEmpty } from 'lodash'
import ReviewFormAutocomplete from './ReviewFormAutocomplete'
import { closeReportDialog } from 'src/store/apps/report'
import ReportForm from './ReportForm'

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

const ReportFormDialog = (props) => {

    const report = useSelector(state => state.report)

    const dispatch = useDispatch()

    const [ business, setBusiness ] = useState(null) 

    return (
        <Dialog
            fullWidth
            open={report.reviewToReportId}
            scroll='body'
            maxWidth='md'
            onClose={()=>{{
                dispatch(closeReportDialog())
                setTimeout(() => {
                    setBusiness(null)
                }, 500);
            }}}
            onBackdropClick={()=>{
                dispatch(closeReportDialog())
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
                    dispatch(closeReportDialog())
                }} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                    <Close />
                </IconButton>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography variant='h5' sx={{ mb: 4, lineHeight: '2rem' }}>
                        Report Review {report.reviewToReportId}
                    </Typography>
                </Box>
                {
                    <ReportForm 
                        review_id={report.reviewToReportId}
                        handleClose={
                            ()=>{
                                dispatch(closeReportDialog())
                            }
                        }
                    />
                }
            </DialogContent> 
        </Dialog>
    )
}

export default ReportFormDialog
