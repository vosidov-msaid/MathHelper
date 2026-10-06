import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SectionHeader } from '@/components/SectionHeader';
import { TopicCard } from '@/components/TopicCard';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/layout';
import { topics } from '@/data/learn';

export default function LearnScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader title="Learn" subtitle="Build your math foundations" />

        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            icon={topic.icon}
            title={topic.title}
            description={topic.description}
            progressPct={topic.progressPct}
            lessonCount={topic.lessonCount}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl * 2,
  },
});
