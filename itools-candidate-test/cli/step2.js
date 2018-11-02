/*************************************** STEP 2 ***********************************************************************/
var inquirer = require('inquirer');
var clear = require('clear');
var chalk = require('chalk');
var step3 = require('./step3');

module.exports = function step2() {
    console.log(chalk.green('\n\n#STEP 2: Node.js Web Server\n'));
    console.log(chalk.yellow(`
    В папке данного модуля есть заготовка веб-сервера ${chalk.blue('./server')}
    Доработайте веб-сервер согласно процессу BDD (Behaviour Driven Development)
    
    Основывайтесь на уже написанных модульных тестах ${chalk.blue('./server/tests')}
    На данный момент при запуске ${chalk.blue('npm test')} все тесты в состоянии failed
    
    Документируйте код используя JSDoc и проверяйте код при помощи ${chalk.blue('eslint')} 
    (уже добавлен в ${chalk.blue('npm test')})
    
    Для реализации DAO (Data Access Layer) используйте любую RDMS (MySQL, MariaDB или др.) 
    или Document Store (MongoDB, CouchDB или др.)
    В системе должно быть 2 типа сущностей: Книги и Авторы. Связь между ними многие-ко-многим
    
    Вносить изменения и добавлять свой код можно везде, кроме папки модульных тестов ${chalk.blue('./server/tests')}
    Конечным резульатом должен быть работающий веб-сервер и успешно пройденные модульные тесты c проверками eslint
    (см. файл ./server/tests/specification.txt)
    
    Только после завершения текущего этапа переходите на следующий\n
    `));

    inquirer.prompt([
        {
            type: 'list',
            name: 'S2',
            message: 'Проходят ли у вас все модульные тесты?',
            choices: [
                'Да. Перейти на следующий этап'
            ]
        }
    ]).then(function (answers) {
        clear();
        step3();
    });
};
