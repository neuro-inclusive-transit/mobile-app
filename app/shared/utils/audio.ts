import { TNSPlayer, AudioPlayerOptions } from 'nativescript-audio';

const player = new TNSPlayer();

const soundFiles = {
  passiveNotification: '~/media/notification_decorative-01.wav',
  passiveWarn: '~/media/alert_high-intensity.wav',
  hero: '~/media/hero_simple-celebration-03.wav',
};

let playerOptions: AudioPlayerOptions = {
  audioFile: '',
  loop: false,
  errorCallback: function (errorObject: any) {
    console.log(JSON.stringify(errorObject));
  },
  infoCallback: function (args: any) {
    console.log(JSON.stringify(args));
  },
};

/**
 * Plays the given sound file
 * @param soundFile
 * @returns Promise<void> Resolves when playing is done
 * @throws Error if sound file is not found
 */
export function playSound(soundFile: keyof(typeof soundFiles)) {
  playerOptions.audioFile = soundFiles[soundFile];

  console.log('play', playerOptions.audioFile);

  if (player.isAudioPlaying()) {
    player.dispose();
  }

  return new Promise<void>(async (resolve, reject) => {
    playerOptions.completeCallback = () => {
      console.log('play complete');
      resolve();
    };

    player.debug = true;
    player.volume = 1;

    await player.initFromFile(playerOptions);

    await player.play();
  });
}
