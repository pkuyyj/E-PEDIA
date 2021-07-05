// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixLocation from 'wix-location'

$w.onReady(function () {
	// TODO: write your page related code here...
	

});

export function registerButton_click(event) {
	// Add your code for this event here: 
	wixLocation.to('/registerpage');
	
}

export function loginButton_click(event) {
	// Add your code for this event here: 
	wixLocation.to('/loginpage');
}