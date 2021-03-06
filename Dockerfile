# base image
FROM centos:7.6.1810

# set working directory
WORKDIR /code

# install chrome for protractor tests
RUN yum install -y gcc-c++ make nano
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash
RUN yum -y install nodejs

# install and cache app dependencies
COPY package.json /code/package.json
#RUN mkdir ~/.npm-global
#RUN npm config set prefix '~/.npm-global'
#RUN export PATH=~/.npm-global/bin:$PATH
#RUN source ~/.profile
RUN rm -rf node_modules/
RUN npm i --save
RUN npm i npm@latest -g
RUN npm install -g @angular/cli
RUN npm install --save ngx-material-timepicker

# add `/app/node_modules/.bin` to $PATH
ENV PATH /code/node_modules/.bin:$PATH

# add app
COPY . .

# hot reload
EXPOSE 49153

# start app
CMD ["ng", "serve", "--disable-host-check", "--host=0.0.0.0", "--poll=2000"]
