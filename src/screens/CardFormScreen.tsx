import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppData } from '../context/AppDataContext';
import { Card } from '../models/types';
import { palette } from '../constants/colors';
import { Picker } from '@react-native-picker/picker';
import { useLocale } from '../hooks/useLocale';

export const CardFormScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'CardForm'>>();
  const { data, upsertCard, createId } = useAppData();
  const { t, isRTL } = useLocale();
  const editingCard = data?.cards.find((c) => c.id === route.params?.cardId);

  const [labelAr, setLabelAr] = useState(editingCard?.labelAr ?? '');
  const [labelEn, setLabelEn] = useState(editingCard?.labelEn ?? '');
  const [categoryId, setCategoryId] = useState(editingCard?.categoryId ?? data?.categories[0]?.id ?? 'core');
  const [color, setColor] = useState(editingCard?.color ?? '#FFF8E1');
  const [isCore, setIsCore] = useState(editingCard?.isCore ?? false);
  const [imageUri, setImageUri] = useState<string | undefined>(editingCard?.imageUri);
  const [audioUri, setAudioUri] = useState<string | undefined>(editingCard?.audioUri);
  const recording = useRef<Audio.Recording | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<string>('');
  const directionStyle = isRTL ? styles.inputRtl : styles.inputLtr;

  useLayoutEffect(() => {
    navigation.setOptions({ title: t('cardFormTitle') });
  }, [navigation, t]);

  useEffect(() => {
    return () => {
      if (recording.current) {
        recording.current.stopAndUnloadAsync();
      }
    };
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const startRecording = async () => {
    const permission = await Audio.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('السماح بالتسجيل', 'يرجى تفعيل إذن الميكروفون للتسجيل');
      return;
    }
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const { recording: rec } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    recording.current = rec;
    setRecordingStatus('Recording...');
  };

  const stopRecording = async () => {
    if (!recording.current) return;
    await recording.current.stopAndUnloadAsync();
    const uri = recording.current.getURI();
    if (uri) setAudioUri(uri);
    setRecordingStatus('');
  };

  const saveCard = async () => {
    if (!labelAr.trim()) {
      Alert.alert('', t('requiredArLabel'));
      return;
    }
    const now = Date.now();
    const card: Card = {
      id: editingCard?.id ?? createId(),
      labelAr: labelAr.trim(),
      labelEn: labelEn.trim() || undefined,
      categoryId,
      color,
      isCore,
      imageUri,
      iconName: editingCard?.iconName,
      audioUri,
      createdAt: editingCard?.createdAt ?? now,
      updatedAt: now,
    };
    await upsertCard(card);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.label, directionStyle]}>{t('arName')}</Text>
        <TextInput
          style={[styles.input, isRTL ? styles.inputRtl : styles.inputLtr]}
          value={labelAr}
          onChangeText={setLabelAr}
          placeholder={t('arName')}
          textAlign={isRTL ? 'right' : 'left'}
        />

        <Text style={[styles.label, directionStyle]}>{t('enName')}</Text>
        <TextInput
          style={[styles.input, isRTL ? styles.inputRtl : styles.inputLtr]}
          value={labelEn}
          onChangeText={setLabelEn}
          placeholder={t('enName')}
          textAlign={isRTL ? 'right' : 'left'}
        />

        <Text style={[styles.label, directionStyle]}>{t('categoryName')}</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={categoryId}
            onValueChange={(val) => setCategoryId(val.toString())}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            {data?.categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.nameAr} value={cat.id} />
            ))}
          </Picker>
        </View>

        <View style={[styles.rowBetween, isRTL ? styles.rowRtl : styles.rowLtr]}>
          <Text style={[styles.label, directionStyle]}>{t('coreWord')}</Text>
          <Switch value={isCore} onValueChange={setIsCore} />
        </View>

        <Text style={[styles.label, directionStyle]}>{t('color')}</Text>
        <TextInput
          style={[styles.input, isRTL ? styles.inputRtl : styles.inputLtr]}
          value={color}
          onChangeText={setColor}
          placeholder="#FFF8E1"
        />

        <Text style={[styles.label, directionStyle]}>{t('image')}</Text>
        <View style={[styles.rowBetween, isRTL ? styles.rowRtl : styles.rowLtr]}>
          <TouchableOpacity style={styles.smallBtn} onPress={pickImage}>
            <Text>{t('pickFromGallery')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallBtn} onPress={takePhoto}>
            <Text>{t('takePhoto')}</Text>
          </TouchableOpacity>
        </View>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

        <Text style={[styles.label, directionStyle]}>{t('recordAudio')}</Text>
        <View style={[styles.rowBetween, isRTL ? styles.rowRtl : styles.rowLtr]}>
          <TouchableOpacity style={styles.smallBtn} onPress={startRecording}>
            <Text>{t('startRecording')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallBtn} onPress={stopRecording}>
            <Text>{t('stop')}</Text>
          </TouchableOpacity>
        </View>
        {!!recordingStatus && <Text style={styles.status}>{recordingStatus}</Text>}
        {audioUri && <Text style={styles.status}>{t('customRecordingSaved')}</Text>}

        <TouchableOpacity style={styles.saveBtn} onPress={saveCard} accessibilityRole="button">
          <Text style={styles.saveText}>{t('save')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    padding: 16,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  rowBetween: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowRtl: {
    flexDirection: 'row-reverse',
  },
  rowLtr: {
    flexDirection: 'row',
  },
  inputRtl: {
    writingDirection: 'rtl',
  },
  inputLtr: {
    writingDirection: 'ltr',
  },
  smallBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  preview: {
    width: '100%',
    height: 140,
    borderRadius: 12,
  },
  status: {
    color: palette.muted,
  },
  saveBtn: {
    backgroundColor: palette.primary,
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
});
