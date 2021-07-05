// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
	$w('#text1').text="Message";
	// TODO: write your page related code here...
	$w('#registerButton').onClick(()=>{
		let email = $w('#emailInput').value;
		let password = $w('#passwordInput').value;
		let confirm = $w('#confirmInput').value;
		//获取用户输入
		if (password == confirm){//判断两次输入密码是否一致
			//若密码一致
			//console.log("True");
			wixUsers.register(email, password)
			.then(()=>{
				$w('#text1').text="Successful! Pls Wait!";
				wixUsers.login(email,password)
				.then(()=>{
					let toInsert={
					"email":email,
					"city":'',
					"futureMajor":'',
					"country":'',
					"schoolType":'',
					"grade":'',
					"english":false,
					"japanese":false,
					"coding":false
					}
					wixData.insert("PersonalData",toInsert).then(result=>{
						let item=result;
						wixLocation.to("/profilecreation");
					});
				})
			}
			,()=>{
				$w('#text1').text="Please adjust your input!";
			}
			)
		}
		else{//如果密码两次输入不一致
			//console.log("False");
			//清空输入
			$w('#passwordInput').value = "";
			$w('#confirmInput').value = "";
			//提示重新输入
			$w('#passwordInput').placeholder = "Passwords are not the same!";
			$w('#confirmInput').placeholder = "Please enter again";
		}
	})

});