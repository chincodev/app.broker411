// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

import { authService } from '../../services/auth.service'
import { userService } from '../../services/user.service'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { ClockCheck } from 'mdi-material-ui'
import Cookies from 'js-cookie'

// ** Defaults
const defaultProvider = {
	user: null,
	loading: true,
	setUser: () => null,
	setLoading: () => Boolean,
	isInitialized: false,
	login: () => Promise.resolve(),
	logout: () => Promise.resolve(),
	setIsInitialized: () => Boolean,
	register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
	// ** States
	const [user, setUser] = useState(defaultProvider.user)
	const [loading, setLoading] = useState(defaultProvider.loading)
	const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized)

	// ** Hooks
	const router = useRouter()
	useEffect(() => {
		const initAuth = async () => {
			setIsInitialized(true)
			const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
			if (storedToken) {
				setLoading(true)
          await userService.get_me()
					.then(async response => {
						setLoading(false)
						setUser({ ...response })
					})
					.catch((er) => {
						localStorage.removeItem('userData')
						localStorage.removeItem('refreshToken')
						localStorage.removeItem('accessToken')
						Cookies.remove('accessToken')
						setUser(null)
						setLoading(false)
					})
			} else {
				setLoading(false)
			}
		}
		initAuth()
	}, [])

	const handleLogin = async (params, errorCallback) => {
		authService.login(params)
		.then(async res => {
			await localStorage.setItem('accessToken', res.data.accessToken)
			await Cookies.set('accessToken', res.data.accessToken)
		})
		.then(() => {

			userService
				.get_me()
				.then(async response => {
					const returnUrl = router.query.returnUrl
					setUser({ ...response })
					await window.localStorage.setItem('userData', JSON.stringify(response))
					const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
					router.replace('/')
				})
		})
		.catch(err => {
      console.log(err)
			if (errorCallback) errorCallback(err)
		})
    }

	const handleLogout = () => {
		setUser(null)
		setIsInitialized(false)
		window.localStorage.removeItem('userData')
		window.localStorage.removeItem(authConfig.storageTokenKeyName)
		router.push('/login')
	}

	const handleRegister = (params, errorCallback) => {
		authService.register(params)
		.then(res => {
			  handleLogin({ email: params.email, password: params.password })
		})
		.catch(err => {
			if (errorCallback) errorCallback(err)
		})
	}

    const values = {
	    user,
		loading,
		setUser,
		setLoading,
		isInitialized,
		setIsInitialized,
		login: handleLogin,
		logout: handleLogout,
		register: handleRegister
	}

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
