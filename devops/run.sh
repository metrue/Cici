#!/bin/sh

set -e
npm run build && nginx -g 'daemon off;'
