export interface LexerInstance<T> {
  addRule: (rule: RegExp, lex: (lexeme: string) => T | void) => T
  setInput: (input: string) => void
  lex: () => T
}

export enum TokenType {
  IDENTIFIER = 'IDENTIFIER',
  KEYWORD = 'KEYWORD',
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
  SPECIAL = 'SPECIAL',
  STRING = 'STRING',
  WHITESPACE = 'WHITESPACE',
  EOF = 'EOF'
}

export enum WhitespaceType {
  DEDENT = 'DEDENT',
  INDENT = 'INDENT',
  SAMEDENT = 'SAMEDENT'
}

export interface Token {
  type: TokenType
  value: string
  row: number
  col: number
}
