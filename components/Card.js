import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, StyleSheet, Image} from 'react-native';
const placeholderImage = require('../assets/images/placeholder.png');
import PropTypes from 'prop-types';

class Card extends React.PureComponent {
  render() {
    const {navigation, item, type} = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Detail', {movieId: item.id})}>
        <Image
          resizMode="cover"
          style={type === 'Search' ? styles.imageSearch : styles.image}
          source={
            item.poster_path
              ? {uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}
              : placeholderImage
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieTitle}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 8,
  },
  image: {
    height: 200,
    width: 130,
    borderRadius: 20,
  },
  imageSearch: {
    height: 200,
    width: 118,
    borderRadius: 20,
  },
  movieTitle: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    top: 20,
  },
});

const defaultProps = {
  type: 'Home',
};

const propTypes = {
  item: PropTypes.object,
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
