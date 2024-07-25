import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { MusicPlayerService, AudioPlayer } from "src/app/service/MusicPlayerService";
import { StorageService } from "src/app/service/StorageService";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-item',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true
})
export class MessageItemComponent implements OnInit, OnDestroy {
  user: { id: string, username: string, email: string, image: string } = {
    id: '',
    username: '',
    email: '',
    image: ''
  };
  isPlaying: boolean = false;
  currentProgress: number = 0;
  duration: number = 0;
  private subscriptions: Subscription = new Subscription();
  private player: AudioPlayer;
  private isSeeking: boolean = false;

  constructor(
    private storageService: StorageService,
    private playerService: MusicPlayerService
  ) {
    this.player = this.playerService.createPlayer();
  }

  async ngOnInit(): Promise<void> {
    const result = await this.storageService.get('user');
    const { user } = JSON.parse(result);
    this.user = user;

    this.subscriptions.add(
      this.player.isPlaying$.subscribe(isPlaying => {
        this.isPlaying = isPlaying;
      })
    );

    this.subscriptions.add(
      this.player.currentTime$.subscribe(currentTime => {
        if (!this.isSeeking) {
          this.currentProgress = currentTime;
        }
      })
    );

    this.subscriptions.add(
      this.player.duration$.subscribe(duration => {
        if (!isNaN(duration) && isFinite(duration)) {
          this.duration = duration;
        } else {
          this.duration = 0;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.player.stop(); // Ensure the player is stopped on component destruction
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.player.pause();
    } else if (this.multimedia?.url) {
      this.player.play({ url: this.multimedia.url });
    }
  }

  @Input() id: string = '';
  @Input() userEmitter: { id: string, name: string } = { id: '', name: '' };
  @Input() multimedia: { url: string, type: 'audio' | 'video' | 'image' } | null = null;
  @Input() description: string = '';
  @Input() timestamp: string = '2023-07-21T14:48:00.000Z';

  isCurrentUser(): boolean {
    return this.user.id === this.userEmitter.id;
  }

  onRangeChange(event: any) {
    const newTime = event.detail.value;
    this.isSeeking = false;
    this.player.seekTo(newTime);
  }

  onRangeInput(event: any) {
    const newTime = event.detail.value;
    this.isSeeking = true;
    this.currentProgress = newTime;
  }

  convertirSegundosAFormatoMinutos(segundos: number): string {
    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = Math.round(segundos % 60);
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
    return strTime;
  }
}
