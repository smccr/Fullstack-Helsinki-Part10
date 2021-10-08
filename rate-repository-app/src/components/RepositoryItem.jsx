import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from './theme';

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
    color: 'white',
    textAlign: 'center',
    marginRight: 'auto',
    padding: 8,
    borderRadius: 5
  }
});

const RepositoryItem = (props) => {
  const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl } = props;
  return (
    <View style={styles.container}>
      <View style={styles.repositoryHeader}>
        <Image
          style={styles.avatar}
          source={{
            uri: ownerAvatarUrl
          }}
        ></Image>
        <View style={styles.repositoryDescription}>
          <Text style={styles.bold}>{fullName}</Text>
          <Text style={styles.paddingY} ellipsizeMode='tail' numberOfLines={2}>{description}</Text>
          <Text style={[styles.language, styles.paddingY]}>{language}</Text>
        </View>
      </View>
      <View style={styles.containerProps}>
        <RepositoryStat
          name="Stars"
          stat={stargazersCount}
        />
        <RepositoryStat
          name="Forks"
          stat={forksCount}
        />
        <RepositoryStat
          name="Reviews"
          stat={reviewCount}
        />
        <RepositoryStat
          name="Rating"
          stat={ratingAverage}
        />
      </View>
    </View>
  );
};

const RepositoryStat = ({ name, stat }) => {
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
      <Text style={[styles.bold, styles.center]}>{formatNumber(stat)}</Text>
      <Text>{name}</Text>
    </View>
  );
};


export default RepositoryItem;