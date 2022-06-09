#!/bin/bash
yarn
yarn build
docker buildx build --platform linux/arm64/v8,linux/amd64 --push -t docker.stefangeneralao.com/stilipshue-backend .
