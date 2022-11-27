import { Card, TextField, Box, CardContent, Button, Divider } from '@mui/material'
import React, { useState } from 'react'

const CreateReviewCardShortcut = () => {

    const [ number, setNumber ] = useState(true)
    
    const submitNumber = () => {
        try {

        } catch (er) {
            console.log(er)
        }
    }

    return (
    
                
                    <Box style={{display:'flex', justifyContent:'center'}}> 
                        <Button disabled={number<1}  variant='contained'>
                            Leave a review
                        </Button >
                    </Box> 
               
    )
}

export default CreateReviewCardShortcut