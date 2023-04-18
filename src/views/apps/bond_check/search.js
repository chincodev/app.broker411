import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { CardContent, Typography, Card, TextField, Button, CardHeader, Container, FormControlLabel, RadioGroup, Radio } from '@mui/material'
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

const StyledLink = styled('a')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    
}))

const BondCheck = (props) => {

    const auth = useAuth()

    const router = useRouter()
	const [ search, setSearch ] = useState(queryString.parse(window.location.search).search)
    const [ error, setError ] = useState(false)
    const [ actionsLoading, setActionsLoading ] = useState(false)
    const [ data, setData ] = useState(null)
    const [ business, setBusiness ] = useState(false)

    const searchBond = async (id) => {
        try {
            setActionsLoading(true)
            const [ _data, data ] = await Promise.all([
                bondService.find(id),
                businessService.find_broker_in_fmcsa(id)
            ])
            // let _data = await bondService.find(id)
            // const data = await businessService.find_broker_in_fmcsa(id)
            setData(_data);
            setBusiness(data.record)
            setActionsLoading(false)
        } catch (er) {
            console.log(er);
            setError(true)
        }
    }


    const [ search_field, setSearch_field ] = useState('us_dot_number')



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
                        {/* <Typography 
                            variant='body2'
                        >
                            Easily search brokers by DOT number
                        </Typography> */}

                        {/* <RadioGroup
            row
            value={search_field}
            onChange={e => setSearch_field(e.target.value)}
            sx={{justifyContent:'center', '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' } }}
          >
            <FormControlLabel value='us_dot_number' label='US DOT Number' control={<Radio />} />
            <FormControlLabel value='mc_mx_ff_numbers' label='MC/MX Number' control={<Radio />} />
          </RadioGroup> */}

                        <TextField 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                            type='search'
                            disabled={actionsLoading}
                            error={error}
                            fullWidth 
                            sx={{ 
                                mb: 4, 
                                maxWidth:'500px', 
                                marginTop:'1.5rem', 
                                marginBottom:'1rem' 
                            }} 
                            
                            placeholder='DOT Number' 
                        />
                        {
                            error && <Typography style={{color:'#ff7373', fontWeight:700}}>Incorrect DOT number, try again.</Typography>
                        }
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
                    </CardContent>
                </Card>
            </Container>
			
		</>
    )

    return <>
        <Container >
            <Box sx={{pt:8, pb:8}}>
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
            <UserViewHeader
                
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
                            onClick={()=>setData(null)}
                        >
                            Search Again
                        </Button> 
                        <Button 
                            variant='contained' 
                            sx={{ml:1}}
                            disabled={actionsLoading}
                            onClick={
                                ()=>router.push('/brokers/[id]', '/brokers/'+data.us_dot)
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

export default BondCheck