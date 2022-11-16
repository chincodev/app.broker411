// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import moment from 'moment'
// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import { Avatar, Badge, CardHeader, Divider, IconButton, Menu, MenuItem, Alert } from '@mui/material'
import { DeleteOutline, DotsVertical, ReplyOutline, Star, ThumbUp, EyeOutline, AlertBox } from 'mdi-material-ui'

import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import DialogReviewDetails from '../../review/details/DialogWrapper'

const ReviewCard = ({ data, feedMode = false }) => {
  // ** Vars
    const { title, chipColor, chipText, src, stats, trend, trendNumber } = data

    const top = feedMode ? data.business : data.user.business

    const [reviewMenuAnchorEl, setReviewMenuAnchorEl] = useState(null)
    

    const [show, setShow] = useState(false)
    
    
    const [ mode, setMode ] = useState('')

    const auth = useAuth()

    const menuOpen = Boolean(reviewMenuAnchorEl)

    const handleReviewMenuClick = event => {
        setReviewMenuAnchorEl(event.currentTarget)
    }

    const handleReviewMenuClose = () => {
        setReviewMenuAnchorEl(null)
    }

    const router = useRouter()


    return (
        <Card sx={{ overflow: 'visible', position: 'relative', pb:4 }}>
            <CardHeader
                sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', pb:3 }}
                title={
                    <Link href='/brokers/[id]' as={`/brokers/${top.us_dot_number}`}>
                        <a style={{textDecoration:'none'}}>
                            <Typography noWrap sx={{fontWeight: 600, width:'100%', fontSize:'0.9em' }} style={{overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "block"}}
                            >
                                {top.legal_name}
                            </Typography>
                        </a>
                    </Link>
                }
                subheader={
                    <Typography variant='caption'>
                        {top.address_line_2} 
                        {' '}
                        &bull;&nbsp;{moment(data.createdAt).fromNow()}
                    </Typography>
                }
                action={
                    <>
                        <IconButton onClick={handleReviewMenuClick} size='small' aria-label='settings' className='card-more-options'>
                            <DotsVertical />
                        </IconButton>
                        <Menu
                            anchorEl={reviewMenuAnchorEl}
                            open={menuOpen}
                            onClose={()=>handleReviewMenuClose()}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem onClick={()=>{
                              setMode('')
                              setShow(true)
                              handleReviewMenuClose()
                              router.push(`${window.location.pathname}?reviewId=${data.id}`, '/reviews/'+data.id)}}>
                                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                                View Details
                            </MenuItem>
                            {
                                (auth.user.business && auth.user.business.id === data.business.id) && <MenuItem
                                    disabled={data.replies && data.replies.length > 0 ? true : false} 
                                    onClick={()=>{
                                      handleReviewMenuClose()
                                      setShow(true)
                                      setMode('reply')
                                      router.push(`${window.location.pathname}?reviewId=${data.id}`, '/reviews/'+data.id)

                                    }}
                                >
                                    <ReplyOutline fontSize='small' sx={{ mr: 2 }} />
                                    Reply 
                                </MenuItem>
                            }
                            <MenuItem onClick={()=>alert('This feature is coming soon')}>
                                <AlertBox fontSize='small' sx={{ mr: 2 }} />
                                Report Review
                            </MenuItem>
                          
                            {
                                (auth.user.id === data.user.id) && <><Divider/><MenuItem sx={{ color: 'error.main' }}>
                                    <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
                                    Delete
                                </MenuItem></>
                            }
                        </Menu>
                    </>
                }
                avatar={
                    <Link href='/brokers/[id]' as={`/brokers/${top.us_dot_number}`}>
                        <a style={{textDecoration:'none'}}>
                            <CustomAvatar
                                skin='light'
                                variant='rounded'
                                color={top.avatarColor}
                                sx={{ width: '2.5rem', height: '2.5rem' }}
                            >
                                {getInitials(top.legal_name)}
                            </CustomAvatar>
                        </a>
                    </Link>
                }

      >

      </CardHeader>
      <CardContent sx={{ pb: '0 !important' }}>
        {
          data.representative_name && <Box sx={{mb:3}}>
            <Typography>
              Brokerage Representative: <strong>{data.representative_name}</strong>
            </Typography>
          </Box>
        }
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column', overflow:'hidden' }}>
              
              
              
             
            </Box>
        </Box>
      
        <Grid container>
          <Grid item xs={12}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <CustomChip
                      rounded
                      size='small'
                      skin='light'
                      label={<div style={{display:'flex', alignItems:'center'}}>
                      <Star style={{color:'rgb(223 206 0)', marginBottom:'2px'}} />
                      <Typography variant='h7' sx={{ fontSize: '1rem', color: 'primary', marginRight:'.4em' }}>
                        &nbsp;{data.rating}/10
                      </Typography>
                      
                      
                    </div>}
                      sx={{ height: 48 }}>

                      </CustomChip>
            
                      {
                        feedMode && <><Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled', marginTop:'2px' }}>Review by<br /><strong>{data.user.business.legal_name}</strong></Typography></>
                      }
                      </div>
            {
              data.body && data.body.length > 0 && <><br /><Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography sx={{ mr: 1.5, pb:0.1, fontSize:'15px' }}>
                {data.body}
              </Typography>
            </Box></>
            }
          </Grid>
          
        </Grid>
        <Box style={{marginTop:'1rem'}}>
      {/* <IconButton aria-label='capture screenshot'>
        <ThumbUp />
      </IconButton> */}

        </Box>
      </CardContent>

      {
        data.categories && data.categories.length > 0 && <>
          <Divider></Divider>
      <CardContent style={{paddingBottom:'0px', paddingTop:'0px'}}>
        <Box style={{display:'flex', alignItems:'center',flexWrap: 'wrap'}}>
          {
            data.categories.map(x => <CustomChip sx={{mr:'5px', mt:'3px', mb:'3px'}} label={x.name} size='small' skin='light' color={x.type === 'good' ? 'primary' : 'error'} />)
          }
         </Box>
      </CardContent>
        </>
      }
      {
        show && <DialogReviewDetails
        setMode={setMode}
        mode={mode}
        top={top}
        id={data.id}
    />
      }
      {
        data.replies && data.replies.length > 0 && (
          <>
            <Divider></Divider>
            <CardContent style={{paddingBottom:'0px', paddingTop:'0px'}}>
              <Box style={{paddingTop:'8px'}}>
               
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
                  
                </Box>
                <Divider></Divider>
                <Typography variant='body1' style={{fontSize:'0.9rem'}}>
                {data['replies'][0]['body']}
                </Typography>
                </Alert>
              </Box>
            </CardContent>
          </>
        )
      }
    </Card>
  )
}

export default ReviewCard