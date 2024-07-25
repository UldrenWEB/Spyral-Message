import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private song = new BehaviorSubject<Song>({} as Song);

  constructor() {}

  setSong(song: Song) {
    this.song.next(song);
  }

  getSong() {
    return this.song.asObservable();
  }
}
