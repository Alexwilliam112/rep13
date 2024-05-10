'use strict'

const Controller = require('./controllers/controller')
const commands = process.argv.slice(2)
const cmd = commands[0]

switch (cmd) {
    case 'query-1': {
        Controller.query1()
        break;
    }

    case 'query-2': {
        Controller.query2()
        break;
    }

    case 'query-3': {
        Controller.query3()
        break;
    }

    case 'query-4': {
        Controller.query4()
        break;
    }

    case 'query-5': {
        Controller.query5()
        break;
    }

    default:
        return;
}