import { useState, useRef, useEffect } from "react";

const PHRASES = [
  { id: 1, romaji: "Oishikkata des", romajiEnd: "u", japanese: "美味しかったです", english: "IT WAS DELICIOUS", category: "food", icon: "food" },
  { id: 2, romaji: "Arigato gozaimas", romajiEnd: "u", japanese: "ありがとうございます", english: "THANK YOU VERY MUCH", category: "essential", icon: "hand-ok" },
  { id: 3, romaji: "Sumimasen", romajiEnd: null, japanese: "すみません", english: "EXCUSE ME / SORRY", category: "essential", icon: "hand" },
  { id: 4, romaji: "Onegai shimasu", romajiEnd: null, japanese: "お願いします", english: "PLEASE", category: "essential", icon: "please" },
  { id: 5, romaji: "Daijoubu desu", romajiEnd: null, japanese: "大丈夫です", english: "I'M OK / NO THANKS", category: "essential", icon: "no-thanks" },
  { id: 6, romaji: "Otearai wa doko desuka", romajiEnd: "?", japanese: "お手洗いはどこですか？", english: "WHERE IS THE BATHROOM?", category: "navigation", icon: "bathroom" },
  { id: 7, romaji: "___ wa doko desuka", romajiEnd: "?", japanese: "___はどこですか？", english: "WHERE IS ___?", category: "navigation", icon: "where-is" },
  { id: 8, romaji: "Ikura desuka", romajiEnd: "?", japanese: "いくらですか？", english: "HOW MUCH IS IT?", category: "shopping", icon: "how-much" },
];

const HandOkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.2375 10.475H16.1875V13.3312H15.2375V10.475ZM15.2375 7.61875H16.1875V9.525H15.2375V7.61875ZM14.2812 13.3312H15.2375V15.2375H14.2812V13.3312ZM14.2812 6.66875H15.2375V7.61875H14.2812V6.66875ZM13.3312 15.2375H14.2812V16.1937H13.3312V15.2375ZM13.3312 9.525H15.2375V10.475H13.3312V9.525ZM13.3312 5.7125H14.2812V6.66875H13.3312V5.7125ZM12.375 17.1438H2.85625V16.1937H1.9V17.1438H0.95V20H14.2812V17.1438H13.3312V16.1937H12.375V17.1438ZM12.375 19.05H10.475V18.0938H12.375V19.05ZM12.375 10.475H13.3312V12.3812H12.375V10.475ZM12.375 8.56875H13.3312V9.525H12.375V8.56875ZM10.475 7.61875H12.375V8.56875H10.475V7.61875ZM9.51875 12.3812H12.375V13.3312H9.51875V12.3812ZM9.51875 4.7625H13.3312V5.7125H9.51875V4.7625ZM9.51875 8.56875H10.475V9.525H9.51875V8.56875ZM8.56875 9.525H9.51875V12.3812H8.56875V9.525ZM8.56875 5.7125H9.51875V6.66875H8.56875V5.7125ZM6.6625 8.56875H7.61875V7.61875H8.56875V6.66875H7.61875V0.95H6.6625V8.56875ZM5.7125 8.56875H6.6625V10.475H5.7125V8.56875ZM4.75625 0H6.6625V0.95H4.75625V0ZM3.80625 8.56875H4.75625V10.475H3.80625V8.56875ZM3.80625 0.95H4.75625V7.61875H3.80625V0.95ZM2.85625 0H3.80625V0.95H2.85625V0ZM1.9 9.525H2.85625V11.4313H1.9V9.525ZM1.9 8.56875H2.85625V0.95H1.9V2.85625H0.95V3.8125H1.9V8.56875ZM0.95 14.2875H1.9V16.1937H0.95V14.2875ZM0 3.8125H0.95V14.2875H0V3.8125Z" fill="black"/>
  </svg>
);

const HandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3_390)">
      <path d="M17.6156 4.76251H18.5719V12.3813H17.6156V4.76251ZM16.6656 12.3813H17.6156V15.2375H16.6656V12.3813ZM15.7156 17.1438H7.14063V15.2375H6.1875V17.1438H5.23438V20H17.6156V17.1438H16.6656V15.2375H15.7156V17.1438ZM15.7156 19.05H13.8125V18.0938H15.7187L15.7156 19.05ZM14.7594 8.56876H15.7156V4.76251H17.6156V3.81251H15.7156V2.85626H14.7594V8.56876Z" fill="black"/>
      <path d="M11.9031 8.56875H12.8531V2.85625H14.7594V1.90625H12.8531V0.95H11.9031V8.56875ZM10.9531 11.4313H11.9031V13.3312H10.9531V11.4313ZM9.99687 0H11.9031V0.95H9.99687V0ZM9.99687 10.475H10.9531V11.4313H9.99687V10.475ZM9.04688 8.56875H9.99687V0.95H7.14063V1.90625H9.04688V8.56875ZM7.14063 9.525H9.99687V10.475H7.14063V9.525ZM5.23438 13.3312H6.19062V15.2375H5.23438V13.3312Z" fill="black"/>
      <path d="M7.14062 9.525V1.90625H6.19062V8.56875H5.23437V9.525H7.14062ZM4.28437 12.3813H5.23437V13.3313H4.28437V12.3813ZM4.28437 7.61875H5.23437V8.56875H4.28437V7.61875ZM3.33437 11.4313H4.28437V12.3813H3.33437V11.4313ZM2.37812 6.66875H4.28437V7.61875H2.37812V6.66875ZM2.37812 10.475H3.33437V11.4313H2.37812V10.475ZM1.42812 7.61875H2.37812V10.475H1.42812V7.61875Z" fill="black"/>
    </g>
    <defs>
      <clipPath id="clip0_3_390">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const FoodIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.0438 2.85625H18.0938V1.90625H17.1375V0.95H15.2375V0H4.75625V0.95H11.425V1.90625H13.3313V2.85625H14.2813V3.8125H15.2375V8.56875H14.2813V9.525H13.3313V19.05H2.85625V20H16.1875V19.05H17.1375V18.0937H18.0938V17.1437H19.0438V8.56875H20V3.8125H19.0438V2.85625Z" fill="#202020"/>
    <path d="M9.51875 13.3312H10.475V14.2875H9.51875V13.3312ZM8.56875 11.4312H9.51875V12.3812H8.56875V11.4312ZM5.7125 14.2875H9.51875V15.2375H5.7125V14.2875ZM5.7125 11.4312H6.6625V12.3812H5.7125V11.4312ZM4.75625 13.3312H5.7125V14.2875H4.75625V13.3312ZM2.85625 0.949993L4.75625 0.95L4.75625 1.90624H2.85625V0.949993ZM1.9 9.52499H2.85625L2.85625 19.05L1.9 19.05V9.52499ZM1.9 1.90624H2.85625V2.85624H1.9V1.90624ZM0.95 8.56874H1.9V9.52499H0.95V8.56874ZM0.95 2.85624H1.9V3.81249H0.95V2.85624ZM0 3.81249H0.95V8.56874H0V3.81249Z" fill="#202020"/>
  </svg>
);

const BathroomIcon = () => (
  <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3_238)">
      <path d="M1 12H10V11H1V12ZM0 11H1V9H0V11ZM1 9H3V8H2V6H1V9ZM4 9H5V8H4V9ZM5 10H6V9H5V10ZM2 6H3V4H2V6ZM6 9H7V8H6V9ZM4 7H5V5H4V7ZM10 11H11V9H10V11ZM3 4H5V3H3V4ZM6 7H7V5H6V7ZM8 9H10V6H9V8H8V9ZM8 6H9V4H8V6ZM5 3H6V2H7V1H4V2H5V3ZM7 4H8V2H7V4Z" fill="black"/>
    </g>
    <defs>
      <clipPath id="clip0_3_238">
        <rect width="12" height="12" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const NoThanksIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.1875 0.760002V1.525H10.6625V2.285H12.1875V9.905H11.4275V10.665H12.1875V11.43H15.2375V0.760002H12.1875Z" fill="black"/>
    <path d="M9.90251 10.665H11.4275V11.43H9.90251V10.665ZM9.90251 0.76H10.6625V1.525H9.90251V0.76ZM9.14251 11.43H9.90251V12.19H9.14251V11.43ZM8.37751 12.19H9.14251V15.24H8.37751V12.19ZM6.85751 15.24H8.37751V16H6.85751V15.24ZM6.85751 9.905H7.61751V10.665H6.85751V9.905ZM6.09251 14.475H6.85751V15.24H6.09251V14.475ZM6.09251 10.665H6.85751V11.43H6.09251V10.665ZM2.28251 9.145H6.85751V9.905H2.28251V9.145ZM5.33251 11.43H6.09251V14.475H5.33251V11.43ZM3.04751 0H9.90251V0.76H3.04751V0ZM5.33251 3.05V2.285H2.28251V1.525H1.52251V3.05H5.33251ZM2.28251 0.76H3.04751V1.525H2.28251V0.76ZM1.52251 8.38H2.28251V9.145H1.52251V8.38ZM4.56751 7.62V6.855H1.52251V5.335H4.56751V4.57H1.52251V3.05H0.762512V8.38H1.52251V7.62H4.56751Z" fill="black"/>
  </svg>
);

const PleaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.43 6.855H12.19V12.19H11.43V6.855ZM10.665 13.715H3.05V12.955H2.285V13.715H1.525V16H12.19V13.715H11.43V12.19H10.665V13.715ZM10.665 15.24H9.145V14.475H10.665V15.24ZM10.665 6.095H11.43V6.855H10.665V6.095ZM9.145 6.855H9.905V9.145H9.145V6.855ZM9.145 5.335H10.665V6.095H9.145V5.335ZM6.86 6.855H7.62V9.145H6.86V6.855ZM4.57 6.855H5.335V9.145H4.57V6.855ZM4.57 5.335H9.145V4.57H5.335V0.76H4.57V5.335ZM3.05 0H4.57V0.76H3.05V0ZM2.285 9.905H3.05V0.76H2.285V6.095H1.525V6.855H2.285V9.905ZM1.525 12.19H2.285V12.955H1.525V12.19ZM0.765 10.665H1.525V12.19H0.765V10.665ZM0.765 6.855H1.525V7.62H0.765V6.855ZM0 7.62H0.765V10.665H0V7.62Z" fill="black"/>
  </svg>
);

const HowMuchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4281 3.80938H13.3344V4.75938H14.2844V5.71563H15.2406V7.62188H16.1906V12.3781H15.2406V14.2844H14.2844V15.2406H13.3344V16.1906H11.4281V17.1406H6.66562V18.0969H13.3344V17.1406H15.2406V16.1906H16.1906V15.2406H17.1469V14.2844H18.0969V12.3781H19.0469V7.62188H18.0969V5.71563H17.1469V4.75938H16.1906V3.80938H15.2406V2.85938H13.3344V1.90313H6.66562V2.85938H11.4281V3.80938Z" fill="black"/>
    <path d="M14.2844 7.62187H15.2406V12.3781H14.2844V7.62187ZM13.3344 12.3781H14.2844V13.3344H13.3344V12.3781ZM13.3344 6.66563H14.2844V7.62187H13.3344V6.66563ZM12.3844 13.3344H13.3344V14.2844H12.3844V13.3344ZM12.3844 5.71563H13.3344V6.66563H12.3844V5.71563ZM11.4281 14.2844H12.3844V15.2406H11.4281V14.2844ZM11.4281 4.75937H12.3844V5.71563H11.4281V4.75937ZM6.66564 15.2406H11.4281V16.1906H6.66564V15.2406ZM10.4781 10.4781H11.4281V12.3781H10.4781V10.4781ZM10.4781 7.62187H11.4281V8.57188H10.4781V7.62187ZM6.66564 3.80937H11.4281V4.75937H6.66564V3.80937ZM8.57189 13.3344V14.2844H9.52189V13.3344H10.4781V12.3781H9.52189V10.4781H10.4781V9.52187H9.52189V7.62187H10.4781V6.66563H9.52189V5.71563H8.57189V6.66563H7.62189V7.62187H8.57189V9.52187H7.62189V10.4781H8.57189V12.3781H7.62189V13.3344H8.57189ZM6.66564 11.4281H7.62189V12.3781H6.66564V11.4281ZM6.66564 7.62187H7.62189V9.52187H6.66564V7.62187ZM4.76564 16.1906H6.66564V17.1406H4.76564V16.1906ZM5.71564 14.2844H6.66564V15.2406H5.71564V14.2844ZM5.71564 4.75937H6.66564V5.71563H5.71564V4.75937ZM4.76564 2.85938H6.66564V3.80937H4.76564V2.85938ZM4.76564 13.3344H5.71564V14.2844H4.76564V13.3344ZM4.76564 5.71563H5.71564V6.66563H4.76564V5.71563ZM3.80939 15.2406H4.76564V16.1906H3.80939V15.2406ZM3.80939 12.3781H4.76564V13.3344H3.80939V12.3781ZM3.80939 6.66563H4.76564V7.62187H3.80939V6.66563Z" fill="black"/>
    <path d="M3.80937 3.80938H4.76562V4.75938H3.80937V3.80938ZM2.85937 14.2844H3.80937V15.2406H2.85937V14.2844ZM2.85937 7.62188H3.80937V12.3781H2.85937V7.62188ZM2.85937 4.75938H3.80937V5.71563H2.85937V4.75938ZM1.90313 12.3781H2.85937V14.2844H1.90313V12.3781ZM1.90313 5.71563H2.85937V7.62188H1.90313V5.71563ZM0.953125 7.62188H1.90313V12.3781H0.953125V7.62188Z" fill="black"/>
  </svg>
);

const WhereIsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3_240)">
      <path d="M16.1937 9.04375H14.2875V10H13.3375V11.9062H14.2875V12.8562H16.1937V11.9062H17.1438V10H16.1937V9.04375ZM18.0938 9.04375H19.05V10H18.0938V9.04375ZM17.1438 8.09375H18.0938V9.04375H17.1438V8.09375ZM13.3375 7.14375H17.1438V8.09375H13.3375V7.14375ZM12.3812 8.09375H13.3375V9.04375H12.3812V8.09375ZM11.4313 9.04375H12.3812V10H11.4313V9.04375ZM19.05 10H20V13.8062H19.05V10ZM18.0938 13.8062H19.05V15.7125H18.0938V13.8062ZM17.1438 15.7125H18.0938V17.6187H17.1438V15.7125ZM16.1937 17.6187H17.1438V18.5687H16.1937V17.6187ZM14.2875 18.5687H16.1937V19.525H14.2875V18.5687ZM13.3375 17.6187H14.2875V18.5687H13.3375V17.6187ZM12.3812 15.7125H13.3375V17.6187H12.3812V15.7125ZM11.4313 13.8062H12.3812V15.7125H11.4313V13.8062ZM10.475 18.5687H12.3812V19.525H10.475V18.5687ZM10.475 10H11.4313V13.8062H10.475V10ZM8.575 3.33125H9.525V7.14375H8.575V3.33125ZM7.61875 18.5687H9.525V19.525H7.61875V18.5687ZM7.61875 7.14375H8.575V9.04375H7.61875V7.14375ZM7.61875 2.38125H8.575V3.33125H7.61875V2.38125ZM6.66875 9.04375H7.61875V10.95H6.66875V9.04375ZM6.66875 1.425H7.61875V2.38125H6.66875V1.425ZM5.7125 10.95H6.66875V11.9062H5.7125V10.95ZM4.7625 18.5687H6.66875V19.525H4.7625V18.5687ZM5.7125 2.38125H3.8125V3.33125H2.85625V5.2375H3.8125V6.1875H5.7125V5.2375H6.66875V3.33125H5.7125V2.38125ZM3.8125 16.6687H4.7625V18.5687H3.8125V16.6687ZM3.8125 13.8062H4.7625V15.7125H3.8125V13.8062ZM3.8125 11.9062H5.7125V12.8562H3.8125V11.9062ZM2.85625 0.474998H6.66875V1.425H2.85625V0.474998ZM2.85625 10.95H3.8125V11.9062H2.85625V10.95ZM1.90625 9.04375H2.85625V10.95H1.90625V9.04375ZM1.90625 1.425H2.85625V2.38125H1.90625V1.425ZM0.95625 7.14375H1.90625V9.04375H0.95625V7.14375ZM0.95625 2.38125H1.90625V3.33125H0.95625V2.38125ZM0 3.33125H0.95625V7.14375H0V3.33125Z" fill="black"/>
    </g>
    <defs>
      <clipPath id="clip0_3_240">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const PlayIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="6" width="4" height="4" fill="#202020"/>
    <rect x="8" y="10" width="4" height="4" fill="#202020"/>
    <rect x="12" y="10" width="4" height="4" fill="#202020"/>
    <rect x="8" y="14" width="4" height="4" fill="#202020"/>
    <rect x="12" y="14" width="4" height="4" fill="#202020"/>
    <rect x="16" y="14" width="4" height="4" fill="#202020"/>
    <rect x="8" y="18" width="4" height="4" fill="#202020"/>
    <rect x="12" y="18" width="4" height="4" fill="#202020"/>
    <rect x="8" y="22" width="4" height="4" fill="#202020"/>
  </svg>
);

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

// Calls the local proxy server — keeps the Anthropic API key off the client
async function callClaude(messages, system) {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-5", max_tokens: 1000, system, messages }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "API error");
  return data.content?.[0]?.text || "";
}

function PixelWaveform({ analyzerRef, recording }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const idlePhaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const PX = 4;

    const fillPixel = (gx, gy, alpha) => {
      ctx.fillStyle = `rgba(32,32,32,${alpha ?? 1})`;
      ctx.fillRect(Math.round(cx + gx * PX - PX / 2), Math.round(cy + gy * PX - PX / 2), PX, PX);
    };

    const arms = [
      [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0]],
      [[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0],[-8,0]],
      [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8]],
      [[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7],[0,-8]],
      [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]],
      [[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6]],
      [[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6]],
      [[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6]],
      [[2,1],[4,2],[6,3],[8,4]],[[1,2],[2,4],[3,6],[4,8]],
      [[-2,1],[-4,2],[-6,3],[-8,4]],[[-1,2],[-2,4],[-3,6],[-4,8]],
      [[2,-1],[4,-2],[6,-3],[8,-4]],[[1,-2],[2,-4],[3,-6],[4,-8]],
      [[-2,-1],[-4,-2],[-6,-3],[-8,-4]],[[-1,-2],[-2,-4],[-3,-6],[-4,-8]],
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      let level = 0;
      if (analyzerRef.current && recording) {
        const data = new Uint8Array(analyzerRef.current.frequencyBinCount);
        analyzerRef.current.getByteFrequencyData(data);
        const weighted = Array.from(data.slice(0, data.length / 2));
        level = weighted.reduce((a, b) => a + b, 0) / weighted.length / 128;
      }
      idlePhaseRef.current += recording ? 0.08 : 0.03;
      const idlePulse = 0.04 + Math.sin(idlePhaseRef.current) * 0.03;
      const effectiveLevel = recording ? Math.max(level, idlePulse) : idlePulse;
      for (let dx = -1; dx <= 1; dx++)
        for (let dy = -1; dy <= 1; dy++) fillPixel(dx, dy);
      arms.forEach((arm, i) => {
        const phaseOffset = i * (Math.PI * 2 / arms.length);
        const armVariation = 0.6 + 0.4 * Math.abs(Math.sin(idlePhaseRef.current * 0.7 + phaseOffset));
        const armLevel = Math.min(effectiveLevel * armVariation * (recording ? 2.8 : 1), 1);
        const maxPixels = Math.round(armLevel * arm.length);
        for (let j = 0; j < maxPixels; j++) {
          fillPixel(arm[j][0], arm[j][1], Math.max(0.06, 1 - j / (maxPixels + 1)));
        }
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [recording]);

  return <canvas ref={canvasRef} width={240} height={240} style={{ imageRendering: "pixelated" }} />;
}

export default function JapanApp() {
  const [tab, setTab] = useState("phrases");
  const [showMicTooltip, setShowMicTooltip] = useState(false);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const micHoldTimerRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const [speaking, setSpeaking] = useState(null);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [cameraResult, setCameraResult] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [textResult, setTextResult] = useState(null);
  const [savedEntries, setSavedEntries] = useState([]);
  const [textTranslating, setTextTranslating] = useState(false);
  const [resultView, setResultView] = useState(false);
  const [resultData, setResultData] = useState(null);
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const micButtonRef = useRef(null);
  const startRecordingRef = useRef(null);
  const stopRecordingRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const btn = micButtonRef.current;
    if (!btn) return;
    const onTouchStart = (e) => { e.preventDefault(); startRecordingRef.current?.(); };
    const onTouchEnd = (e) => { e.preventDefault(); stopRecordingRef.current?.(); };
    btn.addEventListener("touchstart", onTouchStart, { passive: false });
    btn.addEventListener("touchend", onTouchEnd, { passive: false });
    return () => {
      btn.removeEventListener("touchstart", onTouchStart);
      btn.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [textInput]);

  useEffect(() => {
    if (tab === "text" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [tab]);

  const handleSpeak = (phrase) => {
    setSpeaking(phrase.id);
    speak(phrase.japanese);
    setTimeout(() => setSpeaking(null), 2000);
  };

  const startRecording = () => {
    if (recording) return;
    setRecording(true);
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    setTranslation(null);
    setTranscript("");
    const r = new SR();
    r.lang = "en-US";
    r.interimResults = false;
    r.onresult = (e) => {
      const last = e.results[e.results.length - 1];
      if (last.isFinal) { const t = last[0].transcript; setTranscript(t); doTranslate(t); }
    };
    r.onerror = r.onend = () => { setRecording(false); stopAudioAnalysis(); };
    recognitionRef.current = r;
    r.start();
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyzer = ctx.createAnalyser();
      analyzer.fftSize = 256;
      source.connect(analyzer);
      analyzerRef.current = analyzer;
    }).catch(() => {});
  };

  const stopAudioAnalysis = () => {
    audioContextRef.current?.close();
    audioContextRef.current = null;
    analyzerRef.current = null;
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setRecording(false);
    stopAudioAnalysis();
  };

  startRecordingRef.current = startRecording;
  stopRecordingRef.current = stopRecording;

  const doTranslate = async (text) => {
    setTranslating(true);
    try {
      const raw = await callClaude(
        [{ role: "user", content: `Translate to Japanese: "${text}"` }],
        `Return ONLY a JSON object: {"japanese": "...", "romaji": "...", "literal": "...or null"}. No markdown.`
      );
      const json = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setTranslation(json);
      setResultData({ original: text, japanese: json.japanese, romaji: json.romaji });
      setResultView(true);
    } catch { setTranslation({ japanese: "エラー", romaji: "Error", literal: null }); }
    setTranslating(false);
  };

  const handleTextTranslate = async () => {
    if (!textInput.trim() || textTranslating) return;
    setTextTranslating(true);
    setTextResult(null);
    const originalInput = textInput.trim();
    setTextInput("");
    try {
      const raw = await callClaude(
        [{ role: "user", content: originalInput }],
        `You are a Japanese translator. Translate the user's English text to Japanese. Respond ONLY with valid JSON: {"japanese":"...","romaji":"...","notes":"optional brief context"}`
      );
      const json = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setTextResult({ ...json, original: originalInput });
      speak(json.japanese);
    } catch { setTextResult({ japanese: "エラー", romaji: "Error", notes: "Translation failed", original: originalInput }); }
    setTextTranslating(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setCameraActive(true); setPhotoTaken(null); setCameraResult(null);
    } catch (err) {
      alert(`Camera error: ${err.name} — ${err.message}`);
    }
  };

  const stopCamera = () => { streamRef.current?.getTracks().forEach(t => t.stop()); setCameraActive(false); };

  const takePhoto = () => {
    const v = videoRef.current, c = canvasRef.current;
    if (!v || !c) return;
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    const url = c.toDataURL("image/jpeg", 0.8);
    setPhotoTaken(url); stopCamera(); analyzePhoto(url);
  };

  const analyzePhoto = async (dataUrl) => {
    setAnalyzing(true); setCameraResult(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5", max_tokens: 1000,
          system: `Return ONLY JSON: {"found_text": string|null, "translation": string, "context": string}. No markdown.`,
          messages: [{ role: "user", content: [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: dataUrl.split(",")[1] } },
            { type: "text", text: "Translate any Japanese text you see." }
          ]}]
        }),
      });
      const d = await res.json();
      setCameraResult(JSON.parse(d.content?.[0]?.text.replace(/```json|```/g, "").trim() || "{}"));
    } catch { setCameraResult({ found_text: null, translation: "Could not analyze", context: "Please try again." }); }
    setAnalyzing(false);
  };

  const filtered = filter === "all" ? PHRASES : PHRASES.filter(p => p.category === filter);

  const card = {
    border: "none", borderRadius: 8, padding: 24, background: "transparent",
    boxShadow: "inset 0 0 0 1px rgba(32,32,32,0.06), -2px 3px 1.8px 0px rgba(0,0,0,0.02)",
    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
  };
  const label = { fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(32,32,32,0.5)", letterSpacing: "-0.24px" };
  const jpText = { fontFamily: "'Noto Sans JP', monospace", fontSize: 12, color: "rgba(32,32,32,0.8)", letterSpacing: "-0.24px" };

  return (
    <div style={{ fontFamily: "'Space Mono', monospace", background: "#f5f5f5", minHeight: "100vh", maxWidth: 402, margin: "0 auto", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Manrope:wght@400;600&family=Noto+Sans+JP:wght@400&display=swap" rel="stylesheet" />
      <style>{`
        .phrase-card { transition: box-shadow 0.18s ease, transform 0.18s ease; }
        .phrase-card:hover { box-shadow: inset 0 0 0 1px rgba(32,32,32,0.10), -2px 3px 1.8px 0px rgba(0,0,0,0.04) !important; transform: translateY(-2px); }
        .phrase-card:active { transform: translateY(0px); }
        textarea.type-input { caret-color: #202020; }
        .filter-row { -ms-overflow-style: none; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .filter-row::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ─── MAIN CONTAINER — wraps everything ─── */}
      <div style={{ margin: "20px 11px 0", border: "1px solid rgba(32,32,32,0.08)", borderRadius: 8, padding: 20, display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 58 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8474C" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ fontFamily: "'Space Mono'", fontSize: 12, color: "#202020", letterSpacing: "-0.24px" }}>HONYAKU</span>
            <span style={{ border: "1px solid rgba(32,32,32,0.06)", borderRadius: 4, padding: "1px 4px", fontFamily: "'Space Mono'", fontSize: 12, color: "rgba(32,32,32,0.5)", letterSpacing: "-0.24px" }}>JAP</span>
          </div>
        </div>

        {/* ─── CONTENT AREA ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Filter tabs */}
          {tab === "phrases" && !recording && (
            <div className="filter-row" style={{ display: "flex", alignItems: "center", gap: 12, overflowX: "auto" }}>
              {["all", "essential", "food", "navigation", "shopping"].map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} style={{
                  fontFamily: "'Space Mono'", fontSize: 14, letterSpacing: "-0.28px",
                  padding: "1px 4px", border: "1px solid rgba(32,32,32,0.06)", borderRadius: 4, cursor: "pointer",
                  flexShrink: 0,
                  background: filter === cat ? "rgba(32,32,32,0.12)" : "transparent",
                  color: filter === cat ? "rgba(32,32,32,0.6)" : "rgba(32,32,32,0.5)",
                }}>{cat.toUpperCase()}</button>
              ))}
            </div>
          )}

          {/* Recording label */}
          {tab === "phrases" && recording && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Space Mono'", fontSize: 12, color: "rgba(32,32,32,0.4)", letterSpacing: "0.5px" }}>LISTENING...</span>
              <button onClick={() => setRecording(false)} style={{ fontFamily: "'Space Mono'", fontSize: 10, color: "rgba(32,32,32,0.35)", background: "transparent", border: "1px solid rgba(32,32,32,0.08)", borderRadius: 4, padding: "2px 6px", cursor: "pointer" }}>STOP</button>
            </div>
          )}

          {/* Back nav */}
          {tab !== "phrases" && (
            <div>
              <button onClick={() => { setTab("phrases"); setTextResult(null); }} style={{ fontFamily: "'Space Mono'", fontSize: 14, color: "rgba(32,32,32,0.5)", background: "transparent", border: "1px solid rgba(32,32,32,0.06)", borderRadius: 4, padding: "4px 8px", cursor: "pointer", letterSpacing: "-0.28px" }}>{"< BACK"}</button>
            </div>
          )}

          {/* ─── PHRASES LIST — cards directly, no inner wrapper ─── */}
          {tab === "phrases" && !recording && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {filtered.map(phrase => (
                <div key={phrase.id} className="phrase-card" style={{ ...card, cursor: "pointer" }} onClick={() => handleSpeak(phrase)}>
                  <div style={{ display: "flex", flex: 1, gap: 16, alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, padding: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {phrase.icon === "food" ? <FoodIcon /> : phrase.icon === "hand-ok" ? <HandOkIcon /> : phrase.icon === "please" ? <PleaseIcon /> : phrase.icon === "no-thanks" ? <NoThanksIcon /> : phrase.icon === "bathroom" ? <BathroomIcon /> : phrase.icon === "where-is" ? <WhereIsIcon /> : phrase.icon === "how-much" ? <HowMuchIcon /> : <HandIcon />}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                      <div>
                        <div style={label}>{phrase.english}</div>
                        <div>
                          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, color: "#202020", letterSpacing: "0.72px", fontWeight: 400 }}>{phrase.romaji}</span>
                          {phrase.romajiEnd && <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, color: "rgba(32,32,32,0.24)", letterSpacing: "0.72px", fontWeight: 400 }}>{phrase.romajiEnd}</span>}
                        </div>
                      </div>
                      <div style={jpText}>{phrase.japanese}</div>
                    </div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); handleSpeak(phrase); }} style={{ padding: "4px 8px", background: "none", border: "none", cursor: "pointer", flexShrink: 0, alignSelf: "stretch", display: "flex", alignItems: "center", opacity: speaking === phrase.id ? 0.4 : 1, transition: "opacity 0.2s" }}>
                    <PlayIcon />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ─── RECORDING CANVAS ─── */}
          {tab === "phrases" && recording && (
            <div style={{ height: 480, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <PixelWaveform analyzerRef={analyzerRef} recording={recording} />
            </div>
          )}

          {/* Post-recording results */}
          {tab === "phrases" && !recording && (transcript || translation || translating) && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {transcript && (
                <div style={{ ...card, flexDirection: "column", gap: 6 }}>
                  <span style={label}>YOU SAID</span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, color: "#202020" }}>{transcript}</span>
                </div>
              )}
              {translating && <div style={{ textAlign: "center", ...label, letterSpacing: 2, padding: 24 }}>TRANSLATING...</div>}
              {translation && !translating && (
                <div style={{ ...card, flexDirection: "column", gap: 10 }}>
                  <span style={label}>JAPANESE</span>
                  <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 28, color: "#202020", fontWeight: 300, lineHeight: 1.4 }}>{translation.japanese}</span>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: 12, color: "rgba(32,32,32,0.5)" }}>/{translation.romaji}/</span>
                  {translation.literal && <span style={{ fontFamily: "'Space Mono'", fontSize: 11, color: "rgba(32,32,32,0.35)", lineHeight: 1.6 }}>{translation.literal}</span>}
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <button onClick={() => speak(translation.japanese)} style={{ padding: "10px 16px", background: "#202020", border: "none", borderRadius: 6, color: "#f5f5f5", fontFamily: "'Space Mono'", fontSize: 11, letterSpacing: 1, cursor: "pointer" }}>▶ HEAR IT</button>
                    <button onClick={() => { setTranscript(""); setTranslation(null); }} style={{ padding: "10px 16px", background: "transparent", border: "1px solid rgba(32,32,32,0.12)", borderRadius: 6, color: "rgba(32,32,32,0.5)", fontFamily: "'Space Mono'", fontSize: 11, letterSpacing: 1, cursor: "pointer" }}>✕ CLEAR</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── VOICE TAB ─── */}
          {tab === "voice" && (
            <div>
              <p style={{ ...label, marginBottom: 28, lineHeight: 1.7 }}>Click the button, speak in English, then wait. Claude will translate automatically.</p>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <button
                  onClick={() => { if (!recording) startRecording(); }}
                  style={{ width: 120, height: 120, borderRadius: "50%", background: recording ? "#E8474C" : "#fff", border: `1px solid ${recording ? "#E8474C" : "rgba(32,32,32,0.06)"}`, boxShadow: recording ? "0 0 30px rgba(232,71,76,0.25)" : "-2px 3px 1.8px 0px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: recording ? "default" : "pointer", userSelect: "none", transition: "all 0.2s" }}
                >
                  <span style={{ fontFamily: "'Space Mono'", fontSize: 9, color: recording ? "#fff" : "rgba(32,32,32,0.4)", letterSpacing: 1 }}>{recording ? "LISTENING..." : "RECORD"}</span>
                </button>
                {recording && (
                  <button onClick={() => { recognitionRef.current?.abort(); setRecording(false); stopAudioAnalysis(); }} style={{ padding: "6px 16px", background: "transparent", border: "1px solid rgba(32,32,32,0.1)", borderRadius: 6, color: "rgba(32,32,32,0.4)", fontFamily: "'Space Mono'", fontSize: 10, letterSpacing: 1, cursor: "pointer" }}>
                    ✕ CANCEL
                  </button>
                )}
              </div>
              {transcript && (
                <div style={{ ...card, flexDirection: "column", gap: 6, marginBottom: 10 }}>
                  <span style={label}>YOU SAID</span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, color: "#202020" }}>{transcript}</span>
                </div>
              )}
              {translating && <div style={{ textAlign: "center", ...label, letterSpacing: 2 }}>TRANSLATING...</div>}
              {translation && !translating && (
                <div style={{ ...card, flexDirection: "column", gap: 10 }}>
                  <span style={label}>JAPANESE</span>
                  <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 28, color: "#202020", fontWeight: 300, lineHeight: 1.4 }}>{translation.japanese}</span>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: 12, color: "rgba(32,32,32,0.5)" }}>/{translation.romaji}/</span>
                  {translation.literal && <span style={{ fontFamily: "'Space Mono'", fontSize: 11, color: "rgba(32,32,32,0.35)", lineHeight: 1.6 }}>{translation.literal}</span>}
                  <button onClick={() => speak(translation.japanese)} style={{ marginTop: 4, padding: "10px 16px", background: "#202020", border: "none", borderRadius: 6, color: "#f5f5f5", fontFamily: "'Space Mono'", fontSize: 11, letterSpacing: 1, cursor: "pointer", alignSelf: "flex-start" }}>▶ HEAR IT</button>
                </div>
              )}
            </div>
          )}

          {/* ─── CAMERA TAB ─── */}
          {tab === "camera" && (
            <div>
              <p style={{ ...label, marginBottom: 20, lineHeight: 1.7 }}>Point at Japanese signs or menus for an instant translation.</p>
              {!cameraActive && !photoTaken && (
                <div onClick={startCamera} style={{ ...card, flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 40, border: "1px dashed rgba(32,32,32,0.15)", cursor: "pointer" }}>
                  <svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M34.3636 1.6V0H1.63636V1.6H0V30.4H1.63636V32H34.3636V30.4H36V1.6H34.3636ZM3.27273 3.2H13.0909V4.8H3.27273V3.2ZM26.1818 24H24.5455V27.2H21.2727V28.8H14.7273V27.2H11.4545V24H9.81818V17.6H11.4545V14.4H14.7273V12.8H21.2727V14.4H24.5455V17.6H26.1818V24ZM32.7273 9.6H3.27273V8H13.0909V6.4H14.7273V4.8H16.3636V3.2H32.7273V9.6Z" fill="black"/>
                    <path d="M22.9091 17.6V24H21.2727V25.6H14.7273V24H13.0909V17.6H14.7273V22.4H16.3636V19.2H19.6364V17.6H14.7273V16H21.2727V17.6H22.9091Z" fill="black"/>
                  </svg>
                  <span style={{ ...label, letterSpacing: 1 }}>TAP TO OPEN CAMERA</span>
                </div>
              )}
              {cameraActive && (
                <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid rgba(32,32,32,0.06)" }}>
                  <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", display: "block" }} />
                  <div style={{ display: "flex", gap: 10, padding: 12, background: "#fff" }}>
                    <button onClick={takePhoto} style={{ flex: 1, padding: 14, background: "#202020", border: "none", borderRadius: 6, color: "#f5f5f5", fontFamily: "'Space Mono'", fontSize: 12, letterSpacing: 1, cursor: "pointer" }}>📸 CAPTURE</button>
                    <button onClick={stopCamera} style={{ padding: "14px 18px", background: "transparent", border: "1px solid rgba(32,32,32,0.1)", borderRadius: 6, color: "rgba(32,32,32,0.5)", fontFamily: "'Space Mono'", fontSize: 11, cursor: "pointer" }}>CANCEL</button>
                  </div>
                </div>
              )}
              {photoTaken && (
                <div style={{ marginBottom: 12 }}>
                  <img src={photoTaken} alt="Captured" style={{ width: "100%", borderRadius: 8, display: "block", border: "1px solid rgba(32,32,32,0.06)" }} />
                  <button onClick={() => { setPhotoTaken(null); setCameraResult(null); startCamera(); }} style={{ marginTop: 8, width: "100%", padding: 12, background: "#fff", border: "1px solid rgba(32,32,32,0.06)", borderRadius: 8, fontFamily: "'Space Mono'", fontSize: 11, color: "rgba(32,32,32,0.5)", cursor: "pointer", letterSpacing: 1 }}>RETAKE</button>
                </div>
              )}
              {analyzing && <div style={{ textAlign: "center", padding: 24, ...label, letterSpacing: 2 }}>ANALYZING...</div>}
              {cameraResult && !analyzing && (
                <div style={{ ...card, flexDirection: "column", gap: 10 }}>
                  {cameraResult.found_text && (<><span style={label}>ORIGINAL</span><span style={{ fontFamily: "'Noto Sans JP'", fontSize: 20, color: "#202020" }}>{cameraResult.found_text}</span></>)}
                  <span style={label}>TRANSLATION</span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, color: "#202020", lineHeight: 1.4 }}>{cameraResult.translation}</span>
                  {cameraResult.context && <span style={{ ...label, lineHeight: 1.7 }}>💡 {cameraResult.context}</span>}
                </div>
              )}
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          )}

          {/* ─── TEXT TAB — no outer border container ─── */}
          {tab === "text" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

              {/* Input area card */}
              <div style={{ borderRadius: 8, padding: 24, boxShadow: "-2px 3px 1.8px 0px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: textResult || textTranslating ? 180 : 300 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(32,32,32,0.5)", letterSpacing: "-0.24px" }}>TYPE TO TRANSLATE</span>
                  <textarea
                    ref={textareaRef}
                    className="type-input"
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (textInput.trim() && !textTranslating) handleTextTranslate(); } }}
                    placeholder=""
                    rows={1}
                    style={{ fontFamily: "'Manrope', sans-serif", fontSize: 32, fontWeight: 400, letterSpacing: "1.28px", color: "#202020", background: "transparent", border: "none", outline: "none", resize: "none", padding: 0, margin: 0, width: "100%", lineHeight: 1.3, overflow: "hidden", minHeight: 42, display: "block" }}
                  />
                </div>
                {/* TRANSLATE button — bottom-right, only when text present and no result yet */}
                {!textResult && (
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                    {textTranslating ? (
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(32,32,32,0.4)", letterSpacing: 1 }}>TRANSLATING...</span>
                    ) : textInput.trim() ? (
                      <button
                        onClick={handleTextTranslate}
                        style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, letterSpacing: "-0.32px", padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(32,32,32,0.04)", background: "#202020", color: "#f5f5f5", cursor: "pointer" }}
                      >
                        TRANSLATE
                      </button>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Result section */}
              {textResult && !textTranslating && (
                <>
                  <div style={{ display: "flex", gap: 4, justifyContent: "flex-end", padding: "0 8px" }}>
                    <button
                      onClick={() => setTextResult(null)}
                      style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: "-0.24px", padding: "4px 8px", borderRadius: 8, cursor: "pointer", background: "transparent", border: "1px solid rgba(32,32,32,0.8)", color: "#202020" }}
                    >
                      DISCARD
                    </button>
                    <button
                      onClick={() => {
                        setSavedEntries(prev => [{ id: Date.now(), english: textResult.original, japanese: textResult.japanese, romaji: textResult.romaji }, ...prev]);
                        setTextResult(null);
                      }}
                      style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: "-0.24px", padding: "4px 8px", borderRadius: 8, cursor: "pointer", background: "#202020", border: "1px solid rgba(32,32,32,0.04)", color: "#f5f5f5" }}
                    >
                      SAVE
                    </button>
                  </div>
                  <div style={{ border: "1px solid rgba(32,32,32,0.06)", borderRadius: 8, padding: 24, boxShadow: "-2px 3px 1.8px 0px rgba(0,0,0,0.04)", display: "flex", alignItems: "stretch", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(32,32,32,0.5)", letterSpacing: "-0.24px" }}>{(textResult.original || "").toUpperCase()}</span>
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, color: "#202020", letterSpacing: "0.72px", lineHeight: 1.4 }}>{textResult.romaji}</span>
                      <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: "rgba(32,32,32,0.8)", letterSpacing: "-0.24px", lineHeight: 1.5 }}>{textResult.japanese}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", padding: "4px 8px", flexShrink: 0 }}>
                      <button onClick={() => speak(textResult.japanese)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
                        <PlayIcon />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Saved entries */}
              {savedEntries.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "14px 0 4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: "rgba(32,32,32,0.5)", letterSpacing: "-0.28px" }}>SAVED ({savedEntries.length})</span>
                    <button onClick={() => setSavedEntries([])} style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: "rgba(32,32,32,0.5)", background: "transparent", border: "none", cursor: "pointer", letterSpacing: "-0.28px" }}>CLEAR ALL</button>
                  </div>
                  {savedEntries.map(entry => (
                    <div key={entry.id} style={{ border: "1px solid rgba(32,32,32,0.06)", borderRadius: 8, padding: 24, boxShadow: "-2px 3px 1.8px 0px rgba(0,0,0,0.04)", display: "flex", alignItems: "stretch", justifyContent: "space-between", position: "relative" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(32,32,32,0.5)", letterSpacing: "-0.24px" }}>{(entry.english || "").toUpperCase()}</span>
                        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, color: "#202020", letterSpacing: "0.72px", lineHeight: 1.4 }}>{entry.romaji}</span>
                        <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 12, color: "rgba(32,32,32,0.8)", letterSpacing: "-0.24px", lineHeight: 1.5 }}>{entry.japanese}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", padding: "4px 8px", flexShrink: 0 }}>
                        <button onClick={() => speak(entry.japanese)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
                          <PlayIcon />
                        </button>
                      </div>
                      <button onClick={() => setSavedEntries(prev => prev.filter(e => e.id !== entry.id))} style={{ position: "absolute", top: 5, right: 8, background: "transparent", border: "none", fontSize: 12, color: "rgba(32,32,32,0.5)", cursor: "pointer", fontFamily: "'Space Mono', monospace", lineHeight: 1 }}>x</button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* Bottom spacer for FABs */}
          <div style={{ height: 104 }} />

        </div>
      </div>

      {/* ─── RESULT VIEW OVERLAY (voice translation) ─── */}
      {resultView && resultData && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, minHeight: "100vh", background: "#f5f5f5", zIndex: 250, fontFamily: "'Space Mono', monospace" }}>
          {/* Header */}
          <div style={{ margin: "20px 11px 0", border: "1px solid rgba(32,32,32,0.08)", borderRadius: 8, padding: 20, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8474C" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ fontFamily: "'Space Mono'", fontSize: 12, color: "#202020", letterSpacing: "-0.24px" }}>HONYAKU</span>
                <span style={{ border: "1px solid rgba(32,32,32,0.06)", borderRadius: 4, padding: "1px 4px", fontFamily: "'Space Mono'", fontSize: 12, color: "rgba(32,32,32,0.5)", letterSpacing: "-0.24px" }}>JAP</span>
              </div>
            </div>

            <button
              onClick={() => setResultView(false)}
              style={{ fontFamily: "'Space Mono'", fontSize: 14, color: "rgba(32,32,32,0.5)", background: "transparent", border: "1px solid rgba(32,32,32,0.12)", borderRadius: 4, padding: "4px 12px", cursor: "pointer", letterSpacing: "-0.28px", marginBottom: 20, alignSelf: "flex-start" }}
            >
              ← BACK
            </button>

            {/* Result card */}
            <div style={{ borderRadius: 8, padding: 24, background: "transparent", boxShadow: "-2px 3px 1.8px 0px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: 48 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(32,32,32,0.5)", letterSpacing: "-0.24px" }}>
                  "{resultData.original.toUpperCase()}"
                </span>
                <div>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 32, color: "#202020", letterSpacing: "1.28px", fontWeight: 400 }}>
                    {resultData.romaji.slice(0, -1)}
                  </span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 32, color: "rgba(32,32,32,0.24)", letterSpacing: "1.28px", fontWeight: 400 }}>
                    {resultData.romaji.slice(-1)}
                  </span>
                </div>
                <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 18, color: "rgba(32,32,32,0.8)", letterSpacing: "-0.36px" }}>
                  「{resultData.japanese}」
                </span>
              </div>
              <div>
                <button
                  onClick={() => speak(resultData.japanese)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <PlayIcon />
                </button>
              </div>
            </div>

            {/* DISCARD / SAVE */}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 12 }}>
              <button
                onClick={() => { setResultView(false); setResultData(null); }}
                style={{ fontFamily: "'Space Mono'", fontSize: 11, letterSpacing: 1, padding: "10px 20px", borderRadius: 8, cursor: "pointer", background: "transparent", border: "1px solid rgba(32,32,32,0.8)", color: "rgba(32,32,32,0.8)" }}
              >
                DISCARD
              </button>
              <button
                onClick={() => {
                  setSavedEntries(prev => [{ english: resultData.original, japanese: resultData.japanese, romaji: resultData.romaji, id: Date.now() }, ...prev]);
                  setResultView(false);
                  setResultData(null);
                }}
                style={{ fontFamily: "'Space Mono'", fontSize: 11, letterSpacing: 1, padding: "10px 20px", borderRadius: 8, cursor: "pointer", background: "#202020", border: "none", color: "#f5f5f5" }}
              >
                SAVE
              </button>
            </div>
          </div>

          {/* Mic FAB */}
          <div style={{ position: "fixed", bottom: "calc(24px + env(safe-area-inset-bottom, 0px))", right: "max(10px, calc(50vw - 201px + 10px))", zIndex: 260 }}>
            <button
              onMouseDown={() => { setResultView(false); setResultData(null); startRecording(); }}
              onTouchStart={(e) => { e.preventDefault(); setResultView(false); setResultData(null); startRecording(); }}
              style={{ width: 64, height: 64, borderRadius: 11, background: "rgba(245,245,245,0.88)", backdropFilter: "blur(8px)", border: "1px solid rgba(32,32,32,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 10, userSelect: "none", WebkitUserSelect: "none", touchAction: "none" }}
            >
              <svg width="22" height="36" viewBox="0 0 22 36" fill="none">
                <path d="M20.3111 12.0037H18.6222V3.43125H16.9222V18.855H18.6222V13.7137H20.3111V20.5763H22V10.2937H20.3111V12.0037ZM18.6222 20.5763H20.3111V22.2862H18.6222V20.5763ZM16.9222 22.2862H18.6222V24.0075H16.9222V22.2862ZM15.2333 18.855H16.9222V20.5763H15.2333V18.855ZM15.2333 1.72125H16.9222V3.43125H15.2333V1.72125ZM5.07778 24.0075V25.7175H10.1556V30.8587H5.07778V32.58H1.68889V36H20.3111V32.58H16.9222V30.8587H11.8444V25.7175H16.9222V24.0075H5.07778ZM6.76667 20.5763H15.2333V22.2862H6.76667V20.5763ZM6.76667 0H15.2333V1.72125H6.76667V0Z" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16.9688 18.8521H5.03115V3.30423H16.9688V18.8521ZM6.81453 9.13528V10.856H8.50338V9.13528H6.81453ZM13.5921 9.13528V10.856H15.281V9.13528H13.5921ZM10.2028 7.42532V9.13528H11.8917V7.42532H10.2028ZM6.81453 5.70364V7.42532H8.50338V5.70364H6.81453ZM13.5921 5.70364V7.42532H15.281V5.70364H13.5921ZM10.2028 3.72025V5.43021H11.8917V3.72025H10.2028Z" fill="black"/>
                <path d="M5.07778 18.855H6.76667L6.76667 20.5763L5.07778 20.5762V18.855ZM5.07778 1.72125L6.76667 1.72125L6.76667 3.43125H5.07778V1.72125ZM3.37778 22.2862H5.07778L5.07778 24.0075L3.37778 24.0075V22.2862ZM1.68889 20.5762H3.37778V22.2862H1.68889V20.5762ZM1.68889 13.7137H3.37778V18.855H5.07778V3.43125H3.37778V12.0037H1.68889V10.2937H0V20.5762H1.68889V13.7137Z" fill="black"/>
                <path d="M6.38802 3.30423H15.517V1.72125H6.38802V3.30423Z" fill="black"/>
                <path d="M5.55145 20.5719H15.7087V18.8523H5.55145V20.5719Z" fill="black"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ─── FABs ─── */}
      {tab === "phrases" && (
        <div style={{ position: "fixed", bottom: "calc(24px + env(safe-area-inset-bottom, 0px))", right: "max(10px, calc(50vw - 201px + 10px))", display: "flex", flexDirection: "row", gap: 10, zIndex: 200 }}>
          <button onClick={() => setTab("camera")} style={{ width: 64, height: 64, borderRadius: 11, background: "rgba(245,245,245,0.88)", backdropFilter: "blur(8px)", border: "1px solid rgba(32,32,32,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 10 }}>
            <svg width="36" height="32" viewBox="0 0 36 32" fill="none"><path d="M34.3636 1.6V0H1.63636V1.6H0V30.4H1.63636V32H34.3636V30.4H36V1.6H34.3636ZM3.27273 3.2H13.0909V4.8H3.27273V3.2ZM26.1818 24H24.5455V27.2H21.2727V28.8H14.7273V27.2H11.4545V24H9.81818V17.6H11.4545V14.4H14.7273V12.8H21.2727V14.4H24.5455V17.6H26.1818V24ZM32.7273 9.6H3.27273V8H13.0909V6.4H14.7273V4.8H16.3636V3.2H32.7273V9.6Z" fill="black"/><path d="M22.9091 17.6V24H21.2727V25.6H14.7273V24H13.0909V17.6H14.7273V22.4H16.3636V19.2H19.6364V17.6H14.7273V16H21.2727V17.6H22.9091Z" fill="black"/></svg>
          </button>
          <button onClick={() => setTab("text")} style={{ width: 64, height: 64, borderRadius: 11, background: "rgba(245,245,245,0.88)", backdropFilter: "blur(8px)", border: "1px solid rgba(32,32,32,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 10 }}>
            <svg width="36" height="32" viewBox="0 0 36 32" fill="none"><path d="M34.3633 1.59961H36V30.3994H34.3633V32H1.63574V30.3994H0V1.59961H1.63574V0H34.3633V1.59961ZM3.01953 26.7305H9.01953V20.7305H3.01953V26.7305ZM26.9805 26.7295H32.9805V20.7295H26.9805V26.7295ZM18.9932 22.2051V23.7354H20.5137V25.2549H23.5635V23.7354H25.083V22.2051H23.5635V23.7354H20.5137V22.2051H18.9932ZM3.01953 19H9.01953V13H3.01953V19ZM11.0059 19H17.0059V13H11.0059V19ZM18.9932 19H24.9932V13H18.9932V19ZM26.9805 19H32.9805V13H26.9805V19ZM3.01953 11.2695H9.01953V5.26953H3.01953V11.2695ZM11.0059 11.2695H17.0059V5.26953H11.0059V11.2695ZM18.9932 11.2695H24.9932V5.26953H18.9932V11.2695ZM26.9805 11.2695H32.9805V5.26953H26.9805V11.2695Z" fill="black"/></svg>
          </button>
          <div style={{ position: "relative" }}>
            <button
              ref={micButtonRef}
              onMouseDown={() => startRecording()}
              onMouseUp={() => stopRecording()}
              style={{ width: 64, height: 64, borderRadius: 11, background: recording ? "#202020" : "rgba(245,245,245,0.88)", backdropFilter: "blur(8px)", border: `1px solid ${recording ? "#202020" : "rgba(32,32,32,0.06)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 10, userSelect: "none", WebkitUserSelect: "none", WebkitTouchCallout: "none", touchAction: "none", transition: "background 0.15s, border-color 0.15s" }}>
              <svg width="22" height="36" viewBox="0 0 22 36" fill="none">
                <path d="M20.3111 12.0037H18.6222V3.43125H16.9222V18.855H18.6222V13.7137H20.3111V20.5763H22V10.2937H20.3111V12.0037ZM18.6222 20.5763H20.3111V22.2862H18.6222V20.5763ZM16.9222 22.2862H18.6222V24.0075H16.9222V22.2862ZM15.2333 18.855H16.9222V20.5763H15.2333V18.855ZM15.2333 1.72125H16.9222V3.43125H15.2333V1.72125ZM5.07778 24.0075V25.7175H10.1556V30.8587H5.07778V32.58H1.68889V36H20.3111V32.58H16.9222V30.8587H11.8444V25.7175H16.9222V24.0075H5.07778ZM6.76667 20.5763H15.2333V22.2862H6.76667V20.5763ZM6.76667 0H15.2333V1.72125H6.76667V0Z" fill={recording ? "#f5f5f5" : "black"}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16.9688 18.8521H5.03115V3.30423H16.9688V18.8521ZM6.81453 9.13528V10.856H8.50338V9.13528H6.81453ZM13.5921 9.13528V10.856H15.281V9.13528H13.5921ZM10.2028 7.42532V9.13528H11.8917V7.42532H10.2028ZM6.81453 5.70364V7.42532H8.50338V5.70364H6.81453ZM13.5921 5.70364V7.42532H15.281V5.70364H13.5921ZM10.2028 3.72025V5.43021H11.8917V3.72025H10.2028Z" fill={recording ? "#f5f5f5" : "black"}/>
                <path d="M5.07778 18.855H6.76667L6.76667 20.5763L5.07778 20.5762V18.855ZM5.07778 1.72125L6.76667 1.72125L6.76667 3.43125H5.07778V1.72125ZM3.37778 22.2862H5.07778L5.07778 24.0075L3.37778 24.0075V22.2862ZM1.68889 20.5762H3.37778V22.2862H1.68889V20.5762ZM1.68889 13.7137H3.37778V18.855H5.07778V3.43125H3.37778V12.0037H1.68889V10.2937H0V20.5762H1.68889V13.7137Z" fill={recording ? "#f5f5f5" : "black"}/>
                <path d="M6.38802 3.30423H15.517V1.72125H6.38802V3.30423Z" fill={recording ? "#f5f5f5" : "black"}/>
                <path d="M5.55145 20.5719H15.7087V18.8523H5.55145V20.5719Z" fill={recording ? "#f5f5f5" : "black"}/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
