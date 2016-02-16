/*TypeScript = JavaScript+Types
//Slides : tiny.cc/angular2typescript
//http://slides.com/jimthedev/getting-started-with-angular-2-and-typescript#/0/8

	Superet

		TypeScrit:
		Compile TypeScript to Javascript (or show errors)
		Analyzes code to help IDEs/Editors
*/


//00=========
//Start with a class
 export class Person {}

//01=========

import {Component} from 'angular2/angular2';

@Component({
	//Add a selector 
	selector: 'person'
})
//Start with a class
 export class Person {}

//Selector : person people-list
//Usage : <person> <people-list>

//02=========
import {Component} from 'angular2/angular2';

@Component({
	//Add a selector 
	selector: 'person',
	//Add a template HTML 
	template: `
		<skin>Brown</skin>
		<eyes>Red</eyes>
	`,
	//Add a CSS styles 
	styles: `
		skin { height: 150px; }
		eyes { border-radius: 50%; }
	`
})
//Start with a class
 export class Person {}

//03=========So what did we gain?
import {Component} from 'angular2/angular2'; //Explicit dependencies
@Component({
	selector: 'person',//clear external API
	template: `//An internal structure composed from other components
		<skin>Brown</skin>
		<eyes>Red</eyes>
	`,
	styles: `//Ability to visually style direct children
		skin { height: 150px; }
		eyes { border-radius: 50%; }
	`
})
 export class Person {} // A place to define internal functionality

//04=========
import {Component} from 'angular2/angular2';
//Import child components 
import {SkinComponent} from '../skin/skin.component'; 
import {EyesComponent} from '../eyes/eyes.component'; 
@Component({
	selector: 'person',
	//Import child components 
	directives: [
		HairComponent,
		EyesComponent
	],
	template: `
		<skin [color]="'Brown'"></skin>
		<eyes [color]="'Red'"></eyes>
	`,
	styles: `
		skin { height: 150px; }
		eyes { border-radius: 50%; }
	`
})
 export class Person {} 

//05=========Handling user interaction
import {Component} from 'angular2/angular2';
import {SkinComponent} from '../skin/skin.component'; 
import {EyesComponent} from '../eyes/eyes.component'; 
@Component({
	selector: 'person',
	directives: [
		HairComponent,
		EyesComponent
	],
	template: `
		<skin [color]="'Brown'"></skin>
		<eyes [color]="'Red'"(blink)="blinked($event)"></eyes> //Interaction trigger events
	`,
	styles: `
		skin { height: 150px; }
		eyes { border-radius: 50%; }
	`
})
 export class Person {
 	blinked(eyeColor: string) {//Components may handle events from their children
 		console.log(eyeColor); // 'Red'
 	}
 } 


//06=========Eyes should blink when clicked
import {Component} from 'angular2/angular2';
@Component({
	selector: 'eyes',
	outputs: ['blink'],//Components emit out put envents up to their parent components.
	inputs: ['color'],//Components receive inbound data passed down from their parent.
	template: `
		<eye (click)="blink(color)"></eye> //Detect a click, then call blink(), passing it color
		<eye (click)="blink(color)"></eye>
	`,
	styles: `
		skin { height: 150px; }
		eyes { border-radius: 50%; }
	`
})
 export class EyesComponent {}

 //07=========Play with Angular2 today
 /*
 	Get an example project
 git clone https://github.com/pkozlowski-opensource/ng2-play

	Set it up
npm i -g gulp
npm i
	Run it
gulp play
	See it
Browse to: http://localhost:9000

 */


//08=========Hello, nameGroupe
//JavaScript
var nameGroupe = 'EOMO_G';
console.log('Hello,'+ nameGroupe +'!');
// > Hello, EOMO_G

//TypeScript
var nameGroupe: string = 'G_EOMO';
console.log('Hello,'+ nameGroupe +'!');
// > Hello, G_EOMO

//09=========Classes
//JavaScript
class Person {
    constructor(name) {
        this.name = name;
    }
    greet() {
        return 'My name is ' + this.name;
    }
}

var annabelle = new Person('Annabelle');

console.log(annabelle.greet());
// > My name is Annabelle

