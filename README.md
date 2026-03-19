# ✦ Tic Tac Toe

A modern, polished **2-player Tic Tac Toe** game built with **React 18 + Tailwind CSS**.
Features a dark neon UI, emoji reactions, animated confetti, background music support, and full SFX.

![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.3-38bdf8?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646cff?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📋 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Background Music Setup](#-background-music-setup)
- [Available Scripts](#-available-scripts)
- [How to Play](#-how-to-play)
- [Emoji Reactions](#-emoji-reactions)
- [Credits](#-credits)

---

## ✨ Features

### 🎮 Gameplay
- 2-player local match (Player X vs Player O)
- Win detection across all 8 patterns (rows, columns, diagonals)
- Draw detection when board is full
- Persistent scoreboard across rounds
- **Next Round** (keeps score) and **Reset All** (clears everything)

### 🎨 UI & Design
- Dark neon theme with animated gradient background
- Floating ambient particles
- Player cards with active glow effect
- Live turn indicator pill with pulsing dot
- Winner cells glow and pulse with colour-matched light
- Status banner with bounce animation on win/draw
- 🎉 Confetti burst on every win (colour-matched to winner)
- Screen transition animations between all pages
- Fully responsive — works on mobile, tablet, and desktop

### 😄 Emoji Reaction System
- Each player has a live emoji that updates in real-time
- 7 distinct states: 😐 Neutral · 😊 Happy · 😎 Confident · 😡 Angry · 🥳 Winner · 😭 Loser · 😤 Draw
- Each emoji change triggers a unique sound effect

### 🎵 Sound
- **Background music** — plays your own downloaded audio file (MP3/OGG/WAV)
- **SFX** via Web Audio API — cell click, win fanfare, draw, and 6 emoji sounds
- Music resumes automatically when you switch back to the tab
- Independent volume slider for music
- SFX and Confetti can be toggled separately in Settings

### 📱 Screens
| Screen | Description |
|--------|-------------|
| 🏠 Home | Main menu with 4 options + music quick-toggle |
| 🎮 Game | Full game board with player cards and scoreboard |
| 📖 How to Play | Rules, step-by-step guide, emoji key, strategy tip |
| ⚙️ Settings | Music, SFX, Confetti toggles + volume slider |
| 🏅 Credits | Developer card with Instagram & GitHub links |

---

## 📸 Screenshots

> The game features a dark neon aesthetic with glowing X (red) and O (teal) marks,
> animated player cards, and a polished home menu.

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| Tailwind CSS | 3.4.3 | Utility-first styling |
| Vite | 5.2.0 | Build tool & dev server |
| @vitejs/plugin-react-swc | 3.5.0 | Fast React transforms (SWC) |
| Web Audio API | Browser native | SFX & emoji sounds |
| HTML5 Audio | Browser native | Background music playback |

---

## 📁 Project Structure

```
tictactoe/
├── public/
│   └── music/
│       └── background.mp3      ← 🎵 Place your music file here
│
├── src/
│   ├── main.jsx                ← React entry point
│   ├── App.jsx                 ← Root component, routing & global state
│   ├── audio.js                ← AudioEngine (music + SFX singleton)
│   ├── constants.js            ← WIN_PATTERNS, SCREENS enum
│   ├── index.css               ← Tailwind directives + keyframe animations
│   │
│   ├── hooks/
│   │   └── useGame.js          ← Game logic hook (board, scores, winner, emojis)
│   │
│   └── components/
│       ├── HomeScreen.jsx      ← Main menu
│       ├── GameScreen.jsx      ← Game board UI
│       ├── HowScreen.jsx       ← Rules & guide
│       ├── SettingsScreen.jsx  ← Settings panel
│       ├── CreditsScreen.jsx   ← Credits with social links
│       ├── PlayerCard.jsx      ← Player emoji/score card
│       ├── Cell.jsx            ← Single board cell with animations
│       ├── Confetti.jsx        ← Win confetti burst
│       ├── Particles.jsx       ← Background floating particles
│       ├── Toggle.jsx          ← Reusable on/off switch
│       ├── MusicBars.jsx       ← Animated equalizer bars indicator
│       └── PanelHeader.jsx     ← Shared back-button header
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16 or higher
- **npm** v7 or higher

Check your versions:
```bash
node --version
npm --version
```

### Installation

**1. Clone or extract the project**
```bash
# If you downloaded the zip, extract it first, then:
cd tictactoe
```

**2. Install dependencies**
```bash
npm install
```

**3. Add your background music** *(optional but recommended)*

See [Background Music Setup](#-background-music-setup) below.

**4. Start the development server**
```bash
npm run dev
```

**5. Open in browser**
```
http://localhost:3000
```

---

## 🎵 Background Music Setup

The game uses a real audio file for background music — no more synthesised crackling!

### Step 1 — Download a free track
Get a royalty-free lo-fi or ambient track from:

| Site | Notes |
|------|-------|
| [pixabay.com/music](https://pixabay.com/music/) | ✅ Free, no sign-up, no attribution needed |
| [freemusicarchive.org](https://freemusicarchive.org/) | ✅ Free, check license per track |
| [bensound.com](https://www.bensound.com/) | ✅ Free with attribution |
| [soundimage.org](https://soundimage.org/) | ✅ Free for games |

**Search for:** `lo-fi` · `chillhop` · `game ambient` · `background loop`

### Step 2 — Place the file
Rename your downloaded file to `background.mp3` and place it here:

```
tictactoe/
└── public/
    └── music/
        └── background.mp3   ← here
```

### Step 3 — Done!
The music will loop automatically, respect the volume slider in Settings,
and resume correctly when you switch tabs.

### Using a different filename?
If your file has a different name (e.g. `lofi-chill.mp3`), open `src/App.jsx`
and add one line inside the `useEffect`:

```jsx
useEffect(() => {
  audio.setMusicSrc('/music/lofi-chill.mp3')  // ← add this line
  return () => audio.stop()
}, [])
```

### Supported formats
`.mp3` · `.ogg` · `.wav` · `.m4a` · `.aac`

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:3000` |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## 🎮 How to Play

1. **Player X always goes first** — click any empty cell to place your mark
2. **Players alternate turns** — X then O, back and forth
3. **Win by connecting 3** in a row, column, or diagonal
4. **The winning cells glow** and confetti flies!
5. **Draw** if all 9 cells fill with no winner
6. Use **Next Round** to play again (keeps the score)
7. Use **Reset All** to clear scores and start fresh

### Strategy Tip
> The **center cell** is the strongest position — always try to take it first.
> Corners are second best. Always block your opponent when they have 2 in a row!

---

## 😄 Emoji Reactions

Each player's emoji updates in real-time based on the game state:

| Emoji | State | Trigger |
|-------|-------|---------|
| 😐 | Neutral | Game just started / new round |
| 😊 | Happy | Placed a mark |
| 😎 | Confident | Has 2 in a row |
| 😡 | Angry | Just got blocked by opponent |
| 🥳 | Winner | Won the round |
| 😭 | Loser | Opponent won the round |
| 😤 | Stubborn | Game ended in a draw |

Each emoji change also plays a unique sound effect.

---

## 👨‍💻 Credits

**Shah Hamdan** — Game Designer & Developer

- Original game built with pure HTML, CSS & JavaScript
- Redesigned in React + Tailwind CSS with full UI overhaul

**Connect:**
- 📸 Instagram: [@shah.hamdan_](https://instagram.com/shah.hamdan_)
- 💻 GitHub: [github.com/shahhamdan](https://github.com/shahhamdan)

**Enhanced UI** — Claude AI ✦

**Fonts** — [Syne](https://fonts.google.com/specimen/Syne) & [Space Mono](https://fonts.google.com/specimen/Space+Mono) via Google Fonts

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by Shah Hamdan
</div>
