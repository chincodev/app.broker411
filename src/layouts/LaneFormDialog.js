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
import ReportForm from './ReportForm'
import LaneForm from './LaneForm'

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

const LaneFormDialog = (props) => {

    const { open, setOpen } = props

    const report = useSelector(state => state.report)

    const dispatch = useDispatch()

    const valuesInitialState = {
        origin_city_id: null,
        destination_city_id: null,
        origin_region_id: null,
        destination_region_id: null,
        full_partial: 'all',
        available_date: [new Date(), new Date()],
        weight: '',
        length: '',
        dho: 100,
        dhd: 100,
        age: 24,
        categories: [],
    }

    const [ values, setValues ] = useState(valuesInitialState)

    


    return (
        <Dialog
            fullWidth
            open={open}
            scroll='body'
            maxWidth='md'
            onClose={()=>{{
                setOpen(false)
            }}}
            onBackdropClick={()=>{
                setOpen(false)
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
                    setOpen(false)
                }} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                    <Close />
                </IconButton>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography variant='h5' sx={{ mb: 4, lineHeight: '2rem' }}>
                        Create Lane
                    </Typography>
                </Box>
                {
                    <LaneForm 
                        review_id={report.reviewToReportId}
                        values={values}
                        setValues={setValues}
                        handleClose={
                            ()=>{
                                setOpen(false)
                            }
                        }
                    />
                }
            </DialogContent> 
        </Dialog>
    )
}

export default LaneFormDialog
