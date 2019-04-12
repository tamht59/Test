<template lang="html">
  <v-app v-show="getProfileData.status === 'success'">
    <v-layout>
      <div class="general-profile">
        <v-img
          :src="profileData.deceasedImageUrl"
          class="main-avatar"
          @click="zoomAvata = true"
        />

        <div :class="['user-info', {isReadMore: isReadMore}]">
          <div class="user-info__default">
            <div ref="userInfo">
              <p class="header-3 display-name">{{profileData.displayName}}</p>
              <div class="user-info__line">
                <p class="text-standard line__title">生年月日　</p>
                <p class="text-standard">{{fomatTime(profileData.birth)}}</p>
              </div>
              <div class="user-info__line">
                <p class="text-standard line__title">逝去年月日</p>
                <p class="text-standard">{{fomatTime(profileData.deathDate)}}</p>
              </div>
              <div class="user-info__line">
                <p class="text-standard line__title">享年</p>
                <p class="text-standard">{{profileData.deathAge}}歳</p>
              </div>
              <div v-if="profileData.freeItem" class="user-info__line" style="white-space: pre-line">
                <p class="text-standard line__title">フリー入力欄</p>
                <p class="text-standard">{{profileData.freeItem}}</p>
              </div>
            </div>
          </div>
          <div @click="readMored()" v-if="showBtnReadMore " class="view-more-btn__wrap">
            <button class="btn-white view-more-btn">{{contentBtnReadMore.text}} <v-icon>{{contentBtnReadMore.icon}}</v-icon></button>
          </div>
        </div>
      </div>
    </v-layout>

    <v-layout class="bg-light-gray">
      <div class="time-line-content">
        <p class="header-1 list-timeline-profile__label">来歴</p>
        <hr>
        <div class="timeline-profile">
          <div
            v-for="(item, i) of profileData.details"
            :key="i"
            class="timeline-profile__line"
          >
            <div class="header-3 timeline-profile__year">
              {{getYear(item.objectDate)}}<span>{{getMonthDay(item.objectDate)}}</span>
            </div>
            <div class="timeline-profile__dot">
              <v-icon>lens</v-icon>
            </div>
            <div class="header-3 timeline-profile__content">
              {{item.profileText}}
            </div>
          </div>
        </div>
      </div>
    </v-layout>

    <v-dialog v-model="zoomAvata" content-class="full-screen">
      <button
        @click="zoomAvata = false"
        class="full-screen__btn-close"
      >
        <span class="icon-delete"></span>
      </button>
      <div class="full-screen__img">
        <img
          :src="profileData.deceasedImageUrl"
        />
      </div>
    </v-dialog>

  </v-app>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.room_id);
  },
  data() {
    return {
      room_id: this.$route.params.room_id,
      zoomAvata: false,
      showBtnReadMore: false,
      isReadMore: false
    };
  },
  computed: {
    profileData() {
      const { result } = this.getProfileData;

      if (_.isEmpty(result)) {
        return {};
      }

      return result[0];
    },
    contentBtnReadMore() {
      if (this.isReadMore) {
        return {
          text: "閉じる",
          icon: "keyboard_arrow_up"
        };
      }
      return {
        text: "...もっと見る",
        icon: "keyboard_arrow_down"
      };
    },

    ...mapGetters("room", ["getProfileData"])
  },
  methods: {
    getYear(time) {
      const year = time.slice(0, 4);
      return year+'年';
    },
    getMonthDay(time) {
      let monthDay = null
      const month = time.slice(4, 6);
      const day = time.slice(6, 8);
      if (month) {
        monthDay = month+'月';
      }
      if (day) {
        monthDay= monthDay.concat(day+'日')
      }

      return monthDay;
    },
    readMored() {
      this.isReadMore = !this.isReadMore;
    },
    fomatTime(time) {
      return moment(time).format('YYYY年MM月DD日')
    },

    ...mapActions("room", {
      getProfile: "getProfile"
    })
  },
  updated() {
    const heightUserInfo = this.$refs.userInfo.clientHeight;
    const windowWidth = window.innerWidth;
    if (windowWidth > 1024) {
      if (!this.isReadMore && heightUserInfo > 220) {
        this.showBtnReadMore = true;
      }
    } else {
      if (!this.isReadMore && heightUserInfo > 170) {
        this.showBtnReadMore = true;
      }
    }
  },
  beforeMount() {
    //ルームデータ取得APIを叩く
    this.$store.dispatch("room/getRoomData", {
      room_id: this.room_id
    });
    this.getProfile({ id: this.room_id });
  }
};
</script>

<style lang="scss" scoped>
.general-profile {
  display: flex;
  flex-direction: row;
  padding-top: 35px;
  padding-bottom: 30px;
  width: 830px;
  margin: 0 auto;
  .main-avatar {
    margin-bottom: 10px;
    width: 290px;
    height: 290px;
    border-radius: 50%;
    box-shadow: 0px 5px 25px -6px $color-dark-gray;
  }
  .user-info {
    padding-left: 35px;
    padding-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .user-info__default {
      height: 220px;
      overflow-y: hidden;
      & > div {
        flex-direction: column;
      }
      .display-name {
        margin-bottom: 20px;
        border-bottom: 1px solid $color-gray;
      }
      .user-info__line {
        margin-bottom: 8px;
        .line__title {
          min-width: 15rem;
          width: 15rem;
        }
      }
      div {
        display: flex;
        p {
          margin-bottom: 0px;
          &:last-child {
            margin-left: 10px;
          }
        }
      }
    }
    .view-more-btn__wrap {
      max-width: 400px;
      display: flex;
      justify-content: center;
      .view-more-btn {
        width: 100%;
        position: relative;
        i {
          color: #024e8a;
          position: absolute;
          right: 5px;
          font-size: 2.4rem;
        }
      }
    }
    &.isReadMore {
      .user-info__default {
        height: 100%;
        overflow-y: auto;
        margin-bottom: 20px;
      }
    }
  }
}
.list-timeline-profile__label {
  color: $color-text-blue;
  margin: 0;
}
.time-line-content {
  width: 830px;
  margin: 30px auto;
  hr {
    margin-bottom: 40px;
  }
}
.timeline-profile {
  position: relative;
  .timeline-profile__line {
    display: flex;
    flex-direction: "row";
    width: 100%;
    flex: 1;
    align-items: center;
    margin-bottom: 30px;
    justify-content: flex-start;
    // &:first-child {
    //   .timeline-profile__content {
    //     background-color: transparent;
    //     &:before{
    //       content: '';
    //       border: none;
    //     }
    //   }
    // }
    p {
      margin: 0;
    }
    .timeline-profile__year {
      width: 200px;
      text-align: right;
    }
    .timeline-profile__content {
      width: 590px;
      background-color: white;
      padding: 10px 15px;
      position: relative;
      border-radius: 10px;
      &:before {
        content: "";
        position: absolute;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid white;
        top: calc(50% - 10px);
        left: -10px;
      }
    }
    .timeline-profile__dot {
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        color: $color-navy-blue;
        z-index: 100;
        font-size: 13px;
      }
    }
  }
  &:before {
    content: "";
    width: 1px;
    background-color: $color-dark-gray;
    height: 100%;
    left: 222px;
    position: absolute;
  }
}
// Responsive
@include breakpoint-max($break-sp) {
  .general-profile {
    flex-direction: column;
    width: 90vw;
    .main-avatar {
      width: 29vw;
      height: 29vw;
      margin: 0 auto;
      min-width: 175px;
      min-height: 175px;
    }
    .user-info {
      padding: 0px;
      padding-top: 20px;
      .user-info__default {
        height: 7.5rem;
        .display-name {
          margin-bottom: 1rem;
          font-weight: bold;
          text-align: center;
          width: 100%;
        }
        .user-info__line {
          margin-bottom: 0;
          .line__title {
            width: 10rem;
          }
        }
      }
      .view-more-btn__wrap {
        margin-top: 1rem;
        max-width: 100%;
        .view-more-btn {
          i {
            right: 15px;
            font-size: 1.5rem;
          }
        }
      }
    }
  }
  .time-line-content {
    width: 95vw;
    .timeline-profile {
      .timeline-profile__line {
        .timeline-profile__year {
          width: 7rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .timeline-profile__dot {
          width: 3.85rem;
          i {
            font-size: 1rem;
          }
        }
        .timeline-profile__content {
          width: 100%;
          max-width: 25rem;
        }
      }
      &:before {
        left: 8.7rem;
      }
    }
  }
}
@include breakpoint-max(767px) {
  .time-line-content {
    .timeline-profile {
      .timeline-profile__line {
        .timeline-profile__content {
          max-width: 24rem;
        }
      }
      &:before {
        left: 8.9rem;
      }
    }
  }
}
@include breakpoint-max($break-xs) {
  .time-line-content {
    .timeline-profile {
      .timeline-profile__line {
        .timeline-profile__content {
          max-width: 23rem;
        }
      }
    }
  }
}
</style>
