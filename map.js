var selectedFeature;
var stCodes = ["AN", "AP", "AR", "AS", "BR", "CH", "CT", "DN", "DD", "DL", "GA", "GJ", "HR", "HP", "JK", "JH", "KA", "KL", "LD", "MP", "MH", "MN", "ML", "MZ", "NL", "OR", "PY", "PB", "RJ", "SK", "TN", "TS", "TR", "UP", "UT", "WB"];
var stNames = ["Andaman and Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telengana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
var clickedSt=[];
var firstTry=0;
var map = L.map('map').setView([25, 80], 4);

var correctUnits=[];

//check if key exists
if(api_key){
	var vivid = new L.tileLayer('https://{s}.tiles.mapbox.com/v4/digitalglobe.n6ngnadl/{z}/{x}/{y}.png?access_token=' + api_key, {
		minZoom: 1,
		maxZoom: 19,
		attribution: '(c) <a href="http://microsites.digitalglobe.com/interactive/basemap_vivid/">DigitalGlobe</a>'
	});
	vivid.addTo(map);
}else{
	//no key exists
	console.error("No Key Exists");
}


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
	if(clickedSt.indexOf(code)<0){
		//user has clicked on this state for the first time
		clickedSt.push(code);
		if(val==code){
			firstTry++;
		}
	}
	
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
    var msg= `Correctly Named ${correctUnits.length} out of ${stCodes.length}. <br> Named on the First try: ${firstTry}`;
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