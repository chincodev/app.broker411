import ReviewsList from 'src/views/apps/review/list'

const Reviews = ({ id, data, code }) => {
    return <ReviewsList id={id} data={data} code={code} />
}

// export async function getServerSideProps(context){
//     const { 
//         params:{
//             id
//         } 
//     } = context

//     const userToken = tokenServer(context)

//     try {
//         const data = await businessService.find_broker_in_fmcsa(id, userToken)
//         return {
//             props: {
//                 data:data.record,
//                 id
//             }
//         }
//     } catch ({message, code}) {
//         return {
//             props: {
//                 code
//             }
//         }
//     }
// }

export default Reviews
