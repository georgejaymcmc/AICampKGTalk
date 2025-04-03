const fs = require('fs');
const parser = require('@babel/parser');

const filePath = process.argv[2];  // File passed as argument
const code = fs.readFileSync(filePath, 'utf8');

// Parse JavaScript code to AST
const ast = parser.parse(code, { sourceType: 'module', plugins: ["classProperties"] });

// Store function data
const functions = [];
const calls = [];
const imports = [];

// Helper function to extract parameter names
function getParams(paramNodes) {
  return paramNodes.map(param => {
    if (param.type === 'Identifier') return param.name;
    if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') return param.left.name; // Default param
    if (param.type === 'RestElement') return `...${param.argument.name}`; // Rest param
    return '[ComplexParam]'; // Handle other cases
  });
}

// Recursive function to traverse AST nodes
function traverseNode(node, parent = null) {
  if (!node) return;

  switch (node.type) {
    case 'FunctionDeclaration':
      functions.push({
        name: node.id?.name || "[Anonymous]",
        type: node.async ? "AsyncFunctionDeclaration" : (node.generator ? "GeneratorFunctionDeclaration" : "FunctionDeclaration"),
        params: getParams(node.params)
      });
      break;

    case 'VariableDeclarator':
      if (node.init && (node.init.type === 'FunctionExpression' || node.init.type === 'ArrowFunctionExpression')) {
        functions.push({
          name: node.id.name,
          type: node.init.async ? "AsyncFunctionExpression" : "FunctionExpression",
          params: getParams(node.init.params)
        });
      }
      break;

    case 'ObjectProperty':
      if (node.value.type === 'FunctionExpression' || node.value.type === 'ArrowFunctionExpression') {
        functions.push({
          name: node.key.name,
          type: node.value.async ? "AsyncObjectPropertyFunction" : "ObjectPropertyFunction",
          params: getParams(node.value.params)
        });
      }
      break;

    case 'ClassMethod':
    case 'ObjectMethod':
      functions.push({
        name: node.key.name,
        type: node.async ? "AsyncClassMethod" : (node.generator ? "GeneratorClassMethod" : "ClassMethod"),
        params: getParams(node.params)
      });
      break;

    case 'ClassPrivateMethod':
      functions.push({
        name: `#${node.key.name}`,
        type: node.async ? "AsyncClassPrivateMethod" : "ClassPrivateMethod",
        params: getParams(node.params)
      });
      break;

    case 'CallExpression':
      let functionName = "";
      if (node.callee.type === "Identifier") functionName = node.callee.name;
      if (node.callee.type === "MemberExpression") functionName = node.callee.property.name;

      calls.push({
        function: functionName,
        arguments: node.arguments.map(arg => arg.type === "Identifier" ? arg.name : "[ComplexArg]")
      });
      break;

    case 'ImportSpecifier':
      imports.push(node.imported.name);
      break;
    case 'ImportDefaultSpecifier':
    case 'ImportNamespaceSpecifier':
      imports.push(node.local.name);
      break;
  }

  // Recursively traverse child nodes
  for (const key in node) {
    if (node[key] && typeof node[key] === 'object') {
      if (Array.isArray(node[key])) {
        node[key].forEach(child => traverseNode(child, node));
      } else {
        traverseNode(node[key], node);
      }
    }
  }
}

// Start traversal from the AST root
traverseNode(ast);

// Output collected data
console.log(JSON.stringify({ functions, calls, imports }, null, 2));
