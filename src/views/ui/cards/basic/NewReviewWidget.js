import { Avatar, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, IconButton, TextField, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { Close } from 'mdi-material-ui'
import React, { forwardRef, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { businessService } from 'services/business.service'
import { useAuth } from 'src/hooks/useAuth'
import DialogTabBrokerDetails from '../../../../../src/layouts/components/create-business-tabs/DialogReviewForm'

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})
  
const NewReviewWidget = () => {

    const [ widgetInput, setWidgedInput ] = useState('')
    const [ openDialog, setOpenDialog ] = useState(false)
    const [ dotSearch, setDotSearch ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ business, setBusiness ] = useState({})
    const [ show, setShow ] = useState(false)
    
    const auth = useAuth()

    useEffect(() => {
        if(openDialog) document.getElementById('widget').blur()
    }, [openDialog])

    const searchBroker = async () => {
        try {
            setLoading(true)
            let response = await businessService.find_broker_in_fmcsa(dotSearch)
            setBusiness(response.record)
            setShow(true)
            setOpenDialog(false)
            setLoading(false)
        } catch (er) {
            if(er.errors && er.errors[0]){
                toast.error(er.errors[0]['message'])
            };
            setLoading(false)
        }
    }

    const handleClose = async () => {
        setBusiness({})
        setShow(false)
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Box 
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar
                            alt={auth.user.username}
                            sx={{ width: 40, height: 40, marginRight: 2 }}
                            src={'https://avatars.dicebear.com/api/bottts/'+auth.user.id+'.png'}
                        />
                        <TextField 
                            value={''} 
                            size='small'
                            onClick={()=>setOpenDialog(true)}
                           
                            id='widget' 
                            fullWidth 
                    
                            placeholder={`What Are You Thinking About ${auth.user.username}?`}
                        />
                    </Box>
                </CardContent>
            </Card>

            {
                isEmpty(business) && <Dialog open={openDialog} onClose={() => setOpenDialog(false)} style={{height:''}} aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>To Leave a Review </DialogTitle>
                   
                    
                    <DialogContent>
                    <DialogContentText sx={{ mb: 3 }}>
                    Enter the DOT number of the broker who you want to review
          </DialogContentText>
                    {/* <Typography>Enter DOT number of broker</Typography> */}
                        <TextField disabled={loading} value={dotSearch} onChange={(e)=>setDotSearch(e.target.value)} id='name' autoFocus fullWidth type='number' placeholder='DOT Number' />
                    </DialogContent>
                    <DialogActions className='dialog-actions-dense'>
                        <Button disabled={loading} onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button disabled={!!!dotSearch || loading} onClick={(e)=>{
                            searchBroker()
                        }}>
                            {loading ? 'Searching...' : 'Search'}
                        </Button>
                    </DialogActions>
                </Dialog>
            }

            {
                !isEmpty(business) && <Dialog
                    fullWidth
                    open={show}
                    scroll='body'
                    maxWidth='md'
                    onClose={handleClose}
                    onBackdropClick={handleClose}
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
                        <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                            <Close />
                        </IconButton>
                        <Box sx={{ mb: 3, textAlign: 'center' }}>
                            <Typography variant='h5' sx={{ mb: 4, lineHeight: '2rem' }}>
                                Leave a Review
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                            <DialogTabBrokerDetails
                                business={business}
                                handleClose={handleClose}
                                setVerify={()=>console.log('object')}
                            />
                        </Box>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}

export default NewReviewWidget