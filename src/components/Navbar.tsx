import React from 'react'
import Menu from './Menu'
import Link from 'next/link'
import CartIcon from './CartIcon';
import Image from 'next/image';
import UserLinks from './UserLinks';

const Navbar = () => {
  const user = false;  
  return (
    <div className='h-12 flex text-red-500 p-4 justify-between items-center border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40'>
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>
      {/* LOGO */}
      <div className='text-xl md:font-bold md:text-center flex-1'>
        <Link href="/">MASSIMO</Link>
      </div>
      {/* MOBILE MENU */}
      <div className='md:hidden'>
        <Menu/>
      </div>
      {/* RIGHT LINKS */}
      <div className='hidden md:flex gap-4 items-center justify-end flex-1'>
        <div className='md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer px-1 rounded-md bg-orange-200'>
            <Image src="/phone.png" alt='' width={20} height={20}/>
            <span>+6282 27110 8307</span>
        </div>
        <UserLinks/>
        <CartIcon/>
      </div>
    </div>
  )
}

export default Navbar
