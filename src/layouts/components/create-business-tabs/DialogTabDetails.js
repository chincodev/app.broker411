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

const TabDetails = (props) => {


  const handleValues = (name, value) => {
    props.setBusinessData({ ...props.startObj, [name]:value })
  }

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 4 }}>
        {props.title}
      </Typography>
      <TextField value={props.businessData.us_dot_number} onChange={(e) => handleValues('us_dot_number', e.target.value)} fullWidth sx={{ mb: 4 }} label='DOT Number' placeholder='DOT Number' />
    </Box>
  )
}

export default TabDetails
