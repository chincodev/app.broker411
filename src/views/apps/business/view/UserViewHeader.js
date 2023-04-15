// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomAvatar from 'src/@core/components/mui/avatar'
// ** Third Party Imports
import axios from 'axios'
import queryString from 'query-string'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import ShowMoreDialog from 'src/layouts/ShowMoreDialog'
import AddReviewDialog from 'src/layouts/AddReviewDialog'
import { CircularProgress, Divider, List, Menu, Rating } from '@mui/material'
import { getInitials } from 'src/@core/utils/get-initials'
import { user_businessService } from 'services/user_business.service'
import { blue, green } from '@mui/material/colors'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import { isEmpty } from 'lodash'
import { Router } from 'mdi-material-ui'
import { useRouter } from 'next/router'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const UserViewHeader = (props) => {

  const auth = useAuth()
  

  const { business } = props
  const [data, setData] = useState({})
  const [ follow, setFollow ] = useState(false)
  const [ loadingFollow, setLoadingFollow ] = useState(true)
  const designationIcon = data?.designationIcon || 'mdi:briefcase-outline'
  const router = useRouter()

  const renderUserAvatar = () => {
    if (business) {
      if (business.logo) {
        return (
          <CustomAvatar alt='User Image' src={business.logo} variant='rounded' sx={{ width: 120, height: 120, mb: 4 }} />
        )
      } else {
        return (
          <CustomAvatar
            skin='light'
            variant='rounded'
            color={business.avatarColor}
            sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
          >
            {getInitials(business.legal_name)}
          </CustomAvatar>
        )
      }
    } else {
      return null
    }
  }

  	const createUser_business = async (data) => {
	
		try {
			setLoadingFollow(true)
			await user_businessService.create(data)
			
			getUser_businesses()
		} catch (er) {
			console.log(er);
		}
	}

	const updateUser_business = async (id, email_notifications_on_reviews) => {
		try {
			setLoadingFollow(true)
			await user_businessService.update(follow.id, {
				email_notifications_on_reviews
			})
			getUser_businesses()
			
		} catch (er) {
			console.log(er);
		}
	}

	const getUser_businesses = async () => {
		try {
			setLoadingFollow(true)
			const requiredFilter = {
				filter_type: ['eq'],
				filter_field: ['business_id'],
				filter_value: [business.id]
			}
			let data = await user_businessService.list('?'+queryString.stringify(requiredFilter, {arrayFormat:'bracket'}))
      setFollow(data.data[0])
      setLoadingFollow(false)
		} catch (er) {
			toast.error('Error getting follow status.', {
				duration: 2000
			})
			console.log(er);
		}
	}

	useEffect(() => {	
    if(!isEmpty(auth.user)){
      getUser_businesses()
    }
	}, [])

	

	const handleUpdateFollow = (value) => {
    console.log(follow);
		if(follow){
			
			if(follow.email_notifications_on_reviews){
				updateUser_business(business.id, value)
			} else {
				updateUser_business(business.id, value)
			}
		} else {
  
			createUser_business({
				business_id: business.id,
				email_notifications_on_reviews: true
			})
		}
	}

  return <Card>
      {/* <CardMedia
        component='img'
        alt='profile-header'
        image={data.coverImg}
        sx={{
          height: { xs: 150, md: 250 }
        }}
      /> */}
      <CardContent
        sx={{
          pt: 4,
          // mt: -8,
          display: 'flex',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        
        {renderUserAvatar()}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: {md:'flex-end', sm:'center'},
            flexWrap: ['wrap', 'nowrap'],
            flexDirection: {md:'row', sm:'column'},
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [, 0], display: 'flex', flexDirection: 'column', alignItems: {sm:'center', md:'flex-start'} }}>
            <Box sx={{textAlign: {md:'left', sm:'center'}}}>
              <Typography variant='h5' sx={{fontSize: '1.375rem', mb:1}}>
                {business.legal_name}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{business.dba_name ? 'DBA NAME: '+business.dba_name : ''}</Typography>
              <Typography sx={{ color: 'text.primary', fontWeight: 900 }}>{business.mc_mx_ff_numbers || '-'}{business.us_dot_number ? ' | US DOT ' : ''}{business.us_dot_number }</Typography>
              <Box
                sx={{
                  display: 'flex',
                  mt: 4, 
                  mb: 4,
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  justifyContent: ['center', 'flex-start']
                }}
              >

                <Box sx={{ justifyContent:{sm:'center', md:'start'}, mr: 4, mb: 3, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                  <Icon icon='mdi:map-marker-outline' />
                  <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>{business.address}{' '}{business.address_line_2}</Typography>
                </Box>
                {
                  business.email && <Box sx={{ justifyContent:{sm:'center', md:'start'}, mb: 3, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                    <Icon icon='mdi:email' />
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{business.email || '-'}</Typography>
                  </Box>
                }
                
                {
                  business.phone && <Box sx={{ justifyContent:{sm:'center', md:'start'}, mb: 3, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                    <Icon icon='mdi:phone' />
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{business.phone || '-'}</Typography>
                  </Box>
                }
                
                {
                  business.registration_date && <Box sx={{ justifyContent:{sm:'center', md:'start'}, mb: 3, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                    <Icon icon='mdi:calendar' />
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{business.registration_date || '-'}</Typography>
                  </Box>
                }

                {
                  business.reviewCount ? <Box style={{display:'flex', alignItems:'center'}}>
                      <Rating size="small" readOnly max={10} value={business.avgRating} name='simple-controlled'  /> 
                      &nbsp;
                      <small>({business.reviewCount})</small>
                  </Box> : ''
                }
                
               
              </Box>
            </Box>
            <Box style={{display:'flex', justifyContent:{sm:'center', md:'start'}}}>
              <ShowMoreDialog business={business}  />&nbsp;
                  <AddReviewDialog 
                    business={business}  
                    noUser={()=>router.replace({
                        pathname: '/login',
                        query: { returnUrl: router.asPath }
                      })}
                />
            </Box>
            
            
          </Box>

            {
                !isEmpty(auth.user) && <div style={{marginTop:'0.5rem'}}>
                    <Button
                        color={loadingFollow ? 'secondary' : (follow && follow.email_notifications_on_reviews ? 'primary' : 'secondary')}
                        variant={'contained'}
		                disabled={loadingFollow}
                        startIcon={<Icon icon={`mdi:bell${follow && follow.email_notifications_on_reviews ? '-ring' : '-off'}`} fontSize={20} />}
                        onClick={() => handleUpdateFollow(follow && follow.email_notifications_on_reviews ? !follow.email_notifications_on_reviews : true)}
                    >
		        	    {
                            loadingFollow ? (
                                <>Loading...</>
                            ) : (
		        	    		follow && follow.email_notifications_on_reviews  ? 'FOLLOWING' : 'FOLLOW'
		        	    	)
                        }
                    </Button>
                    &nbsp;
                    <Button
                        color={'secondary'}
                        onClick={()=>alert('Coming soon...')}
                        variant={'contained'}
                        startIcon={<Icon icon='mdi:message-text' fontSize={20} />}
                    >
                        Message
                    </Button>
                </div>
            }

          
          {/* <ShowMoreDialog business={business}  />
          <AddReviewDialog business={business}  /> */}
        </Box>
      </CardContent>
    </Card>
}

export default UserViewHeader
