<template>
  <v-container>
    <h1 class="my-6 ml-4">JOB一覧</h1>
    <!-- ローディング中 -->
    <div class="text-center d-flex flex-wrap" v-if="getNewsContentList.length === 0">
      <template v-for="(contents, i) in getPostNumberPerPage" link>
        <v-col :key="i" cols="12" md="4">
          <v-card elevation="6">
            <v-skeleton-loader ref="skeleton" type="article" class="mx-auto"></v-skeleton-loader>
          </v-card>
        </v-col>
      </template>
    </div>
    <!-- 記事一覧 -->
    <div v-else-if="getNewsContentList.length > 0" class="d-flex flex-wrap">
      <template v-for="(contents, i) in getNewsContentList" link>
        <v-col :key="i" cols="12" md="4">
          <v-hover v-slot:default="{ hover }">
            <div class="card-wrapper" @click="toContentDetail(contents.id)">
              <v-card
                :elevation="hover ? 10 : 2"
                :class="{ 'on-hover': hover }"
                class="d-flex flex-column justify-space-between"
              >
                <v-card-title class="pb-0 d-flex flex-column align-start">
                  <span class="title">{{ contents.title || "no-title" }}</span>
                  <span style="font-size: 0.8rem;">{{contents.time | formatDate}}</span>
                </v-card-title>
              </v-card>
            </div>
          </v-hover>
        </v-col>
      </template>
      <v-pagination v-model="page" class="my-4" :length="getNewsIdList.length" total-visible="10"></v-pagination>
    </div>
    <!-- ページ最下部に移動するボタン -->
    <page-scroll-button></page-scroll-button>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import PageScrollButton from "~/components/PageScrollButton";
export default {
  layout: "otherStoriesLayout",
  components: {
    PageScrollButton
  },
  data() {
    return {
      page: 1
    };
  },
  created() {
    // ページを離れる前のページネーションを取得
    this.page = this.getPageNo;
    if (this.getNewsContentList.length === 0) {
      this.$store.dispatch("news/fetchContentFromAPI", "JOB");
    }
  },
  computed: {
    ...mapGetters(["getPageNo"]),
    ...mapGetters("news", [
      "getNewsContentList",
      "getNewsIdList",
      "getPostNumberPerPage"
    ])
  },
  watch: {
    page() {
      // ページの切り替えをトリガーに次のコンテンツを取得しにいく
      if (
        this.getNewsIdList[this.page - 1][0] !== this.getNewsContentList[0].id
      ) {
        this.$store.dispatch(
          "news/fetchContentsFromId",
          this.getNewsIdList[this.page - 1]
        );
        window.scrollTo(0, 0);
      }
    }
  },
  head() {
    return {
      title: "JOB一覧"
    };
  },
  methods: {
    toPostingArticle(link) {
      window.open(link, "_blank");
    },
    toContentDetail(contentsId) {
      this.$store.commit("stashPageNo", this.page);
      this.$router.push({ name: "item-id", params: { id: contentsId } });
    }
  },
  filters: {
    formatDate(unixTime) {
      let dateTime = new Date(Number(unixTime) * 1000);
      return (
        dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString()
      );
    }
  }
};
</script>