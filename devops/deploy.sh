#!/bin/bash

ssh <$user>@<$host> <<END
  docker rmi \$(docker images --filter "dangling=true" -q --no-trunc)
  rm -rf /tmp/
  git clone git@github.com:metrue/Sira.git /tmp/seal
  git clone https://github.com/metrue/Seal /tmp/seal
  cd /tmp/seal
  docker build -f devops/dockerfile.nginx -t seal .
  docker run -d -p 80:80 seal
END
