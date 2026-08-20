const SCRATCH_USER = "KuRastars_";
const SCRATCH_PROFILE_URL = `https://scratch.mit.edu/users/${SCRATCH_USER}/`;
const PROFILE_AVATAR_URL =
  "https://cdn2.scratch.mit.edu/get_image/user/156358210_90x90.png?v=";

const projectGrid = document.querySelector("#project-grid");
const profileAvatar = document.querySelector("#profile-avatar");
const avatarFallback = document.querySelector("#avatar-fallback");
const helloButton = document.querySelector("#hello-button");
const botSpeech = document.querySelector("#bot-speech");
const toast = document.querySelector("#toast");

const fallbackProjects = [
  {
    id: 1190899728,
    title: "集中タイマー(勉強用) v1.8 - サイバー版",
    label: "PICK UP",
    symbol: "◴",
    thumbnail_url:
      "https://cdn2.scratch.mit.edu/get_image/project/1190899728_480x360.png",
    stats: { views: 62, loves: 15 },
  },
  {
    id: 1186174381,
    title: "オンライン広場〔最高傑作〕",
    label: "PICK UP",
    symbol: "◎",
    thumbnail_url:
      "https://cdn2.scratch.mit.edu/get_image/project/1186174381_480x360.png",
    stats: { views: 50, loves: 6 },
  },
  {
    id: 1320401153,
    title: "ローレンツ方程式",
    label: "PICK UP",
    symbol: "∞",
    thumbnail_url:
      "https://cdn2.scratch.mit.edu/get_image/project/1320401153_480x360.png",
    stats: { views: 8, loves: 4 },
  },
];

function formatNumber(value) {
  const number = Number(value || 0);
  if (number >= 10000) return `${Math.floor(number / 1000) / 10}k`;
  return new Intl.NumberFormat("ja-JP").format(number);
}

function makeProjectCard(project, index, fallback = false) {
  const article = document.createElement("article");
  article.className = "project-card";

  const link = document.createElement("a");
  link.className = "project-link";
  link.href = project.id
    ? `https://scratch.mit.edu/projects/${project.id}/`
    : SCRATCH_PROFILE_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `${project.title} をScratchで開く`);

  const imageWrap = document.createElement("div");
  imageWrap.className = "project-image-wrap";

  const fallbackArt = document.createElement("div");
  fallbackArt.className = "project-fallback-art";
  fallbackArt.textContent = fallback ? project.symbol : "✦";
  imageWrap.append(fallbackArt);

  if (project.thumbnail_url) {
    const image = document.createElement("img");
    image.className = "project-image";
    image.src = project.thumbnail_url;
    image.alt = `${project.title} のサムネイル`;
    image.loading = index > 1 ? "lazy" : "eager";
    image.addEventListener("load", () => fallbackArt.remove());
    image.addEventListener("error", () => image.remove());
    imageWrap.append(image);
  }

  const play = document.createElement("span");
  play.className = "project-play";
  play.setAttribute("aria-hidden", "true");
  play.textContent = "▶";
  imageWrap.append(play);

  const content = document.createElement("div");
  content.className = "project-content";
  const title = document.createElement("h3");
  title.className = "project-title";
  title.textContent = project.title;

  const meta = document.createElement("div");
  meta.className = "project-meta";
  const label = document.createElement("span");
  label.className = "project-label";
  label.textContent = fallback ? project.label : "NEW DROP";
  meta.append(label);

  if (project.stats) {
    const stats = document.createElement("span");
    stats.className = "project-stats";
  }
}
