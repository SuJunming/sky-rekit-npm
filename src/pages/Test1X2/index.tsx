import React, { useState, useEffect } from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

const Test1X2 = (props: any) => {
    useEffect(() => {}, [])

 
    return <div className='test1-x2_page'>Test1X2</div>
}

export default C({
    modal: 'Test1X2',
    Component: Test1X2,
    title: 'Test1X2'
})


  