FROM quay.io/princerudh/rudhra:latest
RUN npm install -g npm@latest
RUN git clone https://github.com/rudhachu/testr .
RUN npm install
CMD ["npm", "start"]
