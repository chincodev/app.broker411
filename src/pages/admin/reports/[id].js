// ** Third Party Imports
import axios from 'axios'
import { businessService } from 'services/business.service'
import tokenServer from '../../../../utils/tokenServer'
// ** Demo Components Imports
import BusinessViewPage from 'src/views/apps/business/view/BusinessViewPage'
import { reportService } from 'services/report.service'
import ReportViewPage from 'src/layouts/ReportViewPage'
import PageNotFoundCard from 'src/@core/layouts/NotFoundCard'

const UserView = ({ id, data, code }) => {
    if(code === 404){
        return <PageNotFoundCard context='reports' />
    }
    return <ReportViewPage id={id} data={data} code={code} />
}

export async function getServerSideProps(context){
    const { 
        params:{
            id
        } 
    } = context

    const userToken = tokenServer(context)

    try {
        const data = await reportService.find(id, userToken)
        return {
            props: {
                data:data,
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

export default UserView;