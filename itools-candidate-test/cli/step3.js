/*************************************** STEP 2 ***********************************************************************/
var inquirer = require('inquirer');
var clear = require('clear');
var chalk = require('chalk');
var step4 = require('./step4');

module.exports = function step3() {
    console.log(chalk.green('\n\n#STEP 3: Client side (SPA)\n'));
    console.log(chalk.yellow(`
    В папке данного модуля есть заготовка клиентского приложения ${chalk.blue('./public')}
    Доработайте ваше веб-приложение и добавьте ему клиентскую часть
    
    Клиентская часть должна представлять собой SPA (Single Page Application)
    с двумя разделами-маршрутами '/authors' и '/books', а так же меню для навигации между разделами
    
    Конечный пользователь должен иметь возможность проводить CRUD-операции над сущностями Книги и Авторы

    Для реализации задачи вы можете использовать любой современный framework (Angular.js, React.js, Ember.js and etc)    
    Для верстки - Bootstrap, Zurb Foundation или компоненты Material Design на выбор.
    Автоматизировать процесс сборки можно при помощи Grunt, Gulp или Webpack на выбор.
    
    Только после завершения текущего этапа переходите на следующий\n
    `));
    inquirer.prompt([
        {
            type: 'list',
            name: 'S2',
            message: 'Реализовали ли вы полноценнное SPA приложение?',
            choices: [
                'Да. Перейти на следующий этап'
            ]
        }
    ]).then(function (answers) {
        clear();
        step4();
    });
};