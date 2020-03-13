#!/bin/bash

tag=$1
if [ -z $tag ]; then
  tag="latest"
fi

echo "build docker image with tag: expert/ui_approval:$tag"

docker build -t expert/ui_approval:$tag .
docker tag expert/ui_approval:$tag swr.cn-north-4.myhuaweicloud.com/meinenghua/expert/ui_approval:$tag
docker push swr.cn-north-4.myhuaweicloud.com/meinenghua/expert/ui_approval:$tag