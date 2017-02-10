<img src="https://raw.githubusercontent.com/metrue/Seal/master/screenshots/home.png" alt="home" style="width: 300px;"/>
<img src="https://raw.githubusercontent.com/metrue/Seal/master/screenshots/post.png" alt="home" style="width: 300px;"/>

# Seal

Yet another static website generator built on top of Vue 2 and Webpack

### Usage

* update the config.json with your personal information
* start write something in markdown
* then build your site

```
  npm run build # to generate your site in your defined directory
  npm run serve # to watch your site live
```

and you can also build and run it with docker like this.

```
  docker build -f devops/dockerfile.nginx -t seal .
  docker run -d -p 80:80 seal
```

then you can check your site at http://localhost now, normally I would like to deploy it to VPS use a small script.

```
## deploy.sh

ssh <$user>@<$host> <<END
  docker rmi \$(docker images --filter "dangling=true" -q --no-trunc)
  rm -rf /tmp/
  git clone git@github.com:metrue/Sira.git /tmp/seal
  git clone https://github.com/metrue/Seal /tmp/seal
  cd /tmp/seal
  docker build -f devops/dockerfile.nginx -t seal .
  docker run -d -p 80:80 seal
END
```

then put it into npm script, hit <code> npm run deploy </code> to do the deployment. That's it, have fun.

## Thanks

inspired from [vue-ghpages-blog](https://github.com/viko16/vue-ghpages-blog)

## LICENSE

MIT
