import { Component, OnInit } from '@angular/core';
import { StorageService } from './service/StorageService';
import { LoaderService } from './service/LoaderService';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading$ = this.loaderService.isLoading$;

  constructor(
    private loaderService: LoaderService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {  
    await this.storageService.init();    
  }
}
