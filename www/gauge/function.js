//aq scales
var opts1 = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    limitMax: false,
    limitMin: false,

    staticZones: [
        { strokeStyle: "#55a850", min: 0, max: 350 },
        { strokeStyle: "#a3c856", min: 350, max: 450 },
        { strokeStyle: "#fff833", min: 450, max: 700 },
        { strokeStyle: "#f39c35", min: 700, max: 1000 },
        { strokeStyle: "#e93f32", min: 1000, max: 2500 },
        { strokeStyle: "#b12b25", min: 2500, max: 5000 }
    ],

    staticLabels: {
        font: "8px sans-serif",
        labels: [350, 450, 700, 1000, 2500, 5000],
        color: "#000000",
        fractionDigits: 0
    },
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true,
};

//aq gauge function
var target1 = document.getElementById('airquality');
var gauge1 = new Gauge(target1).setOptions(opts1);
gauge1.maxValue = 5000;
gauge1.setMinValue(0);
gauge1.animationSpeed = 111;
gauge1.set(0);

//temperature scales
var opts2 = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    limitMax: false,
    limitMin: false,

    staticZones: [
        { strokeStyle: "#0C317A", min: 0, max: 20 },
        { strokeStyle: "#1520A6", min: 21, max: 30 },
        { strokeStyle: "#F9E706", min: 31, max: 40 },
        { strokeStyle: "#ED7014", min: 41, max: 50 },
        { strokeStyle: "#FC6A03", min: 51, max: 60 },
        { strokeStyle: "#eb3434", min: 61, max: 100 }
    ],

    staticLabels: {
        font: "8px sans-serif",
        labels: [20, 30, 40, 50, 60, 100],
        color: "#000000",
        fractionDigits: 0
    },
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true,
};

//temp gauge function
var target2 = document.getElementById('temperature');
var gauge2 = new Gauge(target2).setOptions(opts2);
gauge2.maxValue = 100;
gauge2.setMinValue(0);
gauge2.animationSpeed = 111;
gauge2.set(0);


//humidity scale
var opts3 = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    limitMax: false,
    limitMin: false,

    staticZones: [
        { strokeStyle: "#F9E076", min: 0, max: 30 },
        { strokeStyle: "#16a085", min: 31, max: 60 },
        { strokeStyle: "#0C317A", min: 61, max: 100 },
    ],

    staticLabels: {
        font: "8px sans-serif",
        labels: [30, 60, 100],
        color: "#000000",
        fractionDigits: 0
    },
    strokeColor: '#E0E0E0',
    generateGradient: true,
    highDpiSupport: true,
};

//hum gauge function
var target3 = document.getElementById('humidity');
var gauge3 = new Gauge(target3).setOptions(opts3);
gauge3.maxValue = 100;
gauge3.setMinValue(0);
gauge3.animationSpeed = 111;
gauge3.set(0);

//aq sAQI based function w/ firebase backend
var db = firebase.database();
db.ref("AirqIOT").child("AQ").orderByKey().limitToLast(1).on("value", function (s) {
    console.log(s.val());
    var v_aqi = parseFloat(Object.values(s.val()));

    if (v_aqi > 0 && v_aqi <= 350) {
        t = "Excellent";
        Swal.fire(
            'Excellent Air Quality',
            'Healthy and General indoor air.'
          )
        
    } else if (v_aqi >= 350 && v_aqi <= 450) {
        t = "Fine";
        Swal.fire(
            'Fine Air Quality',
            'Acceptable range.'
            )

    } else if (v_aqi >= 450 && v_aqi <= 700) {
        t = "Moderate";
        Swal.fire(
            'Moderate Air Quality',
            'The air quality inside is filthy and uncomfortable.'
          )
        
    } else if (v_aqi >= 700 && v_aqi <= 1000) {
        t = "Poor";
        Swal.fire(
            'Poor Air Quality',
            'You will experience sleepiness.'
          )
        
    } else if (v_aqi >= 1000 && v_aqi <= 2500) {
        t = "Very Poor";
        Swal.fire(
            'Very Poor Air Quality',
            'Bad for your health.'
          )
        
    } else if (v_aqi >= 2500 && v_aqi <= 5000) {
        t = "Severe";
        Swal.fire(
            'Severe Air Quality',
            'Do not stay in this work place for over 8 hours.'
          )
        
    }


    $("#val_aq_ppm").text(Object.values(s.val()) + " | " + t);
    gauge1.set(parseInt(v_aqi));
});

db.ref("AirqIOT").child("Temp").orderByKey().limitToLast(1).on("value", function (s) {
    console.log(s.val());

    var v_temp = parseFloat(Object.values(s.val()));

    if (v_temp > 0 && v_temp <=30){
        temp= "Low Temperature";
    } else if (v_temp > 31 && v_temp <=40) {
        temp= "Normal Temperature";
    } else if (v_temp > 41 && v_temp <=100) {
        temp= "High Temperature";
    }

    $("#val_temperature").text(Object.values(s.val()) + " | " + temp);
    gauge2.set(parseFloat(v_temp));
});

db.ref("AirqIOT").child("Hum").orderByKey().limitToLast(1).on("value", function (s) {
    console.log(s.val());
    var v_humidity = parseFloat(Object.values(s.val()));


    if (v_humidity > 0 && v_humidity <= 40 ) {
        h= "Too dry.";
    } else if (v_humidity > 40 && v_humidity <= 60) {
        h= "Comfort zone.";
    } else if (v_humidity > 60 && v_humidity <= 100) {
        h= "Too Humid.";
    } 

    $("#val_humidity").text(Object.values(s.val()) + ' | ' + h);
    gauge3.set(parseFloat(v_humidity));
});