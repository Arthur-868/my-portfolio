const scenes = [
  {
    word: "Design",
    paper: "#f7f7f5",
    ink: "#1229e8",
    shapes: ["#a7d778", "#5fc0c3", "#6fc9c7", "#76d48e"],
  },
  {
    word: "Imagine",
    paper: "#f59f74",
    ink: "#fff8df",
    shapes: ["#7f5bc7", "#2346c7", "#ffd34e", "#eb5c90"],
  },
  {
    word: "Create",
    paper: "#ffd34e",
    ink: "#163c98",
    shapes: ["#f06449", "#65b3a7", "#f7efe2", "#5d72d8"],
  },
  {
    word: "Play",
    paper: "#7556c8",
    ink: "#f9e966",
    shapes: ["#ef6b5f", "#6fd5cf", "#f3a1bb", "#233fb5"],
  },
];

const root = document.documentElement;
const experience = document.querySelector(".experience");
const button = document.querySelector(".word");
const label = document.querySelector(".word__label");

let sceneIndex = 0;
let transitioning = false;

function setScene(scene) {
  root.style.setProperty("--paper", scene.paper);
  root.style.setProperty("--ink", scene.ink);
  root.style.setProperty("--top-left", scene.shapes[0]);
  root.style.setProperty("--top-right", scene.shapes[1]);
  root.style.setProperty("--bottom-left", scene.shapes[2]);
  root.style.setProperty("--bottom-right", scene.shapes[3]);
  document.querySelector('meta[name="theme-color"]').content = scene.paper;
  label.textContent = scene.word;
}

function advance() {
  if (transitioning) return;

  transitioning = true;
  const nextIndex = (sceneIndex + 1) % scenes.length;
  const nextScene = scenes[nextIndex];
  root.style.setProperty("--next", nextScene.paper);
  experience.classList.add("is-transitioning");

  window.setTimeout(() => {
    sceneIndex = nextIndex;
    setScene(nextScene);
    experience.classList.remove("is-transitioning");
    transitioning = false;
  }, 780);
}

button.addEventListener("click", advance);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    advance();
  }
});
