var GoogleKey="AIzaSyALdR1dob_Aa9S6IGzyrmTmMwnbHG_ZgcI";
var url="http://maps.googleapis.com/maps/api/geocode/json?address=";
var latP,lngP,latA,lngA;
var GoogleDecodeP = new XMLHttpRequest();
var GoogleDecodeA = new XMLHttpRequest();
var ReqPOI = new XMLHttpRequest();
var currentPOI = 0;
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
function Start()
{
    $("top")
    var cityP = "Naples";
    cityP = cityP.toLowerCase();
    var cityA = "Venice";
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
        newMark(pos[a],a);
        console.log(pos[a]);
   }
   
}

function FunzionePunto(p)
{
    document.getElementById("#topbox").innerHTML = "";
    switch(p){
        case 0:
            currentPOI = 0;
            $("#topbox").append('<div id="explain">Text about naples</div>');
            $("#topbox").append('<img id="imm" src="naples.png"/>');
            Interest("http://api.geonames.org/findNearbyWikipediaJSON?lat=40.8465299&lng=14.2497018&username=gabrieleancora&maxRows=20&lang=en");
            break;
        case 1:
            currentPOI = 1;
            $("#topbox").append('<div id="explain">Text about Vesuvio</div>');
            $("#topbox").append('<img id="imm" src="vesuvio.png"/>');
            Interest("http://api.geonames.org/findNearbyWikipediaJSON?lat=40.7691355&lng=14.4134286&username=gabrieleancora&maxRows=20&lang=en");
            break;
        case 2:
            currentPOI = 2;
            $("#topbox").append('<div id="explain">Text about Rome</div>');
            $("#topbox").append('<img id="imm" src="rome.png"/>');
            Interest("http://api.geonames.org/findNearbyWikipediaJSON?lat=41.909986&lng=12.3959129&username=gabrieleancora&maxRows=20&lang=en");
            break;
        case 3:
            currentPOI = 3;
            $("#topbox").append('<div id="explain">Text about Florence</div>');
            $("#topbox").append('<img id="imm" src="florence.png"/>');
            Interest("http://api.geonames.org/findNearbyWikipediaJSON?lat=43.7799368&lng=11.1709278&username=gabrieleancora&maxRows=20&lang=en");
            break;
        case 4:
            currentPOI = 4;
            $("#topbox").append('<div id="explain">Text about Po</div>');
            $("#topbox").append('<img id="imm" src="po.png"/>');
            Interest("http://api.geonames.org/findNearbyWikipediaJSON?lat=44.9376816&lng=11.7370996&username=gabrieleancora&maxRows=20&lang=en");
            break;
        case 5:
            currentPOI = 5;
            $("#topbox").append('<div id="explain">Text about Venice</div>');
            $("#topbox").append('<img id="imm" src="venice.png"/>');
            Interest("http://api.geonames.org/findNearbyWikipediaJSON?lat=45.4053211&lng=12.1015564&username=gabrieleancora&maxRows=20&lang=en");
            break;
        default:
            console.log("Nop");
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
        var out = '<div id="POI"><ul>';
        var ris = JSON.parse(ReqPOI.responseText);
        var c = 0;
        for(var a = 0; a < 20; a++)
        {
            if(ris.geonames[a].hasOwnProperty('feature'))
            {
                if(ris.geonames[a].feature == "landmark")
                {
                    var ts = ris.geonames[a].title;
                    ts = ts.substring(0,ts.indexOf(','));
                    out = out + "<li>"+ts+"</li>";
                    //aggiungi al documento html la lista di poi presa da ts
                    c++;
                    if(c > 3)
                    {
                        a = 20;
                        if(currentPOI == 0)
                        {
                            out = out + "<li>Mafia and Naples</li>"
                        }
                        else if(currentPOI == 1)
                        {
                            out = out + "<li>Vesuvio is going to explode?</li>"
                        }
                        else if(currentPOI == 2)
                        {
                            out = out + "<li>Rome is falling to pieces</li>"
                        }
                        else if(currentPOI == 3)
                        {
                            out = out + "<li>Florence's monuments are being vandalized</li>"
                        }
                        else if(currentPOI == 4)
                        {
                            out = out + "<li>The River Po' is inquined from factories</li>"
                        }
                        else if(currentPOI == 5)
                        {
                            out = out + "<li>Venice is going to be submerged</li>"
                        }
                    }
                }
            }
        }
        out = out + "</ul></div>";
        console.log(out);
        $("#topbox").append(out);
    }
}
