var clear = require('clear');
var chalk = require('chalk');
var figlet = require('figlet');
var inquirer = require('inquirer');
var step1 = require('./cli/step1');
var step2 = require('./cli/step2');
var step3 = require('./cli/step3');
var step4 = require('./cli/step4');

var program = require('commander');

program
    .version('0.0.1')
    .option('-s, --step [number]', 'Run specific step')
    .parse(process.argv);

clear();
console.log(
    chalk.yellow(
        figlet.textSync('*itools test', { horizontalLayout: 'full' })
    )
);
if (program.step === '1') {
    return step1();
}
if (program.step === '2') {
    return step2();
}
if (program.step === '3') {
    return step3();
}
if (program.step === '4') {
    return step4();
}
step1();