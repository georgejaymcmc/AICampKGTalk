
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const filePath = process.argv[2];  // File passed as argument
const code = fs.readFileSync(filePath, 'utf8');

// Parse JavaScript code to AST
const ast = parser.parse(code, { sourceType: 'module' });

// Store function names
const functionNames = [];
const importedFunctions = [];

// Traverse the AST
traverse(ast, {
  FunctionDeclaration(path) {
    functionNames.push(path.node.id.name);
  },
  FunctionExpression(path) {
    if (path.parent.type === 'VariableDeclarator') {
      functionNames.push(path.parent.id.name);
    }
  },
  ArrowFunctionExpression(path) {
    if (path.parent.type === 'VariableDeclarator') {
      functionNames.push(path.parent.id.name);
    }
  },
  ImportSpecifier(path) {
    importedFunctions.push(path.node.imported.name);
  },
  ImportDefaultSpecifier(path) {
    importedFunctions.push(path.node.local.name);
  },
  ImportNamespaceSpecifier(path) {
    importedFunctions.push(path.node.local.name);
  }
});

// Output the function names
console.log(JSON.stringify({ functions: functionNames, imports: importedFunctions }));
