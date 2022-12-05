# LivedIn

A social media web application based on MERN (MongoDB, Express, React, Node) stack. 

## Demo Link

https://livedinapp.surge.sh

Try my site, and share your thoughts!

## Run In Local

Run backend:

```shell
cd backend
npm install
heroku addons:create cloudinary:starter-2 # create your Heroku instance before running this
heroku config # find the CLOUDINARY_URL
export CLOUDINARY_URL="cloudinary:// get value from heroku"
node index.js
```

Run frontend:

```shell
cd frontend
npm install
npm run start
```

Check the front end view on: `http://localhost:3000`

### Deploy with Heroku, Cloudinary, MongoDB Atlas, Google OAuth and Surge

Find the `config.json` in both frontend and backend, fill in with relevant url or client key. 

Deploy backend on Heroku:

```shell
heroku create [app name]
echo web: node index.js > Procfile
git add .
git commit -m “initial heroku commit”
heroku buildpacks:set heroku/nodejs -a [app name]
git push heroku master
heroku ps:scale web=1
```

Deploy front end on Surge

```shell
npm run build
cd build
surge --domain [surge domain url]
```