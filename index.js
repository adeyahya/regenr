#!/usr/bin/env node
const program = require('commander');
const	filendir = require('filendir');
const	colors = require('colors');
const templates = require('./template.js');
const fs = require('fs');
const inquirer = require("inquirer")
const path = require("path")

const createConfig = () => {
  const questions = [
    {
      type: 'list',
      name: 'stylesheet',
      message: 'Choose your stylesheet',
      choices: ['sass', 'scss', 'styled-jsx', 'less', 'stylus', 'css', 'none'],
      filter: function (val) {
        return val.toLowerCase();
      }
    },
    {
      type: 'list',
      name: 'typechecker',
      message: 'Choose your TypeChecker',
      choices: ['flow', 'typescript'],
      filter: function (val) {
        return val.toLowerCase();
      }
    }
  ]

  inquirer.prompt(questions).then(function (answers) {
    filendir.writeFile("regenr.config.js", templates.config(answers), (err) => {
      if (err)
        throw new Error(err)

      console.log("Config File Created!")
    })
  });
}

const createFile = (file, config) => {
  const filename = file.match(/[^\\|\/]*$/)[0]
  const dir = file.substring((file.match(/[^\\|\/]*$/).index), -1)
  const fullPath = path.join(dir, filename)
  const extension = config.typechecker === "typescript" ? "ts" : "js"

  // check is file exist?
  fs.readdir(fullPath, (err, files) => {
    if (err) {
      filendir.writeFile(
        path.join(fullPath, "package.json"),
        templates.index(filename, extension),
        err => {
          if (err)
            throw new Error(err)

          console.log(`created file ${path.join(fullPath, "package.json")}`)
        }
      )

      filendir.writeFile(
        path.join(fullPath, filename + "." + extension),
        templates.react(filename, config),
        err => {
          if (err)
            throw new Error(err)

          console.log(`created file ${path.join(fullPath, filename + "." + extension)}`)
        }
      )

      if (config.stylesheet != "none") {
        console.log(config.stylesheet)
        const styleExtension = config.stylesheet === "styled-jsx" ? "js" : config.stylesheet
        filendir.writeFile(
          path.join(fullPath, "style." + styleExtension),
          config.stylesheet === "styled-jsx"
          ? 'import css from "styled-jsx/css\nexport const style = css\`\`'
          : "",
          err => {
            console.log(`created file ${path.join(fullPath, "style." + styleExtension)}`)
          }
        )
      }
    }

    if (files) {
      return console.log(colors.red(`${fullPath} already exist!`))
    }
  })
}

const initialize = (file, program) => {
  if (file === "init")
    return createConfig()

  fs.readFile("regenr.config.js", {encoding: "utf8", flag: "r"}, (err, data) => {
    if (err)
      console.log(colors.red("can't find config file, try to run:") + "\n=> regenr init")

    if (data) {
      const config = require(path.join(process.cwd(), "regenr.config.js"))
      return createFile(file, config)
    }
  })
}

program
	.arguments('<file>')
	// .option('-c, --config <config>', 'Config File')
	.action(function(file) {
    initialize(file, program)
	})
	.parse(process.argv)
