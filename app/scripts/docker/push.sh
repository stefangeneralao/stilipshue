#!/bin/bash
yarn
yarn build
docker buildx build --platform linux/arm/v6,linux/arm/v7,linux/amd64 --push -t stefangeneralao/stilipshue-frontend .