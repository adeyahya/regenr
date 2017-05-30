var template = (() => {
	var options = {
		css: 'scss',
		privateRep: true,
		cssModules: false
	}

	var getIndex = (componentName, privateRep) => {
		privateRep = privateRep || options.privateRep
		
		return `export default "./${componentName}.js"`
	}

	var getReact = (componentName, style, cssModules) => {
		cssModules = cssModules || options.cssModules
		return `import React from 'react'
${cssModules ? "import styles from './" + componentName + '.' + style + "'" : ''}

class ${componentName} extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div ${cssModules ? 'className={ ' + 'styles.' + componentName + ' }' : '' }>
				{/* Your code here */}
			</div>
		)
	}
}

export default ${componentName}`
	}

	var getStyle = (componentName,style) => {
		style = style || 'scss'

		if (style === 'sass') {
			return `.${componentName}
	/* Your stylesheet here */`
		} else {
			return `.${componentName} {
	/* Your stylesheet here */
}`
		}
	}

	return {
		getStyle: getStyle,
		getReact: getReact,
		getIndex: getIndex
	}
})()

module.exports = template;