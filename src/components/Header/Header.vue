<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,user-scalable=no">
    <meta name="renderer" content="webkit">
    <meta name="theme-color" content="#ffffff">
    <link href="/css/build.HomePage.css" rel="stylesheet">
    <link href="/css/build.PostPage.css" rel="stylesheet">
    <title> {{ title }} </title>
  </head>
</template>

<script>
  import CONFIG from '../../../config/build'

  export default {
    name: 'Header',

    data() {
      return {
        title: CONFIG.title,
      }
    }
  }
</script>
