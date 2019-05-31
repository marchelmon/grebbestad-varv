import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { NavController, Platform } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(
  	public main: MainService, 
  	private navCtrl: NavController,
  	private platform: Platform,
  	private emailComposer: EmailComposer,
  	private socialSharing: SocialSharing 
  ) { }

  name: string;
  mail: string;
  zip: number;
  adress: string;
  phone: string;
  ort: string;

  ngOnInit() {
  	alert
  }

  toHome() {
  	this.navCtrl.pop();
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

  	this.socialSharing.canShareViaEmail().then(()=> {
  		this.socialSharing.shareViaEmail(body, 'Vinterförvaring offert', ['micke@grebbestadvarv.se']).then(() => {

  		})
  		.catch(error => {
  			console.log("error");
  		});
  	}).catch(err => {
  		alert("EEEEError:");
  	});
  }
}
