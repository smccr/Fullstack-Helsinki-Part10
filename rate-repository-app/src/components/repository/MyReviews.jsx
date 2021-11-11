import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import ReviewItem from './ReviewItem';
import theme from '../theme';
import useAuthorization from '../../hooks/useAuthorization';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { data } = useAuthorization({
    includeReviews: true
  });

  const reviewNodes = data
    ? data.reviews.edges.map(edge => edge.node)
    : [];



  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default SingleRepository;