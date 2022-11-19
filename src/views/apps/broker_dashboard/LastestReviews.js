// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid as MuiDataGrid} from '@mui/x-data-grid'

// ** Icon Imports

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { Button, CardHeader, CircularProgress } from '@mui/material'
import { styled } from '@mui/system'
import { green } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { reviewService } from 'services/review.service'
import moment from 'moment'
import { useRouter } from 'next/router'

const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
    "& .MuiDataGrid-columnHeaders": { borderTopRightRadius: 0, borderTopLeftRadius: 0  },
    
  }));

const statusObj = {
  active: { color: 'success' },
  pending: { color: 'warning' },
  inactive: { color: 'secondary' }
}

const rows = [
  {
    id: 1,
    role: 'admin',
    status: 'pending',
    name: 'Jordan Stevenson',
    username: '@jstevenson5c',
    email: 'susanna.Lind57@gmail.com',
    avatarSrc: '/images/avatars/1.png'
  },
  {
    id: 2,
    role: 'editor',
    status: 'active',
    name: 'Robert Crawford',
    username: '@rcrawford1d',
    avatarSrc: '/images/avatars/3.png',
    email: 'estelle.Bailey10@gmail.com'
  },
  {
    id: 3,
    role: 'author',
    status: 'inactive',
    name: 'Lydia Reese',
    username: '@lreese3b',
    email: 'milo86@hotmail.com',
    avatarSrc: '/images/avatars/2.png'
  },
  {
    id: 4,
    role: 'editor',
    status: 'pending',
    name: 'Richard Sims',
    username: '@rsims6f',
    email: 'lonnie35@hotmail.com',
    avatarSrc: '/images/avatars/5.png'
  },
  {
    id: 5,
    status: 'active',
    role: 'maintainer',
    name: 'Lucile Young',
    username: '@lyoung4a',
    email: 'ahmad_Collins@yahoo.com',
    avatarSrc: '/images/avatars/4.png'
  },
  {
    id: 6,
    role: 'editor',
    status: 'pending',
    name: 'Francis Frank',
    username: '@ffrank7e',
    avatarSrc: '/images/avatars/7.png',
    email: 'tillman.Gleason68@hotmail.com'
  },
  {
    id: 7,
    role: 'subscriber',
    status: 'inactive',
    name: 'Phoebe Patterson',
    email: 'otho21@gmail.com',
    username: '@ppatterson2g',
    avatarSrc: '/images/avatars/8.png'
  }
]

const renderUserAvatar = row => {
  if (row.avatarSrc) {
    return <CustomAvatar src={row.avatarSrc} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar skin='light' sx={{ mr: 3, width: 34, height: 34, fontSize: '.8rem' }}>
        {getInitials(row.name ? row.name : 'John Doe')}
      </CustomAvatar>
    )
  }
}



const LastestReviews = () => {


    const columns = [
        {
          flex: 0.3,
          field: 'name',
          minWidth: 300,
          headerName: 'User',
          renderCell: ({ row }) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {renderUserAvatar(row)}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                    {row.business.legal_name}
                  </Typography>
                  <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
                  {row.business.address_line_2} 
                              {/* {' '}
                              &bull;&nbsp;{moment(row.createdAt).fromNow()} */}
                  </Typography>
                </Box>
              </Box>
            )
          }
        },
        {
          flex: 0.15,
          minWidth: 100,
          field: 'rating',
          headerName: 'Rating',
          renderCell: ({ row }) => <Typography color={row.rating < 5 ? 'error.main' : 'primary.main'} variant='body2'>{row.rating}/10 Stars</Typography>
        },
        {
          flex: 0.2,
          minWidth: 130,
          field: 'createdAt',
          headerName: 'Date',
          renderCell: ({ row }) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            
              <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{moment(row.createdAt).fromNow()}</Typography>
            </Box>
          )
        },
        {
          flex: 0.2,
          minWidth: 50,
          field: 'replies',
          headerName: 'Replied',
          renderCell: ({ row }) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            
              <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row.replies.length > 0 ? 'Yes' : 'No'}</Typography>
            </Box>
          )
        },{
          flex: 0.2,
          minWidth: 130,
          field: 'actions',
          headerName: 'Actions',
          renderCell: ({ row }) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            
              <Button onClick={()=>router.push('/reviews/[id]', `reviews/${row.id}`)} size='small' variant='contained'>Details</Button>
            </Box>
          )
        },
      
      ]

    const router = useRouter()

    const [ loading, setLoading ] = useState(false)

    const [ data, setData ] = useState([])

    const getData = async () => {
        try {
            setLoading(true)
            let data = await reviewService.list('?page_number=1&page_size=10')
            setData(data.data)
            setLoading(false)
        } catch (er) {
            console.log(er)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    


  return (
    <Card style={{position:'relative'}}>
        <CardHeader
            title='Lastest Reviews'
            // subheader='Commercial networks'
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'caption', sx: { color: 'text.disabled' } }}
            sx={{
                flexDirection: ['column', 'row'],
                alignItems: ['flex-start', 'center'],
                '& .MuiCardHeader-action': { mb: 0 },
                '& .MuiCardHeader-content': { mb: [2, 0] }
            }}
        />
        <DataGrid disableSelectionOnClick
disableColumnMenu autoHeight hideFooter  rows={data} columns={columns}  disableSelectionOnClick pagination={undefined} />
        {
            loading && <Box sx={{             
                position: 'absolute',
                backgroundColor:'rgba(0,0,0,0.35)',
                top:0,
                left:0,
                width: '100%',
                height: '100%',
            }}>
                <CircularProgress
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
            </Box>
        }
    </Card>
  )
}

export default LastestReviews
