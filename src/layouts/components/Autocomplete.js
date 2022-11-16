// ** React Imports
import { useEffect, useCallback, useRef, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import MuiDialog from '@mui/material/Dialog'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import ListItemButton from '@mui/material/ListItemButton'
import InputAdornment from '@mui/material/InputAdornment'
import MuiAutocomplete from '@mui/material/Autocomplete'

// ** Icons Imports
import Tab from 'mdi-material-ui/Tab'
import Close from 'mdi-material-ui/Close'
import Magnify from 'mdi-material-ui/Magnify'
import Lastpass from 'mdi-material-ui/Lastpass'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CartOutline from 'mdi-material-ui/CartOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import CalendarBlank from 'mdi-material-ui/CalendarBlank'
import CalendarRange from 'mdi-material-ui/CalendarRange'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ViewGridOutline from 'mdi-material-ui/ViewGridOutline'
import GestureTapButton from 'mdi-material-ui/GestureTapButton'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import FileRemoveOutline from 'mdi-material-ui/FileRemoveOutline'
import FormatListCheckbox from 'mdi-material-ui/FormatListCheckbox'
import FormatListNumbered from 'mdi-material-ui/FormatListNumbered'
import ChartTimelineVariant from 'mdi-material-ui/ChartTimelineVariant'
import SubdirectoryArrowLeft from 'mdi-material-ui/SubdirectoryArrowLeft'
import FormatTextVariantOutline from 'mdi-material-ui/FormatTextVariantOutline'
import CardBulletedSettingsOutline from 'mdi-material-ui/CardBulletedSettingsOutline'
import CircularProgress from '@mui/material/CircularProgress'
import { useDebounce } from 'use-debounce'

// ** Third Party Imports
import axios from 'axios'

// ** Configs Imports
import themeConfig from 'src/configs/themeConfig'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'

// ** API Icon Import with object
import { autocompleteIconObj } from './autocompleteIconObj'
import { businessService } from 'services/business.service'
import { Laptop } from 'mdi-material-ui'
import toast from 'react-hot-toast'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const defaultSuggestionsData = [
  {
    category: 'Popular Searches',
    suggestions: [
      {
        suggestion: 'CRM',
        link: '/dashboards/crm/',
        icon: <ChartDonut fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'Analytics',
        link: '/dashboards/analytics/',
        icon: <ChartTimelineVariant fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'eCommerce',
        link: '/dashboards/ecommerce/',
        icon: <CartOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'User List',
        link: '/apps/user/list/',
        icon: <AccountGroup fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      }
    ]
  },
  {
    category: 'Apps & Pages',
    suggestions: [
      {
        suggestion: 'Calendar',
        link: '/apps/calendar/',
        icon: <CalendarBlank fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'Invoice List',
        link: '/apps/invoice/list/',
        icon: <FormatListNumbered fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'Pricing',
        link: '/pages/pricing/',
        icon: <CurrencyUsd fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'Account Settings',
        link: '/pages/account-settings/',
        icon: <AccountCogOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      }
    ]
  },
  {
    category: 'User Interface',
    suggestions: [
      {
        suggestion: 'Typography',
        link: '/ui/typography/',
        icon: <FormatTextVariantOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'Tabs',
        link: '/components/tabs/',
        icon: <Tab fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'Buttons',
        link: '/components/buttons/',
        icon: <GestureTapButton fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'Advanced Cards',
        link: '/ui/cards/advanced/',
        icon: <CardBulletedSettingsOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      }
    ]
  },
  {
    category: 'Forms & Tables',
    suggestions: [
      {
        suggestion: 'Select',
        link: '/forms/form-elements/select/',
        icon: <FormatListCheckbox fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'Autocomplete',
        link: '/forms/form-elements/autocomplete/',
        icon: <Lastpass fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'Table',
        link: '/tables/mui/',
        icon: <ViewGridOutline fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      },
      {
        suggestion: 'Date Pickers',
        link: '/forms/form-elements/pickers/',
        icon: <CalendarRange fontSize='small' sx={{ mr: 2.5, color: 'text.primary' }} />
      }
    ]
  }
]


const StyledTextField = styled(TextField)`
 
    background-color: ${({theme, value}) => 
      !value && theme.palette.background.paper};
  
`

const categoryTitle = {
  dashboards: 'Dashboards',
  appsPages: 'Apps & Pages',
  userInterface: 'User Interface',
  formsTables: 'Forms & Tables',
  chartsMisc: 'Charts & Misc'
}

// ** Styled Autocomplete component
const Autocomplete = styled(MuiAutocomplete)(({ theme }) => ({
  '& fieldset': {
    border: 0
  },
  '& + .MuiAutocomplete-popper': {
    borderTop: `1px solid ${theme.palette.divider}`,
    '& .MuiAutocomplete-listbox': {
      paddingTop: 0,
      height: '100%',
      maxHeight: 'inherit',
      '& .MuiListSubheader-root': {
        top: 0,
        fontWeight: 400,
        lineHeight: '15px',
        fontSize: '0.75rem',
        letterSpacing: '1px',
        color: theme.palette.text.disabled,
        padding: theme.spacing(3.75, 6, 0.75)
      }
    },
    '& .MuiAutocomplete-paper': {
      border: 0,
      height: '100%',
      borderRadius: 0,
      boxShadow: 'none'
    },
    '& .MuiListItem-root.suggestion': {
      padding: 0,
      '& .MuiListItemSecondaryAction-root': {
        display: 'flex'
      },
      '&.Mui-focused.Mui-focusVisible, &:hover': {
        backgroundColor: theme.palette.action.hover
      },
      '& .MuiListItemButton-root: hover': {
        backgroundColor: 'transparent'
      },
      '&:not(:hover)': {
        '& .MuiListItemSecondaryAction-root': {
          display: 'none'
        },
        '&.Mui-focused, &.Mui-focused.Mui-focusVisible:not(:hover)': {
          '& .MuiListItemSecondaryAction-root': {
            display: 'flex'
          }
        },
        [theme.breakpoints.down('sm')]: {
          '&.Mui-focused:not(.Mui-focusVisible) .MuiListItemSecondaryAction-root': {
            display: 'none'
          }
        }
      }
    },
    '& .MuiAutocomplete-noOptions': {
      display: 'grid',
      minHeight: '100%',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(10)
    }
  }
}))

// ** Styled Dialog component
// const Dialog = styled(MuiDialog)({
//   '& .MuiBackdrop-root': {
//     backdropFilter: 'blur(4px)'
//   },
//   '& .MuiDialog-paper': {
//     overflow: 'hidden',
//     '&:not(.MuiDialog-paperFullScreen)': {
//       height: '100%',
//       maxHeight: 550
//     }
//   }
// })

const NoResult = ({ value, setOpenDialog }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
      <FileRemoveOutline sx={{ mb: 2.5, fontSize: '5rem', color: 'text.primary' }} />
      <Typography variant='h6' sx={{ mb: 11.5, wordWrap: 'break-word' }}>
        No results for{' '}
        <Typography variant='h6' component='span' sx={{ wordWrap: 'break-word' }}>
          {`"${value}"`}
        </Typography>
      </Typography>

      <Typography variant='body2' sx={{ mb: 2.5, color: 'text.disabled' }}>
        Try with another keyword...
      </Typography>
    </Box>
  )
}

const DefaultSuggestions = ({ setOpenDialog }) => {
  return (
    <Grid container spacing={6} sx={{ ml: 0 }}>
      <Typography component='p' variant='overline' sx={{ lineHeight: 1.25, color: 'text.disabled' }}>
            Search a Broker or Carrier
      </Typography>
    </Grid>
  )
}

const AutocompleteComponent = ({ hidden, settings }) => {
  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [options, setOptions] = useState([])
  const [ debounced_search ] = useDebounce(searchValue, 1000);

  const [dotSearch, setDotSeach] = useState('')

  // ** Hooks & Vars
  const theme = useTheme()
  const router = useRouter()
  const { layout } = settings
  const wrapper = useRef(null)
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'))
  
  const [ loading, setLoading ] = useState(false)
  const [ searched, setSearched ] = useState(false)

  const getBrokers = async (debounced_search) => {
    try {
      setLoading(true)
      setOptions([])
      const response = await businessService.get('?page_size=10&search='+debounced_search)
      setOptions(response.data)
      setLoading(false)
      setSearched(true)
    } catch (er) {
      console.log(er)
    }
  }

  const showDialog = () => {
    let sign = prompt("Type the DOT Number here:");
    if(sign === ''){
      alert('Please write the DOT Number')
      showDialog()
    }
    if(sign){
      let isnum = /^\d+$/.test(sign);
      if(!isnum){
        alert('Only numbers accepted')
        showDialog()
      } else {
        router.push('/brokers/[id]', '/brokers/'+sign)
      }
      
    }
  }

  // Get all data using API
  useEffect(() => {
  
    if(debounced_search.length > 0){
      getBrokers(debounced_search)
    }
      
  }, [debounced_search])

  useEffect(() => {
    setIsMounted(true)

    return () => setIsMounted(false)
  }, [])

  // Handle click event on a list item in search result
  const handleOptionClick = obj => {
    setSearchValue('')
    setOpenDialog(false)
    router.push('/brokers/[id]', '/brokers/'+obj.id)
  }

  // Handle ESC & shortcut keys keydown events
  const handleKeydown = useCallback(
    event => {
      // ** Shortcut keys to open searchbox (Ctrl + /)
      if (!openDialog && event.ctrlKey && event.which === 191) {
        setOpenDialog(true)
      }
    },
    [openDialog]
  )

  // Handle shortcut keys keyup events
  const handleKeyUp = useCallback(
    event => {
      // ** ESC key to close searchbox
      if (openDialog && event.keyCode === 27) {
        setOpenDialog(false)
      }
    },
    [openDialog]
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp, handleKeydown])
  if (!isMounted) {
    return null
  } else {
    return (
      <Box
        ref={wrapper}
        //onClick={() => showDialog()}
        onClick={() => !openDialog && setOpenDialog(true)}
        sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
      >
        <StyledTextField type='search' disabled={true} variant={'outlined'} size={'small'} placeholder={'Search DOT here'} style={{width:'100%', marginLeft:'10px'}}
        InputProps={{
          sx: {paddingLeft:'8px'},
         startAdornment: (
           <InputAdornment position='start'>
             <Magnify />
           </InputAdornment>
         )
       }}
        ></StyledTextField>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} style={{height:''}} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Search</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Enter the DOT number of the broker you want to search
          </DialogContentText>
          <TextField value={dotSearch} onChange={(e)=>setDotSeach(e.target.value)} id='name' autoFocus fullWidth type='number' label='DOT Number' />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button disabled={!!!dotSearch} onClick={(e)=>{
            setDotSeach('')
            router.push('/brokers/[id]', '/brokers/'+dotSearch)
            setOpenDialog(false)
          }}>Search</Button>
        </DialogActions>
      </Dialog>
      </Box>
    )
  }
}

export default AutocompleteComponent
