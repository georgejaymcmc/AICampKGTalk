const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

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
    if (param.type === 'Identifier') {
      return param.name;
    } else if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') {
      return param.left.name; // Default parameters (e.g., function foo(a = 5) {})
    } else if (param.type === 'RestElement') {
      return `...${param.argument.name}`; // Rest parameters (e.g., function foo(...args) {})
    }
    return '[ComplexParam]'; // Handle other cases like destructuring
  });
}

// Traverse the AST
traverse(ast, {
  FunctionDeclaration(path) {
    if (path.node.id) {
      functions.push({
        name: path.node.id.name,
        type: path.node.async ? "AsyncFunctionDeclaration" : (path.node.generator ? "GeneratorFunctionDeclaration" : "FunctionDeclaration"),
        params: getParams(path.node.params)
      });
    }
  },
  FunctionExpression(path) {
    if (path.parent.type === 'VariableDeclarator' && path.parent.id) {
      functions.push({
        name: path.parent.id.name,
        type: path.node.async ? "AsyncFunctionExpression" : (path.node.generator ? "GeneratorFunctionExpression" : "FunctionExpression"),
        params: getParams(path.node.params)
      });
    }
  },
  ArrowFunctionExpression(path) {
    if (path.parent.type === 'VariableDeclarator' && path.parent.id) {
      functions.push({
        name: path.parent.id.name,
        type: path.node.async ? "AsyncArrowFunctionExpression" : "ArrowFunctionExpression",
        params: getParams(path.node.params)
      });
    }
  },
  ObjectMethod(path) {
    functions.push({
      name: path.node.key.name,
      type: path.node.generator ? "GeneratorObjectMethod" : "ObjectMethod",
      params: getParams(path.node.params)
    });
  },
  ClassMethod(path) {
    functions.push({
      name: path.node.key.name,
      type: path.node.async ? "AsyncClassMethod" : (path.node.generator ? "GeneratorClassMethod" : "ClassMethod"),
      params: getParams(path.node.params)
    });
  },
  ClassPrivateMethod(path) {
    functions.push({
      name: `#${path.node.key.name}`,
      type: path.node.async ? "AsyncClassPrivateMethod" : "ClassPrivateMethod",
      params: getParams(path.node.params)
    });
  },
  ClassProperty(path) {
    if (path.node.value && path.node.value.type === "ArrowFunctionExpression") {
      functions.push({
        name: path.node.key.name,
        type: path.node.async ? "AsyncClassProperty (Arrow Function)" : "ClassProperty (Arrow Function)",
        params: getParams(path.node.value.params)
      });
    }
  },
  CallExpression(path) {
    // Extract function call details
    let callee = path.node.callee;
    let functionName = "[Anonymous]";

    if (callee.type === "Identifier") {
      functionName = callee.name;
    } else if (callee.type === "MemberExpression") {
      functionName = callee.property.name; // Handles obj.method() calls
    }

    calls.push({
      function: functionName,
      arguments: path.node.arguments.map(arg => {
        if (arg.type === "Identifier") return arg.name;
        if (arg.type === "Literal") return arg.value;
        return "[ComplexArg]";
      })
    });
  },
  ImportSpecifier(path) {
    imports.push(path.node.imported.name);
  },
  ImportDefaultSpecifier(path) {
    imports.push(path.node.local.name);
  },
  ImportNamespaceSpecifier(path) {
    imports.push(path.node.local.name);
  }
});

// Output collected data
console.log(JSON.stringify({ functions, calls, imports }, null, 2));
