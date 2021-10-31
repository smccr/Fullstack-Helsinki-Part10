import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './repository/RepositoryList';
import SingleRepository from './repository/SingleRepository';
import ReviewForm from './repository/ReviewForm';
import SignIn from './auth/SignIn';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/createReview" exact>
          <ReviewForm />
        </Route>
        <Route path="/:id">
          <SingleRepository />
        </Route>
        
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;