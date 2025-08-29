import { Episode } from '@/types/character';
import { Text, View } from 'react-native';
import { styles } from './EpisodeListItem.styles';

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