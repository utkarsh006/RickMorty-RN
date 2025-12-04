import { EpisodeListItem } from '@/components/EpisodeListItem';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { fetchCharacterById, fetchEpisodesByUrls } from '@/services/rickAndMorty';
import { Character, Episode } from '@/types/character';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchCharacterById(id);
        if (!isMounted) return;
        setCharacter(data);
        const eps = await fetchEpisodesByUrls(data.episode);
        if (!isMounted) return;
        setEpisodes(eps);
      } catch (e) {
        if (isMounted) setErrorMessage('Failed to load character');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: character?.name ?? 'Character', headerBackTitle: 'Back' }} />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={[styles.muted, { color: colors.secondaryText }]}>Loading...</Text>
        </View>
      ) : errorMessage ? (
        <View style={styles.center}>
          <Text style={[styles.error, { color: colors.error }]}>{errorMessage}</Text>
          <Pressable onPress={() => router.back()} style={({ pressed }) => [
            styles.backBtn, 
            { backgroundColor: colors.cardBackground, borderColor: colors.border },
            pressed && { opacity: 0.7 }
          ]}>
            <Text style={[styles.backBtnText, { color: colors.text }]}>Go Back</Text>
          </Pressable>
        </View>
      ) : character ? (
        <FlatList
          data={episodes}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={
            <View style={styles.headerArea}>
              <Image source={{ uri: character.image }} style={styles.heroImage} contentFit="cover" />
              <Text style={[styles.name, { color: colors.text }]}>{character.name}</Text>
              <Text style={[styles.meta, { color: colors.secondaryText }]}>{character.species} · {character.status}</Text>
              <View style={styles.metaRow}>
                <Text style={[styles.metaLabel, { color: colors.secondaryText }]}>Origin:</Text>
                <Text style={[styles.metaValue, { color: colors.text }]}>{character.origin?.name || 'Unknown'}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={[styles.metaLabel, { color: colors.secondaryText }]}>Location:</Text>
                <Text style={[styles.metaValue, { color: colors.text }]}>{character.location?.name || 'Unknown'}</Text>
              </View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Episodes</Text>
            </View>
          }
          contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <EpisodeListItem episode={item} />
          )}
          ListEmptyComponent={<Text style={[styles.muted, { color: colors.secondaryText }]}>No episodes found.</Text>}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  muted: {
    marginTop: 8,
  },
  error: {
    textAlign: 'center',
  },
  backBtn: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  backBtnText: {
    fontWeight: '600',
  },
  headerArea: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  meta: {
    marginTop: 4,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  metaLabel: {
    marginRight: 6,
  },
  metaValue: {
    fontWeight: '500',
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  separator: {
    height: 12,
  },
});