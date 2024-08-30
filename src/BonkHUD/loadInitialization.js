//@Main{Load}

bonkHUD.loadStyleSettings();
bonkHUD.initialize();
bonkHUD.updateStyleSettings();


//!implement later on a toggle to show or hide ads
let ad1 = window.top.document.getElementById('adboxverticalCurse');
let ad2 = window.top.document.getElementById('adboxverticalleftCurse');
ad1.style.display = "none";
ad2.style.display = "none";