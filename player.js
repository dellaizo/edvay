const playBtn = document.getElementById('playBtn');
  const audio = document.getElementById('previewAudio');

  let isPlaying = false;

  playBtn.addEventListener('click', () => {
    if (!isPlaying) {
      audio.play();
      playBtn.innerHTML = '&#10073;&#10073;'; // иконка паузы
    } else {
      audio.pause();
      playBtn.innerHTML = '&#9658;'; // иконка play
    }
    isPlaying = !isPlaying;
  });

  audio.addEventListener('ended', () => {
    playBtn.innerHTML = '&#9658;';
    isPlaying = false;
  });