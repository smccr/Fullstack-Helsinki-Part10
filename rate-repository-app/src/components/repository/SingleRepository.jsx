import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useParams } from "react-router-dom";
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepository from '../../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  rating: {
    marginRight: 10,
    padding: 10,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  ratingText: {
    color: theme.colors.primary
  },
  ratingUsername: {
    fontWeight: 'bold',
    paddingBottom: 2
  },
  ratingDate: {
    paddingBottom: 3
  },
  reviewTextContainer: {
    flexShrink: 1
  },
  reviewText: {
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 20
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem {...repository} showButton />
      <ItemSeparator />
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      <View style={styles.reviewTextContainer}>
        <Text style={styles.ratingUsername}>{review.user.username}</Text>
        <Text style={styles.ratingDate}>{format(new Date(review.createdAt), 'dd-MM-yyyy')}</Text>
        <Text style={styles.reviewText} >{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({
    id: id,
    first: 5
  });

  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
    console.log('You have reached the end of the list');
  };

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;