#!/bin/bash

env=$1

host='root@106.185.44.133'
ssh ${host} <<END
  docker rmi \$(docker images --filter "dangling=true" -q --no-trunc)
  rm -rf /tmp/asmalltalk.com
  git clone git@github.com:asmalltalk/asmalltalk.github.io.git /tmp/asmalltalk.com
  cd /tmp/asmalltalk.com
  docker build -f devops/dockerfile.nginx -t seal .
  docker run -p 80:80 seal
END
