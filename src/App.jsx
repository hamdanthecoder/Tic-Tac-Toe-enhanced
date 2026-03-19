import { useState, useCallback, useEffect } from 'react'
import { SCREENS, MODES, DIFFICULTY } from './constants'
import { audio } from './audio'

import Particles        from './components/Particles'
import HomeScreen       from './components/HomeScreen'
import ModeSelectScreen from './components/ModeSelectScreen'
import GameScreen       from './components/GameScreen'
import HowScreen        from './components/HowScreen'
import SettingsScreen   from './components/SettingsScreen'
import CreditsScreen    from './components/CreditsScreen'

export default function App() {
  const [screen,     setScreen]    = useState(SCREENS.HOME)
  const [gameMode,   setGameMode]  = useState(MODES.PVP)
  const [difficulty, setDiff]      = useState(DIFFICULTY.MEDIUM)
  const [musicOn,    setMusicOn]   = useState(false)
  const [sfxOn,      setSfxOn]     = useState(true)
  const [confOn,     setConfOn]    = useState(true)
  const [volume,     setVolume]    = useState(0.45)

  const navigate = useCallback((to)   => setScreen(to),        [])
  const goHome   = useCallback(()     => setScreen(SCREENS.HOME), [])

  // Called from ModeSelectScreen with chosen mode + difficulty
  const startGame = useCallback((mode, diff) => {
    setGameMode(mode)
    setDiff(diff || DIFFICULTY.MEDIUM)
    setScreen(SCREENS.GAME)
  }, [])

  const handleMusicToggle = useCallback((on) => {
    setMusicOn(on)
    if (on) audio.start(); else audio.stop()
  }, [])

  const handleVolume = useCallback((v) => {
    setVolume(v); audio.setVolume(v)
  }, [])

  const handleSfxToggle = useCallback((v) => {
    setSfxOn(v); audio.sfxEnabled = v
  }, [])

  useEffect(() => () => audio.stop(), [])

  const shared = { musicOn, onMusicToggle: handleMusicToggle, sfxOn, confOn }

  const renderScreen = () => {
    switch (screen) {
      case SCREENS.HOME:
        return <HomeScreen {...shared} onNavigate={navigate} />

      case SCREENS.MODE_SELECT:
        return <ModeSelectScreen onBack={goHome} onStartGame={startGame} />

      case SCREENS.GAME:
        return (
          <GameScreen
            {...shared}
            onBack={() => setScreen(SCREENS.MODE_SELECT)}
            mode={gameMode}
            difficulty={difficulty}
          />
        )

      case SCREENS.HOW:
        return <HowScreen onBack={goHome} />

      case SCREENS.SETTINGS:
        return (
          <SettingsScreen
            onBack={goHome}
            musicOn={musicOn}  onMusicToggle={handleMusicToggle}
            sfxOn={sfxOn}      onSfxToggle={handleSfxToggle}
            confOn={confOn}    onConfettiToggle={setConfOn}
            volume={volume}    onVolume={handleVolume}
          />
        )

      case SCREENS.CREDITS:
        return <CreditsScreen onBack={goHome} />

      default:
        return null
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-0"
        style={{
          background: '#0a0a0f',
          backgroundImage: `
            radial-gradient(ellipse 60% 50% at 10% 20%, rgba(255,107,107,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 80%, rgba(78,205,196,0.07)  0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 50% 50%, rgba(247,201,72,0.03)  0%, transparent 70%)
          `,
        }}
      />
      <Particles />
      <div
        key={screen}
        className="relative z-10 w-full min-h-screen"
        style={{ animation: 'screenIn 0.38s cubic-bezier(0.4,0,0.2,1) both' }}
      >
        {renderScreen()}
      </div>
    </>
  )
}
