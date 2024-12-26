import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useAppContext} from '../../store/context';
import {QUOTES} from '../../data/quotes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuoteCard = () => {
  const {saveBookmarkedQuote, bookmarkedQuotes} = useAppContext();
  const [currentQuote, setCurrentQuote] = useState(null);

  useEffect(() => {
    loadOrGenerateQuote();
  }, []);

  const loadOrGenerateQuote = async () => {
    try {
      const savedQuote = await AsyncStorage.getItem('currentDailyQuote');
      const savedTimestamp = await AsyncStorage.getItem('quoteTimestamp');
      
      if (savedQuote && savedTimestamp) {
        const timestamp = parseInt(savedTimestamp);
        const now = new Date().getTime();
        const oneDayInMs = 24 * 60 * 60 * 1000;

        if (now - timestamp < oneDayInMs) {
          setCurrentQuote(JSON.parse(savedQuote));
          return;
        }
      }
      generateNewQuote();
    } catch (error) {
      console.error('Error loading quote:', error);
      generateNewQuote();
    }
  };

  const generateNewQuote = async () => {
    // Filter out already bookmarked quotes
    const availableQuotes = QUOTES.filter(
      quote => !bookmarkedQuotes.some(bookmarked => bookmarked.id === quote.id)
    );

    if (availableQuotes.length === 0) {
      setCurrentQuote({
        id: 'no-more-quotes',
        quote: 'You have bookmarked all available quotes!',
        person: 'System'
      });
      return;
    }

    const newQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    
    try {
      await AsyncStorage.setItem('currentDailyQuote', JSON.stringify(newQuote));
      await AsyncStorage.setItem('quoteTimestamp', new Date().getTime().toString());
      setCurrentQuote(newQuote);
    } catch (error) {
      console.error('Error saving quote:', error);
    }
  };

  const handleBookmarkQuote = async () => {
    if (!currentQuote || currentQuote.id === 'no-more-quotes') return;
    
    const isAlreadyBookmarked = bookmarkedQuotes.some(
      quote => quote.id === currentQuote.id
    );

    if (!isAlreadyBookmarked) {
      await saveBookmarkedQuote(currentQuote);
      // Optionally generate a new quote after bookmarking
      await generateNewQuote();
    }
  };

  if (!currentQuote) return null;

  const isBookmarked = bookmarkedQuotes.some(
    quote => quote.id === currentQuote.id
  );

  return (
    <View style={styles.quoteCard}>
      <FontAwesome
        name="quote-right"
        size={28}
        color="gray"
      />
      <View style={styles.quoteContent}>
        <Text style={styles.quoteText}>{currentQuote.quote}</Text>
        <Text style={styles.quoteAuthor}>{currentQuote.person}</Text>
      </View>
      <TouchableOpacity
        disabled={isBookmarked}
        style={[
          styles.bookmarkIcon,
          isBookmarked && styles.bookmarkIconDisabled
        ]}
        onPress={handleBookmarkQuote}>
        <Icon
          name={isBookmarked ? "bookmark" : "bookmark-outline"}
          size={28}
          color={isBookmarked ? '#6F4D7B' : '#fff'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteContent: {
    height: 120,
  },
  quoteCard: {
    margin: 16,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6F4D7B50',
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
    backgroundColor: '#3D2748',
    borderRadius: 50,
    padding: 8,
  },
  bookmarkIconDisabled: {
    backgroundColor: '#2C1338',
    opacity: 0.7,
  },
});

export default QuoteCard;