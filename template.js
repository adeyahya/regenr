module.exports = {
  index: (componentName, extension) => {
    return `{
  "name": "${componentName}",
  "version": "0.0.0",
  "private": true,
  "main": "./${componentName}.${extension}"
}`
  },

  react: (componentName, config) => {
    return `${config.typechecker === "flow" ? "//@flow" : null}
import React from "react";

class ${componentName} extends React.Component<{}> {
  render() {
    return (
      {/* your code here */}
    )
  }
}

export default ${componentName};
`
  },
  config: config => {
    return `module.exports = {
  stylesheet: "${config.stylesheet}",
  typechecker: "${config.typechecker}",
}`
  }
}
