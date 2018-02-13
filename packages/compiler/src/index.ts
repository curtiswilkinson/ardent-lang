import * as fs from 'mz/fs'

import Tokenise from './Tokenise'
import Lexer from './Lexer'
import Generator from './Generator'

interface Options {
  verbose: boolean
}

const compile = async (
  source: string,
  name: string,
  options: Options
): Promise<string> => {
  const tokens = Tokenise(source)
  const ast = Lexer(tokens)
  const output = Generator(ast)

  if (options.verbose) {
    await fs.writeFile(
      name + '-tokens.txt',
      tokens.map(token => JSON.stringify(token)).join('\n')
    )

    await fs.writeFile(name + '-ast.txt', JSON.stringify(ast))
  }

  return output
}

export default {
  compile
}
