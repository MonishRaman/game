import { Howl } from 'howler';

// Sound effects from mixkit.co (free sound effects)
const sounds = {
  correct: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2190/2190-preview.mp3'],
    volume: 0.5
  }),
  wrong: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2205/2205-preview.mp3'],
    volume: 0.3
  }),
  levelUp: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'],
    volume: 0.4
  }),
  click: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'],
    volume: 0.2
  }),
  notification: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/1513/1513-preview.mp3'],
    volume: 0.3
  })
};

export const playSound = (soundName: keyof typeof sounds) => {
  sounds[soundName].play();
};

export const stopSound = (soundName: keyof typeof sounds) => {
  sounds[soundName].stop();
};