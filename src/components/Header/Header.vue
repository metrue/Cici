<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,user-scalable=no">
    <meta name="renderer" content="webkit">
    <meta name="theme-color" content="#ffffff">
    <link href="/css/build.HomePage.css" rel="stylesheet">
    <link href="/css/build.PostPage.css" rel="stylesheet">
    <title> {{ title }}</title>
    <script type="text/x-template">
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', {{ ga }}, 'auto');
      ga('send', 'pageview');

    </script>
  </head>
</template>

<script>
  import CONFIG from '../../../config/build'

  export default {
    name: 'Header',

    data() {
      return {
        title: CONFIG.title,
        ga: CONFIG.ga,
      }
    }
  }
</script>
