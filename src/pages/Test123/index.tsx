import React, { useState, useEffect } from 'react'
import C from "@C";
import { Input } from 'antd'

import './index.scss'

const Test123 = (props: any) => {
    useEffect(() => {}, [])

 
    return <div className='test123_page'>Test123</div>
}

export default C({
    modal: 'Test123',
    Component: Test123,
    title: 'Test123'
})


  