<template lang="html">
  <v-layout
    column
    align-center
    class="bg-light-gray"
  >
    <div class="info-page">
      <div class="info-page__header">
        <div class="header-2">
          運営会社
        </div>
      </div>
      <div class="info-page__content">

          <div class="text-standard pb">
            <b>会社名 :</b> {{name}}
          </div>
          <div class="text-standard pb content__info-multi">
            <b>所在地 :</b>
            <div class="">
              <div class="text-standard" v-for="line in address">
                {{line}}
              </div>
            </div>
          </div>
          <div class="text-standard pb">
            <b>資本金 :</b> {{investment}}
          </div>
          <div class="text-standard pb">
            <b>設　立 :</b> {{founding}}
          </div>
          <div class="text-standard pb">
            <b>代表者 :</b> {{representative}}
          </div>
          <div class="text-standard pb content__info-multi">
            <b>事業内容 :</b>
            <div class="">
              <div class="text-standard" v-for="item in businessDescription">
                {{item}}
              </div>
            </div>
          </div>

      </div>
    </div>
  </v-layout>
</template>

<script>
export default {
  data()  {
    return {
      name: "ライブネット株式会社",
      address: [
        "〒154-0004",
        "東京都世田谷区太子堂4-1-1"
      ],
      investment: "4,200万円",
      founding: "2019年1月",
      representative: "平林 裕二",
      businessDescription: [
        "(1) インターネットを利用した情報提供サービス及び情報通信サービスの提供、仲介及び斡旋",
        "(2) インターネットを利用するソフトウェアの企画、開発、販売及び運用並びに保守に関する業務",
        "(3) インターネットを利用した通信販売業",
        "(4) 特許権、著作権、著作隣接権、意匠権、商標権、工業所有権等の知的財産権の取得及びその管理運用",
        "(5) 広告業及び広告代理業",
        "(6) 各種イベントの企画、制作、実施",
        "(7) 前各号に附帯または関連する一切の事業"
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.info-page {
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 2vw;
  .info-page__header {
    color: $color-text-blue;
    border-bottom: 1px solid $color-gray;
    margin-bottom: 30px;
  }
  .info-page__content {
    .pb {
      padding-bottom: .3rem;
    }
    .content__info-multi {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      div {
        padding-left: .2rem;
      }
    }
  }
}
</style>
