import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoginColors, Spacing } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    router.replace('/');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <Image
        source={require('@/assets/images/login-map.png')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        blurRadius={5}
      />
      <LinearGradient
        colors={[LoginColors.canvas, 'rgba(44, 41, 38, 0.85)', 'rgba(44, 41, 38, 0)']}
        locations={[0, 0.35, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={[StyleSheet.absoluteFill, styles.canvasTint]} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: insets.top + Spacing.four,
              paddingBottom: insets.bottom + Spacing.four,
              paddingLeft: insets.left + Spacing.four,
              paddingRight: insets.right + Spacing.four,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.brand}>PROSLUSHKA</Text>
            <Text style={styles.title}>Забыли пароль</Text>

            <View style={styles.fields}>
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor={LoginColors.fieldPlaceholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable
                onPress={handleLogin}
                style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel="Войти">
                <Text style={styles.ctaText}>Восстановить доступ</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => router.push('/login')}
              style={({ pressed }) => [styles.registerHit, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="У меня уже есть аккаунт">
              <Text style={[styles.link, styles.registerLink]}>У меня уже есть аккаунт</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: LoginColors.canvas,
  },
  flex: {
    flex: 1,
  },
  canvasTint: {
    backgroundColor: LoginColors.canvas,
    opacity: 0.35,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: LoginColors.card,
    borderColor: LoginColors.cardBorder,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.four,
    gap: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  brand: {
    position: "absolute",
    top: Spacing.five, left: Spacing.four,
    color: LoginColors.brand,
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.72,
    lineHeight: 40,
  },
  title: {
    color: LoginColors.title,
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.56,
    lineHeight: 32,
    marginTop: Spacing.two,
  },
  fields: {
    gap: Spacing.four,
    marginTop: Spacing.two,
  },
  field: {
    gap: Spacing.two,
  },
  label: {
    color: LoginColors.brand,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.32,
    lineHeight: 20,
  },
  input: {
    height: 52,
    borderRadius: 24,
    backgroundColor: LoginColors.fieldFill,
    borderWidth: 1,
    borderColor: LoginColors.fieldBorder,
    paddingHorizontal: Spacing.four,
    color: LoginColors.fieldText,
    fontSize: 16,
  },
  actions: {
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  cta: {
    minHeight: 52,
    borderRadius: 24,
    backgroundColor: LoginColors.cta,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  ctaText: {
    color: LoginColors.ctaText,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: -0.36,
  },
  linkHit: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: LoginColors.link,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.32,
  },
  registerHit: {
    position: 'absolute',
    bottom: 5, left: '50%',
    transform: 'translateX(-60%)',
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  registerLink: {
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.75,
  },
});
