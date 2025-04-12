import mysql from 'mysql2'

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'taratasy_db'
})

export default db