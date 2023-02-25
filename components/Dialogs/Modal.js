import React from 'react';

const Modal = ({ isModalOpen, onClose, children, title }) => {
  if (!isModalOpen) return null;
  return (
    <div
      onClick={onClose}
      className='fixed inset-0 h-max py-4 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
    >
      <div className='w-8/12 md:w-7/12 lg:w-1/2 '>
        <div className='bg-white rounded-md flex flex-col'>
          <div className='modal-header flex p-4 justify-between items-center border-b border-slate-200'>
            <h3 className='text-xl text-gray-700 font-bold'>
              {title || 'Dialog'}
            </h3>

            <button className='text-gray-600 text-xl ' onClick={onClose}>
              <div className='flex justify-center items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </div>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
