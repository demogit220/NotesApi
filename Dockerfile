# syntax=docker/dockerfile:1


ARG NODE_VERSION=18.18.2

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
# ENV PORT=5000
# ENV DATABASE_PASSWORD=pass
# ENV DATABASE=uri
# ENV JWT_SECRET=secret
# ENV JWT_EXPIRES_IN=days
# ENV JWT_COOKIE_EXPIRES_IN=number


WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application.
CMD npm run dev
