const mysql = require('mysql');

/**
 * @param {Object<string,string>} params パラメータ
 * @param {string} db_name データベース名
 * @param {mysql.queryCallback} callback コールバック
 * @return void
 * @throws MySQLモジュールのエラーオブジェクト
 */
exports.connect_db = function(params, db_name, callback) {
    let con = mysql.createConnection(params);
    con.connect((err) => {
        if(err) {
            console.log('error on connect db!');
            throw err;
        }
        con.query(`CREATE DATABASE IF NOT EXISTS ${db_name}`, (err, res) =>{
            if(err) {
                console.log('error on create db!');
                throw err;
            }
            con.query(`USE ${db_name}`, (err, res) =>{
                if(err) {
                    console.log('error on using db!');
                    throw err;
                }
                callback(con, res);
            });
        });
    });
}

/**
 * クエリを実行
 * @param {mysql.Connection} con MySQL接続オブジェクト
 * @param {string} query クエリ
 * @param {mysql.queryCallback} callback コールバック
 * @return void
 * @throws MySQLモジュールのエラーオブジェクト
 */
exports.exec_sql = function(con, query, callback) {
    con.query(query, (err, res) => {
        if(err) {
            console.log('error on executing query!');
            throw err;
        }
        callback(con, res);
    });
}

/**
 * クエリを実行して集計を得る
 * @param {mysql.Connection} con MySQL接続オブジェクト
 * @param {string} query クエリ
 * @param {mysql.queryCallback} callback コールバック
 * @return void
 * @throws MySQLモジュールのエラーオブジェクト
 */
exports.query_sql = function(con, query, callback) {
    con.query(query, (err, res, fields) => {
        if(err) {
            console.log('error on quering query!');
            throw err;
        }
        callback(con, res, fields);
    });
}

/**
 * テーブル作成クエリを作成
 * @param {string} table_name テーブル名
 * @param {Array<{name:string, type:string, ext:?string}>} params 各カラムの設定
 * @param {string} ext_param 追加パラメータ
 * @return {string} 生成したクエリ
 */
exports.generate_create_table_sql = function(table_name, params, ext_param) {
    let params_array = [];
    for(let idx in params) {
        let param = params[idx];
        let name = param.name;
        let type = param.type;
        let ext = param.ext ? param.ext : '';
        params_array.push(`${name} ${type} ${ext}`);
    }
    let param_str = params_array.join(',');
    return `CREATE TABLE IF NOT EXISTS ${table_name} (${param_str}) ${ext_param}`;
}

/**
 * テーブル作成
 * @param {mysql.Connection} con MySQL接続オブジェクト
 * @param {string} table_name テーブル名
 * @param {Array<{name:string, type:string, ext:?string}>} params 各カラムの設定
 * @param {string} ext_param 追加パラメータ
 * @param {mysql.queryCallback} callback コールバック
 * @return {string} 生成したクエリ
 */
exports.create_table = function(con, table_name, params, ext_param, callback) {
    let create_table_sql = exports.generate_create_table_sql(table_name, params, ext_param);
    exports.exec_sql(con, create_table_sql, callback);
}

/**
 * テーブルにレコードを追加
 * @param {mysql.Connection} con MySQL接続オブジェクト
 * @param {string} table_name テーブル名
 * @param {Array<Array<string>>} params 挿入するデータのリスト(各レコードは、テーブルのカラム数と同じ要素数)
 * @param {mysql.queryCallback} callback コールバック
 * @return {string} 生成したクエリ
 */
exports.insert_table = function(con, table_name, params, callback) {
    let params_array = [];
    for(let idx in params) {
        params_array.push('(' + params[idx].join(',') + ')');
    }
    let param_str = params_array.join(',');
    let insert_table_sql = `INSERT INTO ${table_name} VALUES ${param_str}`;
    console.log(insert_table_sql);
    exports.exec_sql(con, insert_table_sql, callback);
}
