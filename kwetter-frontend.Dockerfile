FROM node:12

WORKDIR /Kwetter/apps/frontend
COPY package.json .

RUN npm install
ADD . /Kwetter/apps/frontend

RUN npm run build
CMD ["npm", "run", "serve"]
EXPOSE 8080