<template>
  <el-form ref="vote" :model="vote">
    <div class="like-container">
      <input
        v-if="isLiked(comment._votes)"
        type="image"
        class="heart"
        :id="comment._id"
        src="https://img.icons8.com/office/31/000000/hearts.png"
        @click.prevent="dislikeButtonHandler(comment)"
      >

      <input
        v-else-if="!isLiked(comment._votes) && comment._votes.length!==0"
        type="image"
        :id="comment._id"
        @click.prevent="likeButtonHandler($event)"
        src="https://img.icons8.com/ios/34/000000/hearts.png"
      >
      <input
        type="image"
        :id="comment._id"
        v-else
        @click.prevent="likeButtonHandler($event)"
        class="like-button"
        src="https://img.icons8.com/ios/34/000000/hearts.png"
      >
    </div>
  </el-form>
</template>

<script>
/* eslint-disable */
var UPSWEEP_HOST = 'localhost';
var UPSWEEP_PORT = ':8081';

import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "VoteForm",
  props: ["comment"],
  data() {
    return {
      profileId: "",
      vote: {
        commentId: "",
        _creator: {
          id: "",
          fullName: ""
        }
      }
    };
  },
  methods: {
    likeButtonHandler(event) {
      this.vote.commentId = event.currentTarget.id;
      axios
        //.post("/api/vote", this.vote)
        .post(UPSWEEP_HOST + UPSWEEP_PORT + '/api/vote', this.vote)
        .then(resp => {
          /*this.$store.dispatch(
            "GET_COMMENTS_BY_POOLEVENT_ID",
            '5cd29cda64d95068c5f5002d'
          );*/
        })
        .catch(err => {});
    },
    dislikeButtonHandler(comment) {
      let voteId = this.findCurrentUserVoteId(comment._votes);
      if (voteId) {
        axios
          //.delete("/api/vote/" + voteId)
          .delete(UPSWEEP_HOST + UPSWEEP_PORT + '/api/vote/')
          .then(resp => {
            /*this.$store.dispatch(
              "GET_COMMENTS_BY_POOLEVENT_ID",
              '5cd29cda64d95068c5f5002d'
            );*/
          })
          .catch(err => {});
      }
    },
    isLiked(votes) {
      let result = votes.find(vote => {
        return vote._creator.id === this.profileId;
      });
      return result !== undefined;
    },
    findCurrentUserVoteId(votes) {
      let vote = votes.find(vote => {
        return vote._creator.id === this.profileId;
      });
      return vote._id;
    },
    deleteComment() {
      alert("deleted!");
    },
    findAndDeleteVote() {
      let vote = votes.find(vote => {
        return vote._creator.id === this.profileId;
      });
      return vote;
    }
  }
};
</script>

<style>
</style>
