#!/usr/bin/env node
var program = require('commander'),
	filendir = require('filendir'),
	colors = require('colors');


var createTemplate = () => {

}

var getTemplate = (classname) => {
	var template = `import React from 'react';

class ${classname} extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = '${classname}';
  }
  render() {
    return (

    )
  }
}

export default ${classname};
`

	return template;
}

var createFile = function(path) {
	var filename = path.match(/[^\\|\/]*$/)[0]
	var dir = path.substring((path.match(/[^\\|\/]*$/).index), -1)

	console.log("\n"+`=====================
== React Generator == 
=====================`)

	filendir.writeFile(dir + filename + "/" + filename + ".js", getTemplate(filename), function(err) {
		if (err) return console.log(err)

		console.log("Created " + `${dir}${filename}/` + colors.yellow.underline(`${filename}.js`))
		return true;
	})

	filendir.writeFile(dir + filename + "/" + filename + ".scss",
		`.${filename}{
	// your code here
}`, function(err) {
		if (err) return console.log(err)

		console.log('Created ' + `${dir}${filename}/` + colors.blue.underline(`${filename}.scss`))
		return true;
	})

	filendir.writeFile(dir + filename + "/" + "package.json",
		`{
	"name": "${filename}",
	"version": "0.0.0",
	"private": true,
	"main": "./${filename}.js"
}
`, function(err) {
		if (err) return console.log(err)

		console.log("Created " + `${dir}${filename}/` + colors.magenta.underline(`package.json`))
		return true;
	})
}

program
	.arguments('<file>')
	.option('-c, --css <css>', 'Css preprocessor')
	.action(function(file) {
		if (typeof program.css != 'undefined') {
			// console.log('Generating %s with %s', file, program.css)
			createFile(file)
		} else {
			createFile(file)
		}
	})
	.parse(process.argv)