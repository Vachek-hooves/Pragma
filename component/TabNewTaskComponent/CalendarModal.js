import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarModal = ({visible, onClose, onSelectDate, selectedDate}) => {
  if (!visible) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Calendar
          onDayPress={day => {
            onSelectDate(day.dateString);
            onClose();
          }}
          markedDates={{
            [selectedDate]: {selected: true, selectedColor: '#6F4D7B'},
          }}
          theme={{
            backgroundColor: '#3D2748',
            calendarBackground: '#3D2748',
            textSectionTitleColor: '#FFFFFF',
            selectedDayBackgroundColor: '#6F4D7B',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: '#FF9F0A',
            dayTextColor: '#FFFFFF',
            textDisabledColor: '#666666',
            monthTextColor: '#FFFFFF',
          }}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#3D2748',
    borderRadius: 8,
    padding: 16,
    width: '90%',
  },
  closeButton: {
    backgroundColor: '#6F4D7B',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    borderWidth:1,
    borderColor: '#6F4D7B',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CalendarModal;
