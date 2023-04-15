import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { CardContent, Typography, Card, TextField, Button, CardHeader } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'
import { useRouter } from 'next/router'
import { bondService } from 'services/bond.service'
import BondCheck from 'src/views/apps/bond_check/search'
import BlankLayout from 'src/@core/layouts/BlankLayout'



const BondSearchPage = (props) => {

    return <BondCheck hideTop={false} page={'bond-check'} /> 
}

BondSearchPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
BondSearchPage.guestGuard = false
BondSearchPage.authGuard = false

export default BondSearchPage