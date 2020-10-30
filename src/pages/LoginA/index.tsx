import React from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

class LoginA extends React.Component<any, any> {
    state = {}

    componentDidMount() {}

    render(){
        const { } = this.state
        const { data } = this.props.LoginA
        return (
            <div className='login-a_page'>LoginA</div>
        )
    }
}

export default C({
    modal: 'LoginA',
    Component: LoginA,
    title: 'LoginA'
})

