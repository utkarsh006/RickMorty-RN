import { Episode } from '@/types/character';
import { Text, View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type Props = {
  episode: Episode;
};

export function EpisodeListItem({ episode }: Props) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.episodeCard, { 
      backgroundColor: colors.cardBackground,
      borderColor: colors.border 
    }]}>
      <Text style={[styles.episodeTitle, { color: colors.text }]}>{episode.episode} · {episode.name}</Text>
      <Text style={[styles.episodeMeta, { color: colors.secondaryText }]}>{episode.air_date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  episodeCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  episodeTitle: {
    fontWeight: '600',
  },
  episodeMeta: {
    marginTop: 4,
  },
}); 