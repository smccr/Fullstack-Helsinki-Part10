import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import { useParams } from 'react-router-dom';
import Text from './Text';
import theme from './theme';
import useRepository from '../hooks/useRepository';


const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  repositoryHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  repositoryDescription: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,

  },
  containerProps: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 20
  },
  bold: {
    fontWeight: 'bold'
  },
  center: {
    textAlign: 'center'
  },
  paddingY: {
    paddingTop: 5,
    paddingBottom: 5
  },
  language: {
    backgroundColor: theme.colors.primary,
    marginRight: 'auto',
    padding: 8,
    borderRadius: 5,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    marginTop: 15,
    borderRadius: 5
  },
  textWhite: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});

const RepositoryItem = (props) => {
  const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl, showButton = false } = props;
  const { id } = useParams();
  const { repository } = useRepository(id);


  return (
    <View style={styles.container}>
      <View style={styles.repositoryHeader}>
        <Image
          style={styles.avatar}
          source={{
            uri: ownerAvatarUrl || repository?.ownerAvatarUrl
          }}
        ></Image>
        <View style={styles.repositoryDescription}>
          <Text testID="fullName" style={styles.bold}>{fullName || repository?.fullName}</Text>
          <Text testID="description" style={styles.paddingY} ellipsizeMode='tail' numberOfLines={2} >{description || repository?.description}</Text>
          <Text testID="language" style={[styles.language, styles.paddingY]}>{language || repository?.language}</Text>
        </View>
      </View>
      <View style={styles.containerProps}>
        <RepositoryStat
          testID="stars"
          name="Stars"
          stat={stargazersCount || repository?.stargazersCount}
        />
        <RepositoryStat
          testID="forks"
          name="Forks"
          stat={forksCount || repository?.forksCount}
        />
        <RepositoryStat
          testID="reviews"
          name="Reviews"
          stat={reviewCount || repository?.reviewCount}
        />
        <RepositoryStat
          testID="rating"
          name="Rating"
          stat={ratingAverage || repository?.ratingAverage}
        />
      </View>
      {showButton &&
        <View style={styles.button}>
          <Pressable onPress={() => Linking.openURL(repository.url)}>
            <Text style={styles.textWhite} >Open in GitHub</Text>
          </Pressable>
        </View>
      }
    </View>
  );
};

const RepositoryStat = ({ name, stat, testID }) => {
  const formatNumber = (n) => {
    if (n >= 1000) {
      const newNumber = parseFloat((n / 1000).toFixed(1));
      const newNumberTruncated = Math.trunc(newNumber);

      if (newNumber / newNumberTruncated === 0) {
        return `${newNumberTruncated}k`;
      }
      return `${newNumber}k`;
    }
    return n;
  };

  return (
    <View>
      <Text testID={testID} style={[styles.bold, styles.center]}>{formatNumber(stat)}</Text>
      <Text>{name}</Text>
    </View>
  );
};


export default RepositoryItem;