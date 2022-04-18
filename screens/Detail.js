import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import Colors from '../themes/Colors';

import {getMovie, getMovieVideo} from '../services/services';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';
const placeholderImage = require('../assets/images/placeholder.png');

const height = Dimensions.get('screen').height;
var width = Dimensions.get('window').width;

const Detail = ({route, navigation}) => {
  const [movieDetail, setMovieDetail] = useState();
  const [movieVideo, setMovieVideo] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {movieId} = route.params;

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });

    getMovieVideo(movieId).then(movieVideoData => {
      const trailer = movieVideoData.results.filter(
        video => (video.name = 'Teaser Trailer'),
      );
      setMovieVideo(trailer[0].key);
    });
  }, [movieId]);

  const handlePlayVideo = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView scrollIndicatorInsets={{right: 1}}>
            <Image
              resizMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={handlePlayVideo} />
              </View>

              <Text style={styles.movieTitle}>{movieDetail.title}</Text>

              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => (
                    <Text style={styles.genre} key={genre.id}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                rating={movieDetail.vote_average / 2}
                fullStarColor={Colors.primary}
                starSize={28}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.releaseDate}>
                {'Release Date: ' +
                  dateFormat(movieDetail.release_date, 'mmm dd, yyyy')}
              </Text>
            </View>
          </ScrollView>

          <Modal
            animationType="slide"
            visible={modalVisible}
            supportedOrientations={['portrait', 'landscape']}>
            <View style={styles.videoModal}>
              <Video onClose={handlePlayVideo} videoId={movieVideo} />
            </View>
          </Modal>
        </View>
      )}

      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  image: {
    width: width,
    height: height / 1.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: Colors.white,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 15,
    marginBottom: 13,
  },
  genre: {
    marginRight: 15,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  overview: {
    padding: 15,
    textAlign: 'center',
    color: Colors.white,
  },
  releaseDate: {
    fontWeight: 'bold',
    color: Colors.lightGray,
  },
  playButton: {
    position: 'absolute',
    right: 40,
    top: -25,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
