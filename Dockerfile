FROM node:14-bullseye
RUN apt-get update
RUN apt install git -y
RUN npm cache clean --force
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD npm run start
