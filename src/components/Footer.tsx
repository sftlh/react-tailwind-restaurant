import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-12 md:h-24 items-center justify-between flex text-red-500 p-4 lg:px-20 xl:px-40'>
      <Link href={'/'} className='font-bold text-xl'>MASSIMO</Link>
      <p>Copr All Right Reserved</p>
    </div>
  )
}

export default Footer
