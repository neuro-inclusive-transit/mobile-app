import { TNSTextToSpeech, SpeakOptions } from 'nativescript-texttospeech';

const TTS = new TNSTextToSpeech();

let speakOptions: SpeakOptions = {
  text: '',
  speakRate: 0.55,
  locale: 'de-DE',
};

/**
 * Speaks the given text
 * @param text
 * @returns Promise<void> Resolves when speaking is done
 */
export function speak(text: string) {
  speakOptions.text = text;
  return TTS.speak(speakOptions);
}
