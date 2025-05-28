import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useGameLogic } from './hooks/useGameLogic';
import { StartButton } from './components/StartButton';
import { ScoreBoard } from './components/ScoreBoard';
import { ColorButton } from './components/ColorButton';

export default function App() {
  const { colors, activeColor, isPlayingSequence, isUserTurn, gameStarted, round, score, highScore, handleUserClick, startGame, setGameStarted } = useGameLogic();
  const [isRestartPressed, setIsRestartPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Genius Game</Text>

      {!gameStarted ? (
        <StartButton onPress={startGame} />
      ) : (
        <>
          <ScoreBoard round={round} score={score} highScore={highScore} />

          <View style={styles.grid}>
            {colors.map((color) => (
              <ColorButton
                key={color.name}
                color={color}
                activeColor={activeColor}
                onPress={handleUserClick}
                isDisabled={isPlayingSequence || !isUserTurn}
              />
            ))}
          </View>

          <TouchableOpacity 
            style={[
              styles.restartButton, 
              isRestartPressed && styles.restartButtonPressed
            ]}
            onPress={() => setGameStarted(false)}
            onPressIn={() => setIsRestartPressed(true)}
            onPressOut={() => setIsRestartPressed(false)}
            activeOpacity={0.9}
          >
            <Text style={[
              styles.restartText, 
              isRestartPressed && styles.restartTextPressed
            ]}>
              Sair
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}