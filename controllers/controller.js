'use strict'

const View = require('../views/view')
const Model = require('../models/model')

class Controller {

    static async query1() {
        try {
            const data = await Model.query1()
            View.showMenuTable(data)

        } catch (error) {
            View.printError(error)
        }
    }

    static async query2() {
        try {
            const data = await Model.query2()
            View.showMenuTable(data)

        } catch (error) {
            View.printError(error)
        }
    }

    static async query3() {
        try {
            const data = await Model.query3()
            View.showMenuTable(data)

        } catch (error) {
            View.printError(error)
        }
    }

    static async query4() {
        try {
            const data = await Model.query4()
            View.showMenuTable(data)

        } catch (error) {
            View.printError(error)
        }
    }

    static async query5() {
        try {
            const data = await Model.query5()
            View.showCategoryTable(data)

        } catch (error) {
            View.printError(error)
        }
    }
}

module.exports = Controller