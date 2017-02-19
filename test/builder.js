import { expect } from 'chai'
import Builder from '../tools/builder'
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'

const MOCK_INPUT_DIR = '/tmp/seal/posts'
const MOCK_OUTPUT_DIR = '/tmp/seal/public'
const MOCK_FILES = ['2013-04-09-a.md', '2014-02-21-b.md']

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), ms)
  })
}

function rmdirForce(dir) {
  const list = fs.readdirSync(dir)
  for (var i = 0; i < list.length; i++) {
    let filename = path.join(dir, list[i])
    let stat = fs.statSync(filename)

    if (filename === '.' || filename === '..') {
      // pass these files
    } else if (stat.isDirectory()) {
      rmdirForce(filename)
    } else {
      // rm fiilename
      fs.unlinkSync(filename)
    }
  }
  fs.rmdirSync(dir)
}

function mockPosts() {
  try {
    mkdirp.sync(MOCK_INPUT_DIR)
    mkdirp.sync(MOCK_OUTPUT_DIR)
    MOCK_FILES.forEach((file) => {
      fs.writeFileSync(path.join(MOCK_INPUT_DIR, file), '# Hello \n world', 'utf8')
    })
  } catch (e) {
    console.warn(e)
  }
}

function cleanupMock() {
  try {
    rmdirForce(MOCK_INPUT_DIR)
    rmdirForce(MOCK_OUTPUT_DIR)
  } catch (e) {
    console.warn(e)
  }
}

describe('Builer', () => {
  let builder

  before(() => {
    mockPosts()

    builder = new Builder({ inputDir: MOCK_INPUT_DIR, outputDir: MOCK_OUTPUT_DIR })
  })

  after(() => {
    cleanupMock()
  })

  it('should discover posts', async () => {
    const posts = await builder.discover()
    expect(posts).to.be.instanceof(Array)
    expect(posts.length).to.equal(2)
    expect(posts).to.eql(MOCK_FILES.map((f) => path.join(MOCK_INPUT_DIR, f)))
  })

  it('should build', async () => {
    const inputFile = path.join(MOCK_INPUT_DIR, MOCK_FILES[0])
    let error = null
    try {
      await builder.build(inputFile)
    } catch (e) {
      error = e
    }
    expect(error).to.equal(null)

    let output = null
    fs.readdir(MOCK_OUTPUT_DIR, (err, files) => {
      if (err) {
        error = err
      } else {
        output = files[0]
      }
    })
    await delay(100)
    expect(output).to.equal(MOCK_FILES[0])
  })

  it.skip('should readout markdown content', () => {
    const randomPath = '/tmp/seal-random-markdown.md'
    const randomMarkdownString = `# title \n content`
    fs.writeFileSync(randomPath, randomMarkdownString, 'utf8')

    const content = builder.readContent(randomPath, 'utf8')
    expect(content).to.equal(randomMarkdownString)

    fs.unlinkSync(randomPath)
  })
})
