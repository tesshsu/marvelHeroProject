# marvelHeroProject
Application mobile  first  all Marvel api build with node and Vue

## Running the code

### Server side
Create a new server/.env file and add your apikey and hash credentials as follows:
MARVEL_PUBLIC_KEY=46f0111ea554f723e31bf89fb79ec36f
MARVEL_PRIVATE_KEY=c6ba6aa62e817e93f4e3d74df5fb057a5b67adbf
MARVEL_BASE_URL='http://gateway.marvel.com/v1/public'

### Client side
VUE_APP_SERVER_BASE_URL=http://localhost:3000/api/characters

### Install the dependences and start the server:
cd server
npm install
npm start

### Install the dependences and start the client:
cd client
npm install
npm run build && npm run serve

### Build project with docker:
Both in server and client side
$ docker build -t marvel-app .

![desktip](https://user-images.githubusercontent.com/3927152/225871233-f99b93e9-f646-427d-b41c-b5d8999ac350.png)
![mobile](https://user-images.githubusercontent.com/3927152/225871245-e35b038a-5154-47d3-b2bc-b08b747a67fd.png)


## License
This library is released under the MIT License.
