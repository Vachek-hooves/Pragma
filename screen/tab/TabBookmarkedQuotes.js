import {StyleSheet, Text, View} from 'react-native';
import {useAppContext} from '../../store/context';
import ScrollLayout from '../../component/layout/ScrollLayout';
import QuoteBookmarked from '../../component/TabBookmaredComponent/QuoteBookmarked';

const TabBookmarkedQuotes = () => {
  const {bookmarkedQuotes} = useAppContext();

  const allBookmarkedQuotes = bookmarkedQuotes.map(quote => (
    <QuoteBookmarked savedQuote={quote} key={quote.id} />
  ));
  return (
    <View style={{flex: 1, backgroundColor: '#16001E'}}>
      <ScrollLayout title={'Saved Quotes'}>{allBookmarkedQuotes}</ScrollLayout>
      <View style={{height: 130}} />
    </View>
  );
};

export default TabBookmarkedQuotes;

const styles = StyleSheet.create({});
