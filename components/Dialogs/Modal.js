import React, { useContext } from 'react';
import { DialogContext } from '../../store/dialogContext';

const Modal = () => {
  const dialogCtx = useContext(DialogContext);
  const { modalDetails, hideModal } = dialogCtx;

  const handleClose = (e) => {
    if (e.target.id === 'backdrop') hideModal();
  };

  if (!dialogCtx.modalDetails) return null;
  return (
    <div
      id='backdrop'
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center overflow-y-scroll'
      onClick={handleClose}
    >
      <div className='w-8/12 md:w-7/12 lg:w-1/2 py-4 h-full'>
        <div className='bg-white rounded-md'>
          <div className='modal-header flex p-4 justify-between items-center border-b border-slate-200'>
            <h3 className='text-xl text-gray-700 font-bold'>
              {modalDetails.title || 'Dialog'}
            </h3>

            <button className='text-gray-600 text-xl ' onClick={hideModal}>
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
          {modalDetails.content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
