const my_mysql = require('./my_mysql');

// console.log('try to connect MySQL server...');
my_mysql.connect_db({
    host: 'db',
    user: 'root',
    password: 'root'
}, 'mydb', (con, res) => {
    table_name = 'hoge';
    my_mysql.create_table(
        con,
        table_name,
        [
            {name: 'id', type: 'INT', ext: 'NOT NULL PRIMARY KEY AUTO_INCREMENT'},
            {name: 'name', type: 'VARCHAR(255)', ext: 'NOT NULL'},
            {name: 'score', type: 'INT', ext: 'NOT NULL'}
        ],
        '',
        (con, res) => {
/*
            console.log(`${table_name} created`);
            my_mysql.insert_table(con, table_name,
                [
                    ['0', "'apple'", '10'],
                    ['0', "'orange'", '15']
                ],
                (con, res) => {
                    console.log('inserted.');
                    con.destroy();
                });
*/
            my_mysql.query_sql(con, `SELECT * FROM ${table_name}`,
            (con, res, fields) => {
                res.forEach(element => {
                    console.log(element.name);
                });
                con.destroy();
            });
        }
    );
});
