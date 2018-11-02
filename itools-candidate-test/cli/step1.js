/*************************************** STEP 1 ***********************************************************************/
var fs = require('fs');
var inquirer = require('inquirer');
var clear = require('clear');
var chalk = require('chalk');
var step2 = require('./step2');

module.exports = function step1() {
    console.log(chalk.green('\n\n#STEP 1: JavaScript Test\n'));
    console.log(chalk.yellow(`
    Пройдите тест. Выбирите правильные варианты ответов.\n\n
`));

    inquirer.prompt(require('./ru_questions')).then(function (answers) {
        fs.writeFile('answers.json', JSON.stringify(answers, null, '  '), (err) => {
            if (err) throw err;
            clear();
            step2();
        });
    });
};
