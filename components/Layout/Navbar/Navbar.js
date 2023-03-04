import React from 'react';

const NavLinks = [
  { id: 1, link: '/', text: 'Home', sublink: [] },
  { id: 5, link: '#', text: 'Build Your PC', sublink: [] },
  { id: 3, link: '/products', text: 'Products', sublink: [] },
  {
    id: 2,
    link: '#',
    text: 'Parts',
    sublink: [
      'Motherboard',
      'Processor',
      'Power Supply',
      'Storage',
      'Memory',
      'Chassis',
    ],
  },
  { id: 4, link: '#', text: 'Sales', sublink: [] },
  { id: 6, link: '#', text: 'PC Bundles', sublink: [] },
  // { id: 7, link: '#', text: 'Contact Us', sublink: [] },
];

const Navbar = () => {
  return (
    <>
      <nav className='nav flex justify-center items-center'>
        <ul className='nav-menu flex w-7/12 justify-center items-center border-t border-slate-300 text-black text-lg'>
          {NavLinks.map(({ id, link, text, sublink }) => (
            <li key={id} className='p-4 hover:bg-gray-500 hover:text-white'>
              <a href={link} className='flex items-center'>
                <span className='pr-1 flex-1'>{text}</span>
                {sublink.length > 0 && (
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-3 h-3'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3'
                      />
                    </svg>
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
