import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StateService } from '../../providers/state.service';

@Component({
    selector: 'page-results',
    templateUrl: 'results.html'
})
export class ResultsPage {

    constructor(public navCtrl: NavController, public stateService: StateService) {

    }

    searchClicked(): void {
        this.navCtrl.parent.select(2);
        this.stateService.search();
    };

}
