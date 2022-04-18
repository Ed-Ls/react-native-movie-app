import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  PixelRatio,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import YouTube from 'react-native-youtube';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../themes/Colors';

export default class Video extends React.Component {
  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    playerWidth: Dimensions.get('window').width,
  };

  _youTubeRef = React.createRef();

  render() {
    const {onClose, videoId} = this.props;
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={onClose}>
          <View style={styles.topMessage}>
            <Icon name={'chevron-back'} size={40} color={Colors.white} />
            <Text style={styles.back}>{'Return to movie page '}</Text>
          </View>
        </TouchableOpacity>

        <YouTube
          ref={this._youTubeRef}
          apiKey="YOUR_API_KEY"
          videoId={videoId}
          play={this.state.isPlaying}
          loop={this.state.isLooping}
          fullscreen={this.state.fullscreen}
          controls={1}
          style={[
            {
              height: PixelRatio.roundToNearestPixel(
                this.state.playerWidth / (16 / 9),
              ),
            },
            styles.player,
          ]}
          onError={e => {
            this.setState({error: e.error});
          }}
          onReady={e => {
            this.setState({isReady: true});
          }}
          onChangeState={e => {
            this.setState({status: e.state});
          }}
          onChangeQuality={e => {
            this.setState({quality: e.quality});
          }}
          onChangeFullscreen={e => {
            this.setState({fullscreen: e.isFullscreen});
          }}
          onProgress={e => {
            this.setState({currentTime: e.currentTime});
          }}
        />

        {/* Playing / Looping */}
        {/* <View style={styles.buttonGroup}>
          <Button
            title={this.state.status == 'playing' ? 'Pause' : 'Play'}
            color={this.state.status == 'playing' ? 'red' : undefined}
            onPress={() => {
              this.setState(state => ({isPlaying: !state.isPlaying}));
            }}
          />
          <Text> </Text>
          <Button
            title={this.state.isLooping ? 'Looping' : 'Not Looping'}
            color={this.state.isLooping ? 'green' : undefined}
            onPress={() => {
              this.setState(state => ({isLooping: !state.isLooping}));
            }}
          />
        </View> */}

        {/* Go To Specific time in played video with seekTo() */}
        {/* <View style={styles.buttonGroup}>
          <Button
            title="15 Seconds"
            onPress={() => {
              if (this._youTubeRef.current) {
                this._youTubeRef.current.seekTo(15);
              }
            }}
          />
          <Text> </Text>
          <Button
            title="2 Minutes"
            onPress={() => {
              if (this._youTubeRef.current) {
                this._youTubeRef.current.seekTo(2 * 60);
              }
            }}
          />
          <Text> </Text>
          <Button
            title="15 Minutes"
            onPress={() => {
              if (this._youTubeRef.current) {
                this._youTubeRef.current.seekTo(15 * 60);
              }
            }}
          />
        </View> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    width: Dimensions.get('window').width,
  },
  back: {
    fontSize: 17,
    color: Colors.white,
  },
  topMessage: {
    flex: 1,
    marginTop: 50,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: 5,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: Dimensions.get('window').width / 2,
  },
});
