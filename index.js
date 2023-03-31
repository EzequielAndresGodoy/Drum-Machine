const audioClips = [
  {
    id: 1,
    keyCode: 81,
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    id: 2,
    keyCode: 87,
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    id: 3,
    keyCode: 69,
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    id: 4,
    keyCode: 65,
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    id: 5,
    keyCode: 83,
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    id: 6,
    keyCode: 68,
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    id: 7,
    keyCode: 90,
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    id: 8,
    keyCode: 88,
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    id: 9,
    keyCode: 67,
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  const [volume, setVolume] = React.useState(0.5);
  const [recording, setRecording] = React.useState("");

  const playRecording = () => {
    let recordArrary = recording.split(" ")
    let index = 0;
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArrary[index]);
      console.log(audioTag)
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, 200);
    setTimeout(
      () => clearInterval(interval), 200 * recordArrary.length - 1
    );
  };


  return (
    <div id="drum-machine" className="bg-info min-vh-100 text-white container-body ">
      <div id="display" className="text-center">
        <h2>Drum Machine</h2>
        {audioClips.map((clip) => (
          <Pad
            
            key={clip.id}
            clip={clip}
            volume={volume}
            setRecording={setRecording}
          />
        ))}
        <br />
        <h3 className="mt-3">Volumen</h3>
        <input
          type="range"
          onChange={(e) => setVolume(e.target.value)}
          step="0.01"
          value={volume}
          max="1"
          min="0"
          className="w-50"
        />
        <h3 className="mt-3">Grabacion</h3>
        <h3 className="mb-3">{recording}</h3>
        {
          recording && 
          <>
            <button onClick={playRecording} className="btn btn-success">play</button>
            <button onClick={() => setRecording("")} className="btn btn-danger">clear</button>
          </>
        }
      </div>
    </div>
  );
}

function Pad({ clip, volume, setRecording }) {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 100);
    console.log(audioTag.volume)
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording((prev) => prev + clip.keyTrigger + " ");
  };

  return (
    <div
      onClick={playSound}
      className={`drum-pad btn btn-secondary p-4 m-3 ${active && "btn-warning"}`}
      id={clip.id}
    >
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
