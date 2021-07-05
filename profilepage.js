// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
	wixUsers.currentUser.getEmail().then((email)=>{
		//获取个人信息
		let userEmail = email;
		wixData.query('PersonalData').eq('email', userEmail).find().then(results=>{
			$w('#emailText').text = results.items[0].email;
			$w('#cityText').text = results.items[0].city;
			$w('#majorText').text = results.items[0].futureMajor;
			$w('#countryText').text = results.items[0].country;
			$w('#schoolTypeText').text = results.items[0].schoolType;
			$w('#gradeText').text = results.items[0].grade;

			if(results.items[0].english){
				$w('#englishText').expand();
			}
			else{
				$w('#englishText').collapse();
			}

			if(results.items[0].japanese){
				$w('#japaneseText').expand();
			}
			else{
				$w('#japaneseText').collapse();
			}

			if(results.items[0].coding){
				$w('#codingText').expand();
			}
			else{
				$w('#codingText').collapse();
			}
		})

		$w('#editButton').onClick(()=>{
			wixLocation.to('/profilecreation');
		})
		
		$w('#matchButton').onClick(()=>{
			wixLocation.to('/match');
		})
	})
	
});

export function myCoursesButton_click(event) {
	// Add your code for this event here: 
	wixLocation.to('/courses');
}

export function recommendationButton_click(event) {
	// Add your code for this event here: 
	wixLocation.to('/recommend');
}