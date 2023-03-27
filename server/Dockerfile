FROM node:18-alpine
WORKDIR /
COPY . .
RUN npm install --production
CMD ["node", "index.js"]
EXPOSE 5000

USER 10009
