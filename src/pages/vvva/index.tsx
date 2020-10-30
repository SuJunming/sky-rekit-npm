import React from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

class vvva extends React.Component<any, any> {
    state = {}

    componentDidMount() {}

    render(){
        const { } = this.state
        const { data } = this.props.vvva
        return (
            <div className='vvva_page'>vvva</div>
        )
    }
}

export default C({
    modal: 'vvva',
    Component: vvva,
    title: 'vvva'
})

