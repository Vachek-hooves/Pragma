import {StyleSheet, Text, View} from 'react-native';

const ArchivedTask = ({archivedTask, taskStatus}) => {
  return (
    <View style={styles.container}>
      {/* Title and Description */}
      <Text style={styles?.title} numberOfLines={1}>
        {archivedTask.title}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {archivedTask.description}
      </Text>

      {/* Milestone Indicators */}
      <View style={styles.milestoneContainer}>
        {archivedTask.milestones.map((milestone, index) => (
          <View key={`${milestone.id}`} style={[styles.milestoneIndicator]}>
            <Text style={styles.milestoneNumber}>{index + 1}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <Text style={styles.openButton}>
          <Text style={styles.openButtonText}>{taskStatus}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ArchivedTask;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D2748',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 16,
  },
  milestoneContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
    gap: 8,
  },
  milestoneIndicator: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: '#2C1338',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6F4D7B',
  },
  milestoneDone: {
    backgroundColor: '#6F4D7B',
  },
  milestoneActive: {
    borderColor: '#FF9F0A',
    borderWidth: 2,
  },
  milestoneNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  openButton: {
    flex: 1,
    backgroundColor: '#6F4D7B',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  openButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  iconButton: {
    backgroundColor: '#2C1338',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#6F4D7B',
  },
});
