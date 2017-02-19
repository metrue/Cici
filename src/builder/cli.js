import program from 'commander'
import Builder from './builder'
import PKG from '../../package.json'

program
  .version(PKG.version)
  .option('-i, --inputDir <path>', 'Your posts directory, "./posts" by default ')
  .option('-o, --ouputDir <path>', 'Specify the output directory, "./public" by default')
  .option('-t, --title <website name>', 'Your website name')
  .parse(process.argv)

const CONFIG = {
  inputDir: program.inputDir || './posts',
  output: program.ouputDir || './public',
  title: program.title || 'Cici',
}

const builder = new Builder(CONFIG)
builder.start()
