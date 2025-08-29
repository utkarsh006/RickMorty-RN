import { Episode } from '@/types/character';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  episode: Episode;
};

export function EpisodeListItem({ episode }: Props) {
  return (
    <View style={styles.episodeCard}>
      <Text style={styles.episodeTitle}>{episode.episode} · {episode.name}</Text>
      <Text style={styles.episodeMeta}>{episode.air_date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  episodeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  episodeTitle: {
    fontWeight: '600',
  },
  episodeMeta: {
    marginTop: 4,
    color: 'gray',
  },
}); 