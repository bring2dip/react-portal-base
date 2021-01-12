import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Portal({ portalType, notificationRootId, modalRootId, timeout, children }) {
  const [element, setElement] = useState(null);
  const portalRoot = useRef(null);

  const idMap = {
    notification: notificationRootId,
    modal: modalRootId,
  };

  const removeChild = () => {
    if (element && element.parentNode === portalRoot.current) {
      portalRoot.current.removeChild(element);
    }
  };

  useEffect(function setRootElementBasedOnPortalType() {
    portalRoot.current = document.getElementById(idMap[portalType]);
    if (portalType === 'notification') {
      setElement(document.createElement('div'));
    } else {
      setElement(portalRoot.current);
    }
  }, []);

  useEffect(function appendElementForNotification() {
    if (element && portalType === 'notification') {
      portalRoot.current.appendChild(element);
    }
  }, [element]);

  useEffect(function handleNotificationTimeout() {
    let timeoutId = null;
    if (element && portalType === 'notification') {
      timeoutId = setTimeout(() => {
        removeChild();
      }, timeout);
    }
    return function cleanup() {
      clearInterval(timeoutId);
      removeChild();
    };
  }, [element]);

  if (!element) {
    return null;
  }

  return ReactDOM.createPortal(children, element);
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  timeout: PropTypes.number,
  portalType: PropTypes.oneOf(['modal', 'notification']).isRequired,
  notificationRootId: PropTypes.string,
  modalRootId: PropTypes.string,
};

Portal.defaultProps = {
  timeout: 3000,
  notificationRootId: 'react-portal-base-notification-root',
  modalRootId: 'react-portal-base-modal-root',
};
