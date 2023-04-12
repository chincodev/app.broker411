import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
import React, { useState } from 'react'
import LaneFormDialog from 'src/layouts/LaneFormDialog'
import LoadboardTable from 'src/views/apps/loadboard/table'

const Loadboard = () => {

    const lanes = []

    const [ openDialog, setOpenDialog ] = useState(false)

    if(lanes.length === 0){
        return (
            <>
                <LaneFormDialog 
                    open={openDialog}
                    setOpen={setOpenDialog}
                />
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                        {/* <Typography variant='h2' sx={{ mb: 2.5 }}>
                            Hey!
                        </Typography> */}
                        <Typography variant='h5' sx={{ mb: 2.5, letterSpacing: '0.18px', fontSize: '1.5rem !important' }}>
                            It looks as you don't have any lanes yet
                        </Typography>
                        <Typography variant='body2'>Create your first lane and find loads now!</Typography>
                        <br />
                        {/* <img height='256px' alt='error-illustration' src='/images/pages/kb-marketing.png' /> */}
                    
                          {/* <Button onClick={()=>router.back()} variant='contained' color='secondary'>Go back</Button> &nbsp; */}
                        <Button onClick={()=>setOpenDialog(true)} variant='contained'>Create Lane</Button>
                    </CardContent>
                </Card>
            </>
        ) 
    }
   
    return (
        <>
            <LaneFormDialog 
                open={openDialog}
                setOpen={setOpenDialog}
            />
            <LoadboardTable 
                requiredFilter={'?'} 
            />
        </>
    )
}

export default Loadboard