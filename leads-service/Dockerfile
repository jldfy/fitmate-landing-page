FROM node:22-alpine
WORKDIR /app
COPY server.mjs admin.html ./
ENV PORT=8787 DATA_DIR=/data NODE_ENV=production
VOLUME ["/data"]
EXPOSE 8787
HEALTHCHECK --interval=30s CMD wget -qO- http://127.0.0.1:8787/healthz || exit 1
CMD ["node", "server.mjs"]
