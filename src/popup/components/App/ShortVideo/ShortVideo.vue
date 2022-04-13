<template>
  <div class="video-app">
    <div class="video-platform"></div>
    <div class="video-list">
      <div class="vide-item">ds
        <video autoplay playsinline controls crossorigin="anonymous">
          <source src="http://localhost:8090/d679c0e33b9770f3a796fb0e93a8b4b0/6256e68c/video/tos/cn/tos-cn-ve-15c001-alinc2/b79bd33e5cec4d5084c9c398cd299464/?a=6383&br=1857&bt=1857&cd=0%7C0%7C0%7C0&ch=5&cr=0&cs=0&cv=1&dr=0&ds=4&er=&ft=.6JO5fycXZgk0PD1cJsysg9wJggNovEe&l=202204132204190101501891043F25F838&lr=all&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajs3Njo6ZnE3PDMzNGkzM0ApZTc0aGlmNTtmN2Y4OjdkNWduaWNqcjQwcDVgLS1kLS9zczQwYDMvXy0uNmAyNi0uMmI6Yw%3D%3D&vl=&vr="/>
        </video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShortVideo"
}
</script>

<style scoped>
  .video-app {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .video-platform {
    flex: 3;
    height: 100%;
    background: #ccffcc;
  }
  .video-list {
    flex: 8;
    height: 100%;
  }
  .vide-item {
    width: 100%;
    height: 100%;
  }
  video {
    width: 50%;
    height: 400px;
  }

</style>