'use strict'

class View {

    static printError(error) {
        console.log(error);
    }

    static showMenuTable(data) {
        const newData = data.map((el) => {
            return {
                id : el.id,
                name : el.name,
                price : el.price,
                stock : el.stock,
                category : el.category,
                createdAt : el.createdAt
            }
        })
        console.table(newData)
    }

    static showCategoryTable(data) {
        console.table(data)
    }
}

module.exports = View