import * as fs from 'mz/fs'
import * as path from 'path'

export interface Config {
  source: string
}

const findInDir = (dir: string[]) => {
  const file = dir.find(file => file === 'ardent.json')
  if (!file) {
    throw new Error('No Config')
  }

  return file
}

const getPath = async (configPath: string) => {
  const isFile = await fs.lstat(configPath).then(stats => stats.isFile())

  if (isFile) {
    return configPath
  }

  return fs
    .readdir(configPath)
    .then(findInDir)
    .then(name => path.join(configPath, name))
}

const read = async (projectPath: string) => {
  const configPath = await getPath(projectPath)
  const dir = path.dirname(configPath)
  const config: Config = await fs
    .readFile(configPath, 'utf8')
    .then(data => JSON.parse(data))

  config.source = path.join(dir, config.source)

  return config
}

export default { read }
