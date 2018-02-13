#!/usr/bin/env node
import * as path from 'path'
import * as fs from 'mz/fs'
import Ardent from '../../compiler/src'

import Config from './config'

import * as cli from 'cli'
import chalk from 'chalk'
const glob = require('glob-fs')()

export interface Options {
  project: string
  verbose: boolean
}

const compile = async (filepath: string, options: Options) => {
  const name = path.parse(filepath).name
  const dir = path.dirname(filepath)
  const source = await fs.readFile(filepath, 'utf8')

  const output = await Ardent.compile(source, name, options)

  return fs.writeFile(path.join(dir, name + '.ard.js'), output)
}

const main = async () => {
  const options: Options = cli.parse({
    project: [
      'p',
      'Path to the configuration file, or a directory with the config inside',
      'file',
      './'
    ],
    verbose: [false, 'Verbose mode', 'bool']
  })

  const config = await Config.read(options.project)

  const sourceFiles = glob.readdirSync(path.join(config.source + '/**/*.ard'))

  console.log(
    chalk.cyan.blue('==> ') + chalk.bold(`Found ${sourceFiles.length} modules`)
  )
  console.log('    Compiling...')
  await Promise.all(sourceFiles.map(compile))
  console.log(chalk.bold.green('==> ') + chalk.bold('Completed!'))
  return
}

main()
