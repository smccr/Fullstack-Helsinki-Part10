import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';
import theme from './theme';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

   // Get the nodes from the edges array
   const repositoryNodes = repositories
   ? repositories.repositories.edges.map(edge => edge.node)
   : [];


  const renderItem = ({item}) => (
    <RepositoryItem {...item} />
  );


  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;