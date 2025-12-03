import { Character } from '@/types/character';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { useMemo } from 'react';
import { createStyles } from './CharacterCard.styles';
import { useGlobalTheme } from '@/hooks/useGlobalTheme';

type Props = {
  character: Pick<Character, 'name' | 'species' | 'image'>;
};

export function CharacterCard({ character }: Props) {
  const { isDark } = useGlobalTheme();
  const styles = useMemo(() => createStyles(isDark), [isDark]);

  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} contentFit="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>
        <Text style={styles.species} numberOfLines={1}>
          {character.species}
        </Text>
      </View>
    </View>
  );
} 