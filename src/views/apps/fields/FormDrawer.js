// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { create } from 'src/store/apps/field'


const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  name: yup.string().required().min(3).max(24),
  description: yup.string().optional().max(128),
})



const SidebarAddCategory = props => {
  // ** Props
  const { open, toggle, isEdit, defaultValues } = props
  

  // ** State
  const [context, setContext] = useState('review')
  const [type, setType] = useState('good')

  // ** Hooks
  const dispatch = useDispatch()

  const {
    reset,
    control,
    watch,
    setValue,
    setError,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setContext(defaultValues.context)
    setType(defaultValues.type)
    reset({
      name: defaultValues.name,
      description: defaultValues.description
    })
  }, [defaultValues])
  

  const onSubmit = data => {
    if(defaultValues.id){
      dispatch(update(defaultValues.id, { ...data, context, type }))
    } else {
      dispatch(create({ ...data, context, type }))
    }
    
    toggle()
    reset()
  }

  const handleClose = () => {
    setType('')
    setContext('')
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
     
      <Header>
        <Typography variant='h6'>{isEdit ? 'Edit' : 'Add'} Field</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='name'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Name'
                  onChange={onChange}
                  placeholder='Fast ship'
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>
          
          
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='role-select'>Select Context</InputLabel>
            <Select
              fullWidth
              value={context}
              id='select-context'
              label='Select Context'
              labelId='context-select'
              error={Boolean(errors.context)}
              onChange={e => setContext(e.target.value)}
              inputProps={{ placeholder: 'Select Role' }}
            >
              <MenuItem value='review'>Review</MenuItem>
              <MenuItem value='report'>Report</MenuItem>
              <MenuItem value='load'>Load</MenuItem>
              <MenuItem value='truck'>Truck</MenuItem>
            </Select>
          </FormControl>

          {
            (context ===  'load' || context ===  'truck') && <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='abbreviation'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Abbreviation'
                    onChange={onChange}
                    placeholder='Fast ship'
                    error={Boolean(errors.abbreviation)}
                  />
                )}
              />
              {errors.abbreviation && <FormHelperText sx={{ color: 'error.main' }}>{errors.abbreviation.message}</FormHelperText>}
            </FormControl>
          }
          {/* {
            (context ===  'review') &&  */}
            <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='role-select'>Select Type</InputLabel>
            <Select
              fullWidth
              value={type}
              id='select-type'
              label='Select Type'
              labelId='context-select'
              onChange={e => setType(e.target.value)}
              inputProps={{ placeholder: 'Select Type' }}
            >
              <MenuItem value='good'>Good</MenuItem>
              <MenuItem value='bad'>Bad</MenuItem>
            </Select>
          </FormControl>
          {/* } */}
          
          
          
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='description'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Description'
                    
                    onChange={onChange}
                    placeholder='Describe the field'
                    fullWidth
                    multiline
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    minRows={3}
                    error={Boolean(errors.registration_date)}
                    aria-describedby='registration_date'
                  />
                )}
              />
              {errors.registration_date && (
                <FormHelperText sx={{ color: 'error.main' }} id='registration_date'>
                  {errors.registration_date.message}
                </FormHelperText>
              )}
            </FormControl>



          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddCategory
