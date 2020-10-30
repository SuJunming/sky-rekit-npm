import React from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

class Testaaaaaa extends React.Component<any, any> {
    state = {}

    componentDidMount() {}

    render(){
        const { } = this.state
        const { data } = this.props.Testaaaaaa
        return (
            <div className='testaaaaaa_page'>Testaaaaaa</div>
        )
    }
}

export default C({
    modal: 'Testaaaaaa',
    Component: Testaaaaaa,
    title: 'Testaaaaaa'
})

