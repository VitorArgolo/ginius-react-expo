import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#f0f0f0',
    fontSize: 36,
    marginBottom: 25,
    fontWeight: '800',
    textShadowColor: 'rgba(255,255,255,0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  scoreContainer: {
    marginBottom: 25,
    alignItems: 'center',
    backgroundColor: 'rgba(50,50,50,0.3)',
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  score: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
    fontWeight: '600',
  },
  grid: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 25,
    borderRadius: 150,
    overflow: 'hidden',
    borderWidth: 6,
    borderColor: '#2a2a2a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    width: '50%',
    height: '50%',
  },
  startButton: {
    backgroundColor: '#4a4a4a',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  startButtonPressed: { // Novo estilo para estado pressionado
    backgroundColor: '#3a3a3a',
    transform: [{ scale: 0.98 }], // Efeito de "afundar" levemente
    shadowOffset: { width: 0, height: 1 }, // Sombra menor quando pressionado
  },
  startText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  startTextPressed: { // Novo estilo para texto quando pressionado
    color: '#f0f0f0',
  },
  restartButton: {
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  restartButtonPressed: { // Novo estilo para estado pressionado
    backgroundColor: '#2a2a2a',
    transform: [{ scale: 0.98 }],
  },
  restartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  restartTextPressed: { // Novo estilo para texto quando pressionado
    color: '#f0f0f0',
  },
});