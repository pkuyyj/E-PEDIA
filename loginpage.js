// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixUsers from 'wix-users';
import wixLocation from 'wix-location';

$w.onReady(function () {
	// TODO: write your page related code here...
    $w('#text1').text="Message";
	if(wixUsers.currentUser.loggedIn){
        $w('#loginButton').disable().then(()=>{
            $w('#emailInput').placeholder="Already Logged In";
            $w('#passwordInput').placeholder="Already Logged In";
        })
    }else{
        $w('#loginButton').enable().then(()=>{
            $w('#emailInput').placeholder="Please Enter Your Email";
            $w('#passwordInput').placeholder="Please Enter Your Password";
        })
    }
	$w('#loginButton').onClick(()=>{
		let email = $w('#emailInput').value;
		let password = $w('#passwordInput').value;

		wixUsers.login(email,password).then(()=>{
            $w('#text1').text="Successful! Pls Wait!";
			wixLocation.to('/profilepage');
		}
        ,()=>{
            $w('#text1').text="Please adjust your input!";
        }
        )
	})
});