import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
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
  const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network'
  });

  const authStorage = useAuthStorage();

  const apolloClient = useApolloClient();

  let user;
  if (!loading) {
    user = data.authorizedUser;
  }

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable>
          {!user ?
            <Link to="/signin">
              <Text style={styles.text}>Sign in</Text>
            </Link>
            :
            <Link onPress={() => signOut()}>
              <Text style={styles.text}>Sign out</Text>
            </Link>
          }

        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;