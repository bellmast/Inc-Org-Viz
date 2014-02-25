var totalxCoords;
var totalyCoords;
var paper;
var canvasWidth = 800;
var canvasHeight= 700;
var padding = 10;
var orgNumber = 4;
var ourRadius = 5;
var FTcount = 0;
var oneMCcount = 0;

$(document).ready(function () {runProgram()});

function runProgram() {
    paper = new Raphael(document.getElementById('canvas_container'), canvasWidth, canvasHeight);  
    jQuery.getJSON("IncData.js", function (data)
    {drawNetwork(data)});       
}  

function drawNetwork(data) {

    orgXcoords = []
    orgRadii = []
    orgSet = paper.set();
    textSet = paper.set();
    sCorpLineSet = paper.set();
    lineSet = paper.set();
    orgColors = ["#03899C", "#1240AB", "#FFAA00", "#FF7A00"]
    orgNames = ["S-corp", "C-corp", "LLC", "Other"]
    
    slots = canvasWidth/(orgNumber+1)
    midY = canvasHeight/2

    for(i = 1; i < orgNumber+1; i++) {
        xPos = slots*i
        orgXcoords.push(xPos)
        radius = data[0][i-1]*2.75
        orgRadii.push(radius)
        orgSet.push(paper.circle(xPos, midY, radius).attr({stroke:0}).glow({width:3, color:orgColors[i-1]}))
        textSet.push(paper.text(xPos, midY+radius+10, orgNames[i-1]))
    }

    for(i=0; i < orgNumber; i++) {
        startingPosX = orgXcoords[i]
        startingPosY = midY-orgRadii[i]
        for(h=i+1; h < orgNumber; h++) {
            endingPosX = orgXcoords[h]
            endingPosY = midY-orgRadii[h]
            curvePosX = (startingPosX+endingPosX)/2
            curvePosY = (midY-(midY/5/h))/((h/(i+1)))-(10*h)
            lineSet.push(paper.path("M"+startingPosX+" "+startingPosY+"Q"+curvePosX+" "+curvePosY+" "+endingPosX+" "+endingPosY).attr({"stroke-width": ".5", "stroke":orgColors[i]}))
        }        
    }
    ourDude = []
    i2 = -1
    for(i=orgNumber-1; i > -1; i--) {
        i2 += 1
        startingPosX = orgXcoords[i]
        startingPosY = midY+orgRadii[i]
        h2 = i2+1
        for(h=i-1; h > -1; h--) {
            h2 += 1
            endingPosX = orgXcoords[h]
            endingPosY = midY+orgRadii[h]
            curvePosX = (startingPosX+endingPosX)/2
            curvePosY = (midY+(midY/5/h2))/((h/(i2+1)))+(10*h2)
            lineSet.push(paper.path("M"+startingPosX+" "+startingPosY+"Q"+curvePosX+" "+curvePosY+" "+endingPosX+" "+endingPosY).attr({"stroke-width": ".5", "stroke":orgColors[i]}))
        } 
    }
}
