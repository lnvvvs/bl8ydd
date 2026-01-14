<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1245697595337164" crossorigin="anonymous"></script>
  <meta charset="UTF-8" />
  <title>bl8yd</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      overflow: hidden;
      background: #000000;
      font-family: system-ui, sans-serif;
      color: #f9fafb;
    }

    /* CANVAS - PARTICLES ON TOP */
    #introCanvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 6; /* HIGHEST - particles will go over logo */
      display: block;
    }

    /* LOGO - BELOW PARTICLES */
    #logoContainer {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 5; /* BELOW canvas particles */
      pointer-events: none;
    }

    #logo {
      width: 1080px;
      height: 880px;
      border-radius: 50%;
      object-fit: contain;
      animation: floatLogo 6s ease-in-out infinite;
    }

    @keyframes floatLogo {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-15px);
      }
    }

    #hint {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.9rem;
      color: #9ca3af;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      z-index: 4;
      opacity: 0.8;
      background: rgba(0, 0, 0, 0.3);
      padding: 8px 16px;
      border-radius: 20px;
      backdrop-filter: blur(4px);
    }

    /* GAME MENU */
    #gameMenu {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(14px);
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #f9fafb;
      z-index: 10;
      text-align: center;
    }

    #gameMenu h1 {
      font-size: clamp(2.2rem, 4vw, 3rem);
      margin-bottom: 1.5rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      background: linear-gradient(90deg, #a855f7, #ec4899);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    #gameMenu p {
      margin-bottom: 2rem;
      color: #9ca3af;
      max-width: 420px;
    }

    .menu-btn {
      padding: 0.9rem 2.2rem;
      margin: 0.4rem;
      font-size: 1rem;
      border-radius: 999px;
      border: 1px solid #4b5563;
      background: rgba(15, 23, 42, 0.7);
      color: #e5e7eb;
      cursor: pointer;
      min-width: 220px;
      transition: all 0.15s ease;
      backdrop-filter: blur(4px);
    }

    .menu-btn:hover {
      background: rgba(168, 85, 247, 0.2);
      transform: translateY(-1px);
      box-shadow: 0 10px 30px rgba(168, 85, 247, 0.3);
      border-color: #a855f7;
    }

    .menu-btn.secondary {
      opacity: 0.7;
      min-width: 160px;
    }

    /* GAME CONTAINER - REUSABLE STYLES */
    .game-container {
      position: fixed;
      inset: 0;
      z-index: 20;
      background: #000000;
      display: none;
      flex-direction: column;
      padding: 20px;
    }

    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      background: rgba(15, 23, 42, 0.8);
      border-radius: 12px;
      margin-bottom: 20px;
      border: 1px solid #334155;
      backdrop-filter: blur(4px);
    }

    .game-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #a855f7;
      letter-spacing: 0.05em;
      text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
    }

    .game-btn {
      padding: 0.6rem 1.4rem;
      margin-left: 10px;
      font-size: 0.9rem;
      border-radius: 8px;
      border: 1px solid #475569;
      background: #1e293b;
      color: #e2e8f0;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .game-btn:hover {
      background: #334155;
      transform: translateY(-2px);
    }

    .game-btn.back-btn {
      background: rgba(168, 85, 247, 0.2);
      border-color: #a855f7;
      color: #e2e8f0;
    }

    .game-btn.back-btn:hover {
      background: rgba(168, 85, 247, 0.3);
    }

    .game-frame-container {
      flex: 1;
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      border: 2px solid #334155;
      background: #000000;
    }

    .game-frame {
      width: 100%;
      height: 100%;
      border: none;
      transition: all 0.3s ease;
    }

    .game-frame.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 100;
      border: none;
      border-radius: 0;
    }
  </style>
</head>
<body>
  <!-- Intro cursor particles -->
  <canvas id="introCanvas"></canvas>

  <!-- Logo Container -->
  <div id="logoContainer">
    <img src="logo.png" alt="bl8yd Logo" id="logo">
  </div>


  <!-- Game menu -->
  <div id="gameMenu">
    <h1>bl8yd</h1>
    <p>Pick a game. Press <strong>F1</strong> anytime to return.</p>
    <button class="menu-btn" onclick="startGame('codz')">COD Zombies</button>
    <button class="menu-btn" onclick="startGame('geodash')">Geometry Dash</button>
    <button class="menu-btn secondary" onclick="closeMenu()">Back to Intro</button>
  </div>

  <!-- COD Zombies Container -->
  <div id="codz-container" class="game-container">
    <div class="game-header">
      <div class="game-title">COD Zombies</div>
      <div>
        <button class="game-btn back-btn" onclick="closeGame('codz')">← Back</button>
        <button class="game-btn" onclick="toggleFullscreen('codz')">Fullscreen</button>
      </div>
    </div>
    <div class="game-frame-container">
      <iframe id="codz-frame" class="game-frame"></iframe>
    </div>
  </div>

  <!-- Geometry Dash Container -->
  <div id="geodash-container" class="game-container">
    <div class="game-header">
      <div class="game-title">Geometry Dash</div>
      <div>
        <button class="game-btn back-btn" onclick="closeGame('geodash')">← Back</button>
        <button class="game-btn" onclick="toggleFullscreen('geodash')">Fullscreen</button>
      </div>
    </div>
    <div class="game-frame-container">
      <iframe id="geodash-frame" class="game-frame"></iframe>
    </div>
  </div>

<script>
/* ---------------------------------------------------
   GAME CONFIGURATION - EASY TO ADD NEW GAMES
--------------------------------------------------- */
const games = {
  codz: {
    title: "COD Zombies",
    container: document.getElementById('codz-container'),
    frame: document.getElementById('codz-frame'),
    url: "https://d3rtzzzsiu7gdr.cloudfront.net/files/nzp-gay/index.html",
    fullscreen: false
  },
  geodash: {
    title: "Geometry Dash",
    container: document.getElementById('geodash-container'),
    frame: document.getElementById('geodash-frame'),
    url: "https://d3rtzzzsiu7gdr.cloudfront.net/files/geodash1/game.html",
    fullscreen: false
  }
  // TO ADD NEW GAME:
  // 1. Add HTML container (copy structure above)
  // 2. Add entry here with id, title, container, frame, and url
  // 3. Add button in gameMenu HTML
  // 4. Call startGame('your-game-id')
};

/* ---------------------------------------------------
   INTRO PARTICLES
--------------------------------------------------- */
const introCanvas = document.getElementById("introCanvas");
const ictx = introCanvas.getContext("2d");
let iw, ih;

function resizeIntro() {
  iw = introCanvas.width = window.innerWidth;
  ih = introCanvas.height = window.innerHeight;
}
resizeIntro();
window.addEventListener("resize", resizeIntro);

const mouse = { x: iw/2, y: ih/2, vx: 0, vy: 0, px: iw/2, py: ih/2 };
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    this.reset();
    this.color = `rgba(${Math.floor(Math.random() * 60 + 140)}, 
                       ${Math.floor(Math.random() * 50 + 70)}, 
                       255, 
                       ${Math.random() * 0.3 + 0.1})`;
  }
  
  reset() {
    this.x = Math.random() * iw;
    this.y = Math.random() * ih;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.wave = Math.random() * Math.PI * 2;
  }
  
  update() {
    this.wave += 0.02;
    this.x += this.speedX + Math.sin(this.wave) * 0.3;
    this.y += this.speedY + Math.cos(this.wave) * 0.3;
    
    // Mouse interaction
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) {
      const angle = Math.atan2(dy, dx);
      const force = (100 - distance) / 100;
      this.x -= Math.cos(angle) * force * 2;
      this.y -= Math.sin(angle) * force * 2;
    }
    
    if (this.x < -50) this.x = iw + 50;
    if (this.x > iw + 50) this.x = -50;
    if (this.y < -50) this.y = ih + 50;
    if (this.y > ih + 50) this.y = -50;
  }
  
  draw() {
    ictx.beginPath();
    ictx.fillStyle = this.color;
    ictx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ictx.fill();
    
    // Add glow effect
    ictx.shadowColor = this.color;
    ictx.shadowBlur = 15;
    ictx.fill();
    ictx.shadowBlur = 0;
  }
}

const particles = Array.from({length: 60}, () => new Particle());

function introLoop() {
  ictx.clearRect(0, 0, iw, ih);
  
  mouse.vx = mouse.x - mouse.px;
  mouse.vy = mouse.y - mouse.py;
  mouse.px = mouse.x;
  mouse.py = mouse.y;
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  requestAnimationFrame(introLoop);
}
introLoop();

/* ---------------------------------------------------
   GAME MANAGEMENT SYSTEM
--------------------------------------------------- */
const gameMenu = document.getElementById("gameMenu");
const logo = document.getElementById("logo");
let currentGame = null;

// Keyboard controls
document.addEventListener("keydown", e => {
  // Open menu
  if ((e.key === "g" || e.key === "G") && !currentGame) {
    gameMenu.style.display = "flex";
    document.getElementById("hint").style.opacity = "0";
  }
  
  // F1 to go back
  if (e.key === "F1") {
    if (currentGame) {
      closeGame(currentGame);
    } else if (gameMenu.style.display === "flex") {
      closeMenu();
    }
  }
});

function closeMenu() {
  gameMenu.style.display = "none";
  document.getElementById("hint").style.opacity = "0.8";
}

// Start a game
function startGame(gameId) {
  if (!games[gameId]) return;
  
  currentGame = gameId;
  const game = games[gameId];
  
  // Hide menu and show game container
  gameMenu.style.display = "none";
  game.container.style.display = "flex";
  
  // Load the game
  game.frame.src = game.url;
  
  // Reset fullscreen state
  game.fullscreen = false;
  game.frame.classList.remove("fullscreen");
}

// Close a game
function closeGame(gameId) {
  if (!games[gameId]) return;
  
  const game = games[gameId];
  
  // Stop the game
  game.frame.src = "";
  
  // Hide container
  game.container.style.display = "none";
  
  // Reset state
  currentGame = null;
  document.getElementById("hint").style.opacity = "0.8";
  
  // Exit fullscreen if active
  if (game.fullscreen) {
    toggleFullscreen(gameId);
  }
}

// Toggle fullscreen for a game
function toggleFullscreen(gameId) {
  if (!games[gameId]) return;
  
  const game = games[gameId];
  const fullscreenBtn = game.container.querySelector('.game-btn:not(.back-btn)');
  
  if (!game.fullscreen) {
    // Enter fullscreen
    game.frame.classList.add("fullscreen");
    fullscreenBtn.textContent = "Exit Fullscreen";
    game.fullscreen = true;
  } else {
    // Exit fullscreen
    game.frame.classList.remove("fullscreen");
    fullscreenBtn.textContent = "Fullscreen";
    game.fullscreen = false;
  }
}
</script>
</body>
</html>
