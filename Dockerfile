FROM node:19



WORKDIR /usr/app



COPY package*.json ./



RUN npm install



COPY . .



RUN npm run build



COPY .env ./dist/



WORKDIR ./dist



EXPOSE 4000



CMD ["node", "src/app.js"]