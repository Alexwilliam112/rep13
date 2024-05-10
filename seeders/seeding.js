'use strict'

const pool = require('../config/connection')
const { readFile } = require('fs').promises

async function seeding() {
    try {
        const categories = JSON.parse(await readFile('./data/categories.json', 'utf-8'))
            .map((el) => {
                const { name } = el
                return `('${name}')`
            }).join(',\n')

        const insertCategories = `
        INSERT INTO "Categories" ("name")
        VALUES
        ${categories};`

        const menus = JSON.parse(await readFile('./data/menus.json', 'utf-8'))
            .map((el) => {
                const { name, category, stock, price, createdAt } = el
                return `('${name}', '${stock}', '${price}', '${createdAt}', '${category}')`
            }).join(',\n')

        const insertMenus = `
        INSERT INTO "Menus" ("name", "stock", "price", "createdAt", "CategoryId")
        VALUES
        ${menus};`

        await pool.query(insertCategories)
        console.log(`Action Success: Inserted Data to CATEGORIES`);

        await pool.query(insertMenus)
        console.log(`Action Success: Inserted Data to MENUS`);

    } catch (error) {
        console.log(error);
    }
}

seeding()