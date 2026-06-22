
(function(){
  "use strict";

  const BOOT_LINES = [
    "LUCA-OS v1.0  (c) LEE SYSTEMS",
    "CPU: HUMAN-CORE  //  MEM: 640K CONSCIENCE AVAILABLE",
    "",
    "Initializing CRT controller......... OK",
    "Loading GODOT.SYS.................... OK",
    "Loading UNITY.SYS.................... OK",
    "Loading GDEVELOP.SYS................. OK",
    "Loading CONSTRUCT.SYS................ OK",
    "Mounting BAHIAFIGHTERS.LIB................. OK",
    "Mounting DECEPTICON.LIB................. OK",
    "Calibrating academic ambition........ OK",
    "Establishing uplink: BRAZIL <-> SOUTH KOREA ... OK",
    "",
    "Welcome, USER: LUCA_JIN_LEE_BARROS"
  ];

  const bootTextEl = document.getElementById("boot-text");
  const bootPromptEl = document.getElementById("boot-prompt");
  const bootScreenEl = document.getElementById("boot-screen");

  function typeBootSequence(){
    let lineIndex = 0;
    let charIndex = 0;
    let buffer = "";

    function tick(){
      if (lineIndex >= BOOT_LINES.length){
        bootPromptEl.classList.remove("blink-hidden");
        bootPromptEl.classList.add("blink");
        return;
      }
      const currentLine = BOOT_LINES[lineIndex];
      if (charIndex <= currentLine.length){
        bootTextEl.textContent = buffer + currentLine.slice(0, charIndex);
        charIndex++;
        setTimeout(tick, currentLine.length === 0 ? 30 : 12);
      } else {
        buffer += currentLine + "\n";
        lineIndex++;
        charIndex = 0;
        setTimeout(tick, 70);
      }
    }
    tick();
  }

  typeBootSequence();

  function bootComplete(){
    if (document.body.classList.contains("booted")) return;
    document.body.classList.add("booted");
    startBackgroundMusic();
    startAsciiTerminal();
    const aboutWin = document.getElementById("win-about");
    if (aboutWin) openWindow(aboutWin);
  }

  bootScreenEl.addEventListener("click", bootComplete);
  bootScreenEl.addEventListener("keydown", bootComplete);

  const windows = Array.from(document.querySelectorAll(".window"));
  const taskbarTasks = document.getElementById("taskbar-tasks");
  let zCounter = 10;
  const taskButtons = {};

  function isMobile(){
    return window.innerWidth <= 760;
  }

  function focusWindow(win){
    windows.forEach(w => w.classList.remove("active"));
    win.classList.add("active");
    zCounter += 1;
    win.style.zIndex = zCounter;
    Object.values(taskButtons).forEach(b => b.classList.remove("active-task"));
    if (taskButtons[win.id]) taskButtons[win.id].classList.add("active-task");
  }

  function ensureTaskButton(win){
    if (taskButtons[win.id]) return taskButtons[win.id];
    const btn = document.createElement("button");
    btn.className = "task-btn";
    btn.textContent = win.dataset.title || win.id;
    btn.addEventListener("click", () => {
      if (win.classList.contains("minimized") || win.classList.contains("active") === false){
        openWindow(win);
      } else {
        win.classList.add("minimized");
        win.classList.remove("open");
      }
    });
    taskbarTasks.appendChild(btn);
    taskButtons[win.id] = btn;
    return btn;
  }

  function openWindow(win){
    win.classList.remove("minimized");
    win.classList.add("open");
    ensureTaskButton(win);
    focusWindow(win);
    if (isMobile()){
      win.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function closeWindow(win){
    win.classList.remove("open", "minimized", "active");
    if (taskButtons[win.id]){
      taskButtons[win.id].remove();
      delete taskButtons[win.id];
    }
  }

  function minimizeWindow(win){
    win.classList.add("minimized");
    win.classList.remove("open");
  }

  document.querySelectorAll("[data-open]").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      const id = trigger.getAttribute("data-open");
      const win = document.getElementById(id);
      if (!win) return;
      openWindow(win);
      closeStartMenu();
    });
  });

  windows.forEach(win => {
    win.addEventListener("mousedown", () => focusWindow(win));
    win.addEventListener("touchstart", () => focusWindow(win), { passive:true });

    win.querySelectorAll(".tb-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === "close") closeWindow(win);
        if (action === "minimize") minimizeWindow(win);
      });
    });

    const titleBar = win.querySelector(".title-bar");
    let dragging = false, offsetX = 0, offsetY = 0;

    titleBar.addEventListener("mousedown", (e) => {
      if (isMobile()) return;
      dragging = true;
      const rect = win.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      focusWindow(win);
      e.preventDefault();
    });

    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      const desktop = document.getElementById("desktop");
      const maxX = desktop.clientWidth - 80;
      const maxY = desktop.clientHeight - 40;
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      win.style.left = newX + "px";
      win.style.top = newY + "px";
    });

    window.addEventListener("mouseup", () => { dragging = false; });
  });

  const startBtn = document.getElementById("start-btn");
  const startMenu = document.getElementById("start-menu");

  function closeStartMenu(){
    startMenu.classList.remove("open");
    startBtn.setAttribute("aria-expanded", "false");
  }
  function toggleStartMenu(){
    const willOpen = !startMenu.classList.contains("open");
    startMenu.classList.toggle("open", willOpen);
    startBtn.setAttribute("aria-expanded", String(willOpen));
  }

  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleStartMenu();
  });
  document.addEventListener("click", (e) => {
    if (!startMenu.contains(e.target) && e.target !== startBtn){
      closeStartMenu();
    }
  });

  document.getElementById("toggle-crt-btn").addEventListener("click", () => {
    document.body.classList.toggle("crt-off");
    closeStartMenu();
  });

  document.getElementById("shutdown-btn").addEventListener("click", () => {
    document.getElementById("shutdown-screen").classList.add("active");
    const audio = document.getElementById("bg-audio");
    audio.pause();
    closeStartMenu();
  });
  document.getElementById("restart-btn").addEventListener("click", () => {
    window.location.reload();
  });

  const clockEl = document.getElementById("clock");
  function pad(n){ return n.toString().padStart(2, "0"); }
  function updateClock(){
    const now = new Date();
    clockEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  const audio = document.getElementById("bg-audio");
  const musicBtn = document.getElementById("music-btn");
  const musicIcon = document.getElementById("music-icon");
  const musicLabel = document.getElementById("music-label");

  const TRACKS = {
    morning: "assets/music/morning.mp3",
    day:     "assets/music/day.mp3",
    night:   "assets/music/night.mp3"
  };

  function getPeriod(){
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return "morning";
    if (h >= 12 && h < 18) return "day";
    return "night";
  }

  let currentPeriod = null;

  function loadTrackForNow(keepPlaying){
    const period = getPeriod();
    if (period === currentPeriod) return;
    currentPeriod = period;
    const wasPlaying = keepPlaying && !audio.paused;
    audio.src = TRACKS[period];
    musicLabel.textContent = "MUSIC: " + period.toUpperCase();
    if (wasPlaying){
      audio.play().catch(() => {});
    }
  }

  function startBackgroundMusic(){
    loadTrackForNow(false);
    audio.volume = 0.55;
    audio.play().then(() => {
      musicBtn.classList.add("playing");
    }).catch(() => {
      musicBtn.classList.remove("playing");
    });
  }

  musicBtn.addEventListener("click", () => {
    if (audio.paused){
      loadTrackForNow(false);
      audio.play().then(() => musicBtn.classList.add("playing")).catch(() => {});
    } else {
      audio.pause();
      musicBtn.classList.remove("playing");
    }
  });

  const ASCII_LOGO =
"██      ██\n" +
"██      ██\n" +
"██      ██\n" +
"██      ██\n" +
"██      ██\n" +
"██      ██\n" +
"████████ ████████\n";

  const TERMINAL_COMMANDS = [
    { cmd: "whoami", out: "LUCA_JIN_LEE_BARROS  [GAME_DEV / BR-KR]" },
    { cmd: "dir /engines", out: "GODOT.EXE   UNITY.EXE   GDEVELOP.EXE   CONSTRUCT.EXE" },
    { cmd: "type influences.lib", out: "TOLKIEN.TXT\nELON_MUSK.TXT" },
    { cmd: "echo %STATUS%", out: "COMPILING_DREAMS.......... [OK]\nOPEN_TO_COLLAB............ [OK]" }
  ];

  let asciiStarted = false;

  function startAsciiTerminal(){
    if (asciiStarted) return;
    asciiStarted = true;

    const logoEl = document.getElementById("ascii-logo");
    logoEl.textContent = ASCII_LOGO;

    const outputEl = document.getElementById("terminal-output");
    let html = "";

    function typeText(text, el, onDone, speed){
      let i = 0;
      (function step(){
        if (i <= text.length){
          el.textContent = text.slice(0, i);
          i++;
          setTimeout(step, speed || 18);
        } else if (onDone){
          onDone();
        }
      })();
    }

    function runCommands(index){
      if (index >= TERMINAL_COMMANDS.length){
        setTimeout(() => {
          outputEl.textContent = "";
          runCommands(0);
        }, 4000);
        return;
      }
      const entry = TERMINAL_COMMANDS[index];
      const lineEl = document.createElement("div");
      const promptSpan = document.createElement("span");
      promptSpan.className = "prompt";
      promptSpan.textContent = "C:\\LUCA> ";
      lineEl.appendChild(promptSpan);
      const cmdSpan = document.createElement("span");
      lineEl.appendChild(cmdSpan);
      outputEl.appendChild(lineEl);

      typeText(entry.cmd, cmdSpan, () => {
        setTimeout(() => {
          const outEl = document.createElement("div");
          outEl.style.opacity = ".85";
          outputEl.appendChild(outEl);
          typeText(entry.out, outEl, () => {
            setTimeout(() => runCommands(index + 1), 900);
          }, 8);
        }, 250);
      }, 40);
    }

    runCommands(0);
  }

  window.addEventListener("resize", () => {
    if (isMobile()){
      windows.forEach(w => { w.style.left = ""; w.style.top = ""; });
    }
  });

})();
