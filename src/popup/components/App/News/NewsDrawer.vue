<template>
  <div class="news-drawer-container">
    <div class="news-item"
         v-for="(news, index) in newsList"
         :key="index"
         @click="gotoDetail(news.detail)"
    >
      <div class="news-img">
        <div class="news-seq" :style="'background:' + 'rgba(255, '+(10 * index)+', '+ (5 * index) +')'">{{index + 1}}</div>
        <img :src="news.img" alt="">
      </div>
      <div class="news-content">
        <div class="news-title">
          {{news.title}}
        </div>
        <div class="news-desc">
          {{desc(news.desc)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsDrawer",
  computed: {
    desc() {
      return function (desc) {
        if (desc.length > 30) {
          return desc.substring(0, 37)
        }
        return desc.substring(0, 30)
      }
    }
  },
  methods: {
    gotoDetail(detailURL) {
      window.open(detailURL, '_blank');
    }
  },
  data() {
    return {
      newsList: [
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/cff817033087bf233ce7fb1c2499a2f7?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '解读加快建设全国统一大市场',
          desc: '4月11日，民航局召开发布会，辟谣“东航飞机失事锁定副驾驶”等传言。 民航局表示，东航事故目前还在调查中，还不能给事故原因和性质下结论',
          detail: 'https://www.baidu.com',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/ba41b58bbdf78b7b632d7e15c5b2c65a?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '官方辟谣东航飞机失事与副驾有关',
          desc: '4月11日，民航局召开发布会，辟谣“东航飞机失事锁定副驾驶”等传言。 民航局表示，东航事故目前还在调查中，还不能给事故原因和性质下结论。',
          detail: 'https://www.baidu.com',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/ded947880cd01c60707c7110100822fe?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '上海社区书记辞职 居民万字留言挽留',
          desc: '疫情期间，上海一位社区书记连续多天满负荷工作且遭遇误解甚至谩骂。4月7日，他在社区平台发文辞职。居民看到后，留下万字留言恳切挽留。',
          detail: 'https://www.baidu.com',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/c1927f237753294bda029377bea6ca65?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '安全生产十五条措施热',
          desc: '日前，国务院安委会发布了进一步强化安全生产责任落实、坚决防范遏制重特大事故的十五条措施，切实保障劳动者生命安全，提升企业安全水平。',
          detail: 'https://www.baidu.com',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/9bedda7b57d8863aaf425c59e9f6b3e8?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '英女王谈感染新冠感受：筋疲力尽',
          desc: '当地时间2月20日英国女王确诊感染新冠病毒后。近日，英女王与伦敦皇家医院进行视频连线，称自己在感染新冠后感到“非常疲惫且筋疲力竭”。',
          detail: 'https://www.baidu.com',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/05732ab9777f7b8428493758c0f36775?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '事故后部分空勤人员现应激心理反应',
          desc: '11日，民航局举行新闻发布会，中国民航局航空安全办公室副主任吴世杰表示，“3.21”事故发生后，部分年轻空勤人员出现应激心理反应，情绪较低落。',
          detail: 'https://www.baidu.com',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/95c6f1434e2e317f532cad48524e9984?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '中国的养老院终于要开始赚钱了',
          desc: '作为民生的养老事业，天然戴着“福利性”“公益性”“保障性”的光环，在很长时间里，养老院亏损是常态。挣扎了20年，中国的养老院终于要开始赚钱了。',
          detail: '',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/7056247de7ecde072f26f27eeaa20ea4?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '吴尊友：上海理论上10天社会面清零',
          desc: '中国疾控中心流行病学首席专家吴尊友表示，连续开展多轮全市全员核酸检测后，理论上说，10天至两周，上海或实现社会面疫情清零。',
          detail: '',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/dfb3bd6083eeb091ae621df9c0ca0d99?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '上海超2万人核检结果异常',
          desc: '截至4月11日上午8时，上海市核酸筛查共采样2512万人，已完成检测2152万人，其中结果异常25996人，目前还有一部分混管阳性人员的复检工作正在...',
          detail: '',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/7056247de7ecde072f26f27eeaa20ea4?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '吴尊友：上海理论上10天社会面清零',
          desc: '中国疾控中心流行病学首席专家吴尊友表示，连续开展多轮全市全员核酸检测后，理论上说，10天至两周，上海或实现社会面疫情清零。',
          detail: '',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/dfb3bd6083eeb091ae621df9c0ca0d99?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '上海超2万人核检结果异常',
          desc: '截至4月11日上午8时，上海市核酸筛查共采样2512万人，已完成检测2152万人，其中结果异常25996人，目前还有一部分混管阳性人员的复检工作正在...',
          detail: '',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/7056247de7ecde072f26f27eeaa20ea4?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '吴尊友：上海理论上10天社会面清零',
          desc: '中国疾控中心流行病学首席专家吴尊友表示，连续开展多轮全市全员核酸检测后，理论上说，10天至两周，上海或实现社会面疫情清零。',
          detail: '',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/dfb3bd6083eeb091ae621df9c0ca0d99?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '上海超2万人核检结果异常',
          desc: '截至4月11日上午8时，上海市核酸筛查共采样2512万人，已完成检测2152万人，其中结果异常25996人，目前还有一部分混管阳性人员的复检工作正在...',
          detail: '',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/7056247de7ecde072f26f27eeaa20ea4?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '吴尊友：上海理论上10天社会面清零',
          desc: '中国疾控中心流行病学首席专家吴尊友表示，连续开展多轮全市全员核酸检测后，理论上说，10天至两周，上海或实现社会面疫情清零。',
          detail: '',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/dfb3bd6083eeb091ae621df9c0ca0d99?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '上海超2万人核检结果异常',
          desc: '截至4月11日上午8时，上海市核酸筛查共采样2512万人，已完成检测2152万人，其中结果异常25996人，目前还有一部分混管阳性人员的复检工作正在...',
          detail: '',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/7056247de7ecde072f26f27eeaa20ea4?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '吴尊友：上海理论上10天社会面清零',
          desc: '中国疾控中心流行病学首席专家吴尊友表示，连续开展多轮全市全员核酸检测后，理论上说，10天至两周，上海或实现社会面疫情清零。',
          detail: '',
        },
        {
          img: "https://fyb-1.cdn.bcebos.com/hotboard_img/dfb3bd6083eeb091ae621df9c0ca0d99?x-bce-process=image/resize,m_fill,w_256,h_170",
          title: '上海超2万人核检结果异常',
          desc: '截至4月11日上午8时，上海市核酸筛查共采样2512万人，已完成检测2152万人，其中结果异常25996人，目前还有一部分混管阳性人员的复检工作正在...',
          detail: '',
        },
      ]
    }
  }
}
</script>

<style scoped>
  .news-drawer-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    box-shadow: -0.5px 0 16px white;
    background: rgb(243, 242, 242);
  }
  div::-webkit-scrollbar {
    display: none;
  }
  .news-item:first-child {
    margin-top: 16px;
  }
  .news-item {
    width: 95%;
    height: 88px;
    margin: 0 auto;
    cursor: pointer;
  }
  .news-img {
    width: 110px;
    height: 65px;
    float: left;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
  }
  .news-seq {
    width: 30px;
    height: 16px;
    background: rgba(255, 0, 0, 0.93);
    position: absolute;
    font-size: 12px;
    top: 0;
    color: white;
    border-radius: 0 0 7px 0;
  }
  .news-content {
    width: 230px;
    margin-left: 10px;
    float: left;
    text-align: left;
  }
  .news-img img {
    width: 100%;
    height: 100%;
  }
  .news-title {
    width: 100%;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(12, 16, 33, 0.84);
    overflow: hidden;
    font-weight: bolder;
    margin-bottom: 10px;
  }
  .news-desc {
    width: 100%;
    height: 50px;
    font-size: 12px;
    color: rgba(12, 16, 33, 0.54);
    overflow: hidden;
    text-overflow: ellipsis;
    max-lines: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    display: -webkit-box;
  }
</style>