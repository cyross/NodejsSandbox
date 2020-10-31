# NodejsSandbox by Docker

## はじめに

Nodejsの遊び場。
色々なアプリを作る際に、最低限必要な環境を用意しておく。
また、MySQLとの接続もやってみたかったのだけど、当方のPCにはMySQLを入れていないし、入れたくない。
というわけで、Dockerによる仮想環境を作ることにした。

## 使い方

* (まだの場合)Dockerをインストール
  * `docker-compose`を実行して動くことを確認
* `git clone`でローカルPC上にリポジトリをクローン
* `cd NodejsSandbox`
* `docker-compose up`でコンテナを作成

## 標準で入るもの

### アプリケーション

node.js v12
mysql v8

### ライブラリ

body-parser
bootstrap
command-line-args
cookie-parser
ejs
express
express-session
jquery
mysql
typescript
vue
上記のTypeScript用types

express-generator
browserify

## おまけ

### Docker上で/src/node_modules/.bin上に収められたスクリプトを実行するためのおまじない

#### 背景

Docker上では、パスの追加指定が難しいため、npmの機能を借りることにする(Docker上のOSがLinuxなのも助かる)

#### 書式

```
$(npm bin)/...
```

#### 例

```
$(npm bin)/tsc --init
$(npm bin)/browserify hoge.js
```

## 参考文献

[Docker+Express+MySQLの環境をつくる](https://note.com/kawa1228/n/nb18e19fbf4cc)
