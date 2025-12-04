import { Character } from '@/types/character';
import { Image } from 'expo-image';
import { Text, View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type Props = {
  character: Pick<Character, 'name' | 'species' | 'image'>;
};

export function CharacterCard({ character }: Props) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.card, { 
      backgroundColor: colors.cardBackground,
      borderColor: colors.border 
    }]}>
      <Image source={{ uri: character.image }} style={styles.image} contentFit="cover" />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {character.name}
        </Text>
        <Text style={[styles.species, { color: colors.secondaryText }]} numberOfLines={1}>
          {character.species}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {
    width: 96,
    height: 96,
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  species: {
    marginTop: 4,
  },
}); 