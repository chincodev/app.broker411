import { useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, TextField } from '@mui/material'
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userService } from 'services/user.service';
import { green } from '@mui/material/colors';
import toast from 'react-hot-toast';

const ChangePasswordDialog = ({setOpenPasswordDialog, openPasswordDialog}) => {

    let schema = yup.object().shape({
        password: yup.string().required().min(5).max(24),
        new_password: yup.string().required().min(5).max(24),
    });

    const defaultValues = {
        password: '',
        new_password: ''
    }

    const router = useRouter()
    const [ actionsLoading, setActionsLoading ] = useState(false)

    const submitData = async (values) => {
        try {
            setActionsLoading(true)
            await userService.update_me(values)
            setActionsLoading(false)
            toast.success('Pasword updated.')
            reset()
            setOpenPasswordDialog(false)
        } catch (er) {
            er.errors && Array.isArray(er.errors) && er.errors.map(x => {
                if(x.path){
                    x.path.map(y => setError(y, {
                        message: x.message
                    }))
                } else {
                    toast.error(x.message)
                }
            })
            setActionsLoading(false)
        }
    }

    const { register, control, handleSubmit, formState: { errors }, reset, setError } = useForm({
        resolver: yupResolver(schema), defaultValues
    });

    return (
        <Box>
            <Dialog maxWidth={'sm'} fullWidth={true} open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} style={{height:''}} aria-labelledby='form-dialog-title'>
                <form onSubmit={handleSubmit(submitData)}>
                    <DialogTitle id='form-dialog-title'>Change password</DialogTitle>
                    <DialogContent style={{paddingTop:'1rem', paddingBottom:'1rem'}}>
                        <Grid container>
                            <Grid item xs={12} style={{marginBottom:'1rem'}}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='password'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField 
                                                inputProps={{ maxLength: 24 }}
                                                value={value}
                                                error={Boolean(errors.password)}
                                                onChange={onChange} 
                                                id='password' 
                                                autoFocus 
                                                fullWidth 
                                                type='password' 
                                                label='Current Password' 
                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='password'>
                                            {errors.password.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:'1rem'}}>          
                                <FormControl fullWidth>
                                    <Controller
                                        name='new_password'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField 
                                                inputProps={{ maxLength: 24 }}
                                                value={value}
                                                error={Boolean(errors.new_password)}
                                                onChange={onChange} 
                                                id='new_password' 
                                                fullWidth 
                                                type='password' 
                                                label='New password' 
                                            />
                                        )}
                                    />
                                    {errors.new_password && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='new_password'>
                                            {errors.new_password.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions className='dialog-actions-dense'>
                        <Button type='button' disabled={actionsLoading} onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
                        <Button type='submit' disabled={actionsLoading}>
                            {
                              actionsLoading && <CircularProgress
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
                            }
                            Submit
                        </Button>
                    </DialogActions>
                    </form>
            </Dialog>
        </Box>
    )
}

export default ChangePasswordDialog
