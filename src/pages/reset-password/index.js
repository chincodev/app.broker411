// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import ChevronLeft from 'mdi-material-ui/ChevronLeft'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { authService } from 'services/auth.service'
import toast from 'react-hot-toast'
import * as yup from "yup";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress, FormHelperText, TextField } from '@mui/material'
import { Key } from 'mdi-material-ui'
import { green } from '@mui/material/colors'

const schema = yup.object().shape({
    new_password: yup.string().required().min(5).max(24),
    confirm_new_password: yup.string()
    .oneOf([yup.ref('new_password'), null], 'Passwords must match')
});

// ** Styled Components
const ResetPasswordIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const ResetPasswordIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const ResetPasswordV2 = () => {
  // ** States

  const defaultValues = {
    token: '',
    new_password: '',
    confirm_new_password: ''
  }

  const { register, control, handleSubmit, formState: { errors }, reset, setError } = useForm({
    resolver: yupResolver(schema), defaultValues
  });

  const theme = useTheme()
  const { settings } = useSettings()

  const [ actionsLoading, setActionsLoading ] = useState(false)
  const [ sent, setSent ] = useState(false)

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const submitData = async values => {
    try {
        setActionsLoading(true)
        const params = new URLSearchParams(window.location.search);
        let token = params.get('token')
        let payload = {
            token,
            new_password: values.new_password,
            confirm_new_password: values.confirm_new_password
        }
        await authService.resetPassword(payload)
        toast.success('Password saved... You will be redirected in 5 seconds')
        setActionsLoading(false)
        setSent(true)
        setTimeout(() => {
            window.location.replace('/')
        }, 5000)
    } catch (er) {
        setActionsLoading(false)
        er.errors && Array.isArray(er.errors) && er.errors.map(x => {
            if(x.path){
                x.path.map(y => 
                    {
                        if(y === 'token'){
                            toast.error(x.message.replaceAll('"', ''))
                        } else {
                            setError(y, {
                                message: x.message
                            })
                        }
                    }
                )
            } else {
                toast.error(x.message)
            }
        })
    }
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const imageSource =
    skin === 'bordered' ? 'auth-v2-reset-password-illustration-bordered' : 'auth-v2-reset-password-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <ResetPasswordIllustrationWrapper>
            <ResetPasswordIllustration
              alt='reset-password-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </ResetPasswordIllustrationWrapper>
          <FooterIllustrationsV2 image={`/images/pages/auth-v2-reset-password-mask-${theme.palette.mode}.png`} />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img height={28} src='/images/logos/logo.png' />
              <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>Reset Password 🔒</TypographyStyled>
              <Typography variant='body2'>
                Your new password must be different from previously used passwords
              </Typography>
            </Box>
            <form autoComplete='off' onSubmit={handleSubmit(submitData)}>
                <Box style={{marginBottom: '1em'}}>
                    <FormControl fullWidth>
                        <Controller
                          name='new_password'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='New Password'
                              type='password'
                              onChange={onChange}
                              placeholder='New Password'
                              error={Boolean(errors.new_password)}
                              aria-describedby='new_password'
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    <Key />
                                  </InputAdornment>
                                )
                              }}
                            />
                          )}
                        />
                        {errors.new_password && (
                          <FormHelperText  sx={{ color: 'error.main' }} id='new_password'>
                            {errors.new_password.message}
                          </FormHelperText>
                        )}
                    </FormControl>
                </Box>
           
                <Box style={{marginBottom: '1em'}}>
                    <FormControl fullWidth>
                        <Controller
                          name='confirm_new_password'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Confirm Password'
                              type='password'
                              onChange={onChange}
                              placeholder='Confirm Password'
                              error={Boolean(errors.confirm_new_password)}
                              aria-describedby='confirm_new_password'
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    <Key />
                                  </InputAdornment>
                                )
                              }}
                            />
                          )}
                        />
                        {errors.confirm_new_password && (
                          <FormHelperText sx={{ color: 'error.main' }} id='confirm_new_password'>
                            {errors.confirm_new_password.message}
                          </FormHelperText>
                        )}
                    </FormControl>
                </Box>
              <Button disabled={actionsLoading || sent} fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }}>
                {
                    !sent ? 'Set New Password' : 'Done!'
                }
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
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link passHref href='/'>
                  <Typography
                    component={MuiLink}
                    sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', justifyContent: 'center' }}
                  >
                    <ChevronLeft sx={{ mr: 1.5, fontSize: '2rem' }} />
                    <span>Back to login</span>
                  </Typography>
                </Link>
              </Typography>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
ResetPasswordV2.getLayout = page => <BlankLayout>{page}</BlankLayout>
ResetPasswordV2.guestGuard = true
// ResetPasswordV2.authGuard = true
export default ResetPasswordV2
