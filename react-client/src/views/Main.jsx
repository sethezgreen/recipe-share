import React from 'react'
import './main.css'
import TopNav from '../components/TopNav'
import Feed from '../components/Feed'

const Main = (props) => {
    const {token} = props
    
    return (
        <div className='main_view'>
            <TopNav />
            {/* sidenav component */}
            {/* <Feed /> */}
            <p>Token from props: {token}</p>
        </div>
    )
}

export default Main