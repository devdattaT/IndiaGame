var selectedFeature;
		var stCodes=["AN","AP","AR","AS","BR","CH","CT","DN","DD","DL","GA","GJ","HR","HP","JK","JH","KA","KL","LD","MP","MH","MN","ML","MZ","NL","OR","PY","PB","RJ","SK","TN","TR","UP","UT","WB"];
		var stNames=["Andaman and Nicobar","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Orissa","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
		
		var map = L.map('map').setView([25, 80], 4);
		
		L.tileLayer('http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
				attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
				subdomains: '1234'
			}).addTo(map);
			

			
			var defStyle = {
							weight: 2,
							color: "#B0DE5C",
							opacity: 1,
							fillColor: "#B0DE5C",
							fillOpacity: 0.3
						};
						
			var correctStyle = {
				weight: 2,
				color: "#B0DE5C",
				opacity: 1,
				fillColor: "#0095ff",
				fillOpacity: 0.8
			};
			
			var WrongStyle = {
				weight: 2,
				color: "#B0DE5C",
				opacity: 1,
				fillColor: "#ff3d31",
				fillOpacity: 0.8
			};
			
			function styleSelector(feature){
				switch (feature.properties.v) {
					case 1: return defStyle;
					case 2: return correctStyle;
					case 0: return WrongStyle;
				}
			}
						
			var sLayer = L.geoJson(states, {style:styleSelector, onEachFeature:onEachFeature}).addTo(map);
			
	function onEachFeature(feature, layer) {
			
			//var i=stCodes.indexOf(st_cd);
			//var st_nm
			var popupContent = 'Select Name: <select onchange="NameSelected(this.value)"><option value="AN">Andaman and Nicobar</option><option value="AP">Andhra Pradesh</option><option value="AR">Arunachal Pradesh</option><option value="AS">Assam</option><option value="BR">Bihar</option><option value="CT">Chhattisgarh</option><option value="CH">Chandigarh</option><option value="DN">Dadra and Nagar Haveli</option><option value="DD">Daman and Diu</option><option value="DL">Delhi</option><option value="GA">Goa</option><option value="GJ">Gujarat</option><option value="HR">Haryana</option><option value="HP">Himachal Pradesh</option><option value="JK">Jammu and Kashmir</option><option value="JH">Jharkhand</option><option value="KA">Karnataka</option><option value="KL">Kerala</option><option value="LD">Lakshadweep</option><option value="MP">Madhya Pradesh</option><option value="MH">Maharashtra</option><option value="MN">Manipur</option><option value="ML">Meghalaya</option><option value="MZ">Mizoram</option><option value="NL">Nagaland</option><option value="OR">Orissa</option><option value="PY">Puducherry</option><option value="PB">Punjab</option><option value="RJ">Rajasthan</option><option value="SK">Sikkim</option><option value="TN">Tamil Nadu</option>option value="TR">Tripura</option><option value="UT">Uttarakhand</option><option value="UP">Uttar Pradesh</option><option value="WB">West Bengal</option> </select>';
			layer.bindPopup(popupContent);
		 layer.on('click', function (e) {
			selectedFeature=feature;
			});
		}
		function NameSelected(val){
				var code=selectedFeature.properties.CD;
				console.log(val, code);
					if(val===code){
						selectedFeature.properties.v=2;
					}else
					{
						selectedFeature.properties.v=0;
					}
					sLayer.setStyle(styleSelector);
				}
		