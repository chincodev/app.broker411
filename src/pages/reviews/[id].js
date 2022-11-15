// ** Third Party Imports
import axios from 'axios'
import { businessService } from 'services/business.service'
import tokenServer from '../../../utils/tokenServer'
// ** Demo Components Imports
import BusinessViewPage from 'src/views/apps/business/view/BusinessViewPage'
import { reviewService } from 'services/review.service'

const ReviewView = ({ id, data, code }) => {
    return <h1>ads</h1>
}

export async function getServerSideProps(context){
    const { 
        params:{
            id
        } 
    } = context

    const userToken = tokenServer(context)

    try {
        const data = await reviewService.find(id, userToken)
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

export default ReviewView
