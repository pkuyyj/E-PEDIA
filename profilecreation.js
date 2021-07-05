import wixUsers from 'wix-users';
import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(()=> {
	// TODO: write your page related code here...
	wixUsers.currentUser.getEmail().then(email=>{
		let userEmail = email;
		$w('#text2').text=userEmail;
		wixData.query("PersonalData").eq('email', userEmail).find().then(results=>{
			
			let id = results.items[0]._id;
			let ci = results.items[0].city;
			let fMajor = results.items[0].futureMajor;
			let country = results.items[0].country;
			let schoolType = results.items[0].schoolType;
			let grade = results.items[0].grade;
			
			$w('#englishCBox').checked = results.items[0].english;
			$w('#japanCBox').checked = results.items[0].japanese;
			$w('#codingCBox').checked = results.items[0].coding;

			


			if(ci.length !== 0){
				$w('#cityInput').placeholder = ci;
			}

			if(fMajor.length !== 0){
				$w('#majorInput').placeholder = fMajor;
			}
			if(country.length !== 0){
				$w('#countryInput').placeholder = country;
			}
			if(schoolType.length !== 0){
				$w('#schoolTypeInput').placeholder = schoolType;
			}
			if(grade.length !== 0){
				$w('#gradeInput').placeholder = grade;
			}

			$w('#submitButton').onClick(()=>{
				let newCity = $w('#cityInput').value;
				let newMajor = $w('#majorInput').value;
				let newCountry = $w('#countryInput').value;
				let newSchType = $w('#schoolTypeInput').value;
				let newGrade = $w('#gradeInput').value;

				let Eng = $w('#englishCBox').checked;
				let Jap = $w('#japanCBox').checked;
				let Cod = $w('#codingCBox').checked;

				if(newCity.length === 0){
					newCity = ci;
				}
				if(newMajor.length === 0){
					newMajor = fMajor;
				}
				if(newSchType.length === 0){
					newSchType = schoolType;
				}
				if(newCountry.length === 0){
					newCountry = country;
				}
				if(newGrade.length === 0){
					newGrade = grade;
				}
				let toUpdate ={
					"_id":id,
					"email":userEmail,
					"city":newCity,
					"futureMajor":newMajor,
					"country":newCountry,
					"schoolType":newSchType,
					"grade":newGrade,
					"english":Eng,
					"japanese":Jap,
					"coding":Cod
				}
				wixData.update("PersonalData", toUpdate);
				wixLocation.to("/profilepage");
			})
		})
	})	
})
	