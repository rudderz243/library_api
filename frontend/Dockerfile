# pull down the image once again
FROM node:22-alpine

# set working directory
WORKDIR /usr/src/app

# copy package file
COPY package*.json ./

# install required stuffies
RUN npm i

# copy ander goed
COPY . .

# expose a port (default for vite is 5173)
EXPOSE 5173

# run that thing (tell vite to allow connections from places other than localhost)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
