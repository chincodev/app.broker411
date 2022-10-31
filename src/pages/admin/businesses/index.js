// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'

// ** Icons Imports
import Laptop from 'mdi-material-ui/Laptop'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CogOutline from 'mdi-material-ui/CogOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import { TextField, Tooltip } from '@mui/material'
import { useDebounce } from 'use-debounce';

// ** Vars
const userRoleObj = {
  admin: <Laptop sx={{ mr: 2, color: 'error.main' }} />,
  author: <CogOutline sx={{ mr: 2, color: 'warning.main' }} />,
  editor: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />,
  maintainer: <ChartDonut sx={{ mr: 2, color: 'success.main' }} />,
  subscriber: <AccountOutline sx={{ mr: 2, color: 'primary.main' }} />
}

const userStatusObj = {
  carrier: 'success',
  broker: 'primary'
}

// ** Styled component for the link for the avatar with image
const AvatarWithImageLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(3)
}))

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
const renderClient = row => {
  if (row.avatar.length) {
    return (
      <AvatarWithImageLink href={`/apps/user/view/${row.id}`}>
        <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
      </AvatarWithImageLink>
    )
  } else {
    return (
      <AvatarWithoutImageLink href={`/apps/user/view/${row.id}`}>
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
        >
          {getInitials(row.fullName ? row.fullName : 'John Doe')}
        </CustomAvatar>
      </AvatarWithoutImageLink>
    )
  }
}

// ** Styled component for the link inside menu
const MenuItemLink = styled('a')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: theme.spacing(1.5, 4),
  color: theme.palette.text.primary
}))

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem sx={{ p: 0 }}>
          <Link href={`/apps/user/view/${id}`} passHref>
            <MenuItemLink>
              <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              View
            </MenuItemLink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose}>
          <PencilOutline fontSize='small' sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const defaultColumns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'legal_name',
    headerName: 'Legal Name',
    renderCell: ({ row }) => {
      const { id, fullName, username } = row

      return (
        <Typography noWrap variant='body2'>
          {row.legal_name}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'type',
    minWidth: 150,
    headerName: 'Type',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.type}
          color={userStatusObj[row.type]}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      )
    }
  }
]

const columns = [
  ...defaultColumns,
  {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        
        <Tooltip title='View Business'>
          <Box>
            <Link href={`/admin/businesses/${row.id}`} passHref>
              <IconButton size='small' component='a' sx={{ textDecoration: 'none', mr: 0.5 }}>
                <EyeOutline />
              </IconButton>
            </Link>
          </Box>
        </Tooltip>
        {/* <Tooltip title='Delete Business'>
          <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => dispatch(deleteInvoice(row.id))}>
            <DeleteOutline />
          </IconButton>
        </Tooltip> */}
      </Box>
    )
  }
]

const UserList = () => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [search, set_search] = useState('')
  const [status, setStatus] = useState('')
  const [page_size, set_page_size] = useState(12)
  const [page_number, set_page_number] = useState(0)
  const [sort_field, set_sort_field] = useState('legal_name')
  const [sort_order, set_sort_order] = useState('desc')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [ debounced_search ] = useDebounce(search, 1000);

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
  useEffect(() => {
    dispatch(
      fetchData({
        page_size,
        page_number,
        sort_field,
        sort_order,
        search: debounced_search
      })
    )
  }, [dispatch, page_number, page_size, sort_field, sort_order, debounced_search])

  const handleFilter = useCallback(val => {
    set_search(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    onChange={handleRoleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Type</MenuItem>
                    <MenuItem value='admin'>Broker</MenuItem>
                    <MenuItem value='author'>Carrier</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Verification</InputLabel>
                  <Select
                    fullWidth
                    value={plan}
                    id='select-plan'
                    label='Select Plan'
                    labelId='plan-select'
                    onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value=''>Select Verification</MenuItem>
                    <MenuItem value='basic'>Verified</MenuItem>
                    <MenuItem value='company'>Unverified</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={plan}
                    id='select-plan'
                    label='Select Plan'
                    labelId='plan-select'
                    onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='basic'>Enabled</MenuItem>
                    <MenuItem value='company'>Disabled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Visibility</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Visibility</MenuItem>
                    <MenuItem value='pending'>Published</MenuItem>
                    <MenuItem value='active'>Unpublished</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField
                size='small'
                value={search}
                sx={{ mr: 6, mb: 2 }}
                placeholder='Search Business'
                onChange={e => handleFilter(e.target.value)}
              />
            </Box>
          </Box>
          <DataGrid
            autoHeight
            disableSelectionOnClick
            disableColumnMenu
            rows={store.data}
            rowCount={store.total}
            loading={store.loading}
            rowsPerPageOptions={[2, 12, 24, 48]}
            pagination
            page={page_number}
            pageSize={page_size}
            sortingMode={'server'}
            paginationMode="server"
            onSortModelChange={(e)=>{
              if(e['0']){
                set_sort_field(e['0']['field'])
                set_sort_order(e['0']['sort'])
              } else {
                set_sort_field(null)
                set_sort_order(null)
              }
            }}
            onPageChange={(newPage) => set_page_number(newPage)}
            onPageSizeChange={(newPageSize) => set_page_size(newPageSize)}
            columns={columns}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          /> 
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}
UserList.authGuard = true
export default UserList
