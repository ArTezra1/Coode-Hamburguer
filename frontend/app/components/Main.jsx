"use client"
import getFunction from "../services/APImethodes.js" 

import React from 'react'

const Main = () => {
  
  function getData(){
    getFunction().then(data => console.log(data)).catch(err => console.error(err))

  }  

  return (
    <main>
      <button onClick={getData}>GET function</button>
    </main>
  )
}

export default Main