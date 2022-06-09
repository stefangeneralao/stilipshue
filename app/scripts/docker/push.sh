#!/bin/bash
yarn
yarn build
docker buildx build --platform linux/arm64/v8 --push -t docker.stefangeneralao.com/stilipshue-frontend .
