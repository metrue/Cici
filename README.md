<img src="https://raw.githubusercontent.com/metrue/Seal/master/screenshots/home.png" alt="home" style="width: 300px;"/>
<img src="https://raw.githubusercontent.com/metrue/Seal/master/screenshots/post.png" alt="home" style="width: 300px;"/>

# Seal

Yet another static website generator built on top of Vue 2 and Webpack

### Usage

```
$ cici -h

  Usage: cici [options]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -i, --inputDir <path>       Your posts directory, "./posts" by default
    -o, --ouputDir <path>       Specify the output directory, "./public" by default
    -t, --title <website name>  Your website name
```

it's easy, right?

```
npm install -g cici  # install cici
cici -i posts -o public -t minghe -g 'UA-527xxx-x' -d minghe.me" # build your markdown posts to a static website
cici -h # show help
```

## Showcase

* [小聊电台](https://asmalltalk.com)
* [minghe.me](https://minghe.me)

## Thanks

inspired by [vue-ghpages-blog](https://github.com/viko16/vue-ghpages-blog)

## LICENSE

MIT
