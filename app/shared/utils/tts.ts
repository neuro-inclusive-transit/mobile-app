import { TNSTextToSpeech, SpeakOptions } from 'nativescript-texttospeech';

const TTS = new TNSTextToSpeech();

let genericSpeakOptions: Omit<SpeakOptions, 'text'> = {
  speakRate: 0.55,
  locale: 'de-DE',
};

/**
 * Speaks the given text
 * @param text
 * @returns Promise<void> Resolves when speaking is done
 */
export function speak(text: string) {
  let TTS = new TNSTextToSpeech();
  return TTS.speak({
    ...genericSpeakOptions,
    text,
  }).then(() => {
    TTS.destroy();
  });
}
