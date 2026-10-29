import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, HomeColors, Spacing } from '@/constants/theme';

const LIKED_USERS = [
  { id: '1', name: 'WHODAFCKRU', avatar: require('@/assets/images/home/avatar-1.png') },
  { id: '2', name: 'THAIBADDIE', avatar: require('@/assets/images/home/avatar-2.png') },
  { id: '3', name: 'IDCIDCIDC', avatar: require('@/assets/images/home/avatar-3.png') },
  { id: '4', name: 'LEEENEFOR', avatar: require('@/assets/images/home/avatar-4.png') },
] as const;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <View style={[StyleSheet.absoluteFill, styles.map]}>
        <Image
          source={require('@/assets/images/home/map.png')}
          style={styles.mapImage}
          contentFit="cover"
        />
        <View style={[styles.pulseMarker, styles.pulsePrimary]}>
          <View style={styles.pulseOuter} />
          <View style={styles.pulseMid} />
          <Image
            source={require('@/assets/images/home/logo.png')}
            style={styles.pulseAvatar}
            contentFit="cover"
          />
        </View>
        <View style={[styles.pulseMarker, styles.pulseSecondary]}>
          <View style={[styles.pulseOuter, styles.pulseOuterAccent]} />
          <View style={[styles.pulseMid, styles.pulseMidAccent]} />
          <View style={styles.pulseDot} />
        </View>
      </View>

      <View style={[
          styles.wrapper,
          {
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            paddingBottom: insets.bottom
          }
        ]}>

        <Image
          source={require('@/assets/images/home/logo.png')}
          style={styles.logo}
          contentFit="cover"
        />

        <View 
          style={styles.card}
          >
          <View style={styles.draggableContainer}>
            <View style={styles.draggable} />
          </View>
          <View style={styles.nowPlayingRow}>
            <Text style={styles.nowPlayingLabel}>СЕЙЧАС ИГРАЕТ</Text>
            <Switch
              value={isPlaying}
              onValueChange={setIsPlaying}
              trackColor={{ false: '#5c5752', true: HomeColors.switchOn }}
              thumbColor={HomeColors.switchKnob}
              ios_backgroundColor="#5c5752"
            />
          </View>
          <View style={styles.trackBlock}>
            <View style={styles.coverWrapper}>
              <Image
                source={require('@/assets/images/home/cover.png')}
                style={styles.cover}
                contentFit="cover"
              />
            </View>
            <View style={styles.trackMeta}>
              <Text style={styles.trackTitle} numberOfLines={2}>
                YAYA TOURE
              </Text>
              <Text style={styles.trackArtists} numberOfLines={1}>
                glaive, kurtains
              </Text>
              <Text style={styles.trackAlbum} numberOfLines={1}>
                God Save the Three
              </Text>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Сменить трек">
            <Text style={styles.ctaText}>Сменить трек</Text>
          </Pressable>
          <Text style={styles.likesTitle}>ЛАЙКИ КОМПОЗИЦИИ</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.likesRow}>
            {LIKED_USERS.map((user) => (
              <View key={user.id} style={styles.likedUser}>
                <Image source={user.avatar} style={styles.avatar} contentFit="cover" />
                <Text style={styles.username} numberOfLines={1}>
                  {user.name}
                </Text>
                <View style={styles.actionRow}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.actionBtn,
                      styles.acceptBtn,
                      pressed && styles.pressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Принять ${user.name}`}>
                    <Text style={styles.actionIcon}>✓</Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      styles.actionBtn,
                      styles.rejectBtn,
                      pressed && styles.pressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Отклонить ${user.name}`}>
                    <Text style={styles.actionIcon}>✕</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: HomeColors.canvas,
  },
  canvasTint: {
    backgroundColor: HomeColors.canvas,
    opacity: 0.35,
  },
  scrollContent: {
    gap: Spacing.three,
  },
  wrapper: {
    position: 'relative',
    flex: 1,
  },
  card: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: HomeColors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.four,
    gap: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  draggableContainer: {
    width: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  draggable: {
    width: 100,
    height: 3,
    backgroundColor: Colors.default.white
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 24,
    margin: 12
  },
  brand: {
    color: HomeColors.brand,
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.56,
  },
  nowPlayingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  nowPlayingLabel: {
    color: HomeColors.nowPlaying,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.44,
    flexShrink: 1,
  },
  trackBlock: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'center'
  },
  coverWrapper: {
    borderRadius: 24,
    shadowColor: HomeColors.coverGlow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 16,
    elevation: 16,
    backgroundColor: HomeColors.coverGlow
  },
  cover: {
    width: 128,
    height: 128,
    borderRadius: 24,
    overflow: 'hidden'
  },
  trackMeta: {
    flex: 1,
    gap: Spacing.one,
  },
  trackTitle: {
    color: HomeColors.trackTitle,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.56,
  },
  trackArtists: {
    color: HomeColors.trackMeta,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.32,
  },
  trackAlbum: {
    color: HomeColors.trackMeta,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.28,
    marginTop: Spacing.two,
  },
  cta: {
    minHeight: 52,
    borderRadius: 24,
    backgroundColor: HomeColors.cta,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  ctaText: {
    color: HomeColors.ctaText,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: -0.36,
  },
  likesTitle: {
    color: HomeColors.brand,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  likesRow: {
    gap: Spacing.four,
    paddingRight: Spacing.two,
  },
  likedUser: {
    width: 96,
    alignItems: 'center',
    gap: Spacing.two,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  username: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: -0.22,
    textAlign: 'center',
    width: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBtn: {
    backgroundColor: HomeColors.accept,
  },
  rejectBtn: {
    backgroundColor: HomeColors.reject,
  },
  actionIcon: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapImage: {
    ...StyleSheet.absoluteFill,
  },
  pulseMarker: {
    position: 'absolute',
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulsePrimary: {
    top: '38%',
    left: '52%',
  },
  pulseSecondary: {
    top: '62%',
    left: '22%',
  },
  pulseOuter: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: HomeColors.markerPulse,
    opacity: 0.5,
  },
  pulseMid: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: HomeColors.markerPulse,
    opacity: 0.7,
  },
  pulseOuterAccent: {
    borderColor: HomeColors.marker,
  },
  pulseMidAccent: {
    borderColor: HomeColors.marker,
  },
  pulseAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  pulseDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: HomeColors.marker,
  },
  pressed: {
    opacity: 0.75,
  },
});
