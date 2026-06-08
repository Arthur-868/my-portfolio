const cases = {
  growth: {
    accent: "#2858d8",
    soft: "rgba(40, 88, 216, 0.08)",
    label: "Selected Case 01",
    title: "AI 内容增长助手",
    flow: "输入运营目标和平台信息，生成选题、标题、正文和风险提示，再沉淀复盘记录。",
    screens: "目标输入页、平台适配页、生成结果页、复盘记录页。",
    states: "生成中、待校对、已采纳、需重写、已复盘。"
  },
  event: {
    accent: "#087f75",
    soft: "rgba(8, 127, 117, 0.08)",
    label: "Selected Case 02",
    title: "AI 活动运营助手",
    flow: "输入地点、客群、预算和商品，生成活动玩法、引流话术、人员分工和风险清单。",
    screens: "活动信息页、方案生成页、物料清单页、现场复盘页。",
    states: "待补充、已生成、已调整、可执行、已复盘。"
  },
  brief: {
    accent: "#e16a3d",
    soft: "rgba(225, 106, 61, 0.09)",
    label: "Selected Case 03",
    title: "AI 设计需求助手",
    flow: "通过追问补全用途、受众、风格、尺寸、时间和版权边界，再输出设计 Brief。",
    screens: "需求追问页、Brief 生成页、交付清单页、风险提示页。",
    states: "信息不足、待确认、已补全、需修改、可交付。"
  }
};

const root = document.documentElement;
const selectableCards = [...document.querySelectorAll("[data-case]")];
const detail = document.querySelector("#caseDetail");
const detailLabel = document.querySelector("#detailLabel");
const detailTitle = document.querySelector("#detailTitle");
const detailFlow = document.querySelector("#detailFlow");
const detailScreens = document.querySelector("#detailScreens");
const detailStates = document.querySelector("#detailStates");

function setActiveCase(caseId) {
  const data = cases[caseId];
  if (!data) return;

  root.style.setProperty("--active", data.accent);
  root.style.setProperty("--active-soft", data.soft);

  selectableCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.case === caseId);
  });

  if (detail) {
    detail.classList.add("is-switching");
    window.setTimeout(() => detail.classList.remove("is-switching"), 160);
  }

  detailLabel.textContent = data.label;
  detailTitle.textContent = data.title;
  detailFlow.textContent = data.flow;
  detailScreens.textContent = data.screens;
  detailStates.textContent = data.states;
}

function createRipple(event) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const ripple = document.createElement("span");
  const size = Math.max(rect.width, rect.height);

  ripple.className = "ripple";
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;

  target.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

document.querySelectorAll(".button, .brand, nav a, .board-card, .case-row").forEach((element) => {
  element.addEventListener("click", createRipple);
});

selectableCards.forEach((card) => {
  card.addEventListener("click", () => setActiveCase(card.dataset.case));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveCase(card.dataset.case);
    }
  });
});

setActiveCase("growth");
