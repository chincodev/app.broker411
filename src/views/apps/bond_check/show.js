import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { CardContent, Typography, Card, TextField, Button, CardHeader, Container } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'
import { useRouter } from 'next/router'
import { bondService } from 'services/bond.service'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import themeConfig from 'src/configs/themeConfig'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'
import UserViewHeader from 'src/views/apps/business/view/UserViewHeader'
import { businessService } from 'services/business.service'
import { isEmpty } from 'lodash'
import queryString from 'query-string'
import ProgressLinearControlledUncontrolled from 'src/layouts/components/ProgressBar'

const StyledLink = styled('a')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    
}))

const BondShow = (props) => {

    const auth = useAuth()

    const router = useRouter()
	const [ search, setSearch ] = useState(props.dot)
    const [ error, setError ] = useState(false)
    const [ errorCrawl, setErrorCrawl ] = useState(false)
    const [ actionsLoading, setActionsLoading ] = useState(false)
    const [ data, setData ] = useState(null)
    const [ business, setBusiness ] = useState(false)
    const [ completedLoading, setCompletedLoading ] = useState(false)

    const searchBond = async (id) => {
        try {
            setError(false)
            setErrorCrawl(false)
            setActionsLoading(true)
            setCompletedLoading(false)

            const data = await businessService.find_broker_in_fmcsa(id)
            const _data = await bondService.find(id)
            

            setCompletedLoading(true)
            setTimeout(() => {
                setData(_data);
                setBusiness(data.record)
                setActionsLoading(false)
            }, 500);
        
        } catch (er) {
            if(er.code === 404){
                setError(true)
            } else 
                setErrorCrawl(true)
            }
            setCompletedLoading(true)
            
        }
    

   



      useEffect(() => {
        searchBond(props.dot)
      }, [])

    

    if(!data) return (
		<>
            <Container >
               
                {
                    !props.hideTop && <Box sx={{pt:8, pb:8}}>
                        <Box sx={{display:'flex', justifyContent:'space-between'}}>
                            <Link href='/' passHref>
                                <StyledLink>
                                    <img height={28} src='/images/logos/logo.png' />
                                    <Typography variant='h6' sx={{ ml: 2, mr: 2, fontWeight: 700, lineHeight: 1.2}}>
                                        {themeConfig.templateName}
                                    </Typography>
                                </StyledLink>
                            </Link>
                            <Box>
                                {
                                    !isEmpty(auth.user) ? (
                                        <>
                                            <Button onClick={()=>router.push('/')}>
                                                Go to home
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button onClick={()=>router.push('register')}>
                                                Sign up
                                            </Button>
                                            <Button onClick={()=>router.push('login')} variant='contained' sx={{ml:2}}>
                                                Login
                                            </Button>
                                        </>
                                    )
                                }

                            </Box>
                        </Box>
                    </Box>
                }
                <Card sx={{mt:4}}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography 
                            variant='h5' 
                            sx={{ 
                                mb: 2.5, 
                                letterSpacing: '0.18px', 
                                fontSize: '1.5rem !important' 
                            }}
                        >
                            Check Broker Bond Information
                        </Typography>
                        <Typography 
                            variant='body2'
                        >
                            Easily search brokers by DOT number
                        </Typography>
                        <h2>{search}</h2>
                        {
                            error && <Typography style={{color:'#ff7373', fontWeight:700}}>Incorrect DOT number, try again.</Typography>
                        }
                        {
                            errorCrawl && <Typography style={{color:'#ff7373', fontWeight:700}}>We were unable to get the bond information. Please try again later or contact support.</Typography>
                        }
                        {
                            !error && !errorCrawl && <ProgressLinearControlledUncontrolled completedLoading={completedLoading}/> 
                        }

{
                            (error  || errorCrawl )&&  <div style={{ 
                               
                                marginTop:'1rem' 
                            }} ><Button 
                            variant='contained' 
                            color='secondary' 
                            sx={{mr:1}}
                            onClick={
                                ()=>router.push('/bond-check/', '/bond-check/')
                            }
                        >
                            Search Other Dot
                        </Button><Button 
                            variant='contained' 
                            color='secondary' 
                            sx={{mr:1}}
                            onClick={
                                ()=>searchBond(props.dot)
                            }
                        >
                            Try again
                        </Button>  </div>
                        }
                        
                        {
                            !actionsLoading && !error && (
                                <div style={{ 
                               
                                    marginTop:'1rem' 
                                }} >
                                <Button 
                                    variant='contained' 
                                    color='secondary' 
                                    onClick={()=>setSearch('')}
                                    sx={{mr:1}}
                                    disabled={actionsLoading}
                                >
                                    Reset
                                </Button> 
                                
                                <Button 
                                    variant='contained' 
                                    sx={{ml:1}}
                                    disabled={actionsLoading || !search}
                                    onClick={
                                        ()=>{
                                            if(search && search.length > 0){
                                                console.log(search);
                                                router.push('/'+props.page+'/[dot]', '/'+props.page+'/'+search)
                                                // searchBond(search)
                                            } else {
                                                setError(true)
                                            }
                                            
                                        }
                                    }
                                >
                                    {
                                      actionsLoading && <CircularProgress
                                        
                                        size={24}
                                        sx={{
                                          color: green[500],
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          marginTop: '-12px',
                                          marginLeft: '-12px',
                                        }}
                                      />
                                    }
                                    Search
                                </Button> 
                            </div>
                            )
                        }
                        
                        
                    </CardContent>
                </Card>
            </Container>
			
		</>
    )

    return <>
        <Container >
            {
                !props.hideTop && <Box sx={{pt:8, pb:8}}>
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Link href='/' passHref>
                            <StyledLink>
                                <img height={28} src='/images/logos/logo.png' />
                                <Typography variant='h6' sx={{ ml: 2, mr: 2, fontWeight: 700, lineHeight: 1.2}}>
                                    {themeConfig.templateName}
                                </Typography>
                            </StyledLink>
                        </Link>
                        <Box>
                            {
                                auth.user ? (
                                    <>
                                        <Button onClick={()=>router.push('/')}>
                                            Go to home
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={()=>router.push('register')}>
                                            Sign up
                                        </Button>
                                        <Button onClick={()=>router.push('login')} variant='contained' sx={{ml:2}}>
                                            Login
                                        </Button>
                                    </>
                                )
                            }

                        </Box>
                    </Box>
                </Box>
            }
            <UserViewHeader
                error={error}
                business={business} 
                setBusiness={setBusiness} 
            />
            <Card sx={{mt:4}}>
                            
                <CardContent sx={{ textAlign: 'center' }}>
                    <h2>
                        Check Broker Bond Information
                    </h2>
                    {/* <h2>{`Broker US DOT: ${data.us_dot}`}</h2> */}
                    {
                        Object.keys(data).filter(x => x!='insurance_carrier' && x!='us_dot' && x!='docket_number' && x!='legal_name').map(x => <Typography 

                            sx={{ 
                                mb: 2.5, 
                                letterSpacing: '0.18px', 
                                fontSize: '1rem !important' 
                            }}
                        >
                            <strong style={{textTransform:'capitalize'}}>{x.replace('_', ' ').replace('policy ', 'policy/')}: </strong>{data[x]}
                        </Typography>)
                    }

                    <h2
                        style={{marginTop:'3rem'}}
                    >
                        Insurance Carrier
                    </h2>
                    <div >
                        {
                            Object.keys(data.insurance_carrier).map(x => <Typography 

                                sx={{ 
                                    marginTop:'0.5rem',
                                    letterSpacing: '0.18px', 
                                    fontSize: '1rem !important' 
                                }}
                            >
                                <strong style={{textTransform:'capitalize'}}>{x.replace('_', ' ')}</strong>{data.insurance_carrier[x].map(y => <>{y}<br/></>)}
                            </Typography>)
                        }  
                    </div> 
                    
                    
                    
                    <div style={{ 

                            marginTop:'2rem' 
                        }} >
                        <Button 
                            variant='contained' 
                            color='secondary' 
                            sx={{mr:1}}
                            disabled={actionsLoading}
                            onClick={
                                ()=>router.push('/bond-check/', '/bond-check/')
                            }
                        >
                            Search Again
                        </Button> 
                        <Button 
                            variant='contained' 
                            sx={{ml:1}}
                            disabled={actionsLoading}
                            onClick={
                                ()=>router.push('/brokers/[dot]', '/brokers/'+data.us_dot)
                            }
                        >

                            Go to profile
                        </Button> 
                    </div>
                </CardContent>
            </Card>
        </Container>
    </>
}

// BondCheck.getLayout = page => <BlankLayout>{page}</BlankLayout>
// BondCheck.guestGuard = false
// BondCheck.authGuard = false

export default BondShow

export async function getServerSideProps(context){
    const { 
        params:{
            dot
        } 
    } = context

    return {
        props: {
            dot
        }
    }
   
}