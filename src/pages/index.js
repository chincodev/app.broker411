// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'
import { isEmpty } from 'lodash'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role, business) => {
  if (role === 'representative' || role === 'owner') {
    if(!isEmpty(business)){
      if(business.type === 'carrier'){
        return '/feed'
      } else {
        return '/dashboard'
      }
    } else if(role === 'guest') {
      return '/dashboard'
    } else {
      return '/admin'
    }
  }
}

const Home = () => {
 
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (auth.user && auth.user.role && auth.user.role.name) {
      const homeRoute = getHomeRoute(auth.user.role.name, auth.user.business)
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ''
}

export default Home
