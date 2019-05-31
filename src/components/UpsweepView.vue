<template>
  <VcAFrame title>
    <VcAColumn size="90%">
      <VcABox :first="true" title="Comments">
        <CommentForm :poolEventId="poolEventId"/>
        <CommentFeed :poolEventId="poolEventId"/>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
import VcABox from "./VcABox.vue";
import VcAColumn from "./VcAColumn.vue";
import VcAFrame from "./VcAFrame.vue";
import VcAInfoBox from "./VcAInfoBox.vue";
import CommentForm from "./CommentForm.vue";
import CommentFeed from "./CommentFeed.vue";
import Vue from "vue";
import Vuex from "vuex";
import queryString from "query-string";
import axios from "axios";

Vue.use(Vuex);

export default {
  name: "UpsweepView",
  components: {
    VcABox,
    VcAColumn,
    VcAFrame,
    VcAInfoBox,
    CommentForm,
    CommentFeed
  },
  props: {
    poolEventId: { type: String, required: false }
  },
  date() {
    return {
      currentSession
    };
  },
  mounted() {
    axios
      .get("http://localhost/api/currentsession")
      .then(session => {
        this.currentSession = session.data;
      })
      .catch(err => {
        let oauthWindow = window.open(
          "http://localhost/drops/oauth2/code/get?" +
            queryString.stringify({
              client_id: "comment-backend",
              response_type: "code",
              state: "http://localhost/api/rendersession",
              redirect_uri: "http://localhost/api/oauth/code"
            }),
          "Authentication",
          "width=400, height=400, position=center"
        );
        setTimeout(() => {
          axios
            .get("http://localhost/api/currentsession")
            .then(session => {
              this.currentSession = session.data;
              location.reload();
            })
            .catch((err)=>{
              console.log(err)
            });
          oauthWindow.close();
        }, 1000);
      });
  }
};
</script>

<style>
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
