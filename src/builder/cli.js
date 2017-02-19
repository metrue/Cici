import program from 'commander'
import Builder from './builder'
import PKG from '../../package.json'

program
  .version(PKG.version)
  .option('-i, --inputDir <path>', 'Your posts directory, "./posts" by default ')
  .option('-o, --ouputDir <path>', 'Specify the output directory, "./public" by default')
  .option('-t, --title <website name>', 'Your website name')
  .option('-d, --domain <domain name>', 'Your website domain')
  .option('-g, --google-analytic-id <UA-xxxxxx-x>', 'Your Google anlytics ID')
  .parse(process.argv)

const CONFIG = {
  inputDir: program.inputDir || './posts',
  output: program.ouputDir || './public',
  title: program.title || 'Cici',
  domain: program.domain || 'minghe.me',
  copyRightYear: (new Date()).getFullYear(),
  ga: program.googleAnalyticId || '',
}

const builder = new Builder(CONFIG)
builder.start()
