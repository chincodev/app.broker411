import { useState, forwardRef, useEffect } from 'react'
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

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

const ReviewFormDialog = (props) => {

    const store = useSelector(state => state.business)

    const { business, btnText } = props
    const [ actionsLoading, setActionsLoading ] = useState(false)
    const [ scopedBusiness, setScopedBusiness ] = useState(null)
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        if(!business || isEmpty(business)){
            setScopedBusiness(null)
        } else {
            setScopedBusiness(business)
        }
    }, [business])


    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    function sleep(delay = 0) {
        return new Promise((resolve) => {
          setTimeout(resolve, delay);
        });
      }

    React.useEffect(() => {
        let active = true;
    
        if (!loading) {
          return undefined;
        }
    
        (async () => {
          await sleep(1e3); // For demo purposes.
    
          if (active) {
            setOptions([...topFilms]);
          }
        })();
    
        return () => {
          active = false;
        };
      }, [loading]);


    return (
        <Dialog
            fullWidth
            open={store.isReviewDialogOpen}
            scroll='body'
            maxWidth='md'
            onClose={()=>dispatch(closeReviewDialog())}
            onBackdropClick={()=>dispatch(closeReviewDialog())}
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
                <IconButton size='small' onClick={()=>dispatch(closeReviewDialog())} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                    <Close />
                </IconButton>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography variant='h5' sx={{ mb: 4, lineHeight: '2rem' }}>
                        Leave a Review
                    </Typography>
                </Box>
                <Box sx={{ width:'100%', display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                    {
                        scopedBusiness ? <ReviewForm 
                            business={scopedBusiness}
                            handleClose={()=>dispatch(closeReviewDialog())}
                            setVerify={props.setVerify}
                        /> : <Box sx={{width:'100%'}}>
                            <Autocomplete
                                id="asynchronous-demo"
                                sx={{ width: 300, width: '100%' }}
                                open={open}
                                fullWidth
                                onOpen={() => {
                                    setOpen(true);
                                }}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                isOptionEqualToValue={(option, value) => option.title === value.title}
                                getOptionLabel={(option) => option.title}
                                options={options}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search a broker"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        
                    }
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewFormDialog
