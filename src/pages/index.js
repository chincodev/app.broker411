// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = role => {
  if (role === 'representative') return '/home'
  if (role === 'owner') return '/dashboard'
  else return '/admin'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (auth.user && auth.user.role && auth.user.role.name) {
      const homeRoute = getHomeRoute(auth.user.role.name)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ''
}

export default Home
