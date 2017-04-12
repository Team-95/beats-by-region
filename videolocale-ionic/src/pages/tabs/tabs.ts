import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { FiltersPage } from '../filters/filters';
import { ResultsPage } from '../results/results';
import { StateService } from '../../providers/state.service';

@Component({
    templateUrl: 'tabs.html',
    providers: [StateService]
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = MapPage;
    tab2Root: any = FiltersPage;
    tab3Root: any = ResultsPage;

    constructor() {

    }
}
