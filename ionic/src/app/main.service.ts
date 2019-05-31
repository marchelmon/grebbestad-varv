import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

	length: number;
	width: number;
	weight: number;
	miljoAvg: number = 800;
	model: string = "";

	inside: string = " 0";
	outside: string = " 0";
	handle: string = " 0";
	sumInside: string = "";
	sumOutside: string = "";

	name: string = "";
	mail: string = "";
	zip: string = "";
	adress: string = "";
	phone: string = "";
	ort: string = "";

	ovrigt: string = "";

 	constructor() { }
}
