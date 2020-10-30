import React, { useState, useEffect } from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

const TestTwo = (props: any) => {
    useEffect(() => {}, [])

 
    return <div className='test-two_page'>TestTwo</div>
}

export default C({
    modal: 'TestTwo',
    Component: TestTwo,
    title: 'TestTwo'
})


  