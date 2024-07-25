import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  createPlayer(): AudioPlayer {
    return new AudioPlayer();
  }
}

export class AudioPlayer {
  private audio: HTMLAudioElement | null = null;
  currentTime$ = new BehaviorSubject<number>(0);
  duration$ = new BehaviorSubject<number>(0);
  isPlaying$ = new BehaviorSubject<boolean>(false);
  private animationFrameId: any;

  constructor() {
    this.updateProgress = this.updateProgress.bind(this);
  }

  private updateProgress() {
    if (this.audio) {
      this.currentTime$.next(this.audio.currentTime);
      // Verificación de duración infinita
      if (!isNaN(this.audio.duration) && this.audio.duration !== Infinity) {
        this.duration$.next(this.audio.duration);
      }
    }
    this.animationFrameId = requestAnimationFrame(this.updateProgress);
  }

  private stopProgressUpdate() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  play(song: Song) {
    this.stop(); // Asegurarse de detener cualquier reproducción en curso

    if (song && song.url) {
      this.audio = new Audio(song.url);
      this.audio.addEventListener('loadedmetadata', () => {
        // Verificación y establecimiento de duración
        if (this.audio && !isNaN(this.audio.duration) && this.audio.duration !== Infinity) {
          this.duration$.next(this.audio.duration);
        } else {
          console.error('Error: La duración del audio es infinita o no válida.');
        }
      });
      this.audio.play().catch((error) => {
        console.error('Error al reproducir la canción:', error);
      });
      this.audio.addEventListener('ended', this.handleSongEnd.bind(this));

      this.isPlaying$.next(true);

      this.updateProgress();
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.stopProgressUpdate();
      this.isPlaying$.next(false);
    }
  }

  private handleSongEnd() {
    this.stop();
  }

  seekTo(position: number) {
    if (this.audio) {
      this.audio.currentTime = position;
      this.currentTime$.next(position);

      if (this.audio.paused) {
        this.audio.play().catch((error) => {
          console.error('Error al intentar reproducir después de buscar:', error);
        });
        this.updateProgress();
      }
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.stopProgressUpdate();
      this.audio = null;
      this.isPlaying$.next(false);
      this.currentTime$.next(0);
      this.duration$.next(0);
    }
  }
}
