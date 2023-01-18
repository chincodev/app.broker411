import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomChip from 'src/@core/components/mui/chip'
import { Avatar, Badge, CardHeader, Divider, IconButton, Menu, MenuItem, Alert, Button, Rating } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { useState } from 'react'


const BusinessCard = (props) => {

    const { 
        data: {
            legal_name,
            type,
            us_dot_number,
            address_line_2,
            mc_mx_ff_numbers,
            avgRating,
            reviewCount
        } 
    } = props

    const [ shadow, setShadow ] = useState(false)

    const onMouseOver = () => {
        setShadow(true)
    }

    const onMouseOut = () => {
        setShadow(false)
    }
    
    const auth = useAuth()
    const router = useRouter()


    return (
        <Link href={`/brokers/[id]`} as={`/brokers/${us_dot_number}`}>
            <Card 
                raised={true} 
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                sx={{ 
                    ...(shadow && {boxShadow: '0px 2px 10px 0px rgb(20 21 33 / 53%)'}),
                    cursor:'pointer', 
                    overflow: ' ', 
                    position: 'relative', 
                    pb:4, 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent:'space-between' 
                }}>
                <Box>
                    <CardContent sx={{pb: 0}}>
                        <CustomChip sx={{mr:'5px', mt:'3px', mb:'3px'}} label={type.toUpperCase()} size='small' skin='light' color={'success'} />
                    </CardContent>
                    <CardContent>
                        <Box style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <CustomAvatar
                                skin='light'
                                color={'primary'}
                                sx={{ width: '8rem', height: '8rem', fontSize:'2rem', mb:'1rem' }}
                            >
                                {getInitials(legal_name)}
                            </CustomAvatar>
                            <Typography sx={{textAlign:'center', fontSize:'1.145rem', fontWeight:'700'}}>
                                {legal_name}
                            </Typography>
                            <Typography variant='overline' sx={{textAlign:'center'}}>
                                {address_line_2}
                            </Typography>
                            <Typography color='info.main' variant='subtitle' sx={{textAlign:'center'}}>
                                DOT-{us_dot_number}
                            </Typography>
                            <Typography color='info.main' variant='subtitle' sx={{textAlign:'center', marginBottom:'1rem'}}>
                                {mc_mx_ff_numbers}
                            </Typography>
                            {
                                reviewCount ? <Box style={{display:'flex', alignItems:'center'}}>
                                    <Rating size="small" readOnly max={10} value={avgRating} name='simple-controlled'  /> 
                                    &nbsp;
                                    <small>({reviewCount})</small>
                                </Box> : ''
                            }
                        </Box>
                    </CardContent>
                </Box>
                <Box>
                    <Divider />
                    <CardContent sx={{pt:1, pb:'0 !important'}}>
                        <Button onClick={(e)=>{
                            e.preventDefault()
                            e.stopPropagation()
                        }} variant='text' fullWidth>
                            Leave Review
                        </Button>
                    </CardContent>
                </Box>
            </Card>
        </Link>
    )
}

export default BusinessCard