#!/bin/bash
docker buildx build \
  --platform linux/arm64/v8 \
  -t docker.stefangeneralao.com/stilipshue-backend \
  --push .
