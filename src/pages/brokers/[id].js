// ** Third Party Imports
import axios from 'axios'
import { businessService } from 'services/business.service'
import tokenServer from '../../../utils/tokenServer'
// ** Demo Components Imports
import BusinessViewPage from 'src/views/apps/business/view/BusinessViewPage'
import queryString from 'query-string'

const UserView = ({ id, data, code }) => {
    return <BusinessViewPage id={id} data={data} code={code} />
}

export async function getServerSideProps(context){
    const { 
        params:{
            id
        } 
    } = context

    const userToken = tokenServer(context)

    try {
        const data = await businessService.find_broker_in_fmcsa(id, userToken, queryString.stringify(context.query))
        return {
            props: {
                data:data.record,
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
