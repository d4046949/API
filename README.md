#API

This is the Node JS / Socket.io port of the Evolution prototype API

## To build

Checkout the repo and navigate to the folder.

* `npm install`

## To run

At the minute most of the features have been removed or not called. This is due to the on going refactor. Follow these steps to start the application:
* From the root folder of this repository: set DEBUG=api:* & node app.js
* In a browser navigate to http://localhost:5000
* 
## Background
This project is designed to run has a background service hosting many tasks. These tasks are loaded from the app.js file and are designed to be abstracted from their real work. 

* ReceiverService -> Will recieve messages and events from the client via a socket
* ApiService -> Will recieve dispatch Api requests and broadcast them to 'workers'
* DispatcherService -> Will dispatch messages and events to the client via a socket

