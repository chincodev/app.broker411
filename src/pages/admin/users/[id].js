// ** Third Party Imports
import axios from 'axios'
import { businessService } from 'services/business.service'
import tokenServer from '../../../../utils/tokenServer'
// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/view/UserViewPage'
import { userService } from 'services/user.service'

const UserView = ({ id, data, code }) => {
    return <UserViewPage id={id} data={data} code={code} />
}

export async function getServerSideProps(context){
    const { 
        params:{
            id
        } 
    } = context

    const userToken = tokenServer(context)

    try {
        const data = await userService.find(id, userToken)
        return {
            props: {
                data,
                id
            }
        }
    } catch ({message, code}) {
        return {
            props: {
                code
            }
        }
    }
}

export default UserView
