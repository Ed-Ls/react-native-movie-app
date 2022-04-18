import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieOrTv} from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';
import Colors from '../themes/Colors';

const Search = ({navigation}) => {
  const [text, setText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmitSearch = query => {
    Promise.all([searchMovieOrTv(query, 'movie'), searchMovieOrTv(query, 'tv')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv];

        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
              color={Colors.white}
              placeholder={'Search Movie or TV Show'}
              placeholderTextColor={Colors.lightGray}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmitSearch(text);
            }}>
            <Icon name={'search-outline'} size={30} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {/* Searched items results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} type={'Search'} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {/* When searched but no results */}
          {searchResults && searchResults.length === 0 && (
            <View style={styles.noResults}>
              <Text style={{color: Colors.white}}>
                No results matching your criteria.
              </Text>
              <Text style={{color: Colors.white}}>Try different keywords.</Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text style={{color: Colors.white}}>
                Type something to start searching
              </Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 8,
    margin: 5,
    marginTop: 15,
    borderColor: Colors.white,
  },

  container: {
    padding: 10,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },

  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },

  searchItems: {
    padding: 3,
  },

  noResults: {
    padding: 20,
  },

  empty: {
    padding: 20,
  },
});

export default Search;
