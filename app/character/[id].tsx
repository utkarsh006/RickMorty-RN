import { EpisodeListItem } from '@/components/EpisodeListItem';
import { fetchCharacterById, fetchEpisodesByUrls } from '@/services/rickAndMorty';
import { Character, Episode } from '@/types/character';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { styles } from './[id].styles';

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    <View style={styles.container}>
      <Stack.Screen options={{ title: character?.name ?? 'Character', headerBackTitle: 'Back' }} />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.muted}>Loading...</Text>
        </View>
      ) : errorMessage ? (
        <View style={styles.center}>
          <Text style={styles.error}>{errorMessage}</Text>
          <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}>
            <Text style={styles.backBtnText}>Go Back</Text>
          </Pressable>
        </View>
      ) : character ? (
        <FlatList
          data={episodes}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={
            <View style={styles.headerArea}>
              <Image source={{ uri: character.image }} style={styles.heroImage} contentFit="cover" />
              <Text style={styles.name}>{character.name}</Text>
              <Text style={styles.meta}>{character.species} · {character.status}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Origin:</Text>
                <Text style={styles.metaValue}>{character.origin?.name || 'Unknown'}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Location:</Text>
                <Text style={styles.metaValue}>{character.location?.name || 'Unknown'}</Text>
              </View>
              <Text style={styles.sectionTitle}>Episodes</Text>
            </View>
          }
          contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <EpisodeListItem episode={item} />
          )}
          ListEmptyComponent={<Text style={styles.muted}>No episodes found.</Text>}
        />
      ) : null}
    </View>
  );
} 