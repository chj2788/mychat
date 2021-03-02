
# Chat app

"MyChat" is a project I started to improve my front-end development knowledge. I practiced responsive web design and react hooks.

You can visit MyChat project by clicking the URL below.

[https://chat-web-app-49b27.web.app/](https://chat-web-app-49b27.web.app/)


## Preview

#### desktop view

![mychat_signin](https://user-images.githubusercontent.com/62086687/109635186-6e88db00-7b8d-11eb-82b6-47d5247f961f.PNG)

![mychat_main](https://user-images.githubusercontent.com/62086687/109635198-7183cb80-7b8d-11eb-8d6a-5e956c1568f2.PNG)

#### mobile view

![mychat_mobile](https://user-images.githubusercontent.com/62086687/109635042-44cfb400-7b8d-11eb-9cf0-2fb4948a5791.PNG)
![mychat_mobile2](https://user-images.githubusercontent.com/62086687/109635113-59ac4780-7b8d-11eb-91b5-e32780a16fc0.PNG)


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
