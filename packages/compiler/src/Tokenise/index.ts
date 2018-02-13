const Lexer = require('lex')

import { LexerInstance, Token, TokenType, WhitespaceType } from './interface'

const lexer: LexerInstance<Token> = new Lexer(function(char: string) {
  throw new Error(
    'Unexpected character at row ' + row + ', col ' + col + ': ' + char
  )
})

let indent = 0
let row = 1
let col = 0

lexer.addRule(/\n/, () => {
  row++
  col = 1
})

lexer.addRule(/./, function(this: any) {
  this.reject = true
  col++
})

lexer.addRule(/[0-9]+(?:\.[0-9]+)?\b/, lexeme => {
  return { type: TokenType.NUMBER, value: lexeme, row, col }
})

lexer.addRule(/=>|->|::/, lexeme => {
  return { type: TokenType.SPECIAL, value: lexeme, row, col }
})

lexer.addRule(/[()[\]{\}]/g, lexeme => {
  return { type: TokenType.SPECIAL, value: lexeme, row, col }
})

lexer.addRule(/==|=|\+|\%|\*|\/|-/, lexeme => {
  return { type: TokenType.OPERATOR, value: lexeme, row, col }
})

lexer.addRule(/"\w+"/gi, lexeme => {
  return { type: TokenType.STRING, value: lexeme.replace(/"/g, ''), row, col }
})

lexer.addRule(/case|of|Number|String/, lexeme => {
  return { type: TokenType.KEYWORD, value: lexeme, row, col }
})

lexer.addRule(/\w+/gi, lexeme => {
  return { type: TokenType.IDENTIFIER, value: lexeme, row, col }
})

lexer.addRule(/^[\n{\s|\t}]*/gm, lexeme => {
  let token = {
    type: TokenType.WHITESPACE,
    value: WhitespaceType.SAMEDENT,
    row,
    col
  }
  const indentation = lexeme.length

  if (indentation > indent) {
    token = {
      type: TokenType.WHITESPACE,
      value: WhitespaceType.INDENT,
      row,
      col
    }
  }

  if (indentation < indent) {
    token = {
      type: TokenType.WHITESPACE,
      value: WhitespaceType.DEDENT,
      row,
      col
    }
  }

  indent = indentation

  return token
})

lexer.addRule(/\s/, () => {
  return
})

lexer.addRule(/$/, () => {
  return { type: TokenType.EOF, value: 'EOF', row, col }
})

let lastToken: any = {}
let tokens: any[] = []

export default (input: string) => {
  lexer.setInput(input)

  indent = 0
  row = 1
  col = 0

  while (lastToken.value !== 'EOF') {
    lastToken = lexer.lex()
    tokens.push(lastToken)
  }

  return tokens
}
