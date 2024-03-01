import React from 'react'
import './main.css'
import TopNav from '../components/TopNav'
import Feed from '../components/Feed'
import useToken from '../components/useToken'

const Main = () => {
    
    return (
        <div className='main_view'>
            <TopNav />
            {/* sidenav component */}
            {/* <Feed /> */}
        </div>
    )
}

export default Main