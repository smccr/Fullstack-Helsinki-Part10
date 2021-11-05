import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useHistory } from "react-router-dom";

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: theme.colors.backgroundPrimary
  }
});

const SortPicker = ({ fetch, selectedSort, setSelectedSort }) => {
  
  const handleValue = (itemValue) => {
    switch (itemValue) {
      case 'latest':
        fetch('CREATED_AT', 'DESC');
        break;
      case 'highest':
        fetch('RATING_AVERAGE', 'ASC');
        break;
      case 'lowest':
        fetch('RATING_AVERAGE', 'DESC');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedSort}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedSort(itemValue);
          handleValue(itemValue);
        }
        }>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );

};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, fetch }) => {
  const history = useHistory();
  const [selectedSort, setSelectedSort] = useState();

  const renderItem = ({ item }) => (
    <Pressable onPress={() => history.push(item.id)}>
      <RepositoryItem {...item} />
    </Pressable>
  );

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={() => <SortPicker fetch={fetch} selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      testID="nodesList"
    />
  );
};

const RepositoryList = () => {
  const { repositories, fetch } = useRepositories();
  return <RepositoryListContainer repositories={repositories} fetch={fetch} />;
};

export default RepositoryList;