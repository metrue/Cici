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
    Copyright ©${copyRightYear} <a href="http://${domain}"> ${domain}</a> | Powered by <a href="https://github.com/metrue/Cici">Cici</a> with <a href="https://github.com/metrue/YoYo">YoYo</a> as comment engine
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
  <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <script>
	(adsbygoogle = window.adsbygoogle || []).push({
		google_ad_client: "ca-pub-8958230776887606",
		enable_page_level_ads: true
 	});
  </script>
</head>
<body>
  ${content}
  <div id="YoYo"></div>
  <script src="https://yoyo-client-production.s3.amazonaws.com/dist/index.js"></script>
  <footer class="footer">
    Copyright ©${copyRightYear} <a href="http://${domain}"> ${domain}</a> | Powered by <a href="https://github.com/metrue/Cici">Cici</a> with <a href="https://github.com/metrue/YoYo">YoYo</a> as comment engine

  </footer>
<body>
</html>
`

module.exports = {
  home,
  post,
}

