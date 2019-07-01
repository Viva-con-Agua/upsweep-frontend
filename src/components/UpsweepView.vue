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
/* eslint-disable */

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

 var UPSWEEP_HOST = 'localhost';
 var UPSWEEP_PORT = ':8081';
// var UPSWEEP_MONGODB_URL = process.env.VUE_APP_UPSWEEP_MONGODB_URL;
// var UPSWEEP_PORT = process.env.VUE_APP_UPSWEEP_PORT;

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
  data() {
    return {
      currentSession: '',
    };
  },
  mounted() {
    axios
      //.get("/api/currentSession")
      .get(UPSWEEP_HOST + UPSWEEP_PORT + '/api/currentSession')
      .then(session => {
        this.currentSession = session.data;
      })
      .catch(err => {
        let oauthWindow = window.open('/drops/oauth2/code/get?' +
          //'http://' + UPSWEEP_MONGODB_URL + '/drops/oauth2/code/get?' +
          queryString.stringify({
              client_id: "comment-backend",
              response_type: "code",
              state: UPSWEEP_HOST +  UPSWEEP_PORT + '/api/rendersession',
              redirect_uri: UPSWEEP_HOST + UPSWEEP_PORT + '/api/oauth/code'
              //state: '/api/rendersession',
              //redirect_uri: '/api/oauth/code'
            }),
          "Authentication",
          "width=400, height=400, position=center"
        );
        setTimeout(() => {
          axios
            .get(UPSWEEP_HOST + UPSWEEP_PORT + '/api/currentSession')
            //.get('/api/currentSession')
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
