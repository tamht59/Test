<template lang="html">

  <div class="registration">
    <div class="registration__header">
      <div class="header__title">
        <div class="text-large text-title">お申し込みフォーム</div>
        <p class="text-standard">本サービス「サービス名」のご利用申し込みフォームです。<br />
          以下の項目をご記入のうえ「送信」ボタンを押してください。<br />
          [必須]の項目は必ず入力していただく必要があります。<br />
          <span class="date-text">※入力いただいたメールアドレス宛てに、ご登録のご案内メールをお送りします。</span><br />
        </p>
      </div>
    </div>

    <v-layout
      column
      align-center
      class="bg-light-gray"
    >
      <div class="registration__form">
        <form class="" action="index.html">
          <div class="input-filed">
            <label class="text-standard">氏名 <label class="text-required">[必須]</label></label>
            <input
              v-model="$v.form.name.$model"
              :class="status($v.form.name)"
              class="text-standard"
           />
          </div>
          <div :class="activeClass($v.form.name.$error)" class="error-message">
            <span v-if="!$v.form.name.required">必ず入力してください。</span>
            <span v-if="!$v.form.name.maxLength">25字以内で入力してください。</span>
          </div>

          <div class="input-filed">
            <label class="text-standard">氏名（カナ）<label class="text-required">[必須]</label></label>
            <input
              v-model="$v.form.kana.$model"
              :class="status($v.form.kana)"
              class="text-standard"
              @change="resetError('kana')"
           />
          </div>
          <div :class="activeClass($v.form.kana.$error, kanaError)" class="error-message">
            <span v-if="!$v.form.kana.required">必ず入力してください。</span>
            <span v-if="!$v.form.kana.maxLength">25字以内で入力してください。</span>
            <span v-if="kanaError">{{kanaError}}</span>
          </div>

           <div class="input-filed">
             <label class="text-standard">郵便番号 <label class="text-required">[必須]</label></label>
             <input
                v-model="$v.form.postal_code.$model"
                :class="status($v.form.postal_code)"
                v-on:blur="setPrefectureMunicipality()"
                class="text-standard"
             />
           </div>
           <div :class="activeClass($v.form.postal_code.$error)" class="error-message">
             <span v-if="!$v.form.postal_code.required">必ず入力してください。</span>
             <span v-if="messageSearchZipcode">パラメータ「郵便番号」の桁数が不正です。</span>
             <span v-if="!$v.form.postal_code.minLength || !$v.form.postal_code.maxLength">正しい郵便番号を入力して下さい。</span>
           </div>

          <div class="input-filed">
            <label class="text-standard">都道府県 <label class="text-required">[必須]</label></label>
            <input
              v-model="$v.form.prefecture_id.$model"
              :class="status($v.form.prefecture_id)"
              class="text-standard"
              @change="resetError()"
           />
          </div>
          <div :class="activeClass($v.form.prefecture_id.$error, prefectureIdError)" class="error-message">
            <span v-if="!$v.form.prefecture_id.required">必ず入力してください。</span>
            <span v-if="prefectureIdError">{{prefectureIdError}}</span>
          </div>

          <div class="input-filed">
            <label class="text-standard">市区町村 <label class="text-required">[必須]</label></label>
            <input
              v-model="$v.form.municipality.$model"
              :class="status($v.form.municipality)"
              class="text-standard"
           />
          </div>
          <div :class="activeClass($v.form.municipality.$error)" class="error-message">
            <span v-if="!$v.form.municipality.required">必ず入力してください。</span>
          </div>

          <div class="input-filed">
            <label class="text-standard">番地 <label class="text-required">[必須]</label></label>
            <input
              v-model="$v.form.address.$model"
              :class="status($v.form.address)"
              class="text-standard"
           />
          </div>
          <div :class="activeClass($v.form.address.$error)" class="error-message">
            <span v-if="!$v.form.address.required">必ず入力してください。</span>
          </div>

          <div class="input-filed">
            <label class="text-standard">建物名</label>
            <input
              v-model="form.building_name"
              class="text-standard"
            />
          </div>
          <div class="error-message">
            <span></span>
          </div>

          <div class="input-filed">
            <label class="text-standard">メールアドレス <label class="text-required">[必須]</label></label>
            <input
              v-model="$v.form.mail.$model"
              :class="status($v.form.mail)"
              class="text-standard"
           />
          </div>
          <div :class="activeClass($v.form.mail.$error)" class="error-message" >
            <span v-if="!$v.form.mail.required">必ず入力してください。</span>
            <span v-if="!$v.form.mail.email">有効なメールアドレスを入力して下さい。</span>
          </div>

          <div class="input-filed">
            <label class="text-standard">メールアドレス（確認用）<label class="text-required">[必須]</label></label>
            <input
              v-model="$v.form.confirm_mail.$model"
              :class="status($v.form.confirm_mail)"
              class="text-standard"
           />
          </div>
          <div :class="activeClass($v.form.confirm_mail.$error)" class="error-message">
            <span v-if="!$v.form.confirm_mail.sameAsEmail">メールアドレスが一致しません。入力内容をご確認ください。</span>
          </div>

          <div class="note-email">
            <p class="text-note">確認用にもう一度同じアドレスを入力してください）</p>
            <p class="text-note">
              ※携帯電話のメールアドレスで登録を希望される場合には「●●●」からのメールを受信できるようにしてください。
            </p>
          </div>

          <div class="input-filed">
            <label class="text-standard">携帯電話番号 <label class="text-required">[必須]</label></label>
            <input
              v-model="$v.form.tel.$model"
              :class="status($v.form.tel)"
              class="text-standard"
              @change="resetError('tel')"
           />
          </div>
          <div :class="activeClass($v.form.tel.$error, telError)" class="error-message">
            <span v-if="!$v.form.tel.required">必ず入力してください。</span>
            <span v-if="telError">{{telError}}</span>
          </div>

          <div class="input-filed">
            <label class="text-standard">自宅電話番号</label>
            <input
              v-model="form.homeTel"
              class="text-standard"
           />
          </div>
          <div class="error-message">
            <span></span>
          </div>

          <div class="input-filed">
            <label class="text-standard">備考</label>
            <input
              v-model="form.remark"
              class="text-standard"
           />
          </div>
          <div class="error-message">
            <span></span>
          </div>

          <div class="select-old-id">
            <label class="text-standard">すでに納骨堂を契約されていますか？</label>
            <div class="radios">
              <input type="radio" id="one" :value="1" v-model="form.ossuary_flag" @click="showIdField">
              <label class="text-standard" for="one">はい</label>
            </div>
            <div class="radios">
              <input type="radio" id="two" :value="0" v-model="form.ossuary_flag" @click="hiddenIdField">
              <label class="text-standard" for="two">いいえ</label>
            </div>
          </div>

          <div v-show="this.isShowId" class="input-filed ossuary-number-field">
            <label class="text-standard">納骨堂管理番号 <label class="text-required">[必須]</label></label>
            <input
              v-model="form.ossuary_number"
              :class="status($v.form.ossuary_number)"
              class="text-standard"
           />
          </div>
          <div :class="activeClass($v.form.ossuary_number.$error)" class="error-message">
            <span v-show="$v.form.ossuary_number.$error">必ず入力してください。</span>
          </div>
        </form>
        <div class="footer-registration">
          <button class="btn-blue" @click="submit">送信</button>
          <button class="btn-gray" @click="clear">戻る</button>
        </div>
      </div>
    </v-layout>
  </div>
</template>

<script>
import { required, requiredIf, email, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {
      form: {
        name : '',
        kana : '',
        postal_code : '',
        prefecture_id : '',
        municipality : '',
        address : '',
        building_name : '',
        mail: '',
        confirm_mail: '',
        tel: '',
        homeTel: '',
        remark: '',
        ossuary_flag: 0,
        ossuary_number: '',
      },
      isShowId: false,
      messageSearchZipcode: null,
      kanaError: null,
      telError: null,
      prefectureIdError: null
    }
  },
  validations() {
    return {
      form: {
        name: {
          required,
          maxLength: maxLength(25)
        },
        kana: {
          required,
          maxLength: maxLength(25)
        },
        postal_code: {
          required,
          maxLength: maxLength(7),
          minLength: minLength(7)
        },
        prefecture_id: {
          required
        },
        municipality: {
          required
        },
        address: {
          required
        },
        mail: {
          required,
          email
        },
        confirm_mail: {
          sameAsEmail: sameAs('mail')
        },
        tel: {
          required
        },
        ossuary_number: {
          required: requiredIf(() =>
            this.isShowId
          )
        }
      }
    }
  },
  methods: {
    async submit() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        const data = await this.$store.dispatch('user/entries', {...this.form})
        if (data) {
          this.clear()
        } else {
          const errorCode = _.get(this.errorGetEntries, 'code')
          if (errorCode === "900") {
            _.forEach(this.errorGetEntries.errors, (values, key) => {
              if (key === "kana") {
                _.forEach(values, (value, key) => {
                  this.kanaError = value
                })
              } else if (key === "prefecture_id") {
                _.forEach(values, (value, key) => {
                  this.prefectureIdError = value
                })
              } else if (key === "tel") {
                _.forEach(values, (value, key) => {
                  this.telError = value
                })
              }
            })
          }
        }
      } else {
        return null
      }
    },
    clear() {
      this.$v.form.$reset()
      this.kanaError = this.telError = this.prefectureIdError = null
      this.form.name = this.form.kana = this.form.postal_code = this.form.prefecture_id =
      this.form.municipality = this.form.address = this.form.building_name = this.form.mail = this.form.confirm_mail =
      this.form.tel = this.form.homeTel = this.form.remark = this.form.ossuary_number = ""
      this.$router.push('/main')
    },
    async setPrefectureMunicipality() {
      const zipCode = this.form.postal_code
      if (zipCode.length === 7) {
        try {
          const data = await this.$axios.$get(`http://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`)
          if (data.result) {
            this.form.prefecture_id = data.result[0].prefcode
            this.form.municipality = data.result[0].address2
            this.messageSearchZipcode = null
          }
          if (data.message) {
            this.messageSearchZipcode = data.message
          }
        }
        catch (error) {
          return null
        }
      }
    },
    status(validation) {
    	return {
      	error: validation.$error,
        dirty: validation.$dirty
      }
    },
    showIdField() {
      this.isShowId = true
    },
    hiddenIdField() {
      this.isShowId = false
    },
    activeClass(value, errorRequest) {
      if (value || errorRequest) {
        return 'error-text'
      }
      return null
    },
    resetError(type) {
      if (type === 'kana') {
        this.kanaError = null
      } else if (type === 'tel') {
        this.telError = null
      } else {
        this.prefectureIdError = null
      }
    }
  },
  computed: {
    ...mapGetters('user', {
      errorGetEntries: 'errorGetEntries'
    })
  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>

.error {
  border: 1px solid red!important;
  background-color: white!important;
}

.registration {
  .registration__header {
    text-align: center;
    background-color: white;
    padding: 30px 0;
    .header__title {
      width: 830px;
      margin: 0 auto;
      .text-title {
        color: $color-navy-blue;
        line-height: 2;
      }
    }
  }
  .registration__form {
    padding-top: 35px;
    width: 830px;
    form {
      margin-bottom: 0px;
      border-radius: 4px;
      .input-filed {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .required {
          font-size: 1rem;
        }
        input {
          background-color: white;
          height: 40px;
          max-width: 550px;
          width: 55%;
          padding: 0 10px;
          border-radius: 4px;
          &:focus {
            outline: none;
          }
        }
      }
      .ossuary-number-field {
        margin-top: 20px;
      }
      .note-email {
        margin-top: -12px;
        margin-bottom: 20px;
        .text-note {
          font-size: 12px;
          margin-bottom: 0;
          line-height: 1.4;
        }
      }
      .select-old-id {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        label {
          width: 45%;
        }
        .radios {
          margin-bottom: 0;
          width: 25%;
          label {
            width: auto;
            padding-left: 60px;
          }
        }
      }
      .error-message {
        opacity: 0;
        text-align: right;
        font-size: 12px;
        height: 20px;
        transition: 0.3s;
        span {
          color: red;
        }
        &.error-text {
          height: 30px!important;
          opacity: 1;
        }
      }
    }
  }
  .footer-registration {
    text-align: center;
    width: 55%;
    float: right;
    padding-bottom: 30px;
    button {
      width: 180px;
      &:first-child {
        margin-right: 60px;
      }
    }
  }
  .error-notification {
    text-align: center;
    height: 55px;
    p {
      color: red;
      margin: 0;
    }
  }
  @include breakpoint-max($break-sp) {
    .registration__header {
      .header__title {
        width: 94vw;
      }
    }
    .registration__form {
      width: 90vw;
      form {
        .input-filed {
          label {
            max-width: 40%!important;
          }
        }
        .select-old-id {
          justify-content: space-between;
          label {
            width: 40%;
          }
        }
      }
    }
    .footer-registration {
      width: 100%;
      padding-top: 20px;
      padding-bottom: 60px;
      button {
        width: 40%;
      }
    }
  }
  @include breakpoint-max(768px) {
    .registration__form {
      form {
        .input-filed {
          flex-direction: column;
          align-items: flex-start;
          label {
            max-width: none!important;
            margin-bottom: 5px;
          }
          input {
            max-width: none;
            width: 100%;
          }
        }
        .select-old-id {
          .radios {
            width: 20%;
            label {
              padding-left: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
