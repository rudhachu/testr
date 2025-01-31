FROM quay.io/princerudh/rudhra:latest
RUN git clone https://github.com/rudhachu/testr /root/rudhra/
WORKDIR /root/rudhra/
RUN npm install
CMD ["npm", "start"]
