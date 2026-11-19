import React, { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { isRTL, Language, translations } from './src/i18n/translations';
import { colors } from './src/theme/colors';
// Keep navigation intentionally lightweight for Phase 1; this can migrate to Expo Router as screens grow.
type Screen = 'welcome' | 'script' | 'style' | 'preview';
type VideoStyle = 'animated' | 'realistic';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [screen, setScreen] = useState<Screen>('welcome');
  const [script, setScript] = useState('');
  const [videoStyle, setVideoStyle] = useState<VideoStyle>('animated');
  const [error, setError] = useState(false);
  const t = useMemo(() => translations[language], [language]);
  const rtl = isRTL(language);
  const direction = rtl ? 'rtl' : 'ltr';
  const startStyle = { textAlign: rtl ? 'right' as const : 'left' as const };
  const goNext = () => {
    if (screen === 'welcome') setScreen('script');
    else if (screen === 'script') {
      if (!script.trim()) { setError(true); return; }
      setError(false); setScreen('style');
    } else if (screen === 'style') setScreen('preview');
  };
  const goBack = () => setScreen(screen === 'preview' ? 'style' : screen === 'style' ? 'script' : 'welcome');
  const reset = () => { setScript(''); setVideoStyle('animated'); setError(false); setScreen('script'); };
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ExpoStatusBar style="light" />
      <View style={styles.shell}>
        <View style={[styles.topbar, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
          <Pressable onPress={() => setScreen('welcome')} style={styles.brandRow}>
            <View style={styles.logo}><Text style={styles.logoMark}>✳</Text></View>
            <Text style={styles.brand}>MINDORA</Text>
          </Pressable>
          <Pressable onPress={toggleLanguage} style={styles.languageButton}><Text style={styles.languageText}>{t.language}</Text></Pressable>
        </View>

        {screen !== 'welcome' && (
          <View style={styles.progressRow}>
            {(['script', 'style', 'preview'] as const).map((item, index) => <View key={item} style={[styles.progressTrack, { backgroundColor: (['script','style','preview'].indexOf(screen) >= index) ? colors.primary : colors.border }]} />)}
          </View>
        )}

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {screen === 'welcome' && <View style={styles.welcome}>
            <View style={styles.artWrap}>
              <View style={styles.orbitOne} /><View style={styles.orbitTwo} />
              <View style={styles.artCore}><Text style={styles.artSpark}>✳</Text></View>
              <View style={[styles.floatCard, styles.floatCardTop]}><Text style={styles.floatEmoji}>✦</Text><Text style={styles.floatLabel}>IDEA</Text></View>
              <View style={[styles.floatCard, styles.floatCardBottom]}><Text style={styles.floatEmoji}>◈</Text><Text style={styles.floatLabel}>STORY</Text></View>
            </View>
            <Text style={styles.eyebrow}>{t.greeting}</Text>
            <Text style={styles.hero}>{t.tagline}</Text>
            <Text style={styles.subtle}>{t.mins}</Text>
            <PrimaryButton label={t.getStarted} onPress={goNext} rtl={rtl} />
            <Text style={styles.footnote}>CREATE · EXPLAIN · INSPIRE</Text>
          </View>}

          {screen === 'script' && <View style={styles.section}>
            <Text style={styles.stepLabel}>01 — YOUR IDEA</Text>
            <Text style={[styles.heading, startStyle]}>{t.createTitle}</Text>
            <Text style={[styles.description, startStyle]}>{t.createSubtitle}</Text>
            <View style={styles.inputCard}>
              <TextInput value={script} onChangeText={(value) => { setScript(value); setError(false); }} multiline maxLength={5000} textAlignVertical="top" placeholder={t.placeholder} placeholderTextColor={colors.muted} style={[styles.input, { textAlign: rtl ? 'right' : 'left' }]} writingDirection={direction} />
              <View style={[styles.inputFooter, { flexDirection: rtl ? 'row-reverse' : 'row' }]}><Text style={styles.charCount}>{script.length}/5000</Text><Text style={styles.inputHint}>✦  {t.example}</Text></View>
            </View>
            {error && <Text style={[styles.error, startStyle]}>{t.empty}</Text>}
            <PrimaryButton label={t.continue} onPress={goNext} rtl={rtl} />
          </View>}

          {screen === 'style' && <View style={styles.section}>
            <Pressable onPress={goBack} style={[styles.backButton, { alignSelf: rtl ? 'flex-end' : 'flex-start' }]}><Text style={styles.backText}>{rtl ? '→' : '←'}  {t.back}</Text></Pressable>
            <Text style={styles.stepLabel}>02 — VISUAL DIRECTION</Text>
            <Text style={[styles.heading, startStyle]}>{t.chooseStyle}</Text>
            <Text style={[styles.description, startStyle]}>{t.styleSubtitle}</Text>
            <StyleChoice selected={videoStyle === 'animated'} title={t.animated} desc={t.animatedDesc} symbol="✳" onPress={() => setVideoStyle('animated')} />
            <StyleChoice selected={videoStyle === 'realistic'} title={t.realistic} desc={t.realisticDesc} symbol="◉" onPress={() => setVideoStyle('realistic')} />
            <PrimaryButton label={t.continue} onPress={goNext} rtl={rtl} />
          </View>}

          {screen === 'preview' && <View style={styles.section}>
            <Pressable onPress={goBack} style={[styles.backButton, { alignSelf: rtl ? 'flex-end' : 'flex-start' }]}><Text style={styles.backText}>{rtl ? '→' : '←'}  {t.back}</Text></Pressable>
            <Text style={styles.stepLabel}>03 — PROJECT OVERVIEW</Text>
            <Text style={[styles.heading, startStyle]}>{t.preview}</Text>
            <Text style={[styles.description, startStyle]}>{t.previewDesc}</Text>
            <View style={styles.previewFrame}>
              <View style={styles.previewGlow} /><View style={styles.previewSymbol}><Text style={styles.previewStar}>{videoStyle === 'animated' ? '✳' : '◉'}</Text></View>
              <Text style={styles.previewTitle}>MINDORA</Text><Text style={styles.previewCaption}>{t.demo}</Text>
              <View style={styles.playCircle}><Text style={styles.playIcon}>▶</Text></View>
            </View>
            <Text style={[styles.fieldLabel, startStyle]}>{t.yourText}</Text>
            <View style={styles.summaryCard}><Text style={[styles.summaryText, { textAlign: rtl ? 'right' : 'left' }]}>{script}</Text></View>
            <Text style={[styles.fieldLabel, startStyle]}>{t.visualStyle}</Text>
            <View style={styles.stylePill}><Text style={styles.stylePillText}>{videoStyle === 'animated' ? t.animated : t.realistic}</Text></View>
            <Text style={styles.demoNote}>{t.demoNote}</Text>
            <Pressable onPress={reset} style={styles.secondaryButton}><Text style={styles.secondaryText}>{t.createAnother}</Text></Pressable>
          </View>}
        </ScrollView>
        <Text style={styles.footer}>MINDORA AI  ·  {t.step}</Text>
      </View>
    </SafeAreaView>
  );
}

function PrimaryButton({ label, onPress, rtl }: { label: string; onPress: () => void; rtl: boolean }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed, { flexDirection: rtl ? 'row-reverse' : 'row' }]}><Text style={styles.primaryText}>{label}</Text><Text style={styles.primaryArrow}>{rtl ? '←' : '→'}</Text></Pressable>;
}
function StyleChoice({ selected, title, desc, symbol, onPress }: { selected: boolean; title: string; desc: string; symbol: string; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.choice, selected && styles.choiceSelected]}><View style={[styles.choiceIcon, selected && styles.choiceIconSelected]}><Text style={styles.choiceSymbol}>{symbol}</Text></View><View style={styles.choiceCopy}><Text style={styles.choiceTitle}>{title}</Text><Text style={styles.choiceDesc}>{desc}</Text></View><View style={[styles.radio, selected && styles.radioSelected]}>{selected && <View style={styles.radioDot} />}</View></Pressable>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background }, shell: { flex: 1, paddingHorizontal: 24 },
  topbar: { height: 62, alignItems: 'center', justifyContent: 'space-between' }, brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 }, logo: { width: 30, height: 30, borderRadius: 10, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, logoMark: { color: colors.primary, fontSize: 20 }, brand: { color: colors.text, fontSize: 14, fontWeight: '800', letterSpacing: 2.2 }, languageButton: { borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingHorizontal: 13, paddingVertical: 7 }, languageText: { color: colors.text, fontSize: 12, fontWeight: '600' },
  progressRow: { flexDirection: 'row', gap: 6, marginTop: 14 }, progressTrack: { height: 3, flex: 1, borderRadius: 4 }, content: { flexGrow: 1, justifyContent: 'center', paddingVertical: 28 },
  welcome: { alignItems: 'center', paddingTop: 6 }, artWrap: { height: 245, width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 26 }, orbitOne: { position: 'absolute', width: 206, height: 206, borderRadius: 110, borderWidth: 1, borderColor: '#34305D' }, orbitTwo: { position: 'absolute', width: 158, height: 158, borderRadius: 90, borderWidth: 1, borderColor: '#272C48', transform: [{ rotate: '35deg' }] }, artCore: { width: 112, height: 112, borderRadius: 36, backgroundColor: '#25204A', borderWidth: 1, borderColor: '#6458B5', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-8deg' }] }, artSpark: { color: '#B8AEFF', fontSize: 68 }, floatCard: { position: 'absolute', backgroundColor: colors.surfaceElevated, borderColor: colors.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 7 }, floatCardTop: { top: 34, right: 16 }, floatCardBottom: { bottom: 28, left: 16 }, floatEmoji: { color: colors.mint, fontSize: 15 }, floatLabel: { color: colors.text, fontSize: 9, fontWeight: '800', letterSpacing: 1.4 },
  eyebrow: { color: colors.mint, fontSize: 10, fontWeight: '800', letterSpacing: 2.2, marginBottom: 16 }, hero: { color: colors.text, fontSize: 34, lineHeight: 43, fontWeight: '800', textAlign: 'center', letterSpacing: -1, marginBottom: 12 }, subtle: { color: colors.muted, fontSize: 13, marginBottom: 30 }, primaryButton: { backgroundColor: colors.primary, borderRadius: 16, height: 58, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, gap: 20, marginTop: 22, width: '100%' }, primaryText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' }, primaryArrow: { color: '#FFFFFF', fontSize: 20 }, pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] }, footnote: { color: '#59647B', fontSize: 9, letterSpacing: 2.4, fontWeight: '700', marginTop: 26 }, footer: { color: '#59647B', fontSize: 9, textAlign: 'center', letterSpacing: 1.5, paddingBottom: 12 },
  section: { width: '100%' }, stepLabel: { color: colors.mint, fontSize: 10, fontWeight: '800', letterSpacing: 2, marginBottom: 14, marginTop: 24 }, heading: { color: colors.text, fontSize: 29, lineHeight: 36, fontWeight: '800', letterSpacing: -0.7, marginBottom: 10 }, description: { color: colors.muted, fontSize: 14, lineHeight: 22, marginBottom: 26 }, inputCard: { backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 16, minHeight: 220 }, input: { color: colors.text, fontSize: 15, lineHeight: 24, minHeight: 155 }, inputFooter: { justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: colors.border, paddingTop: 12, gap: 8 }, charCount: { color: colors.muted, fontSize: 10 }, inputHint: { color: colors.muted, fontSize: 10, flexShrink: 1 }, error: { color: '#FF8C9A', fontSize: 12, marginTop: 10 },
  backButton: { paddingVertical: 8, marginBottom: 6 }, backText: { color: colors.muted, fontSize: 13, fontWeight: '600' }, choice: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 18, marginBottom: 13, gap: 13 }, choiceSelected: { borderColor: colors.primary, backgroundColor: '#17162D' }, choiceIcon: { width: 48, height: 48, borderRadius: 15, backgroundColor: colors.surfaceElevated, alignItems: 'center', justifyContent: 'center' }, choiceIconSelected: { backgroundColor: colors.primarySoft }, choiceSymbol: { color: '#B8AEFF', fontSize: 27 }, choiceCopy: { flex: 1 }, choiceTitle: { color: colors.text, fontSize: 15, fontWeight: '800', marginBottom: 5 }, choiceDesc: { color: colors.muted, fontSize: 11 }, radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: '#65708A', alignItems: 'center', justifyContent: 'center' }, radioSelected: { borderColor: colors.primary }, radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  previewFrame: { height: 190, backgroundColor: '#17152F', borderRadius: 20, borderWidth: 1, borderColor: '#3A3567', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 24 }, previewGlow: { position: 'absolute', width: 180, height: 180, borderRadius: 100, backgroundColor: '#30275D', opacity: 0.7 }, previewSymbol: { width: 66, height: 66, borderRadius: 22, backgroundColor: '#332A69', alignItems: 'center', justifyContent: 'center', marginBottom: 9 }, previewStar: { color: '#C5BDFF', fontSize: 42 }, previewTitle: { color: colors.text, fontSize: 12, fontWeight: '900', letterSpacing: 3 }, previewCaption: { color: '#A69EE0', fontSize: 9, letterSpacing: 1.5, marginTop: 5 }, playCircle: { position: 'absolute', right: 16, bottom: 15, width: 34, height: 34, borderRadius: 18, backgroundColor: '#FFFFFF20', alignItems: 'center', justifyContent: 'center' }, playIcon: { color: '#FFFFFF', fontSize: 12 }, fieldLabel: { color: colors.muted, fontSize: 9, fontWeight: '800', letterSpacing: 1.8, marginBottom: 9 }, summaryCard: { backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14, marginBottom: 18 }, summaryText: { color: colors.text, fontSize: 13, lineHeight: 20 }, stylePill: { alignSelf: 'flex-start', backgroundColor: colors.primarySoft, borderRadius: 18, paddingHorizontal: 13, paddingVertical: 8 }, stylePillText: { color: '#C9C1FF', fontSize: 12, fontWeight: '700' }, demoNote: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 18 }, secondaryButton: { height: 52, borderRadius: 15, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginTop: 16 }, secondaryText: { color: colors.text, fontSize: 13, fontWeight: '700' },
});
