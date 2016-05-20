var selectedFeature;
var stCodes = ["AN", "AP", "AR", "AS", "BR", "CH", "CT", "DN", "DD", "DL", "GA", "GJ", "HR", "HP", "JK", "JH", "KA", "KL", "LD", "MP", "MH", "MN", "ML", "MZ", "NL", "OR", "PY", "PB", "RJ", "SK", "TN", "TS", "TR", "UP", "UT", "WB"];
var stNames = ["Andaman and Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telengana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];

var map = L.map('map').setView([25, 80], 4);

var correctUnits=[];


L.tileLayer('//otile{s}-s.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
	attribution : 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
	subdomains : '1234'
}).addTo(map);

var defStyle = {
	weight : 2,
	color : "#B0DE5C",
	opacity : 1,
	fillColor : "#B0DE5C",
	fillOpacity : 0.3
};

var correctStyle = {
	weight : 2,
	color : "#B0DE5C",
	opacity : 1,
	fillColor : "#0095ff",
	fillOpacity : 0.8
};

var WrongStyle = {
	weight : 2,
	color : "#B0DE5C",
	opacity : 1,
	fillColor : "#ff3d31",
	fillOpacity : 0.8
};

function styleSelector(feature) {
	switch (feature.properties.v) {
	case 1:
		return defStyle;
	case 2:
		return correctStyle;
	case 0:
		return WrongStyle;
	}
}

var geojson = topojson.feature(states, states.objects.data);
var sLayer = L.geoJson(geojson, {
		style : styleSelector,
		onEachFeature : onEachFeature
	}).addTo(map);
var popup;
function onEachFeature(feature, layer) {
	layer.on('click', function (e) {
        selectedFeature = feature;
		if (feature.properties.v!=2){
        //show popup
        var popText=createPopUpText();
        popup = L.popup().setLatLng(e.latlng)
            .setContent(popText).openOn(map);
            //set focus
            document.getElementById('StateSelector').focus();
			}
	});
}
function NameSelected(val) {
	var code = selectedFeature.properties.CD;
	
	if (val === code) {
		selectedFeature.properties.v = 2;
               addUnit(code)
	} else {
		selectedFeature.properties.v = 0;
            removeUnit(code);
	}
	sLayer.setStyle(styleSelector);
        showScore();
        
}

function showScore(){
    var msg= "Correctly Named "+String(correctUnits.length) +" out of "+ String(stCodes.length);
    document.getElementById("ScoreDiv").innerHTML=msg;
    
   if(correctUnits.length>35){
        alert("Congratulations! You have named all of the States & UTs");
      }
}

function addUnit(val){
    //check if it exists
    if(correctUnits.indexOf(val)<0){
        correctUnits.push(val);
        
        //remove selector
        var x = document.getElementById("StateSelector");
        x.remove(x.selectedIndex);
        
        //remove popup
        map.closePopup(popup);
    }
}

function removeUnit(val){
      if(correctUnits.indexOf(val)>-1){
        correctUnits.pop(val);
        
    }
}

function createPopUpText(){
var  innerHTML='Select Name: <select id="StateSelector" onchange="NameSelected(this.value)"> <option value="--">-----</option>';
for(var i=0;i<36;i++){
    var stCode=stCodes[i];
    if(correctUnits.indexOf(stCode)<0){
    var name=stNames[i];
    var txt='<option value="'+stCode+'">'+name+'</option>';
    innerHTML=innerHTML+txt;
    }
}
innerHTML=innerHTML+'<select>';

return innerHTML;
}