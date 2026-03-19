## Background Music Setup

Place your downloaded audio file in THIS folder (`public/music/`).

### Supported formats
- .mp3  ← recommended (best browser support)
- .ogg
- .wav
- .m4a / .aac

### Default filename expected
The app looks for:  `public/music/background.mp3`

### Using a different filename?
If your file has a different name (e.g. `lofi-track.mp3`), open
`src/App.jsx` and add this one line inside the useEffect:

  audio.setMusicSrc('/music/lofi-track.mp3')

### Where to get free music
- https://pixabay.com/music/         (free, no attribution needed)
- https://freemusicarchive.org/
- https://www.bensound.com/
- https://soundimage.org/

Search for: "lo-fi", "chillhop", "game background", "ambient"
Download as MP3, rename to background.mp3, put it in this folder.

### That's it!
The music will loop automatically, respect the volume slider,
and resume correctly when you switch tabs.
