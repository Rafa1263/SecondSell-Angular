import { Component } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {
  displayOfferPannel() {
    document.getElementById("showPannel")?.classList.add("displayed")
  }
  sendOffer() {
    let message = {

    }
  }
}
