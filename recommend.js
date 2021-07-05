// For full API documentation, including code examples, visit https://wix.to/94BuAAs
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';
$w.onReady(()=>{
	wixUsers.currentUser.getEmail().then(email=>{
		let userEmail=email;
		wixData.query("PersonalData").eq("email",userEmail).limit(1).find().then(results=>{
			let self=results.items[0];
			wixData.query("PersonalData").limit(1000).find().then(results2=>{
				let simList=[];
				let wenkeList=["Philosophy","Archaeology","Architecture","Economy","Sociology"];
				//let likeList=["Mathematics","Computer Science","Engineering"];
				results2.items.forEach(item=>{
					let sim=0; let citySim=0; let futureMajorSim=0; let countrySim=0; let schoolTypeSim=0; 
					let englishSim=0; let japaneseSim=0; let codingSim=0;
					let cityWeight=0.1; 
					let futureMajorWeight=0.22; 
					let countryWeight=0.18; 
					let schoolTypeWeight=0.23; 
					let interestWeight=0.09;//*3

					// if (item.city===self.city) {
					// 	citySim=1;			
					// }else{
					// 	citySim=0;
					// }
					
					if (item.futureMajor===self.futureMajor) {
						futureMajorSim=1;
					} else {
						if ((wenkeList.indexOf(self.futureMajor)>=0 && wenkeList.indexOf(item.futureMajor)>=0)
						||(wenkeList.indexOf(self.futureMajor)<0 && wenkeList.indexOf(item.futureMajor)<0)) {
							futureMajorSim=0.45;
						} else {
							futureMajorSim=0;
						}
					}

					if (item.country===self.country) {
						countrySim=1;
					} else {
						countrySim=0;
					}

					if (item.schoolType===self.schoolType) {
						schoolTypeSim=1;
					} else {
						if (item.schoolType.length>=12 && self.schoolType.length>=12) {
							schoolTypeSim=0.62;
						} else {
							schoolTypeSim=0;
						}
					}

					if (item.english === self.English) {
						englishSim=1;
					} else {
						englishSim=0;
					}

					if (item.japanese === self.japanese) {
						japaneseSim=1;
					} else {
						japaneseSim=0;
					}

					if (item.coding === self.coding) {
						codingSim=1;
					} else {
						codingSim=0;
					}

					sim=citySim*cityWeight + futureMajorSim*futureMajorWeight + countrySim*countryWeight + schoolTypeSim*schoolTypeWeight
					+ (englishSim+japaneseSim+codingSim)*interestWeight;
					sim=Number(sim.toFixed(3));

					simList.push({"email":item.email,"sim":sim});

				})
				simList.sort(function(a,b){
					return b.sim - a.sim;
				})
				
				simList=simList.slice(0,100)
				let emailList=[];
				simList.forEach(item=>{
					emailList.push(item.email);
				})
				wixData.query("RatingList").hasSome("email", emailList).limit(1000).find().then(results3=>{
					//let courseList=[];
					let courseRatingList=[];
					let emailCourseList=results3.items;
					emailCourseList.forEach(item=>{
						//let index=courseList.indexOf(item.course);
						if (item.rating>=0) {
							let index=courseRatingList.findIndex(element=>element.course===item.course);
							if (index<0) {
								//courseList.push(item.course);
								courseRatingList.push({"course":item.course,"rating":item.rating.toFixed(1),"count":1});							
							}else{
								courseRatingList[index].rating=(courseRatingList[index].rating*courseRatingList[index].count+item.rating)/(courseRatingList[index].count+1);
								courseRatingList[index].count=courseRatingList[index].count+1;
								courseRatingList[index].rating=courseRatingList[index].rating.toFixed(1);
							}
						}
						
					})

					wixData.query('RatingList').eq('email',userEmail).limit(1000).find().then(results5 => {
						results5.items.forEach(item =>{
							let index3 = courseRatingList.findIndex(element=>element.course===item.course)
							if(index3 >= 0){
								courseRatingList.splice(index3,1);
							}
						})

						for (var i = courseRatingList.length-1; i >=0; i--) {
							if (courseRatingList[i].count<=1) {
								courseRatingList.splice(i,1);
							}
						}


						courseRatingList.sort(function(a,b) {
							return b.rating - a.rating;
						})						

						courseRatingList=courseRatingList.slice(0, 5);
						let displayList=[];
						courseRatingList.forEach(item=>{
							displayList.push(item.course);
						})

						wixData.query("CourseList").hasSome("courseName", displayList).find().then(results4=>{
							$w('#repeater1').data= results4.items;
							$w('#repeater1').onItemReady(($item,itemData,index)=>{
								let index2=courseRatingList.findIndex(element=>element.course===itemData.courseName);
								$item('#ratingText').text=courseRatingList[index2].rating.toString();
								$item('#countText').text=courseRatingList[index2].count.toString();
							})
							//$item('#ratingText').text = courseRatingList[index].rating.toFixed(1).toString();
							//$item('#countText').text = courseRatingList[index].count.toString(10);
							$w('#repeater1').expand();
						})
					})
				})
			})
		})
	})
});

export function myCoursesButton_click(event) {
	// Add your code for this event here: 
	wixLocation.to('/courses');
}

export function courseButton_click(event,$w) {
	// Add your code for this event here: 
	wixUsers.currentUser.getEmail().then(email=>{
		let userEmail = email;
		let item=$w('#CourseDataSet').getCurrentItem();
		let toInsert={"email":userEmail,"course":item.courseName,"rating":(-1)}
		wixData.insert("RatingList", toInsert);
		$w('#courseButton').label="Successful!";
		$w('#courseButton').disable();
	})
}