import React from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

class XAS extends React.Component<any, any> {
    state = {}

    componentDidMount() {}

    render(){
        const { } = this.state
        const { data } = this.props.XAS
        return (
            <div className='x-a-s_page'>XAS</div>
        )
    }
}

export default C({
    modal: 'XAS',
    Component: XAS,
    title: 'XAS'
})

