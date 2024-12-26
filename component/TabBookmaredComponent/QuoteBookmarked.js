import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppContext} from '../../store/context';

const QuoteBookmarked = ({savedQuote}) => {
    const {removeBookmarkedQuote} = useAppContext();
    // console.log(savedQuote,'saved quote');

    const handleRemoveBookmark = (quote) => {
        // console.log(quote,'remove this quote');
        removeBookmarkedQuote(quote);
    }
  return (
    <View style={styles.quoteCard}>
      <FontAwesome
        name="quote-right"
        size={28}
        color="gray"
      />
      <View style={styles.quoteContent}>
        <Text style={styles.quoteText}>{savedQuote.quote}</Text>
        <Text style={styles.quoteAuthor}>{savedQuote.person}</Text>
      </View>
      <TouchableOpacity
        style={styles.bookmarkIcon}
        onPress={() => handleRemoveBookmark(savedQuote)}>
        <Icon
          name="bookmark-outline"
          size={28}
          color={'#6F4D7B'}
        />
      </TouchableOpacity>
    </View>
  )
}

export default QuoteBookmarked

const styles = StyleSheet.create({
    quoteContent: {
      height: 120,
    },
    quoteCard: {
      margin: 16,
      paddingTop: 10,
      paddingHorizontal: 20,
      backgroundColor: '#6F4D7B' + 50,
      borderRadius: 16,
      position: 'relative',
      borderWidth: 1,
      borderColor: '#6F4D7B',
    },
    quoteText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontStyle: 'italic',
      marginVertical: 10,
    },
    quoteAuthor: {
      color: '#FFFFFF',
      fontSize: 14,
    },
    bookmarkIcon: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: '50%',
      padding: 8,
    },
  });