import { Drawer, Typography, DrawerHeader, IconButton, Divider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getLoads, showLoadSidebar } from 'src/store/apps/load'
import { Close } from 'mdi-material-ui'

const LoadboardTable = (props) => {

    const { requiredFilter } = props

    const loads = useSelector(state => state.load)
    const dispatch = useDispatch()

    const getData = (url_params) => {
		dispatch(getLoads(`${requiredFilter || ''}${url_params ? url_params+'&' : ''}`))
	}

    useEffect(() => {
        getData()
    }, [])

    const defaultColumns = [
		{
			flex: 0.2,
			minWidth: 120,
			field: 'created_at',
			headerName: 'Age',
			renderCell: ({ row }) => {
                let duration = moment.duration(moment().diff(moment(row.createdAt), 'seconds'), 'seconds')
			  return (
				<Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
				  {duration._data.hours > 0 && `${duration._data.hours}`.padStart(2, '0')+':'}
                  {duration._data.minutes > 0 && `${duration._data.minutes}`.padStart(2, '0')+':'}
                  {`${duration._data.seconds}`.padStart(2, '0')}
				</Typography>
			  )
			}
		},
        {
			flex: 0.2,
			minWidth: 90,
			field: 'pickup_earliest_date',
			headerName: 'Pickup',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
				{moment(row.pickup_earliest_date).format('MM/DD/YY')}
				</Typography>
			  )
			}
		},
        {
			flex: 0.5,
			minWidth: 70,
			field: 'categories',
			headerName: 'Truck',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
				  {row.categories.map(x => x.abbreviation).join('')}
				</Typography>
			  )
			}
		},
		{
			flex: 0.2,
			minWidth: 150,
			field: 'origin',
			headerName: 'Origin',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
				  {row.origin.name}, {row.origin.state.abbreviation}
				</Typography>
			  )
			}
		},
		{
			flex: 0.2,
			minWidth: 150,
			field: 'destination',
			headerName: 'Destination',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
				  {row.destination.name}, {row.destination.state.abbreviation}
				</Typography>
			  )
			}
		},
		{
			flex: 0.3,
			minWidth:60,
			field: 'full_partial',
			headerName: 'F/P',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
				  {row.full_partial.toUpperCase()[0]}
				</Typography>
			  )
			}
		},
		
		{
			flex: 1,
			minWidth: 200,
			field: 'user',
			headerName: 'Company',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
				  {row.user.business.legal_name}
				</Typography>
			  )
			}
		},
		{
			flex: 0.2,
			minWidth: 90,
			field: 'length',
			headerName: 'Length',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
				  {row.length} ft
				</Typography>
			  )
			}
		},
        {
			flex: 0.2,
			minWidth: 90,
			field: 'weight',
			headerName: 'Weight',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
				  {row.weight} lb
				</Typography>
			  )
			}
		},

		{
			flex: 0.3,
			minWidth: 100,
			field: 'rate',
			headerName: 'Rate',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
				  {row.rate ? '$'+row.rate : '-'}
				</Typography>
			  )
			}
		},
		{
			flex: 0.9,
			minWidth: 250,
			field: 'contact_email',
			headerName: 'Contact',
			renderCell: ({ row }) => {
	
			  return (
				<Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
				  {row.contact_phone}{row.contact_email && row.contact_phone ? ' / ' : ''}{row.contact_email}
				</Typography>
			  )
			}
		},
		// {
		//   flex: 0.2,
		//   minWidth: 140,
		//   field: 'contact_phone',
		//   headerName: 'Contact phone',
		//   renderCell: ({ row }) => {
		// 	return (
		// 	  <Typography noWrap variant='body2' sx={{fontSize:'12px'}}>
		// 		{row.contact_phone}
		// 	  </Typography>
		// 	)
		//   }
		// }
	]

    const columns = [
		...defaultColumns,
	]

	const openSideBar = (data) => {
		dispatch(showLoadSidebar(data))
	}

	
    return (
        <>
            <Box style={{height:'calc(100vh - 180px)'}}>
			
			<DataGrid
				sx={{
					'& .MuiDataGrid-row': { cursor: 'pointer' },
				}}
                rows={loads.data}
                columns={columns}
                onRowClick={(e)=>openSideBar(e.row)}
				disableSelectionOnClick
                
            />
			</Box>
        </>
    )
}

export default LoadboardTable