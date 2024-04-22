import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate()
    
    return (
        <button className='content-header' onClick={() => navigate('/')}>Back to Feed</button>
    )
}

export default BackButton