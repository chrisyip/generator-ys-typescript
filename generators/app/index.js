'use strict'

const fs = require('fs-extra')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async prompting () {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'license',
        message: 'license',
        default: 'UNLICENSED'
      },
      {
        type: 'confirm',
        name: 'yarn',
        message: 'prefer yarn?',
        default: false
      },
      {
        type: 'confirm',
        name: 'cli',
        message: 'cli app?',
        default: false
      },
      {
        type: 'confirm',
        name: 'webpack',
        message: 'need webpack?',
        default: false
      }
    ])

    this.answers = answers
  }

  async configuring () {
    this.fs.copyTpl(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'))
    this.fs.copyTpl(this.templatePath('gitattributes'), this.destinationPath('.gitattribuets'))
    this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath('.gitignore'))

    if (this.answers.webpack) {
      this.fs.copyTpl(
        this.templatePath('package_webpack.json.ejs'),
        this.destinationPath('package.json'),
        this.answers
      )
      this.fs.copyTpl(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js'),
        this.answers
      )
    } else {
      this.fs.copyTpl(
        this.templatePath('package.json.ejs'),
        this.destinationPath('package.json'),
        this.answers
      )
    }

    this.fs.copyTpl(
      this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json')
    )

    this.fs.copyTpl(
      this.templatePath('tslint.json'), this.destinationPath('tslint.json')
    )

    this.fs.copyTpl(
      this.templatePath('README.md.ejs'), this.destinationPath('README.md'),
      this.answers
    )
  }

  async writing () {
    await fs.ensureDir(this.destinationPath('source'))
    this.fs.copy(
      this.templatePath('source/index.ts'),
      this.destinationPath('source/index.ts'),
    )

    await fs.ensureDir(this.destinationPath('test'))
    this.fs.copy(
      this.templatePath('test/test.ts'),
      this.destinationPath('test/test.ts'),
    )

    if (this.answers.cli) {
      await fs.ensureDir(this.destinationPath('bin'))
      this.fs.copy(
        this.templatePath('bin/cli.ts'),
        this.destinationPath('bin/cli.ts'),
      )
    }
  }

  install () {
    if (this.answers.yarn) {
      this.yarnInstall()
    } else {
      this.npmInstall()
    }
  }
}
