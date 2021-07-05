// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(()=>{
	if (wixUsers.currentUser.loggedIn) {
		$w('#logbutton').label='Log out';
		$w('#profileButton').enable();
		$w('#logbutton').onClick(()=>{
			wixUsers.logout()
			
		})
		
		$w('#profileButton').onClick(()=>{
			wixLocation.to('/profile-page');
		})
	}else{
		$w('#logbutton').label=('Register / Log In');
		$w('#logbutton').onClick(()=>{
			wixLocation.to('https://1900012921.wixsite.com/e-pedia');
			
		})
		$w('#profileButton').disable();
	}
	$w('#refreshButton').onClick(()=>{
		wixLocation.to(wixLocation.url);
	})
})