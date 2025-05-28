import { useCallback, useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { Alert, Vibration } from 'react-native';

const colors = [
  { name: 'red', sound: require('../assets/red.mp3'), highlight: '#ff6b6b' },
  { name: 'green', sound: require('../assets/green.mp3'), highlight: '#51cf66' },
  { name: 'blue', sound: require('../assets/blue.mp3'), highlight: '#339af0' },
  { name: 'yellow', sound: require('../assets/yellow.mp3'), highlight: '#ffd43b' }
];

const GAME_SPEED = 1000;

export function useGameLogic() {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [round, setRound] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [soundObjects, setSoundObjects] = useState({});

  useEffect(() => {
    const loadSounds = async () => {
      const sounds = {};
      for (const color of colors) {
        try {
          const { sound } = await Audio.Sound.createAsync(color.sound);
          sounds[color.name] = sound;
        } catch (err) {
          console.log(`Erro ao carregar som ${color.name}:`, err);
        }
      }
      setSoundObjects(sounds);
    };

    loadSounds();

    return () => {
      Object.values(soundObjects).forEach(sound => {
        if (sound?.unloadAsync) sound.unloadAsync();
      });
    };
  }, []);

  const playSound = useCallback(async (color) => {
    const sound = soundObjects[color.name];
    if (sound?.replayAsync && sound._loaded) {
      try {
        await sound.replayAsync();
      } catch (err) {
        console.log("Erro ao tocar som:", err);
      }
    }
  }, [soundObjects]);

  const lightUp = useCallback(async (color) => {
    setActiveColor(color.name);
    await playSound(color);
    Vibration.vibrate(100);
    setTimeout(() => setActiveColor(null), 300);
  }, [playSound]);

  const showSequence = useCallback(async (seq) => {
    setIsUserTurn(false);
    setIsPlayingSequence(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => {
        setTimeout(() => {
          lightUp(seq[i]);
          resolve();
        }, GAME_SPEED / 2);
      });
      await new Promise(resolve => setTimeout(resolve, GAME_SPEED / 2));
    }
    setIsPlayingSequence(false);
    setIsUserTurn(true);
  }, [lightUp]);

  const nextRound = useCallback(() => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence(prev => {
      const updated = [...prev, newColor];
      setUserInput([]);
      setRound(updated.length);
      setScore(prevScore => prevScore + updated.length * 10);
      setTimeout(() => showSequence(updated), 500);
      return updated;
    });
  }, [showSequence]);

  const handleUserClick = useCallback((color) => {
    if (!isUserTurn || isPlayingSequence) return;

    const newInput = [...userInput, color];
    setUserInput(newInput);
    playSound(color);

    const currentStep = newInput.length - 1;

    if (sequence[currentStep] !== color) {
      const finalScore = score;
      Alert.alert('Game Over!', `Score: ${finalScore}\nRecorde: ${Math.max(highScore, finalScore)}`, [
        { text: 'Tentar novamente', onPress: startGame }
      ]);
      if (finalScore > highScore) setHighScore(finalScore);
      return;
    }

    if (newInput.length === sequence.length) {
      setIsUserTurn(false);
      setTimeout(() => nextRound(), 1000);
    }
  }, [isUserTurn, isPlayingSequence, userInput, sequence, score, highScore, playSound, nextRound]);

  const startGame = useCallback(() => {
    const firstColor = colors[Math.floor(Math.random() * colors.length)];
    const initialSequence = [firstColor];
    setGameStarted(true);
    setSequence(initialSequence);
    setUserInput([]);
    setRound(1);
    setScore(10);
    setTimeout(() => showSequence(initialSequence), 600);
  }, [showSequence]);

  return {
    colors,
    activeColor,
    isPlayingSequence,
    isUserTurn,
    gameStarted,
    round,
    score,
    highScore,
    handleUserClick,
    startGame,
    setGameStarted
  };
}
