// ** Third Party Imports
import axios from 'axios'
import { businessService } from 'services/business.service'
import tokenServer from '../../../utils/tokenServer'
// ** Demo Components Imports
import BusinessViewPage from 'src/views/apps/business/view/BusinessViewPage'
import { reviewService } from 'services/review.service'
import ReviewPageWrapper from 'src/views/apps/review/details/PageWrapper'

const ReviewView = ({ id, data, code }) => {

    console.log(data)
    return <ReviewPageWrapper 
        data={data} 
        code={code} 
        id={id} 
    />
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

export default ReviewView
