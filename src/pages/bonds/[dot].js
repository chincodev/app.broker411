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
import BondShow from 'src/views/apps/bond_check/show'



const BondCheck = (props) => {
    return <BondShow {...props} hideTop={true} page={'bonds'}  />
}



export default BondCheck

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