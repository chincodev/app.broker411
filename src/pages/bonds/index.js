import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { CardContent, Typography, Card, TextField, Button, CardHeader } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'
import { useRouter } from 'next/router'
import { bondService } from 'services/bond.service'

const Img = styled('img')(({ theme }) => ({
	marginTop: theme.spacing(15),
	marginBottom: theme.spacing(15),
	[theme.breakpoints.down('lg')]: {
		height: 225,
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(10)
	},
	[theme.breakpoints.down('md')]: {
		height: 200
	}
}))

const BondCheck = (props) => {

    const router = useRouter()
	const [ search, setSearch ] = useState('')
    const [ error, setError ] = useState(false)
    const [ actionsLoading, setActionsLoading ] = useState(false)
    const [ data, setData ] = useState(null)

    const searchBond = async (id) => {
        try {
            setActionsLoading(true)

            let _data = await bondService.find(id)
            setData(_data);
            setActionsLoading(false)
            // setTimeout(() => {

                

            //     setData({
            //         us_dot: '12334521',
            //         docket_number:'123123',
            //         legal_name:'NAME OFG BGG',
            //         form: '84',
            //         type: 'SURETY',
            //         policy_surety: '7901075402  ',
            //         posted_date: '08/04/2021',
            //         coverage_from: ' $0 ',
            //         coverage_to: '$75,000*',
            //         effective_date: '08/03/2021',
            //         cancellation_date: '04/28/2023',
            //         insurance_carrier: {
            //           'Attn: ': [ 'WALT VAN CLEAVE 1-17-03' ],
            //           'Address: ': [ 'ONE NATIONWIDE PLAZA, PO BOX 18271', 'COLUMBUS, OH US 43218' ],
            //           'Telephone: ': [ ' (866) 387 - 0457 ' ],
            //           'Fax: ': [ ' (614) 249 - 7705' ]
            //         }
            //     })
                
            // }, 5000);
           
        } catch (er) {
            console.log(er);
            setError(true)
        }
    }

    if(!data) return (
		<>
			<Card>
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
                            disabled={actionsLoading}
                            onClick={
                                ()=>searchBond(search)
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
		</>
    )

    return <>
        <Card>
           
            <CardContent sx={{ textAlign: 'center' }}>
                <h1 style={{marginTop:'0'}}>Check Broker Bond Information</h1>
                <h2>{`Broker US DOT: ${data.us_dot}`}</h2>
                {
                    Object.keys(data).filter(x => x!='insurance_carrier' && x!='us_dot').map(x => <Typography 
                         
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
    </>
}


export default BondCheck