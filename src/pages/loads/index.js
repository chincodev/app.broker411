import LoadsList from 'src/views/apps/loads/list'

const Loads = ({ id, data, code }) => {
    return <LoadsList 
        id={id} 
        data={data} 
        code={code} 
        requiredFilter={'?'} 
    />
}

export default Loads
