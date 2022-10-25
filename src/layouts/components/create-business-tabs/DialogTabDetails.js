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
    props.setBusinessData({ ...props.businessData, [name]:value })
  }

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 4 }}>
        Business Type
      </Typography>
      <Box sx={{ mb: 8 }}>
        <Box
          onClick={() => handleValues('type', 'broker')}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Laptop />
            </CustomAvatar>
            <Box>
              <Typography sx={{ color: 'text.secondary' }}>Broker</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Enter your MC number to get started.
              </Typography>
            </Box>
          </Box>
          <Radio value='broker' onChange={ e => handleValues('type', e.target.value) } checked={props.businessData.type === 'broker'} />
        </Box>
        <Box
          onClick={() => handleValues('type','carrier')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='primary' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Truck />
            </CustomAvatar>
            <Box>
              <Typography sx={{ color: 'text.secondary' }}>Carrier</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Enter your DOT number to get started.
              </Typography>
            </Box>
          </Box>
          <Radio value='carrier' onChange={ e => handleValues('type', e.target.value) } checked={props.businessData.type === 'carrier'} />
        </Box>
      </Box>
      {
        props.businessData.type === 'broker' ? (
          <TextField value={props.businessData.mc_number} onChange={(e) => handleValues('mc_number', e.target.value)} fullWidth sx={{ mb: 4 }} label='MC Number' placeholder='MC Number' />
        ) : props.businessData.type === 'carrier' ? (
          <TextField value={props.businessData.us_dot_number} onChange={(e) => handleValues('us_dot_number', e.target.value)} fullWidth sx={{ mb: 4 }} label='DOT Number' placeholder='DOT Number' />
        ) : ('')
      }

    </Box>
  )
}

export default TabDetails
