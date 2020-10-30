import React, { useState, useEffect } from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

const Test1X = (props: any) => {
    useEffect(() => {}, [])

 
    return <div className='test1-x_page'>Test1X</div>
}

export default C({
    modal: 'Test1X',
    Component: Test1X,
    title: 'Test1X'
})


  