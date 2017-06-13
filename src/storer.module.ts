import { ModuleWithProviders, NgModule } from '@angular/core';
import { IStorerConfig } from './storer.config.interface';
import { Storer } from './storer';

@NgModule({
  providers: [
    Storer
  ]
})
export class StorerModule {
  static withConfig(userConfig: IStorerConfig = {}): ModuleWithProviders {
    return {
      ngModule: StorerModule,
      providers: [
        { provide: 'STORER_CONFIG', useValue: userConfig }
      ]
    }
  }
}
