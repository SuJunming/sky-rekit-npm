import React, { useState, useEffect } from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

const TestXXA = (props: any) => {
    useEffect(() => {}, [])

 
    return <div className='test-x-x-a_page'>TestXXA</div>
}

export default C({
    modal: 'TestXXA',
    Component: TestXXA,
    title: 'TestXXA'
})


  