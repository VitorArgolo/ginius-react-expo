import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles';

export const StartButton = ({ onPress }) => (
  <TouchableOpacity style={styles.startButton} onPress={onPress}>
    <Text style={styles.startText}>Iniciar Jogo</Text>
  </TouchableOpacity>
);
