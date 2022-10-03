# WeebCentral (WC)
Weeb Centeral is a proxy website that uses multiple backends. Such as:
- [Ultraviolet](https://github.com/titaniumnetwork-development/Ultraviolet)

And others coming soon (so I won't list them here)

Here is a preview of the website: 
![Preview](./Images_for_readme/Preview.png)

## Self Hosting
---
### Requirements
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads)
- [NPM](https://www.npmjs.com/get-npm) <br>
## Installation
- Clone the repository
```bash 
$ git clone https://github.com/weeb-network/wc.git
```
- Install the dependencies
```bash
$ npm install
```
- Start the server
```bash
$ npm start
```
- Open your browser and go to `localhost:8080`
## Alternatives for Hosting
### Docker Installation
#### Requirements
- Install docker and docker-compose (if you don't have it already) 
#### Installation
License
- Copy the docker compose example below and paste it into a file called `docker-compose.yml`
```yaml
version: "2"
services:
  wc:
    restart: unless-stopped
    image: "motortruck1221/wc:latest"
    ports:
    #IMPORTANT: DO NOT CHANGE THE 8080 PART ONLY CHANGE THE <your port here> PART
      - <your port here>:8080

```
 - You can also just simply curl the docker-compose.yml file from github
 ```bash 
$ curl https://raw.githubusercontent.com/Weeb-Network/wc/main/docker-compose.yml > docker-compose.yml
```
- Change `<your port here>` to the port you want to use removing the `<>` around it.
- Run the docker-compose file
```bash
$ docker-compose up -d
```
#### Docker Only Installation
- Run the following command
```bash
$ docker run -d -p <your port here>:8080 motortruck1221/wc:latest
```
- Change `<your port here>` to the port you want to use removing the `<>` around it.

