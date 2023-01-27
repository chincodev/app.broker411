// ** Icon imports
import Table from 'mdi-material-ui/Table'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import FormSelect from 'mdi-material-ui/FormSelect'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import LockOutline from 'mdi-material-ui/LockOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import ShieldOutline from 'mdi-material-ui/ShieldOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ArchiveOutline from 'mdi-material-ui/ArchiveOutline'
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import VectorArrangeBelow from 'mdi-material-ui/VectorArrangeBelow'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import CalendarBlankOutline from 'mdi-material-ui/CalendarBlankOutline'
import PackageVariantClosed from 'mdi-material-ui/PackageVariantClosed'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import CheckboxMarkedCircleOutline from 'mdi-material-ui/CheckboxMarkedCircleOutline'
import { AccountGroupOutline, AlertOutline, BowlMixOutline, FaceAgent, Home, Package, PhoneOutline, ShippingPallet, StarOutline, TruckOutline, ViewListOutline } from 'mdi-material-ui'
import { useAuth } from 'src/hooks/useAuth'

const navigation = () => {

  const auth = useAuth()

  if(auth.user.role.name === 'administrator'){
    return [
      {
        sectionTitle: 'Menu'
      },
      {
        title: 'Home',
        icon: HomeOutline,
        path: '/'
      },{
        title: 'Users',
        icon: AccountGroupOutline,
        path: '/admin/users'
      },{
        title: 'Businesses',
        icon: TruckOutline,
        path: '/admin/businesses'
      },{
        title: 'Fields',
        icon: ViewListOutline,
        path: '/admin/fields'
      },{
        title: 'Reviews',
        icon: StarOutline,
        path: '/admin/reviews'
      },{
        title: 'Reports',
        icon: AlertOutline,
        path: '/admin/reports'
      }
    ]
  } else if(auth.user.business && auth.user.business.type === 'broker') {
    return [
      {
        sectionTitle: 'Menu'
      },
      {
        title: 'Home',
        icon: HomeOutline,
        path: '/'
      },{
        title: 'Loads',
        icon: ShippingPallet,
        path: '/loads'
      },{
        title: 'Carriers',
        icon: TruckOutline,
        path: '/carriers'
      },{
        title: 'Reviews',
        icon: StarOutline,
        path: '/reviews'
      }
    ]
  } else if(auth.user.business && auth.user.business.type === 'carrier'){
    return [
      {
        sectionTitle: 'Menu'
      },
      {
        title: 'Home',
        icon: Home,
        path: '/'
      },{
        title: 'Brokers',
        icon: FaceAgent,
        path: '/brokers'
      },{
        title: 'Loadboard',
        icon: ShippingPallet,
        path: '/loadboard'
      }
    ]
  } else {
    return [
      {
        sectionTitle: 'Menu'
      },
      {
        title: 'Home',
        icon: HomeOutline,
        path: '/'
      }
    ]
  }
  
}

export default navigation
