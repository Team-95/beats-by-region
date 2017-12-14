import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FiltersPage } from '../pages/filters/filters';
import { ResultsPage } from '../pages/results/results';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { StateService } from '../services/state.service';
import { ModalPopup } from '../pages/modal/modal';

@NgModule({
  declarations: [
    MyApp,
    ModalPopup,
    FiltersPage,
    ResultsPage,
    MapPage,
    TabsPage
  ],
  imports: [
      IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModalPopup,
    FiltersPage,
    ResultsPage,
    MapPage,
    TabsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {}
