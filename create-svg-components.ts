const fs = require("fs");
const path = require("path");

const SCRIPT_DIRECTORY = "./create-svg-components";
const RESULT_DIR = path.join(SCRIPT_DIRECTORY, "./result");

function camelCase(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value
    .replace(/-./g, (x) => x[1].toUpperCase())
    .slice(1)}`;
}

// Define the directory where your SVG files are located.
const svgDir = path.join(__dirname, SCRIPT_DIRECTORY);

// Create a directory for the generated React components.
const outputDir = path.join(__dirname, RESULT_DIR);

// Ensure the output directory exists.
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read the SVG files in the input directory.
fs.readdirSync(svgDir).forEach((file) => {
  if (file.endsWith(".svg")) {
    // Read the content of the SVG file.
    const svgContent = fs.readFileSync(path.join(svgDir, file), "utf8");

    // Convert the file name from kebab case to Pascal case.
    const componentName = camelCase(path.parse(file).name);
    console.log(componentName);

    // Generate the React component content.
    const reactComponent = `
      import React from 'react';
      import { IconSpan } from "./styles

      const ${componentName}:React.FC = (props) => {
        return (
          <IconSpan>
            ${svgContent}
          </IconSpan>
        );
      }

      export (${componentName};
    `;

    // Write the React component to the output directory.
    const outputFilePath = path.join(outputDir, `${componentName}.tsx`);
    fs.writeFileSync(outputFilePath, reactComponent);
  }
});

console.log("SVG to React components conversion completed.");
