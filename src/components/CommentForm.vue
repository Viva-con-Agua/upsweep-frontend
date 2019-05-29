<template>
  <div>
    <el-card>
      <form :model="newComment">
        <el-row>
          <el-col :span="1">
            <img
              class="user"
              src="https://img.icons8.com/ios/80/000000/gender-neutral-user-filled.png"
            >
          </el-col>
          <el-col class="form" :span="20" :offset="1">
            <el-row>
              <span class="userName">{{currentSession.profiles[0].supporter.fullName}}</span>
            </el-row>
            <el-row>
              <el-input
                type="textarea"
                placeholder="input comment"
                v-model="newComment.text"
                :autosize="{ minRows: 3, maxRows: 6}"
              ></el-input>
            </el-row>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="2" :offset="20">
            <el-button
              v-if="newComment.text"
              class="vca-button-primary"
              @click.prevent="submit"
            >comment</el-button>
            <el-button v-else class="vca-button-primary" @click.prevent="submit" disabled>comment</el-button>
          </el-col>
        </el-row>
      </form>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import elementui from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vuex from "vuex";
import axios from "axios";

axios.defaults.withCredentials = true;



Vue.use(Vuex);
Vue.use(elementui);

export default {
  name: "CommentForm",
  props: ["poolEventId"],
  data() {
    return {
      newComment: {
        text: "",
        _poolEvent: "",
        _creator: {
          fullName: "",
          id: ""
        }
      },
      currentSession: ""
    };
  },
  mounted() {
    axios
      .get("http://localhost/api/currentsession")
      .then(resp => {
        this.currentSession = resp.data.profile;
      })
      .catch(err => {
       
      });
    this.newComment._poolEvent = this.poolEventId;
  },
  methods: {
    submit() {
      this.newComment._creator.fullName = this.currentSession.profiles[0].supporter.fullName;
      this.newComment._creator.id = this.currentSession.id;
      axios
        .post("http://localhost/api/comment", this.newComment)
        .then(resp => {
          this.comments.unshift(resp.data.data);
        })
        .catch(err => {});

      /*this.$store.dispatch("POST_COMMENT", this.newComment);
      setTimeout(() => {
        this.$store.dispatch(
          "GET_COMMENTS_BY_POOLEVENT_ID",
          "5cd29cda64d95068c5f5002d"
        );
        this.newComment.text = "";
      }, 100);*/
    }
  },
  computed: {}
};
</script>

<style>
.vca-button-primary {
  margin-top: 10px;
  width: 100%;
}
.user {
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border: 0.7px solid black;
}
</style>
