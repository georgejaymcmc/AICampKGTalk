/*
Functions to detertemine:
(1) the current Node interpreter environment and,
(2) project directory structure.
*/

// Check Git, NVM, Node and javascript installation
const {exec} = require("child_process");

// Blank line before output
console.log("");

// Check Git installation
console.log("Git installation check:");

exec("git config --get user.name && git config --get user.email && git config --get remote.origin.url", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }

  // Parse stdout using string manipulation
  // Update the key changes to mirror the git command
  const key = ["user.name", "user.email", "remote.origin.url"];
  const value = stdout.split('\n');
  // Process each line of the stdout as needed
  key.forEach(function(element, index) {
    const correspondingValue = value[index];
    console.log(`${element} : ${correspondingValue}`);
  });
});
// Blank line before the next code block output
console.log("");

  // Second exec() function to run NVM commands from the terminal
  // Check Node installations in local machine via NVM
exec("nvm list && nvm current", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
      
  // Update the key changes to mirror the git command
  // First line of nvm list is blank(?). More parsing may be needed if
  // there are multiple installations.
  const key = ["Node installation check", "nvm list", "nvm current"];
  const value = stdout.split('\n');
  // Process each line of the stdout as needed
  key.forEach(function(element, index) {
    const correspondingValue = value[index];
    console.log(`${element} : ${correspondingValue}`);
  });
  
  // Blank line before the next code block output
  console.log("");

  // process.env extracts
  console.log("Node env extracts from process.env:")
  console.log("NVM_HOME : " + process.env.NVM_HOME);
  console.log("NVM_SYMLINK : " + process.env.NVM_SYMLINK);
  // Check where the Node executable symlink point to:
  const fs = require('fs');
  const nodeExecutable = process.execPath;

  fs.lstat(nodeExecutable, (error, stats) => {
    if (error) {
    console.error(`Error checking the path: ${error}`);
    return;
  }

    if (stats.isSymbolicLink()) {
    // If it's a symbolic link, resolve it to the actual path
      fs.readlink(nodeExecutable, (error, targetPath) => {
        if (error) {
          console.error(`Error reading symlink: ${error}`);
          return;
        }
        console.log(`The symlink points to: ${targetPath}`);
      });
    } else {
      // If it's not a symbolic link, output the path directly
      console.log(`The Node.js executable path is: ${nodeExecutable}`);
    }
  });
})