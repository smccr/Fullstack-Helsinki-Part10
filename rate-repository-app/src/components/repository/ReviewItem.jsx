import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { format } from 'date-fns';

import theme from '../theme';


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
  }
});

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

export default ReviewItem;