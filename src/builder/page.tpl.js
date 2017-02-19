const tpl = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,user-scalable=no">
  <meta name="renderer" content="webkit">
  <meta name="theme-color" content="#ffffff">
  <link href="/css/build.HomePage.css" rel="stylesheet">
  <link href="/css/build.PostPage.css" rel="stylesheet">
  <title> {{ title }}</title>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', '<%= ga %>', 'auto');
    ga('send', 'pageview');
  </script>
</head>
<body>
  <%- pageBody %>
  <footer class="footer">
    Copyright ©2014-2017 <a href="<%= website %>"> <%= domain %></a> | Powered by <a href="https://github.com/metrue/Seal">Seal</a> on top of <a href="https://vuejs.org" target="_blank">Vue.js</a>
  </footer>
<body>
</html>
`

export default tpl
