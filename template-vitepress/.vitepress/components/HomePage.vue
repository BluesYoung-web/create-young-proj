<!--
 * @Author: zhangyang
 * @Date: 2023-11-08 16:13:01
 * @LastEditTime: 2023-11-27 15:12:50
 * @Description:
-->
<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme'

const teamMembers = [
  {
    avatar: 'https://foruda.gitee.com/avatar/1677049688917634099/5384684_bluseyoung-web_1578985791.png',
    name: 'BluesYoung-web',
    title: 'Creator, 沉迷代码无法自拔',
    links: [
      {
        icon: 'github',
        link: 'https://github.com/BluesYoung-web',
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#C71D23" d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>'
        },
        link: 'https://gitee.com/BluesYoung-web',
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><g fill="none"><rect width="30" height="22" x="1" y="5" fill="#B4ACBC" rx="1.5"/><rect width="28" height="18" x="2" y="7" fill="#CDC4D6" rx="1"/><path fill="#E1D8EC" d="m30 23.4l-12.971-7.782a2 2 0 0 0-2.058 0L2 23.4V25a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1v-1.6Z"/><path fill="#998EA4" d="M2 9.766V8h28v1.766L17.544 17.24a3 3 0 0 1-3.088 0L2 9.766Z"/><path fill="#F3EEF8" d="M2 8.6V7a1 1 0 0 1 1-1h26a1 1 0 0 1 1 1v1.6l-12.971 7.783a2 2 0 0 1-2.058 0L2 8.6Z"/><path fill="#00A6ED" d="M16 23a7 7 0 1 0 0-14a7 7 0 0 0 0 14Z"/><path fill="#F4F4F4" d="M16 11.5c-1.21-.02-2.36.44-3.22 1.3c-.87.85-1.34 1.99-1.34 3.2c0 2.48 2.02 4.5 4.5 4.5a.47.47 0 1 0 0-.94c-1.96 0-3.56-1.6-3.56-3.56c0-.96.38-1.86 1.06-2.53c.68-.67 1.59-1.03 2.55-1.03c1.93.03 3.51 1.65 3.51 3.62v.81a.67.67 0 0 1-1.34 0v-3.08a.47.47 0 0 0-.47-.47c-.26 0-.49.21-.49.47v.09c-.44-.35-.99-.57-1.6-.57c-1.4 0-2.54 1.14-2.54 2.54c0 1.4 1.14 2.54 2.54 2.54c.7 0 1.34-.29 1.8-.75c.28.5.81.84 1.42.84c.89 0 1.62-.73 1.62-1.62v-.81c0-2.47-1.99-4.52-4.44-4.55Zm-.39 5.96c-.88 0-1.6-.72-1.6-1.6c0-.88.72-1.6 1.6-1.6c.88 0 1.6.72 1.6 1.6c0 .88-.72 1.6-1.6 1.6Z"/></g></svg>'
        },
        link: 'mailto:bluesyoung_web@163.com',
      },
    ]
  },
]
</script>

<template>
  <div class="container mx-auto">
    <div class="content-container">
      <main class="main">
        <div class="vp-doc" flex flex-col items-center mt-10>
          <h2 id="meet-the-team" op50 font-normal p="t-10 b-2">
            贡献者
          </h2>
          <div w-full p-10 :class="{
            'flex justify-center items-center': teamMembers.length === 1
          }">
            <VPTeamMembers  :members="teamMembers" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
