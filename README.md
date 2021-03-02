# Chat app

"MyChat" is a project I started to improve my front-end development knowledge. I practiced responsive web design and react hooks.

You can visit MyChat project by clicking the URL below.

[https://chat-web-app-49b27.web.app/](https://chat-web-app-49b27.web.app/)


## Preview

###desktop view
![mychat_signin](./images/mychat_singin.png)
![mychat_main](./images/mychat_main.png)
###mobile view
![mychat_mobile](./images/mychat_mobile.png)
![mychat_mobile2](./images/mychat_mobile2.png)

## Overview

Real-time chat with rooms, message likes, social media auth, role-based permissions.

Stack:

- React
- Firebase (real-time database)
- Styles with Material UI (Responsive Design)


## Features

- Messaging
    - Send and Receive messages.
    - Like messages(show number of likes as well).
    - Delete messages(only author can delete his/her own message).
    - Like and delete button only appears when hovered.
- Profile
    - Update your Avatar picture with the AvatarEditor component.
    - Show if user is online or offline.
    - View other users profile, and the date they joined the chat app.
    - Can link multiple provider to one account.
- Chat room
    - Create chat room with valid name and description.
    - Only author can change the chat room name and description.
    - Chat room list shows the last message with an associated author and date.
