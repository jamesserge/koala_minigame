import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const initialHealth = 'Health: 4';

const App = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [playerHealth, setPlayerHealth] = useState(4);
  const [computerHealth, setComputerHealth] = useState(4);
  const [gameStarted, setGameStarted] = useState(false);

  const choices = [
    { name: 'rock', text: 'rock' },
    { name: 'paper', text: 'paper' },
    { name: 'scissors', text: 'scissors' },
  ];

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex].text;
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      return "It's a tie!";
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'You win!';
    } else {
      return 'Enemy wins!';
    }
  };

  const playGame = (choice) => {
    if (playerHealth <= 0 || computerHealth <= 0) {
      return;
    }
  
    const computerChoice = generateComputerChoice();
    const newResult = determineWinner(choice, computerChoice);
  
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setResult(newResult);
  
    setPlayerHealth((prevPlayerHealth) => {
      if (newResult === 'Enemy wins!') {
        return prevPlayerHealth - 1;
      }
      return prevPlayerHealth;
    });
  
    setComputerHealth((prevComputerHealth) => {
      if (newResult === 'You win!') {
        return prevComputerHealth - 1;
      }
      return prevComputerHealth;
    });

    console.log('Player:', choice);
  console.log('Computer:', computerChoice);
  console.log('Result:', newResult);
  };

  useEffect(() => {
    if (playerHealth <= 0 || computerHealth <= 0) {
      setResult(playerHealth === 0 ? 'Enemy wins!' : 'You win!');
    }
  }, [playerHealth, computerHealth]);

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setPlayerHealth(4);
    setComputerHealth(4);
    setResult('');
    setGameStarted(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.computerChoice}>
          <Text style={styles.computerChoiceText}>🐨</Text>
                      {computerChoice !== '' && (
    <Text style={styles.computerChoiceText}>
      {computerChoice === 'rock' ? '✊' : computerChoice === 'paper' ? '✋' : '✌'}
    </Text>
  )}
</View>
      {!gameStarted ? (
        <View style={styles.titleScreen}>
          <Text style={styles.title}>Rock Paper James!</Text>
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={[styles.startButtonText, { color: '#333' }]}>
              Start Game
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.gameScreen}>
          <Text style={styles.result}>{result}</Text>
          <View style={styles.healthBars}>
  <Text style={styles.healthText}>
    {playerHealth <= 0 ? 'YOU 💀' : `You      ${'❤️'.repeat(playerHealth)}`}
  </Text>
</View>
<View style={styles.healthBars}>
  <Text style={styles.healthText}>
    {computerHealth <= 0 ? 'Enemy 💀' : `Enemy ${'❤️'.repeat(computerHealth)}`}
  </Text>
</View>
          {playerHealth <= 0 || computerHealth <= 0 ? (
            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
              <Text style={styles.resetButtonText}>Reset Game</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.choices}>
          {choices.map((choice) => (
            <TouchableOpacity
              key={choice.name}
              style={styles.choiceButton}
              onPress={() => playGame(choice.name)}
            >
              <Text style={styles.choiceText}>
                {choice.name === 'rock' ? '✊' : null}
                {choice.name === 'paper' ? '✌' : null}
                {choice.name === 'scissors' ? '✋' : null}
              </Text>
            </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 140, 0)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  result: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  choiceButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  choiceText: {
    fontSize: 18,
  },
  healthBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  healthText: {
    fontSize: 16,
  },
  computerChoice: {
    marginBottom: 10,
    alignItems: 'center',
  },
  computerChoiceText: {
    fontSize: 72,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  startButtonText: {
    fontSize: 18,
  },
});

export default App;
