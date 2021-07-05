import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(()=>{
	wixUsers.currentUser.getEmail().then(email=>{
		//$w('#repeater1').collapse();
		let userEmail=email;
		$w('#matchButton').onClick(()=>{
			let department=$w('#departmentDropdown').value;
			let attribute=$w('#attributeDropdown').value;
			let city=$w('#cityDropdown').value;
			let day=$w('#dayDropdown').value;
			let start=$w('#startHour').value;
			let end=$w('#endHour').value;
			
			let departmentQuery;
			let attributeQuery;
			let cityQuery;
			let dayQuery;
			let startQuery;
			let endQuery;
			let finalQuery;

			if (department.length===0) {
				departmentQuery=wixData.query('CourseList');
			} else {
				departmentQuery=wixData.query('CourseList').eq("department", department);
			}

			if (attribute.length===0) {
				attributeQuery=wixData.query('CourseList');
			} else {
				attributeQuery=wixData.query('CourseList').eq("attribute", attribute);
			}

			if (city.length===0) {
				cityQuery=wixData.query('CourseList');
			} else {
				cityQuery=wixData.query('CourseList').eq("city", city);
			}

			if (day.length===0) {
				dayQuery=wixData.query('CourseList');
			} else {
				dayQuery=wixData.query('CourseList').eq("day", day);
			}

			if (start.length===0) {
				startQuery=wixData.query('CourseList');
			} else {
				startQuery=wixData.query('CourseList').gt("startHour",start).or(wixData.query('CourseList').eq("startHour", start));
			}

			if (end.length===0) {
				endQuery=wixData.query('CourseList');
			} else {
				endQuery=wixData.query('CourseList').lt("endHour", end).or(wixData.query('CourseList').eq("endHour", end));
			}

			finalQuery=departmentQuery.and(attributeQuery).and(cityQuery).and(dayQuery).and(startQuery).and(endQuery);
			finalQuery.limit(10).find().then(results=>{
				if (results.items.length>0) {
					$w('#message').text="Match Results:"				
				} else {
					$w('#message').text="No Match Result"
				}
				$w('#repeater1').data=results.items;
				$w('#repeater1').forEachItem(($item,itemData,index)=>{
					let courseName=itemData.courseName;
					wixData.query("RatingList").eq("email", userEmail).eq("course",courseName).find().then(results2=>{
						if (results2.items.length===0) {
							$item('#courseButton').label="Register for class";
							$item('#courseButton').enable();
						} else {
							$item('#courseButton').label="Already Registered";
							$item('#courseButton').disable();
						}
					})
				})
				$w('#repeater1').expand();
			})
		})
		$w('#resetButton').onClick(()=>{
			$w('#departmentDropdown').value="";
			$w('#attributeDropdown').value="";
			$w('#cityDropdown').value="";
			$w('#dayDropdown').value="";
			$w('#startHour').value="";
			$w('#endHour').value="";
		})
		$w('#container1').onClick(()=>{
			let item=$w('#courseList').getCurrentItem();

			
		})
	})
	
})

export function courseButton_click(event,$w) {
	wixUsers.currentUser.getEmail().then(email=>{
		let userEmail=email;
		let item=$w('#courseList').getCurrentItem();
		let toInsert={"email":userEmail,"course":item.courseName,"rating":(-1)}
		wixData.insert("RatingList", toInsert);
		$w('#courseButton').label="Successful!";
		$w('#courseButton').disable();
		
	})
}

export function myCoursesButton_click(event) {
	wixLocation.to('/courses');
}