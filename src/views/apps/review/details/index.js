// ** React Imports
import { useState, forwardRef } from 'react'

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
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getInitials } from 'src/@core/utils/get-initials'
import moment from 'moment'
import { Reply, Star, ThumbUp, Alert, Send, Check } from 'mdi-material-ui'
import { List, ListItem, ListItemText, Rating } from '@mui/material'

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

const DialogReviewDetails = (props) => {

    const { data, top, mode, setMode } = props

    const router = useRouter()

    const [ reply, setReply ] = useState('')

  return (
      <Dialog
        
        fullWidth
        open={!!router.query.reviewId}
        maxWidth='md'
        scroll='body'
        TransitionComponent={Transition}
        onBackdropClick={() => router.back()}
      >
        <DialogContent sx={{ pb: 0, mt: 0, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => router.back()}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb:4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Review #{data.id}
            </Typography>
          </Box>
        </DialogContent>
        <Divider sx={{ m: 0 }} />
        <DialogContent
            sx={{ pb: 6, px: [8, 15], pt: [5], position: 'relative' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb:5 }}>
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
        
        

              <div style={{display:'flex', alignItems:'center', marginBottom:'1rem'}}>
                        <Rating size="large" max={10} readOnly value={data.rating} name='read-only' />

                      <Typography variant='h7' sx={{ fontSize: '1.4rem', color: 'primary', marginRight:'.4em', paddingTop:'0.3rem' }}>
                        &nbsp;{data.rating}/10
                      </Typography>
                      
                      
                    </div>
                    {
                        data.body && <Typography variant='body'>
                        {data.body}
                        </Typography>
                    }
                    
              


              {
                data.categories.length > 0 && <List dense>
                    <br />
                    {
                        data.categories.map(x => <ListItem sx={{display:'flex', alignItems:'center'}} >
                       <CustomAvatar skin='light' color={data.type === 'good' ? 'success' : 'error'} sx={{ width: 34, height: 34, mr:2 }}>
                       {data.type === 'good' ? <Check sx={{ fontSize: '1.25rem' }} /> : <Alert sx={{ fontSize: '1.25rem' }} /> }
          
          </CustomAvatar>
                            <ListItemText><Typography style={{fontSize:'1.1rem'}}>{x.description}</Typography></ListItemText>
                            
                        </ListItem>)
                    }
                </List>
              }
        </DialogContent>
        <Divider sx={{ m: 0 }} />
        <DialogContent sx={{ pb: 2, px: [8, 15], pt: [2], position: 'relative' }}>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <Button type='button' size={'large'} color='secondary' >
            <ThumbUp sx={{mr:2}} onClick={()=>console.log('Comming soon')}></ThumbUp>
            Like
          </Button>
          {console.log(mode)}
          <Button onClick={()=>mode === 'reply' ? setMode('') : setMode('reply')} type='button' size={'large'} color={mode === 'reply' ? 'primary' : 'secondary'} >
            <Reply sx={{mr:2}}></Reply>
            Reply
          </Button>
          <Button type='button' size={'large'} color='secondary' >
            <Alert sx={{mr:2}}></Alert>
            Report
          </Button>
          </Box>
        </DialogContent>
        {
          mode === 'reply' && <>
          <Divider sx={{ m: 0 }} />
          <DialogContent sx={{ pb: 4, px: [8, 15], pt: [4], position: 'relative' }}>
            <form>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <TextField value={reply} onChange={(e) => setReply(e.target.value)} autoFocus={ mode === 'reply' ? true : false} placeholder='Write your reply...' style={{width:'100%'}} size="small" />
                <IconButton sx={{ml:2}}><Send /></IconButton>
            </Box>
            </form>
          </DialogContent>
          </>
        }
      </Dialog>
    
  )
}

export default DialogReviewDetails