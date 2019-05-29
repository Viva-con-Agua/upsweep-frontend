<template>
  <el-row>
    <el-card v-for="comment in comments" :key="comment.id">
      <el-row>
        <el-col :span="1">
          <a target="_blank">
            <img
              class="user"
              src="https://img.icons8.com/ios/80/000000/gender-neutral-user-filled.png"
            >
          </a>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-row>
            <el-col :span="5">
              <span class="userName">{{comment._creator.fullName}}</span>
              <span v-if="comment._votes.length>1">{{comment._votes.length}} points .</span>
              <span v-else>{{comment._votes.length}} point ·</span>
              <time-ago
                class="time-ago"
                :datetime="comment.createdAt"
                refreshs
                :locale="locale"
                :long="longString"
              ></time-ago>
            </el-col>
            <el-col :span="1" :offset="18">
              <el-dropdown trigger="click">
                <i class="el-icon-arrow-down el-icon--right"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-delete" @click.prevent="deleteComment">Delete</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-edit" @click.prevent="editComment">Edit</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span>{{comment.text}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <VoteForm v-bind:comment="comment" :poolEvent="poolEventId"/>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </el-row>
</template>

<script>
import VoteForm from "./VoteForm";
import TimeAgo from "vue2-timeago";
import axios from "axios";
import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

axios.defaults.withCredentials = true;

import elementui from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(elementui);

export default {
  name: "CommentFeed",
  components: { TimeAgo, VoteForm },
  props: ["poolEventId"],
  data() {
    return {
      comments :[],
      fullName: null,
      value: new Date(),
      locale: "en",
      longString: false,
      tooltip: true,
      user: undefined,
      vote: {
        commentId: "",
        _creator: {
          id: "",
          fullName: ""
        }
      }
    };
  },
  mounted() {
    axios
      .get("http://localhost/api/comment/" + this.poolEventId)
      .then(resp => {
        this.comments = resp.data.data.comments
      })
      .catch(err => {
        return err.message;
      });
    /*this.$store.dispatch(
      "GET_COMMENTS_BY_POOLEVENT_ID",
    //this.poolEventId
    '5cd29cda64d95068c5f5002d'
    );*/
  },
  computed: {
    /*comments() {
      return this.$store.getters.getComments;
    }*/
  }
};
</script>

<style>
.userName {
  margin-right: 4px;
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.8rem;
}

.time-ago {
  color: dimgrey;
}

.like-button {
  margin-top: 10px;
}

.user {
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border: 0.7px solid black
}
</style>
