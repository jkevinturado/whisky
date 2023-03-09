import { createContext, useContext, useState } from 'react';

const DialogContext = createContext({
  modalDetails: null,
  notification: null,
  showModal: (modalData) => {},
  hideModal: (modalData) => {},
  toggleDrawer: () => {},
  showNotification: (notificationData) => {},
  hideNotification: (notificationData) => {},
});

const DialogContextProvider = (props) => {
  const [modal, setModal] = useState();
  const [showDrawer, setShowDrawer] = useState(false);
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

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
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
    showDrawer,
    notification,
    showModal,
    hideModal,
    toggleDrawer,
    showNotification,
    hideNotification,
  };
  return (
    <DialogContext.Provider value={context}>{children}</DialogContext.Provider>
  );
};

const useDialog = () => {
  return useContext(DialogContext);
};

export { DialogContext, DialogContextProvider, useDialog };
