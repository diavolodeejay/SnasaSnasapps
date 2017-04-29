var GoogleKey="AIzaSyALdR1dob_Aa9S6IGzyrmTmMwnbHG_ZgcI";
var url="http://maps.googleapis.com/maps/api/geocode/json?address=";
var latP,lngP,latA,lngA;
var GoogleDecodeP = new XMLHttpRequest();
var GoogleDecodeA = new XMLHttpRequest();
var ReqPOI = new XMLHttpRequest();
var WikiCityReq = new XMLHttpRequest();
/*
    1.In base al nome trova le coordinate (per la demo)
    2.Dalle coordinate trova le città vicine
    http://api.geonames.org/findNearbyPlaceName?lat=LAT&lng=LONG&username=gabrieleancora&radius=15&maxrows=10&cities=cities15000&lang=it
    3.Usando il parametro name, cerco le città su wikipedia
    http://api.geonames.org/wikipediaSearch?q=NAME&maxRows=5&username=gabrieleancora&lang=it
    4.Controllo se sono risultati sensati. Se lat e long sono più lontani di 0.1 tolgo il risultato
    5.I risultati rimasti vengono ordinati in base al ranking
    6.Mostro il titolo e link
*/
function Coordinates()
{
    var cityP = document.getElementById("cityP").value;
    cityP = cityP.toLowerCase();
    var cityA = document.getElementById("cityA").value;
    if(cityP == "presente")
    {
        CaricaPresentazione();
    }
    else
    {
        cityP = cityP.replace(/\s+/g,'+');
        var urlP = url + cityP + "&key" + GoogleKey;
        GoogleDecodeP.open("GET",urlP,true);
        GoogleDecodeP.send();
        GoogleDecodeP.addEventListener("readystate",GoogleDecodedP,false);
        GoogleDecodeP.onreadystatechange = GoogleDecodedP;
        cityA = cityA.replace(/\s+/g,'+');
        var urlA = url + cityA + "&key" + GoogleKey;
        GoogleDecodeA.open("GET",urlA,true);
        GoogleDecodeA.send();
        GoogleDecodeA.addEventListener("readystate",GoogleDecodedA,false);
        GoogleDecodeA.onreadystatechange = GoogleDecodedA;
        setTimeout(Path,1000);
    }
}

function CaricaPresentazione()
{
    document.getElementById("cityP").remove();
    document.getElementById("cityA").remove();
    document.getElementById("send").remove();
    //funzione zabeo
}


function GoogleDecodedP(e)
{
    if(GoogleDecodeP.readyState == 4 && GoogleDecodeP.status == 200)
    {
        var risP = JSON.parse(GoogleDecodeP.responseText);
        latP = risP.results[0].geometry.location.lat;
        lngP = risP.results[0].geometry.location.lng;
        console.log(latP + " " + lngP);
    }
}

function GoogleDecodedA(e)
{
    if(GoogleDecodeA.readyState == 4 && GoogleDecodeA.status == 200)
    {
        var risA = JSON.parse(GoogleDecodeA.responseText);
        latA = risA.results[0].geometry.location.lat;
        lngA = risA.results[0].geometry.location.lng;
        console.log(latA + " " + lngA);
    }

}

function Path()
{
    /*crea tanti punti
        Napoli a 0
        Vesuvio a 8
        Roma a 36
        Firenze a 59
        Po a 80
        Venezia a 100
    */
    var pos = [0,8,36,59,80,100];
   for(var a = 0; a < 6; a++)
   {
       //newMark(pos[a],a);
        console.log(pos[a]);
   }
   
}

function FunzionePunto(p)
{
    switch(p){
        case 0:
            Interest("http://api.geonames.org/findNearbyWikipediaJSON?lat=40.8465299&lng=14.2497018&username=gabrieleancora&maxRows=20&lang=en");
            break;
        case 1:
            Interest("http://api.geonames.org/findNearbyWikipediaJSON?lat=40.7691355&lng=14.4134286&username=gabrieleancora&maxRows=20&lang=en");
            break;
    }
}

function Interest(url)
{
    
    ReqPOI.open("GET",url,true);
    ReqPOI.send();
    ReqPOI.addEventListener("readystate",Filter,false);
    ReqPOI.onreadystatechange = Filter;
}

function Filter(e)
{
    if(ReqPOI.readyState == 4 && ReqPOI.status == 200)
    {
        var ris = JSON.parse(ReqPOI.responseText);
        for(var a = 0; a < 20; a++)
        {
            if(ris.geonames[a].hasOwnProperty('feature'))
            {
                var ts = ris.geonames[a].wikipediaUrl;
                ts = ts.substring(22);
                WikiRequest("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+ts);
            }
        }
    }
}

function WikiRequest(url)
{
    WikiCityReq.open("GET",url,true);
    WikiCityReq.send();
    WikiCityReq.addEventListener("readystate",CityText,false);
    WikiCityReq.onreadystatechange = CityText;
}

function CityText(e)
{
    if(WikiCityReq.readyState == 4 && WikiCityReq.status == 200)
    {
        var ris = JSON.parse(WikiCityReq.responseText);
        console.log(ris.extract);
    }
}