import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';
import Colors from '../themes/Colors';

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;

    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>

        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card item={item} navigation={navigation} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 6,
    paddingBottom: 20,
    color: Colors.white,
  },
});

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

List.propTypes = propTypes;

export default List;
