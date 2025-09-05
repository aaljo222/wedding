import { useState } from "react";

export const cards = [
  {
    id: 1,
    img: "https://d38fyys32noduv.cloudfront.net/commons/card_sample/XiWvmigDIO.png",
    url: "https://w.theirmood.com/card/XiWvmigDIO",
    title: "Classic",
    subtitle: "2025.10.01 SAT 2:00PM • Seoul Grand Hall",
    // theme: "classic",
  },
  {
    id: 2,
    img: "https://d38fyys32noduv.cloudfront.net/commons/card_sample/BgIftGNgps.png",
    url: "https://w.theirmood.com/card/BgIftGNgps",
    title: "Blush",
    subtitle: "2025.12.30 SAT 10:00AM • Japan Grand Hall",
    // theme: "blush",
  },
  {
    id: 3,
    img: "https://d38fyys32noduv.cloudfront.net/commons/card_sample/dXHF8IHgPT.png",
    url: "https://w.theirmood.com/card/dXHF8IHgPT",
    title: "Minimal",
    subtitle: "2026.10.10 SAT • With Our Dearest",
    // theme: "sage",
  },
  {
    id: 4,
    img: "https://d38fyys32noduv.cloudfront.net/commons/card_sample/IhMIUxYKKt.png",
    url: "https://w.theirmood.com/card/IhMIUxYKKt",
    title: "Modern",
    subtitle: "Beautiful Moments Together",
    // theme: "navy",
  },
];

// export const THEME = {
//   classic: {
//     accent: "text-stone-900",
//     sub: "text-stone-500",
//     ring: "ring-stone-200",
//     chip: "bg-stone-100 text-stone-600",
//   },
//   blush: {
//     accent: "text-rose-900",
//     sub: "text-rose-500",
//     ring: "ring-rose-100",
//     chip: "bg-rose-50 text-rose-600",
//   },
//   sage: {
//     accent: "text-emerald-900",
//     sub: "text-emerald-600",
//     ring: "ring-emerald-100",
//     chip: "bg-emerald-50 text-emerald-600",
//   },
//   navy: {
//     accent: "text-slate-900",
//     sub: "text-slate-600",
//     ring: "ring-slate-200",
//     chip: "bg-slate-50 text-slate-600",
//   },
// };

export const invitationList = [
  {
    ino: 1,
    date: "2025-09-01",
    time: "12:00",
    groomName: "홍길동",
    brideName: "김영희",
    bg: "#FFFFFF",
    title1: "소중한 분들을 초대합니다",
    content: `저희 두 사람의 작은 만남이
  
      사랑의 결실을 이루어
  
      소중한 결혼식을 올리게 되었습니다.
  
      평생 서로 귀하게 여기며
      첫 마음 그대로 존중하고 배려하며 살겠습니다.
  
      오로지 믿음과 사랑을 약속하는 날
      오셔서 축복해 주시면 더 없는 기쁨으로
      간직하겠습니다.`,
  },
];
