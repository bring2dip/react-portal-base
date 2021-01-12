# React Portal Base
Simple React Portal for rendering modal and notifications

## Install

````
npm i react-portal-base
or
yarn add react-portal-base
````

## Setup
Add root element in your view.
````
<!--For notification-->
<div 
  id="react-portal-base-notification-root"
  class="react-portal-base-notification-root"
>
</div>
<!--For modal-->
<div 
  id="react-portal-base-modal-root"
  class="react-portal-base-modal-root"
>
</div>
````


## Modal

````
import React from 'react';
import Portal from 'react-portal-base';
import ModalComponent from 'some modal';

export default ModalInPortalTest() {
  
  return (
    <Portal portalType="modal">
     <ModalComponent />
    </Portal>
  );
}
````

## Notifiction
Children inside notification portal disappear after `timeout` in ms. Default is `3000ms`.
````
import React from 'react';
import Portal from 'react-portal-base';
import Alert from 'some alert component';

export default ModalInPortalTest() {
  
  return (
    <Portal portalType="notification" timeout={5000}>
     <Alert />
    </Portal>
  );
}
````

## API

````
timeout: Timeout in Number (Default 3000 ms),
portalType: One of ['modal', 'notification'] (Required)
notificationRootId: custom notification root id (Default: react-portal-base-notification-root),
modalRootId: custom notification root id (Default: react-portal-base-modal-root),
````

## License

MIT
