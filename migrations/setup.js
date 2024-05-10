'use strict'

const pool = require('../config/connection')

async function setup() {
    try {
        const dropCategories = `
        DROP TABLE IF EXISTS "Categories";`
        const dropMenus = `
        DROP TABLE IF EXISTS "Menus";`

        const createCategories = `
        CREATE TABLE IF NOT EXISTS "Categories" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR NOT NULL
        );`
        const createMenus = `
        CREATE TABLE IF NOT EXISTS "Menus" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR NOT NULL,
            "stock" INTEGER NOT NULL,
            "price" INTEGER NOT NULL,
            "createdAt" DATE NOT NULL,
            "CategoryId" INTEGER NOT NULL,
                FOREIGN KEY ("CategoryId")
                REFERENCES "Categories" ("id")
        );`

        await pool.query(dropMenus)
        console.log(`Action Success: DROP MENUS`);

        await pool.query(dropCategories)
        console.log(`Action Success: DROP CATEGORIES`);

        await pool.query(createCategories)
        console.log(`Action Success: CREATED TABLE CATEGORIES`);

        await pool.query(createMenus)
        console.log(`Action Success: CREATED TABLE MENUS`);

    } catch (error) {
        console.log(error);
    }
}

setup()