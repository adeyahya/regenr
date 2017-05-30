#!/usr/bin/env node
var program = require('commander'),
	filendir = require('filendir'),
	colors = require('colors'),
	templates = require('./template.js');

var createFile = function(path,css) {
	css = css || 'scss'

	var filename = path.match(/[^\\|\/]*$/)[0]
	var dir = path.substring((path.match(/[^\\|\/]*$/).index), -1)

	console.log(`\n=====================\n== React Generator ==\n=====================`)

	filendir.writeFile(dir + filename + "/" + filename + ".js", templates.getReact(filename, css, true) , function(err) {
		if (err) return console.log(err)

		console.log("Created " + `${dir}${filename}/` + colors.yellow.underline(`${filename}.js`))
		return true;
	})

	filendir.writeFile(`${dir}${filename}/${filename}.${css}`, templates.getStyle(filename, css) , function(err) {
		if (err) return console.log(err)
		console.log('Created ' + `${dir}${filename}/` + colors.blue.underline(`${filename}.${css}`))
		return true;
	})

	filendir.writeFile(dir + filename + "/" + "index.js", templates.getIndex(filename, true) , function(err) {
		if (err) return console.log(err)
		
		console.log("Created " + `${dir}${filename}/` + colors.magenta.underline(`index.js`))
		return true;
	})
}

program
	.arguments('<file>')
	.option('-c, --css <css>', 'Css preprocessor')
	.action(function(file) {
		if (typeof program.css != 'undefined') {
			createFile(file, program.css)
		} else {
			createFile(file)
		}
	})
	.parse(process.argv)