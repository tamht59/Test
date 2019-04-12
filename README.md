## セットアップ構築

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

仕組みの詳細説明につきまして、[Nuxt.js docs](https://nuxtjs.org).をご確認してください。

### SASS usage
 
#### ローカルスタイプ
- ローカルスタイプにsassを使用するには, scss値をstype tagのlang属性に設定する
- 例:

```sh
<template>
    <div class="container">
        <div class="my-example"></div>
    </div>
</template>
<style lang=“scss” scoped>
    .container {
        width: 80%;
        .my-example {
            background-color: #d3d3d3;
        }
    }
</style>
```

#### グローバルスタイル
- あなたのグローバルスタイルを./assets/style/css/main.scssに挿入する
- 新規グルーバルスタイプファイルを追加するには、./nuxt.config.js をアクセスしてcss属性を変更する。
例えば：new-file.cssという名前の新規cssファイルをプロジェクトに追加：

    ```sh
        ...,
        css: [
            '~/assets/style/app.styl',
            '@/assets/style/css/main.scss',
            '@/path-to-your-new-file/new-file.scss'
        ],
        ...
    ```

- 変数、mixins、機能を全てのスタイルファイルで共有するには、あなたのスタイルを./assets/style/css/_*.scssに挿入する。

### Vuetifyjs
プロジェクトにVuetifyがインストールされました。
Vuetifyのコンポーネントの詳細については、[Vuetifyjs.com docs](https://vuetifyjs.com/en/components/api-explorer)の仕様書をご覧ください。
