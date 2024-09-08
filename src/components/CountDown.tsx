"use client"
import React from 'react'
import Countdown from 'react-countdown'

const endingDate = new Date("09-20-2024")

const CountDown = () => {
  return (
    <div>
      <Countdown className='font-bold text-5xl text-yellow-400' date={endingDate}/>
    </div>
  )
}

export default CountDown
