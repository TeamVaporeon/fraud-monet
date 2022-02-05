# Project #Chique! - Questions & Answers
by Wisdom Ibole [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/kevinzhugao/)](https://www.linkedin.com/in/wisdom-ibole/) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/kevinzhugao)](https://github.com/FlightfulKiwi)

![](chat-client.gif)

The chat client feature allows for quasi-live communication/chatting between game players.  This component makes use of asynchronous functions, Axios, CSS, Express, React (hooks & classes), and Socket.io, among other things.

### How Does It Work?
- Individual socket connections allow for the identification of different players
- Messages from players within a room are broadcast only to members associated with that room
- React state allows for the display of all messages; new spectators are thus able to see all the previous messages