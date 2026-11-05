import { HomeColors, LoginColors, Spacing } from '@/constants/theme';
import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TrackItem = {
  id: string;
  title: string;
  artist: string;
  cover: number;
};

const MOCK_TRACKS: TrackItem[] = [
  {
    id: '1',
    title: 'YAYA TOURE',
    artist: 'glaive, kurtains',
    cover: require('@/assets/images/home/cover.png'),
  },
  {
    id: '2',
    title: 'Bloodbath (Dance)',
    artist: 'kmoe',
    cover: require('@/assets/images/home/cover.png'),
  },
  {
    id: '3',
    title: 'Йупи Йо',
    artist: 'Scally Milano',
    cover: require('@/assets/images/home/cover.png'),
  },
  {
    id: '4',
    title: 'God Save the Three',
    artist: 'glaive',
    cover: require('@/assets/images/home/cover.png'),
  },
  {
    id: '5',
    title: 'Night Drive',
    artist: 'kurtains',
    cover: require('@/assets/images/home/cover.png'),
  },
];

type FindSongModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect?: (track: TrackItem) => void;
};

export default function FindSongModal({ visible, onClose, onSelect }: FindSongModalProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const filteredTracks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_TRACKS;
    return MOCK_TRACKS.filter(
      (track) =>
        track.title.toLowerCase().includes(q) || track.artist.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelect = (track: TrackItem) => {
    onSelect?.(track);
    setQuery('');
    onClose();
  };

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}>
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={handleClose} accessibilityRole="button" />

        <View
          style={[
            styles.sheet,
            {
              paddingTop: Spacing.four,
              paddingBottom: insets.bottom + Spacing.four,
              paddingLeft: insets.left + Spacing.four,
              paddingRight: insets.right + Spacing.four,
            },
          ]}>
          <View style={styles.header}>
            <Text style={styles.title}>Найти трек</Text>
            <Pressable
              onPress={handleClose}
              style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Закрыть">
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Поиск"
            placeholderTextColor={LoginColors.fieldPlaceholder}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.searchInput}
          />

          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {filteredTracks.length === 0 ? (
              <Text style={styles.emptyText}>Ничего не найдено</Text>
            ) : (
              filteredTracks.map((track) => (
                <Pressable
                  key={track.id}
                  onPress={() => handleSelect(track)}
                  style={({ pressed }) => [styles.trackRow, pressed && styles.pressed]}
                  accessibilityRole="button"
                  accessibilityLabel={`${track.title}, ${track.artist}`}>
                  <Image source={track.cover} style={styles.cover} contentFit="cover" />
                  <View style={styles.trackMeta}>
                    <Text style={styles.trackTitle} numberOfLines={1}>
                      {track.title}
                    </Text>
                    <Text style={styles.trackArtist} numberOfLines={1}>
                      {track.artist}
                    </Text>
                  </View>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  sheet: {
    maxHeight: '85%',
    backgroundColor: HomeColors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderColor: HomeColors.cardBorder,
    borderWidth: 1,
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: HomeColors.brand,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.44,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LoginColors.fieldFill,
  },
  closeText: {
    color: HomeColors.brand,
    fontSize: 16,
    fontWeight: '600',
  },
  searchInput: {
    height: 52,
    borderRadius: 24,
    backgroundColor: LoginColors.fieldFill,
    borderWidth: 1,
    borderColor: LoginColors.fieldBorder,
    paddingHorizontal: Spacing.four,
    color: LoginColors.fieldText,
    fontSize: 16,
  },
  list: {
    flexGrow: 0,
  },
  listContent: {
    paddingBottom: Spacing.two,
  },
  emptyText: {
    color: '#969089',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: Spacing.five,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: HomeColors.cardBorder,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  trackMeta: {
    flex: 1,
    gap: 2,
  },
  trackTitle: {
    color: '#f7f5f3',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.32,
  },
  trackArtist: {
    color: '#969089',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.28,
  },
  pressed: {
    opacity: 0.75,
  },
});
