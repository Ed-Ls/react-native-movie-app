import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../themes/Colors';
import {getRandomMovie} from '../services/services';

import Icon from 'react-native-vector-icons/Ionicons';
import {Fragment} from 'react/cjs/react.production.min';

const height = Dimensions.get('window').height;

class NavBar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;

    const handleShufflePress = () => {
      getRandomMovie().then(data => {
        let randomMovie = data[Math.floor(Math.random() * data.length)];
        navigation.navigate('Detail', {movieId: randomMovie.id});
      });
    };

    return (
      <SafeAreaView style={{flex: 1}}>
        {main && (
          <View style={styles.mainNav}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Icon name={'home-outline'} size={35} color={Colors.black} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShufflePress}>
              <Icon name={'infinite-outline'} size={40} color={Colors.black} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon name={'search-outline'} size={35} color={Colors.black} />
            </TouchableOpacity>
          </View>
        )}

        {!main && (
          <Fragment>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name={'chevron-back'} size={40} color={Colors.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.detailNav}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home');
                }}>
                <Icon name={'home-outline'} size={35} color={Colors.black} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShufflePress}>
                <Icon
                  name={'infinite-outline'}
                  size={40}
                  color={Colors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Search');
                }}>
                <Icon name={'search-outline'} size={35} color={Colors.black} />
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
  },

  mainNav: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    position: 'absolute',
    padding: 5,
    paddingRight: 70,
    paddingLeft: 70,
    left: 20,
    right: 20,
    borderRadius: 40,
    bottom: height - 1625,
  },

  detailNav: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    position: 'absolute',
    padding: 5,
    paddingRight: 70,
    paddingLeft: 70,
    left: 20,
    right: 20,
    borderRadius: 40,
    bottom: height - 1580,
  },
});

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
