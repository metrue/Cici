const home = ({ siteName, domain, css, content, ga, copyRightYear }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,user-scalable=no">
  <meta name="renderer" content="webkit">
  <meta name="theme-color" content="#ffffff">
  <title> ${siteName} </title>
  <style>${css}</style>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', '${ga}', 'auto');
    ga('send', 'pageview');
  </script>
</head>
<body>
  ${content}
  <footer class="footer">
    Copyright ©${copyRightYear} <a href="http://<%= %>"> ${domain}</a> | Powered by <a href="https://github.com/metrue/Cici">Cici</a>
  </footer>
<body>
</html>
`

const post = ({ title, domain, css, content, ga, copyRightYear }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,user-scalable=no">
  <meta name="renderer" content="webkit">
  <meta name="theme-color" content="#ffffff">
  <title> ${title} </title>
  <style>${css}</style>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', '${ga}', 'auto');
    ga('send', 'pageview');
  </script>
</head>
<body>
  ${content}
  <div id="YoYo"></div>
  <script src="https://client.yiqie.me/dist/index.js"></script>
  <footer class="footer">
    Copyright ©${copyRightYear} <a href="http://${domain}"> ${domain}</a> | Powered by <a href="https://github.com/metrue/Cici">Cici</a>
  </footer>
<body>
</html>
`

module.exports = {
  home,
  post,
}

