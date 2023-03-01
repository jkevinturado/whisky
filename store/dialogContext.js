import { createContext, useState } from 'react';

const DialogContext = createContext({
  modalDetails: null,
  notification: null,
  showModal: (modalData) => {},
  hideModal: (modalData) => {},
  showNotification: (notificationData) => {},
  hideNotification: (notificationData) => {},
});

const DialogContextProvider = (props) => {
  const [modal, setModal] = useState();
  const [notification, setNotification] = useState();
  const { children } = props;

  const showModal = (modalData) => {
    console.log(modalData);
    setModal({
      title: modalData.title,
      content: modalData.content,
    });
  };

  const hideModal = () => {
    setModal(null);
  };

  const showNotification = (notificationData) => {
    setNotification({
      title: notificationData.title,
      message: notificationData.message,
      status: notificationData.status,
    });
  };
  const hideNotification = () => {
    setNotification(null);
  };

  const context = {
    modalDetails: modal,
    showModal,
    hideModal,
    notification,
    showNotification,
    hideNotification,
  };
  return (
    <DialogContext.Provider value={context}>{children}</DialogContext.Provider>
  );
};

export { DialogContext, DialogContextProvider };
