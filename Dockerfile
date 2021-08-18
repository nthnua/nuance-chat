FROM node:16-bullseye-slim
USER node
COPY --chown=node . /rinsme
WORKDIR /rinsme
RUN npm ci
CMD npm start
EXPOSE 3000