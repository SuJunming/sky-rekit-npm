import React, { useState, useEffect } from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

const Test = (props: any) => {
    useEffect(() => {}, [])

 
    return <div className='test_page'>Test</div>
}

export default C({
    modal: 'Test',
    Component: Test,
    title: 'Test'
})


  