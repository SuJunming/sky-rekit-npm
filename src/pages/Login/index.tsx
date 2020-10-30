import React from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

class Login extends React.Component<any, any> {
    state = {}

    componentDidMount() {}

    render(){
        const { } = this.state
        const { data } = this.props.Login
        return (
            <div className='login_page'>Login</div>
        )
    }
}

export default C({
    modal: 'Login',
    Component: Login,
    title: 'Login'
})

