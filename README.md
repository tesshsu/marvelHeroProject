# marvelHeroProject
Application mobile  first  all Marvel api build with node and Vue

## Running the code
Create a new server/.env file and add your apikey and hash credentials as follows:
MARVEL_PUBLIC_KEY=46f0111ea554f723e31bf89fb79ec36f
MARVEL_PRIVATE_KEY=c6ba6aa62e817e93f4e3d74df5fb057a5b67adbf
MARVEL_BASE_URL='http://gateway.marvel.com/v1/public'

### Install the dependences and start the server:
cd server
npm install
npm start

### Install the dependences and start the client:
cd client
npm install
npm run build && npm run serve

### Build project with docker:
$ docker build -t marvel-app .

## License
This library is released under the MIT License.