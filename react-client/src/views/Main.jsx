import React from 'react'
import './main.css'
import TopNav from '../components/TopNav'
import Feed from '../components/Feed'
import { Link } from 'react-router-dom'

const Main = (props) => {
    const {token} = props
    
    return (
        <div className='main_view'>
            <TopNav />
            {/* sidenav component */}
            <h3>Feed</h3>
            <Link to={'http://localhost:5173/create/recipe'}>add recipe</Link>
            <Feed token={token}/>
            <p>Token from props: {token}</p>
        </div>
    )
}

export default Main