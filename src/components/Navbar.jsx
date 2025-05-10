import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center mx-auto px-6 py-2 bg-blue-700 text-white'>
      <div className="logo font-bold text-2xl cursor-pointer hover:font-extralight transition-all">
        Todo-Lite
      </div>
      <ul className="flex items-center gap-6 ">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar