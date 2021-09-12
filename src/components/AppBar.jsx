import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    paddingLeft: 15,
    paddingBottom: 20
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
      </Pressable>
      <Pressable>
        <Link to="/signin">
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBar;