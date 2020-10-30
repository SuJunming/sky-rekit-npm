import React from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

class vvv extends React.Component<any, any> {
    state = {}

    componentDidMount() {}

    render(){
        const { } = this.state
        const { data } = this.props.vvv
        return (
            <div className='vvv_page'>vvv</div>
        )
    }
}

export default C({
    modal: 'vvv',
    Component: vvv,
    title: 'vvv'
})

