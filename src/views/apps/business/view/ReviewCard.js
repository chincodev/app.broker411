// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import moment from 'moment'
import CustomChip from 'src/@core/components/mui/chip'
import { Avatar, Badge, CardHeader, Divider, IconButton, Menu, MenuItem, Alert, Button } from '@mui/material'
import { DeleteOutline, DotsVertical, ReplyOutline, Star, ThumbUp, EyeOutline, AlertBox, Clipboard, Attachment } from 'mdi-material-ui'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import Link from 'next/link'
import { useEffect, useInsertionEffect, useLayoutEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import DeleteReviewDialog from '../../review/dialog/DeleteReviewDialog'
import LikeButton from './LikeButton'
import { useDispatch } from 'react-redux'
import { openDetailsReviewDialog } from 'src/store/apps/review'
import { openReviewDialog } from 'src/store/apps/business'
import { openReportDialog } from 'src/store/apps/report'


const ReviewCard = ({ data, feedMode = false, reload }) => {

	const { 
    	title, 
		chipColor, 
		chipText, 
		src, 
		stats, 
		trend, 
		trendNumber 
	} = data

    const top = feedMode ? data.business : data.user.business

    const [ reviewMenuAnchorEl, setReviewMenuAnchorEl ] = useState(null)
	const [ show, setShow ] = useState(false)
    const [ mode, setMode ] = useState('')
	const [ showDeleteDialog, setShowDeleteDialog ] = useState(false)
    
    const dispatch = useDispatch()
	const router = useRouter()
    const auth = useAuth()
    const menuOpen = Boolean(reviewMenuAnchorEl)

    const handleReviewMenuClick = event => {
        setReviewMenuAnchorEl(event.currentTarget)
    }

    const handleReviewMenuClose = () => {
        setReviewMenuAnchorEl(null)
    }

    

    


   


    return (
        <Card sx={{ overflow: ' ', position: 'relative', display: "flex", flexDirection: "column" }}>
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
                              dispatch(openDetailsReviewDialog())
                              handleReviewMenuClose()
                              if(window.location.pathname === '/feed/' || window.location.pathname === '/dashboard/' || window.location.pathname === '/reviews/'){
                               
                                router.push(`${window.location.pathname}?reviewId=${data.id}`, '/reviews/'+data.id, { scroll: false, shallow: true })
                              } else {
                          
                                router.push(`/reviews/[id]`, '/reviews/'+data.id, { scroll: false })
                              }
                              
                            }}>
                                <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                                View Details
                            </MenuItem>
                            {
                                (auth.user.business && auth.user.business.id === data.business.id) && <MenuItem
                                    disabled={data.replies && data.replies.length > 0 ? true : false} 
                                    onClick={()=>{
                                      handleReviewMenuClose()
                                      
                                     
                                      if(window.location.pathname === '/feed/' || window.location.pathname === '/dashboard/' || window.location.pathname === '/reviews/'){
                                        router.push(`${window.location.pathname}?reviewId=${data.id}`, '/reviews/'+data.id+'#reply', { scroll: false, shallow: true })
                                      } else {
                                        router.push(`/reviews/[id]`, '/reviews/'+data.id+'#reply', { scroll: false })
                                      }
                                      

                                    }}
                                >
                                    <ReplyOutline fontSize='small' sx={{ mr: 2 }} />
                                    Reply 
                                </MenuItem>
                            }
                            <MenuItem onClick={()=>{
								dispatch(openReportDialog(data.id))
								handleReviewMenuClose()
							}}>
                                <AlertBox fontSize='small' sx={{ mr: 2 }} />
                                Report Review
                            </MenuItem>
                          
                            {
                                (auth.user.id === data.user.id) && <><Divider/><MenuItem 
                                  onClick={()=>{
                                    handleReviewMenuClose()
                                    setShowDeleteDialog(true)
                                  }}
                                  sx={{ color: 'error.main' }}
                                >
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
        {
          data.pictures.length > 0 && <Box style={{display:'flex', alignItems:'center', marginTop:'1.5em', cursor:'pointer'}} onClick={()=>{
            setMode('')
            setShow(true)
            handleReviewMenuClose()
            router.push(`${window.location.pathname}?reviewId=${data.id}`, '/reviews/'+data.id)}} >
<Attachment sx={{fontSize:'18px'}} />
&nbsp;
<Typography variant='caption'>
<strong>{data.pictures.length} Attached Images</strong>
</Typography>
</Box>
        }
      </CardContent>

      <Box style={{ marginTop: "auto" }}>
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
      {/* {
        show && <DialogReviewDetails
        setMode={setMode}
        setShow={setShow}
        mode={mode}
        top={top}
        id={data.id}
    />
      } */}
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
      <>
            <Divider></Divider>
            <CardContent style={{paddingBottom:'10px', paddingTop:'0px'}}>
              <Box>
                <LikeButton 
                  size='small'
                  data={data}
                />
                
              </Box>
            
            </CardContent>
          </>
      </Box>
      {
        showDeleteDialog && <DeleteReviewDialog 
          open={showDeleteDialog}
          setOpen={setShowDeleteDialog}
          reload={reload}
          data={data}
        />
      }
    </Card>
  )
}

export default ReviewCard