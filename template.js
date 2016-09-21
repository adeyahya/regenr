var template = (() => {
	var options = {
		css: 'scss',
		privateRep: true,
		cssModules: false
	}

	var getJson = (componentName, privateRep) => {
		privateRep = privateRep || options.privateRep
		
		return `{
	"name": "${componentName}",
	"version": "0.0.0",
	"private": ${privateRep},
	"main": "./${componentName}.js"
}
`
	}

	var getReact = (componentName, style, cssModules) => {
		cssModules = cssModules || options.cssModules
		return `import React from 'react'
${cssModules ? "import styles from './" + componentName + '.' + style + "'" : ''}
class ${componentName} extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = '${componentName}';
  }
  render() {
    return (
			<div ${cssModules ? 'className={' + 'styles.' + componentName + '}' : '' }>
			</div>
    )
  }
}

export default ${componentName};
`
	}

	var getStyle = (componentName,style) => {
		style = style || 'scss'

		if (style === 'sass') {
			return `.${componentName}
	//Your code here`
		} else {
			return `.${componentName} {
	//Your code here
}`
		}
	}

	return {
		getStyle: getStyle,
		getReact: getReact,
		getJson: getJson
	}
})()

module.exports = template;