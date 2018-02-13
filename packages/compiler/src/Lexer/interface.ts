export interface StringNode {
  type: 'StringLiteral'
  value: string
}

export interface NumberNode {
  type: 'NumberLiteral'
  value: string
}

export interface BinaryExpressionNode {
  type: 'BinaryExpression'
  operator: string
  left: Node
  right: Node
}

export interface FunctionNode {
  type: 'Function'
  name: string
  params: IdentifierNode[]
  body: Node[]
}

export interface VariableNode {
  type: 'Variable'
  identifier: IdentifierNode
  body: Node
}

export interface IdentifierNode {
  type: 'Identifier'
  name: string
}

export interface CallExpressionNode {
  type: 'CallExpression'
  callee: IdentifierNode
  args: IdentifierNode[]
}

export interface ProgramNode {
  type: 'Program'
  body: Node[]
}

export type Node =
  | StringNode
  | NumberNode
  | BinaryExpressionNode
  | CallExpressionNode
  | FunctionNode
  | IdentifierNode
  | ProgramNode
  | VariableNode

export interface AST {
  type: 'Program'
  body: Node[]
}
