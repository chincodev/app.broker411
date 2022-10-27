// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import LicenseIcon from 'mdi-material-ui/LicenseIcon'
import CartOutline from 'mdi-material-ui/CartOutline'
import { Truck } from 'mdi-material-ui'
import {Laptop} from 'mdi-material-ui'
import BriefcaseOutline from 'mdi-material-ui/BriefcaseOutline'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'

const DialogTabBrokerMc = (props) => {


  const handleValues = (name, value) => {
    props.setBusinessData({ ...props.businessData, [name]:value })
  }

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 4 }}>
        Broker's MC Number
      </Typography>
      <TextField value={props.businessData.mc_number} onChange={(e) => handleValues('mc_number', e.target.value)} fullWidth sx={{ mb: 4 }} label='MC Number' placeholder='MC Number' />
    </Box>
  )
}

export default DialogTabBrokerMc
