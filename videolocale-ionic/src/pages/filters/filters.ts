import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StateService } from '../../providers/state.service';

@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html'
})
export class FiltersPage {

  constructor(public navCtrl: NavController, public stateService: StateService) {

  };

  searchClicked(): void {
      this.navCtrl.parent.select(2);
      this.stateService.search();
  };

}
