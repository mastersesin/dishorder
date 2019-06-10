# base image
FROM node:12.2.0

# set working directory
WORKDIR /code

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable
RUN apt-get install nano

# add `/app/node_modules/.bin` to $PATH
ENV PATH /code/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /code/package.json
RUN npm install

# add app
COPY . .

# hot reload
EXPOSE 49153

# start app
CMD ng serve --host 0.0.0.0 --poll 2000 --disable-host-check