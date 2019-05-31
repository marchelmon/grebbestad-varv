import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ContactPage } from '../contact/contact.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	contact;

	constructor(
		public main: MainService, 
		private navCtrl: NavController, 
		private router: Router,
	) {
	}

	calcTotal() {
		if(this.main.length && this.main.width && this.main.weight) {
			this.main.sumInside = this.formatPrice(this.calculateSpaceCost(750) + this.calculateWeightCost() + this.main.miljoAvg) + " SEK";
			this.main.sumOutside = this.formatPrice(this.calculateSpaceCost(350) + this.calculateWeightCost() + this.main.miljoAvg) + " SEK";
		} else {
			this.main.sumInside = "";
			this.main.sumOutside = "";
		}
	}

	calcSize() {
		if(this.main.length && this.main.width) {
			if(this.main.weight) {
				this.calcTotal();
			}
			this.main.inside = this.formatPrice(this.calculateSpaceCost(750));
			this.main.outside = this.formatPrice(this.calculateSpaceCost(350));
		} else {
			this.main.inside = "";
			this.main.outside = "";			
		}		
	}

	calcWeight() {
		if(this.main.length && this.main.width && this.main.weight) {
			this.calcTotal();
		}
		this.main.handle = this.formatPrice(this.calculateWeightCost());		
	}

	//Calculate number of m2 from input
	calculateSpaceCost(cost: number) {
		return this.main.length * (this.main.width + 0.5) * cost;
	}

	//Calculate weight cost
	calculateWeightCost() {
		if(this.main.weight < 2) {
			return 3100;
		} else if(this.main.weight < 4) {
			return 4600;
		} else if (this.main.weight < 6) {
			return 5400;
		} else if(this.main.weight < 8) {
			return 7000;
		} else if (this.main.weight < 10) {
			return 7800;
		} else if(this.main.weight < 12) {
			return 8600;
		} else if (this.main.weight < 14) {
			return 10000;
		} else if(this.main.weight < 16) {
			return 10800;
		} else if (this.main.weight < 18) {
			return 11600;
		} else if(this.main.weight < 20) {
			return 12000;
		} else if (this.main.weight < 30) {
			return 0; //KOLLA UPP
		}
		return 0;
	}

	//Format prices eg. 10000 -> 10 000
	formatPrice(price: number) {
		let p = price.toString();
		if(price > 999) {
			if(price > 9999) {
				if(price > 99999) {
					return p.slice(0, 3) + " " + p.slice(3);				
				} else {
					return p.slice(0, 2) + " " + p.slice(2);
				}
			} else {
				return p.slice(0, 1) + " " + p.slice(1);
			}
		}
		return p;
	}

  mailaOffert() {
  	let weight = this.main.weight + " - " + this.main.weight + 2;
	let body = `
		Kundnamn: ${this.main.name}<br>
		Telefonnummer: ${this.main.phone}<br>
		Email: ${this.main.mail}<br>
		Adress: ${this.main.adress}<br>
		Postnummer: ${this.main.zip} <br>
		Ort: ${this.main.ort}
		<br><br>
		<strong>Båtmodell:</strong> ${this.main.model}<br>
		Längd: ${this.main.length}<br>
		Bredd: ${this.main.width}<br>
		Vikt: ${weight} ton
		<br><br>
		Inomhusförvaring<br>
		Yta (750 SEK/m2): ${this.main.inside}<br>
		Hanteringskostnad: ${this.main.handle}<br>
		Miljöavgift: ${this.main.miljoAvg}<br>
		Summa: ${this.main.sumInside} (Inkl. moms)
		<br><br>
		Utomhusförvaring<br>
		Yta (350 SEK/m2): ${this.main.outside}<br>
		Hanteringskostnad: ${this.main.handle}<br>
		Miljöavgift: ${this.main.miljoAvg}<br>
		Summa: ${this.main.sumOutside} (Inkl. moms)
		<br><br>
		Övrig information<br>
		${this.main.ovrigt}
	`

	//this.emailComposer.open()
	/*

  	this.emailComposer.isAv.canShareViaEmail().then(()=> {
  		this.socialSharing.shareViaEmail(body, 'Vinterförvaring offert', ['micke@grebbestadvarv.se']).then(() => {

  		})
  		.catch(error => {
  			console.log("error");
  		});
  	}).catch(err => {
  		alert("EEEEError:");
  	});
  	*/
  }


}







