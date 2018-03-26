<template>
  <div class="sign">
    <div class="content">
      <h4 class="subtitle">FIND THE MOST LOVED ACTIVITIES</h4>
      <h2 class="maintitle">BLACK CAT</h2>
      <div class="appLog">
        <app-icon link="#icon-cat" :iconStyle="'fontSize:'+logIconSize" />
      </div>
      <div class="login">
        <form>
          <div class="input name">
            <app-icon link="#icon-caidan08" style="color:#D3C1E5" :iconStyle="'fontSize:'+userIconSize" />
            <input v-model="user" placeholder="User"/>
          </div>
          <div class="input password">
            <app-icon link="#icon-icons-" style="color:#D3C1E5" :iconStyle="'fontSize:'+userIconSize" />
            <input v-model="password" placeholder="Password" type="password"/>
          </div>
          <div class="submit">
            <input  type="submit" value="SIGN IN"  @click.stop.prevent="login"/>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import px2px from '@/util/px2px';
import { actions } from '@/store/modules/user/CONSTANTS';

@Component({
  components: {
    AppIcon,
  },
})
export default class Sign extends Vue {
  private user: string = '';
  private password: string = '';
  private get logIconSize() {
    return px2px(128);
  }
  private get userIconSize() {
    return px2px(26);
  }
  private login() {
    if (this.user && this.password) {
      let cancelLoading = this.$loading();
      this.$store
        .dispatch({
          type: actions.login,
          username: this.user,
          password: this.password,
        })
        .then(() => {
          cancelLoading();
          let redirect = this.$route.query.redirect;
          this.$router.push(redirect ? { path: redirect } : 'home');
        })
        .catch((e: Error) => {
          cancelLoading();
          this.$toast(e.message);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';

.sign {
  height: 100%;
  background: url('../assets/imgs/sign_bg.jpg') no-repeat;
  background-size: cover;
  background-position: center;
}
.content {
  height: 100%;
  text-align: center;
  position: relative;
  padding-top: 138px;
  box-sizing: border-box;
  background: linear-gradient(rgba(133, 96, 169, 0.8));
}
.subtitle {
  @include px2px(font-size,32);
  color: $themeMain;
  line-height: 40px;
}
.maintitle {
  @include px2px(font-size,48);
  color: $themeMain;
  line-height: 62px;
  margin: 32px auto 74px;
}
.appLog {
  color: $themeMain;
}
.login {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 242px;
}
.input {
  height: 80px;
  width: 480px;
  margin: 0 auto;
  position: relative;
  & > .icon {
    position: absolute;
    left: 26px;
    top: 50%;
    transform: translateY(-50%);
  }
  & > input {
    @include px2px(font-size,32);
    background: none;
    height: 100%;
    width: 100%;
    padding: 0 26px 0 64px;
    box-sizing: border-box;
    border-radius: 40px;
    border: 1px solid #d3c1e5;
    color: #453257;
    &:focus {
      border: 1px solid $themeMain;
    }
  }
  & > input::-webkit-input-placeholder {
    color: #ac8ec9;
  }
  & > input::-moz-placeholder {
    color: #ac8ec9;
  }
  & > input::-ms-input-placeholder {
    color: #ac8ec9;
  }
}
.name {
  margin-bottom: 32px;
}
.submit {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 128px;
  & > input {
    @include px2px(font-size,32);
    height: 100%;
    width: 100%;
    background: $themeMain;
    color: #453257;
  }
}
</style>

