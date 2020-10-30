import React, { useState, useEffect } from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

const TestOne = (props: any) => {
    useEffect(() => {}, [])

 
    return <div className='test-one_page'>TestOne</div>
}

export default C({
    modal: 'TestOne',
    Component: TestOne,
    title: 'TestOne'
})


  