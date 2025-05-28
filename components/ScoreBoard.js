import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

export const ScoreBoard = ({ round, score, highScore }) => (
  <View style={styles.scoreContainer}>
    <Text style={styles.score}>Rodada: {round}</Text>
    <Text style={styles.score}>Score: {score}</Text>
    <Text style={styles.score}>Recorde: {highScore}</Text>
  </View>
);
