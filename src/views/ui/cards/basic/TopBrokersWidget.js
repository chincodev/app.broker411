import { Button, CardContent, CardHeader, CardMedia, Divider, Typography } from '@mui/material'
import { Box, Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { userService } from 'services/user.service'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import { businessService } from 'services/business.service'
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CircularProgress from '@mui/material/CircularProgress'
import Link from 'next/link'
import styled from '@emotion/styled'

const TopBrokersWidget = () => {

    const [ loading, setLoading ] = useState(false)
    const [ businesses, setBusinesses ] = useState([])

    const StyledCardContent = styled(CardContent)(({ theme }) => ({
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }
    }))

    const getData = async () => {
        try {
            setLoading(true)
            const response = await businessService.get('?sort_field=reviewCount&sort_order=desc&page_size=5')
            setBusinesses(response.data)
            setLoading(false)
        } catch (er){
            console.log(er);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Card style={{paddingBottom:'0.75rem'}}>
            <CardHeader
                title='MOST REVIEWED BROKERS'
                titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
            />
            
                {
                    loading ? (
                        <CardContent>
                            <Box style={{display:'flex', justifyContent:'center', marginTop:'1rem', marginBottom:'1rem'}}>
                                <CircularProgress />
                            </Box>
                        </CardContent>
                    ) : businesses && businesses.map((x, i) => <>
                        {i != 0 && <Divider />}
                        <Link href={`/brokers/[id]`} as={`/brokers/${x.us_dot_number}`}>
                            <StyledCardContent style={{
                                paddingTop:'0.5rem', 
                                paddingBottom:'0.5rem',
                                cursor:'pointer'
                            }}>
                                <Box style={{
                                    display:'flex',
                                }}>
                                    <CustomAvatar
                                        skin='light'
                                        variant='rounded'
                                        color={top.avatarColor}
                                        sx={{ width: '3.9rem', height: '3.9rem' }}
                                    >
                                        {
                                            getInitials(x.legal_name)
                                        }
                                    </CustomAvatar>
                                    <Box style={{paddingLeft:'1rem', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                                        <Box style={{display:'grid'}}>
                                                <Typography style={{
                                                    fontWeight:'600', 
                                                    fontSize:'14px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                }}>
                                                    {x.legal_name}
                                                </Typography> 
                                            <Typography variant='caption' style={{fontSize:'10px'}}>
                                                DOT {x.us_dot_number}
                                            </Typography>
                                        </Box>
                                        <Typography variant='body2' style={{fontWeight:'900', fontSize:'11px'}}>
                                            {x.reviewCount} REVIEWS
                                        </Typography>
                                    </Box>
                                </Box>
                            </StyledCardContent>
                        </Link>
                    </>)
                }
           
        </Card> 
    )
}

export default TopBrokersWidget


