'use strict'

const Factory = require('./class')
const pool = require('../config/connection')

class Model {

    static async query1() {
        try {
            const sql = `
            SELECT 
                "Menus"."id",
                "Menus"."name",
                "Menus"."price",
                "Menus"."stock",
                "Categories"."name" AS "category",
                "Menus"."createdAt"
            FROM
                "Menus"
            JOIN
                "Categories"
            ON
                "Menus"."CategoryId" = "Categories"."id"
            WHERE 
                "Categories"."name" = 'Coffee'
            AND 
                "Menus"."createdAt" >= '2021-05-01'
            AND 
                "Menus"."createdAt" <= '2021-06-30'
            ORDER BY
                "Menus"."createdAt" ASC;`

            const res = await pool.query(sql)
            const data = res.rows

            const instanceData = data.map((el) => {
                return Factory.createMenu(el.id, el.name, el.category, el.stock, el.price, el.createdAt)
            })

            return instanceData

        } catch (error) {
            throw error
        }
    }

    static async query2() {
        try {
            const sql = `
            SELECT 
                "Menus"."id",
                "Menus"."name",
                "Menus"."stock",
                "Menus"."price",
                "Menus"."createdAt",
                "Categories"."name" AS "category"
            FROM 
                "Menus"
            JOIN
                "Categories"
            ON
                "Menus"."CategoryId" = "Categories"."id"
            WHERE 
                "Menus"."stock" = (
                    SELECT 
                        MAX("stock")
                    FROM
                        "Menus"
                );`

            const res = await pool.query(sql)
            const data = res.rows

            const instanceData = data.map((el) => {
                return Factory.createMenu(el.id, el.name, el.category, el.stock, el.price, el.createdAt)
            })

            return instanceData

        } catch (error) {
            throw error
        }
    }

    static async query3() {
        try {
            const sql = `
            SELECT 
                "Menus"."id",
                "Menus"."name",
                "Menus"."stock",
                "Menus"."price",
                "Menus"."createdAt",
                "Categories"."name" AS "category"
            FROM 
                "Menus"
            JOIN
                "Categories"
            ON
                "Menus"."CategoryId" = "Categories"."id"
            WHERE 
                "Menus"."name" ILIKE '%Tea%'
            OR
                "Categories"."name" ILIKE '%Tea%'
            ORDER BY 
                "Menus"."stock" ASC;`

            const res = await pool.query(sql)
            const data = res.rows

            const instanceData = data.map((el) => {
                return Factory.createMenu(el.id, el.name, el.category, el.stock, el.price, el.createdAt)
            })

            return instanceData

        } catch (error) {
            throw error
        }
    }

    static async query4() {
        try {
            const sql = `
            SELECT 
                "Menus"."id",
                "Menus"."name",
                "Menus"."stock",
                "Menus"."price",
                "Menus"."createdAt",
                "Categories"."name" AS "category"
            FROM 
                "Menus"
            JOIN
                "Categories"
            ON
                "Menus"."CategoryId" = "Categories"."id"
            WHERE 
                "Menus"."createdAt" >= '2021-06-02'
            AND 
                "Menus"."createdAt" <= '2021-07-09'
            AND
                "Menus"."stock" = (
                    SELECT
                        MAX("Menus"."stock") 
                    FROM
                        "Menus" 
                    JOIN
                        "Categories" 
                    ON
                        "Menus"."CategoryId" = "Categories"."id" 
                    WHERE 
                        "Menus"."createdAt" >= '2021-06-02'
                    AND 
                        "Menus"."createdAt" <= '2021-07-09'
                );`

            const res = await pool.query(sql)
            const data = res.rows

            const instanceData = data.map((el) => {
                return Factory.createMenu(el.id, el.name, el.category, el.stock, el.price, el.createdAt)
            })

            return instanceData

        } catch (error) {
            throw error
        }
    }

    static async query5() {
        try {
            const sql = `
            SELECT 
                "name" AS "category",
                "totalStock",
                "totalSales"
            FROM (
                SELECT 
                    *
                FROM 
                    "Categories"
                JOIN (
                    SELECT 
                        "CategoryId",
                        SUM("stock") AS "totalStock",
                        SUM("price" * "stock") AS "totalSales"
                    FROM
                        "Menus"
                    GROUP BY
                        "CategoryId"
                    ORDER BY 
                        "CategoryId"
                ) AS table1
                ON
                    "Categories"."id" = "CategoryId"
            ) WHERE 
                "totalSales" > '3000000'
            ORDER BY 
                "totalSales" DESC;`

            const res = await pool.query(sql)
            const data = res.rows

            const instanceData = data.map((el) => {
                return Factory.createCategory(el.category, Number(el.totalStock),
                Number(el.totalSales))
            })

            return instanceData

        } catch (error) {
            throw error
        }
    }
}

module.exports = Model