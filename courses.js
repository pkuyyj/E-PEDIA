// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
	wixUsers.currentUser.getEmail().then((email)=>{
		let userEmail = email;
		let completedItems = [];
		let registeredNames = [];
		let registeredItems = [];
		wixData.query('RatingList').eq('email', userEmail).find().then((results)=>{
			results.items.forEach(item=>{
				if(item.rating >= 0){
					completedItems.push(item);
				}
				else{
					registeredNames.push(item.course);
				}
			})
			$w('#completedRepeater').data = completedItems;
			

			wixData.query('CourseList').hasSome('courseName', registeredNames).find().then(results2=>{
				results2.items.forEach(item2=>{
					registeredItems.push(item2);
				})
				$w('#registeredRepeater').data = registeredItems;
			})
		})
		$w('#completedRepeater').onItemReady(($item,itemData,index)=>{
			let courseName=itemData.course;
			wixData.query('CourseList').eq('courseName', courseName).find().then(results=>{
				$item('#instructorText').text = results.items[0].teacher;
			})
		})
		$w('#completedRepeater').expand();
		$w('#registeredRepeater').expand();
	})
});



export function dropButton_click(event,$w) {
	// Add your code for this event here: 
	wixUsers.currentUser.getEmail().then(email=>{
		let userEmail = email;
		let id;
		let item = $w('#dataset2').getCurrentItem();
		wixData.query('RatingList').eq('email', userEmail).eq('course', item.courseName).find().then(results=>{
			id = results.items[0]._id;
			wixData.remove('RatingList', id);
		})
		$w('#completeButton').disable();
		$w('#dropButton').label = "Dropped!";
		$w('#dropButton').disable();
	})
				
}

export function completeButton_click(event,$w) {
	// Add your code for this event here: 
	wixUsers.currentUser.getEmail().then(email=>{
		let userEmail=email;
		let item=$w('#dataset2').getCurrentItem();
		let course=item.courseName;
		if($w('#completeButton').label === "SUBMIT"){
			wixData.query('RatingList').eq('email', userEmail).eq('course', course).find().then(results=>{
				let id;
				let rating = parseInt($w('#ratingDropdown').value, 10);
				id = results.items[0]._id;
				$w('#text14').text=id;
				let toSave = {
					"_id":id,
					"email":userEmail,
					"course":course,
					"rating":rating
				};
				wixData.save("RatingList", toSave).then(()=>{});
			})
			$w('#dropButton').disable();
			$w('#completeButton').label = "Rated!";
			$w('#completeButton').disable();
			$w('#ratingDropdown').collapse();
		}
		else{
			$w('#dropButton').disable();
			$w('#completeButton').label = "SUBMIT";
			$w('#ratingDropdown').expand();
		}
})
	

}

export function hideButton_click(event) {
	// Add your code for this event here:
	 if ($w('#hideButton').label==="Hide") {
		$w('#completedRepeater').collapse();
		$w('#hideButton').label="Show";
	 } else {
		$w('#completedRepeater').expand();
		$w('#hideButton').label="Hide";
	 }
}

export function matchButton_click(event) {
	wixLocation.to('/match'); 
}

export function recommendationButton_click(event) {
	// Add your code for this event here: 
	wixLocation.to('/recommend');
}