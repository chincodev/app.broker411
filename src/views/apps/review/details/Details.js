// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import OutlinedInput from '@mui/material/OutlinedInput'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import Linkedin from 'mdi-material-ui/Linkedin'
import GiftOutline from 'mdi-material-ui/GiftOutline'
import LicenseIcon from 'mdi-material-ui/LicenseIcon'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import ClipboardOutline from 'mdi-material-ui/ClipboardOutline'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { replyService } from 'services/reply.service'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getInitials } from 'src/@core/utils/get-initials'
import moment from 'moment'
import { Reply, Star, ThumbUp, Send, Check, AlertBox, AlertCircleOutline } from 'mdi-material-ui'
import { AlertTitle, CircularProgress, List, ListItem, ListItemText, Rating, Alert, DialogTitle, DialogContentText, DialogActions, Avatar } from '@mui/material'
import toast from 'react-hot-toast'
import { green } from '@mui/material/colors'
import { reviewService } from 'services/review.service'
import FallbackSpinner from 'src/@core/components/spinner'
import { isEmpty } from 'lodash'
import { useAuth } from 'src/hooks/useAuth'
import LikeButton from '../../business/view/LikeButton'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const FacebookBtn = styled(IconButton)(({ theme }) => {
  return {
    color: theme.palette.common.white,
    backgroundColor: '#3B5998 !important',
    borderRadius: theme.shape.borderRadius
  }
})

const TwitterBtn = styled(IconButton)(({ theme }) => {
  return {
    margin: theme.spacing(0, 3),
    color: theme.palette.common.white,
    backgroundColor: '#55ACEE !important',
    borderRadius: theme.shape.borderRadius
  }
})

const LinkedInBtn = styled(IconButton)(({ theme }) => {
  return {
    color: theme.palette.common.white,
    backgroundColor: '#007BB6 !important',
    borderRadius: theme.shape.borderRadius
  }
})

const ReviewDetails = (props) => {

  console.log(props)

    const { id, top, mode, setMode } = props

    const router = useRouter()

    const auth = useAuth()

    const [ loading, setLoading ] = useState(false)

    const [ loadingData, setLoadingData ] = useState(true)

    const [ data, setData ] = useState(true)

    const getData = async (id) => {
      try {
        setLoadingData(true)
        let response = await reviewService.find(id)
        setData(response)
        setLoadingData(false)
      } catch (er) {
        console.log(er)
        setLoadingData(false)
      }
    }
    const [ isEdit, setIsEdit ] = useState(false)

    useEffect(() => {
      if(!isEmpty(props.data)){
        setIsEdit(false)
        setData(props.data)
        setLoadingData(false)
      } else {
        setIsEdit(false)
        getData(id)
      }
    }, [id])
    

    const [ reply, setReply ] = useState('')


    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        setLoading(true)
        const payload = {
          review_id: data.id,
          body: reply
        }
        const payloadEdit = {
          body: reply
        }

        let response = isEdit 
          ? await replyService.update(data['replies'][0]['id'], payloadEdit) 
          : await replyService.create(payload)
        setData({
          ...data,
          replies:[{
            ...payload,
            id: response.id
          }]
        })
        toast.success(`Reply sent.`)
        setIsEdit(false)
        setLoading(false)
      } catch (er){
        console.log(er)
        setLoading(false)
        if(er && er.errors && er.errors[0] && er.errors[0]['message']){
          toast.error(er.errors[0]['message'])
        } else {
          toast.error(`Couldn't delete reply... Contact support.`)
        }
      }
    }

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const handleClickOpen = () => setOpenDeleteDialog(true)
    const handleClose = () => setOpenDeleteDialog(false)

    const [ loadingDeleteReply, setLoadingDeleteReply ] = useState(false)

    const deleteReply = async (id) => {
      try {
        setLoadingDeleteReply(true)
        await replyService.delete(id)
        setData({
          ...data,
          replies:[]
        })
        handleClose()
        setIsEdit(false)
        setMode('')
        setReply('')
        toast.success(`Reply removed.`)
        setLoadingDeleteReply(false)
      } catch (er) {
       
        if(data && data.errors && data.errors[0] && data.errors[0]['message']){
          toast.error(data.errors[0]['message'])
        } else {
          toast.error(`Couldn't delete reply... Contact support.`)
        }
        
        setLoadingDeleteReply(false)
      }
    }


  return (
      <>
          {
            !isEmpty(data) && data.replies.length > 0 && <Dialog
            open={openDeleteDialog}
            
            maxWidth='md'
            disableEscapeKeyDown
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            onClose={(event, reason) => {
              if (reason !== 'backdropClick') {
                handleClose()
              }
            }}
          >
            {
              loadingDeleteReply ? (
                <Box sx={{pt:10, pb:10, display:'flex', alignItems:'center', justifyContent:'center', minWidth:'200px'}}>
                <CircularProgress />
              </Box>
              ) : (
                <>
                  <DialogTitle id='alert-dialog-title'>Delete your reply?</DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                    {!isEmpty(data) && data['replies'][0]['body']}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions className='dialog-actions-dense'>
                    <Button  onClick={handleClose}>Cancel</Button>
                    <Button color='error' onClick={()=>deleteReply(data['replies'][0]['id'])}>Yes</Button>
                  </DialogActions>
                </>
              )
            }
            
          </Dialog>
          }
        {
          loadingData ? (
            <Box sx={{pt:10, pb:10, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <DialogContent sx={{ pb: 0, mt: 0, pl:0, pr:0, position: 'relative' }}>
                {
                  !props.page && <IconButton
                  size='small'
                  onClick={() => router.back()}
                  sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                >
                  <Close />
                </IconButton>
                }
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb:5, px: [8, 8] }}>
        <Link href='/brokers/[id]' as={`/brokers/${top.us_dot_number}`}>
        <a style={{textDecoration:'none'}}><CustomAvatar
            skin='light'
            variant='rounded'
            color={top.avatarColor}
            sx={{ width: '3.5rem', height: '3.5rem' }}
          >
            {getInitials(top.legal_name)}
          </CustomAvatar></a>
           </Link>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column', overflow:'hidden' }}>
              <Link href='/brokers/[id]' as={`/brokers/${top.us_dot_number}`}><a style={{textDecoration:'none'}}>
                <Typography noWrap sx={{fontWeight: 600, width:'100%', fontSize:'1.1em' }} style={{overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block"}}>
                  {top.legal_name}
                  </Typography>
                  </a></Link>
              
              <Typography variant='caption'>
              {top.address_line_2} &bull; {moment(data.createdAt).fromNow()}
              </Typography>
             
            </Box>
        </Box>
        </DialogContent>
        <Divider sx={{ m: 0 }} />
        <DialogContent
            sx={{ pb: 6, px: [8, 8], pt: [5], position: 'relative' }}
        >
          
        
        {
          data.representative_name && <Box sx={{mb:3}}>
            <Typography>
              Brokerage Representative: <strong>{data.representative_name}</strong>
            </Typography>
          </Box>
        }

              <div style={{display:'flex', alignItems:'center', marginBottom:'1rem'}}>
                        <Rating size="medium" max={10} readOnly value={data.rating} name='read-only' />

                      <Typography sx={{ fontSize: '1.1rem', color: 'primary', marginRight:'.4em', paddingTop:'0.3rem' }}>
                        &nbsp;{data.rating}/10
                      </Typography>
                      
                      
                    </div>
                    {
                        data.body && <Typography variant='body'>
                        {data.body}
                        </Typography>
                    }
                    
              
                    {console.log(data)}

              {
                data.categories && data.categories.length > 0 && <List dense>
                    <br />
                    {
                        data.categories.map(x => <ListItem sx={{display:'flex', alignItems:'center'}} >
                       <CustomAvatar color={data.type === 'good' ? 'success' : 'error'} sx={{ width: 34, height: 34, mr:2 }}>
                       {data.type === 'good' ? <Check sx={{ fontSize: '1.25rem' }} /> : <AlertCircleOutline sx={{ fontSize: '1.25rem' }} /> } 
                       
          </CustomAvatar>
                            <ListItemText><Typography style={{fontSize:'1.1rem'}}>{x.description}</Typography></ListItemText>
                            
                        </ListItem>)
                    }
                </List>
              }
              <br/>
              <small style={{float:'right', marginTop:'5px', color:'#cccccc'}}>Ref#{props.id}</small>
        </DialogContent>
        <Divider sx={{ m: 0 }} />
        <DialogContent sx={{ pb: 2, px: [8, 8], pt: [2], position: 'relative' }}>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <LikeButton
          size='small'
          data={data}
          />
              
          {
            (data.replies && data.replies.length > 0) || !auth.user.business || (auth.user.business.id != data.business.id) ? '' : <Button onClick={()=>mode === 'reply' ? setMode('') : setMode('reply')} type='button' size={'large'} color={mode === 'reply' ? 'primary' : 'secondary'} >
            <Reply sx={{mr:2}}></Reply>
            Reply
          </Button>
          }
          <Button onClick={()=>alert('Feature coming soon.')} type='button' size={'large'} color='secondary' >
            <AlertBox sx={{mr:2}}></AlertBox>
            Report
          </Button>
          </Box>
        </DialogContent>
        {console.log(mode)}
        {
          ((data.replies && data.replies.length === 0 && mode === 'reply') || isEdit) &&  <>
          <Divider sx={{ m: 0 }} />
          <DialogContent sx={{ pb: 4, px: [8, 8], pt: [4], position: 'relative' }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{display:'flex', flexDirection:'column'}}>
                  <TextField value={reply} onChange={(e) => setReply(e.target.value)} autoFocus={ mode === 'reply' ? true : false} label={`${isEdit ? 'Edit' : 'Write'} your reply`} placeholder={`${isEdit ? 'Edit' : 'Write'} your reply`} style={{width:'100%'}} size="small" />
                  <Box sx={{mt:2, textAlign:'end'}}>
                    <Button onClick={()=>{
                      setIsEdit(false)
                      setMode('')
                    }} disabled={loading} type='button' color='error'>
                      Cancel
                    </Button>
                    <Button disabled={loading} type='submit' sx={{ml:2}}>
                      Save
                    </Button>
                  </Box>
              </Box>
            </form>
          </DialogContent>
          </>
        }
        {
          (auth.user.business.id === data.business.id) && data.replies && data.replies.length > 0 && !isEdit && <>
            <Divider sx={{ m: 0 }} />
            <DialogContent sx={{ pb: 4, px: [8, 8], pt: [4], position: 'relative' }}>
              <Box>
                <Alert icon={false} severity='info' sx={{ mb: 4 }}>
                  <AlertTitle sx={{ mb: theme => `${theme.spacing(1)} !important` }}>
                    Reply
                  </AlertTitle>
                  {data['replies'][0]['body']}
                  <Box style={{textAlign:'end', marginTop:'1rem'}}>
                    <Button onClick={()=>{
                      setIsEdit(true)
                      setReply(data['replies'][0]['body'])
                    }} size='small' disabled={loadingDeleteReply} variant='outlined'>
                      Edit
                    </Button>
                    &nbsp;&nbsp;
                    <Button size='small' disabled={loadingDeleteReply} onClick={()=>handleClickOpen()} variant='outlined' color='error'>
                      Delete
                    </Button>
                  </Box>
                </Alert>
              </Box>
            </DialogContent>
          </>
        }


        {console.log(data)}
      {
          (auth.user.business.id != data.business.id) && data.replies && data.replies.length > 0 && <>
            <Divider sx={{ m: 0 }} />
            <DialogContent sx={{ pb: 4, px: [8, 8], pt: [4], position: 'relative' }}>
              
                <Alert color='info' icon={false} style={{
                width:'100%',
                display:'block'
              }}>
                <Box style={{
                display:'flex',
                justifyContent:'space-between',
                width:'100%'
              }}>
                <Box style={{
                display:'flex',
                alignItems:'center',
                
              }}>
                  <Avatar alt='message' src={`https://avatars.dicebear.com/api/bottts/${data['replies'][0]['user_id']}.png`} />
                  <Box style={{marginLeft:'1rem', width:'100%'}}>
                    <Typography variant='body2' style={{fontWeight:'700'}}>{data['replies'][0]['user']['name'] ? data['replies'][0]['user']['name'] : '@'+data['replies'][0]['user']['username']}</Typography>
                    <Typography variant='caption'>{data['business']['type'].toUpperCase()} {data['replies'][0]['user']['role']['name'].toUpperCase()}</Typography>
                    
                  </Box>
                </Box>
                  <small>Last Edit {moment(data['replies'][0]['updatedAt']).fromNow()}</small>
                </Box>
                <Divider></Divider>
                <Typography variant='body1'>
                {data['replies'][0]['body']}
                </Typography>
                </Alert>
              
            </DialogContent>
          </>
        } 

            </>
          )
        }
      </>
    
  )
}

export default ReviewDetails