/**
* Title: pokemon very cool
* Author: Taison Shea
* Date: 03/05/22 - 27/06/22 -> 28/05/26
* Version: 28
* Purpose: get me credits.
**/

var assetsLoaded = 0;
var totalAssets = 0;

function loadSecureAsset(path) {
    totalAssets++;
    var img = new Image();
    img.onload = function() { assetsLoaded++; };
    img.onerror = function() { console.error("Could not find file at: " + path); };
    img.src = './' + path; // Using './' forces relative path parsing on GitHub Pages
    return img;
}

const PLAYERWIDTH = 51
const PLAYERHEIGHT = 74
const BACKGROUNDCOLOR = 'rgb(12,12,12)'
const WIDTH = 640  
const HEIGHT = 480 
var isFullScreen = false
var playerXPosition = 280
var playerYPosition = 180

var ctx
var stage = 0 //main menu, in game or where you are
var enterCode = 0 // this is what tells the game what location to start in

// Main Menu Variables
var playerSelection = 0 // what the play wants to do
var codeSelection = 0
var codeInput = null
var goodCode = false

//movement variables
var movingUp = false
var movingLeft = false
var movingRight = false
var movingDown = false
var lastPressed = 0 // 0 = left 1 = right
var zPressed = false

// game variables
var over = false
var ending = 0
var atkBuff = false // if the character has the attack buff teammate
var defBuff = false // if the character has the defense buff teammate
var attackDamage = 4
var health = 15
var moveSpeed = 5 // how fast the play moves...
var inventoryOpen = false // is the inventory open
var inventorySelection = 0 // what is selected in the inventory
var battleSelection = 0 // waht is selected during battle
var tvToggle = 0 // 0 = off 1 = on
var dialogueOpen = false 
var toggleNote = false
var diologueNumber = 0 // what number to set diologue for
var yesOrNo = 1 // this is a nightmare
var yesOrNoOpen = false
var turn = 0 // 0 = players turn, 1 = zombies turn
var zombieHP = 69420
var zombieLocation = 0
var block = false
var counter =  false
var zAttack
//#region diologue Numbers
// 0 = cant go upstairs in house
// 1 = go to sleep
// 2 = the note on the desk
// 3 = cant go to sleep
// 4 = want to go to earth
// 5 = come back when youre ready (to go to earth)
// 6 = saved too early
// 7 = saved earth one
// 17 = saved tent
// 8 = Noteboard 1
// 9 = noteboard 2
// 10 = noteboard 3
// 11 = noteboard 4
// 12 = noteboard 5
// 13 = team 0
// 14 = team1
// 15 = team2
// 16 = team3
// 18 = bullitin board notice thing
// 19 = drawers are locked
// 20 = zombies are aids, please help us.
// 21 = you have recieved the atk buff
// 23 = no one is working the food stand right now
// 24 = point in the direction of the train station
// 25 = saved train no atk
// 26 = the door locks behind you
// 27 = 186635
// 28 = 187812
// 29 = cant save
// 30 = just def buff save
// 31 = atk and def buff save 186891
// 32 = help me
// 33 = zombie leaps at you
// 34 = magic attack 4 dmg // 
// 35 = sword attack 4 dmg //
// 36 = magic attack 7 dmg // 
// 37 = sword attack 7 dmg // 
// 38 = zombie light attack // 
// 39 = zombie heavy attack // 
// 40 = zombie attack but blocked //
// 50 = tysm - defense buff
// 51 = giving you shield
// 52 = description of shield
// 53 = you place shield
// 54 = where to go next
// 44 = you raise advanced shield
// 45 = it blocked dmg + heal
// 46 = it only blocked dmg
//#endregion
var contiunedDialogue = 0;
var dia34 = loadSecureAsset('dialogue/dia34.png')
var dia35 = loadSecureAsset('dialogue/dia35.png')
var dia36 = loadSecureAsset('dialogue/dia36.png')
var dia37 = loadSecureAsset('dialogue/dia37.png')
var dia38 = loadSecureAsset('dialogue/dia38.png')
var dia39 = loadSecureAsset('dialogue/dia39.png')
var dia40 = loadSecureAsset('dialogue/dia40.png')
var dia0 = loadSecureAsset('dialogue/dia0.png')
var dia3 = loadSecureAsset('dialogue/dia3.png')
var dia4 = loadSecureAsset('dialogue/dia4.png')
var dia5 = loadSecureAsset('dialogue/dia5.png')
var dia8 = loadSecureAsset('dialogue/dia8.png')
var dia9 = loadSecureAsset('dialogue/dia9.png')
var dia10 = loadSecureAsset('dialogue/dia10.png')
var dia11 = loadSecureAsset('dialogue/dia11.png')
var dia12 = loadSecureAsset('dialogue/dia12.png')
var dia18 = loadSecureAsset('dialogue/dia18.png')
var dia19 = loadSecureAsset('dialogue/dia19.png')
var dia20 = loadSecureAsset('dialogue/dia20.png')
var dia21 = loadSecureAsset('dialogue/dia21.png')
var dia23 = loadSecureAsset('dialogue/dia23.png')
var dia24 = loadSecureAsset('dialogue/dia24.png')
var dia26 = loadSecureAsset('dialogue/dia26.png')
var dia32 = loadSecureAsset('dialogue/dia32.png')
var dia33 = loadSecureAsset('dialogue/dia33.png')
var dia42 = loadSecureAsset('dialogue/dia42.png')
var dia43 = loadSecureAsset('dialogue/dia43.png')
var dia44 = loadSecureAsset('dialogue/dia44.png')
var dia45 = loadSecureAsset('dialogue/dia45.png')
var dia46 = loadSecureAsset('dialogue/dia46.png')
var dia47 = loadSecureAsset('dialogue/dia47.png')
var dia48 = loadSecureAsset('dialogue/dia48.png')
var dia49 = loadSecureAsset('dialogue/dia49.png')
var dia50 = loadSecureAsset('dialogue/dia50.png')
var dia51 = loadSecureAsset('dialogue/dia51.png')
var dia52 = loadSecureAsset('dialogue/dia52.png')
var dia53 = loadSecureAsset('dialogue/dia53.png')
var dia54 = loadSecureAsset('dialogue/dia54.png')
var dia81 = loadSecureAsset('dialogue/dia81.png')
var dia82 = loadSecureAsset('dialogue/dia82.png')
var dia700 = loadSecureAsset('dialogue/dia700.png')
var dia701 = loadSecureAsset('dialogue/dia701.png')
var yesReady = loadSecureAsset('dialogue/yesReady.png')
var noReady = loadSecureAsset('dialogue/noReady.png')

//#region save screens
var SavedTooEarly = loadSecureAsset('inventory/GameSavedTooEarly.png')
var cantSave = loadSecureAsset('inventory/YouCantSaveHere.png')
var SavedEarthOne = loadSecureAsset('inventory/GameSaved186010.png')
var SavedEarthOneATK = loadSecureAsset('inventory/GameSaved186635.png')
var SavedEarthTwo = loadSecureAsset('inventory/GameSaved185656.png')
var SavedEarthTwoATK = loadSecureAsset('inventory/GameSaved188309.png')
var SavedEarthTwoDEF = loadSecureAsset('inventory/GameSaved188433.png')
var SavedEarthTwoATKDEF = loadSecureAsset('inventory/GameSaved182956.png')
var SavedTent = loadSecureAsset('inventory/GameSaved188565.png')
var savedTentATK = loadSecureAsset('inventory/GameSaved188239.png')
var savedTrain = loadSecureAsset('inventory/GameSaved184372.png')
var savedTrainATK = loadSecureAsset('inventory/GameSaved187812.png')
var savedTrainDef = loadSecureAsset('inventory/GameSaved186902.png')
var savedTrainATKDEF = loadSecureAsset('inventory/GameSaved186891.png')
var savedOverATK = loadSecureAsset('inventory/GameSaved2018215.png')
var savedOverDef = loadSecureAsset('inventory/GameSaved21214619.png')
var tysmforplaying = loadSecureAsset('ExtraResources/tyforplaying.png')
//#endregion
//#region teammates
var team0 = loadSecureAsset('inventory/team0.png')
var team1 = loadSecureAsset('inventory/team1.png')
var team2 = loadSecureAsset('inventory/team2.png')
var team3 = loadSecureAsset('inventory/team3.png')
//#endregion

// variables for the house in the game
var houseBackground = loadSecureAsset('insideHouse/insidehouse.png')
var houseDoor = loadSecureAsset('insideHouse/door.png')
var houseStairs = loadSecureAsset('insideHouse/stairs.png')
var houseBed = loadSecureAsset('insideHouse/bed.png')
var tvOff = loadSecureAsset('insideHouse/tvOff.png')
var tvOn = loadSecureAsset('insideHouse/tvOn.png')
var deskWithNote = loadSecureAsset('insideHouse/DeskWithNote.png')
var note = loadSecureAsset('insideHouse/Note.png')

var bedXPosition = 0 // width = 210
var bedYPosition = 0 // height = 102
var tvXPosition = 0 // width = 225
var tvYPosition = 0 // height = 141
var stairsXPosition = 0 // width = 156
var stairsYPosition = 0 // height = 93
var doorXPosition = 0 // width = 165
var doorYPosition = 0 // height = 27
var deskXPosition = 0 // width = 182
var deskYPosition = 0 // height = 54

// variables used for mars in the game
var marsHouseDoor = loadSecureAsset('mars/yourHosueDoor.png')
var marsFoodCafe = loadSecureAsset('mars/buyFromCafe.png')
var marsNoteBoard = loadSecureAsset('mars/noteboard.png')
var lieutenant = loadSecureAsset('characters/lieutenant.png')

var noteboardOpen = false
var marsDoorXPosition = 0 // width = 133
var marsDoorYPosition = 0 // height = 200
var boardXposition = 0 // width = 147
var boardYPosition = 0 // height = 219
var cafeXPosition = 0 // width = 263
var cafeYPosition = 0 // height = 148
var lieutenantXPosition = 0 // width = 92
var lieutenantYPosition = 0 // height = 127

//variables used for earth in game
var tentEnterance = loadSecureAsset('Earth/tentEnterance.png')
var trainEnterance = loadSecureAsset('Earth/trainEnterance.png')

var tentXPosition = 0 // width = 247
var tentYPosition = 0  // height = 234
var trainXPosition = 0 // width = 282
var trainYPosition = 0 // hieght = 357

//variables for things in the tent
var tentExit = loadSecureAsset('tent/Exit.png')
var bullitin = loadSecureAsset('tent/bullitin.png')
var drawers = loadSecureAsset('tent/drawers.png')

var exitxPosition = 0 // width = 18
var exityPosition = 0 // height = 369
var bullitinxPosition = 0 // width = 145
var bullitinyPosition = 0 // height = 98
var drawersxPosition = 0 // wdith = 168
var drawersyPosition = 0 // height = 111
var atkBuffXPosition = 0 // width = 55
var atkBuffYPosition = 0 // height = 90

// variables for train station
var officeEnterance = new Image()
officeEnterance.src = 'train/officedoor.png'

var officexPosition
var officeyPosition

// variables for the office
var zombieDead = false
var returnToOffice = false

//variables for the lab
var computer = new Image()
computer.src = 'Lab/Computer.png'

var computerXPosition = 0
var computerYPositon = 0

//tutorial variables
var tutorialScreen = 0

// image variables for main menu
var backgroundMenu = loadSecureAsset('backgrounds/earth.png')
var backgroundCode = loadSecureAsset('backgrounds/moon.png')
var credits = loadSecureAsset('backgrounds/credits.png')
var saveLoaded = loadSecureAsset('mainMenuText/1ProgressLoaded.png')

// images for the inventory
var inventoryClosed = loadSecureAsset('inventory/inventoryClosed.png')
var inventoryTeam = loadSecureAsset('inventory/inventoryTeamSelected.png')
var inventoryItems = loadSecureAsset('inventory/inventoryItemsSelected.png')
var inventorySave = loadSecureAsset('inventory/inventorySaveSelected.png')
var inventoryShield = loadSecureAsset('inventory/itemsShield.png')
var inventoryNothing = loadSecureAsset('inventory/itemsNothing.png')

// images for the battle
var attackSelected = loadSecureAsset('inventory/AttackSelected.png')
var blockSelected = loadSecureAsset('inventory/BlockSelected.png')
var runSelected = loadSecureAsset('inventory/RunSelected.png')
var cantRun = loadSecureAsset('dialogue/cantRun.png')
// images for the health bar
//#region 15 hp health bar
var HP1 = loadSecureAsset('health/15HP/P1.png')
var HP2 = loadSecureAsset('health/15HP/P2.png')
var HP3 = loadSecureAsset('health/15HP/P3.png')
var HP4 = loadSecureAsset('health/15HP/P4.png')
var HP5 = loadSecureAsset('health/15HP/P5.png')
var HP6 = loadSecureAsset('health/15HP/P6.png')
var HP7 = loadSecureAsset('health/15HP/P7.png')
var HP8 = loadSecureAsset('health/15HP/P8.png')
var HP9 = loadSecureAsset('health/15HP/P9.png')
var HP10 = loadSecureAsset('health/15HP/P10.png')
var HP11 = loadSecureAsset('health/15HP/P11.png')
var HP12 = loadSecureAsset('health/15HP/P12.png')
var HP13 = loadSecureAsset('health/15HP/P13.png')
var HP14 = loadSecureAsset('health/15HP/P14.png')
var HP15 = loadSecureAsset('health/15HP/P15.png')
//#endregion
//#region 15 hp zombie
var ZHP15 = loadSecureAsset('health/15ZHP/Z15.png')
var ZHP11 = loadSecureAsset('health/15ZHP/Z11.png')
var ZHP9 = loadSecureAsset('health/15ZHP/Z9.png')
var ZHP8 = loadSecureAsset('health/15ZHP/Z8.png')
var ZHP7 = loadSecureAsset('health/15ZHP/Z7.png')
var ZHP3 = loadSecureAsset('health/15ZHP/Z3.png')
var ZHP1 = loadSecureAsset('health/15ZHP/Z1.png')
var ZHP0 = loadSecureAsset('health/15ZHP/Z0.png')
//#endregion
//#region 60 hp zombie
var Z60 = loadSecureAsset('health/80ZHP/Z60.png')
var Z56 = loadSecureAsset('health/80ZHP/Z56.png')
var Z53 = loadSecureAsset('health/80ZHP/Z53.png')
var Z52 = loadSecureAsset('health/80ZHP/Z52.png')
var Z48 = loadSecureAsset('health/80ZHP/Z48.png')
var Z46 = loadSecureAsset('health/80ZHP/Z46.png')
var Z44 = loadSecureAsset('health/80ZHP/Z44.png')
var Z40 = loadSecureAsset('health/80ZHP/Z40.png')
var Z39 = loadSecureAsset('health/80ZHP/Z39.png')
var Z36 = loadSecureAsset('health/80ZHP/Z36.png')
var Z32 = loadSecureAsset('health/80ZHP/Z32.png')
var Z28 = loadSecureAsset('health/80ZHP/Z28.png')
var Z25 = loadSecureAsset('health/80ZHP/Z25.png')
var Z24 = loadSecureAsset('health/80ZHP/Z24.png')
var Z20 = loadSecureAsset('health/80ZHP/Z20.png')
var Z18 = loadSecureAsset('health/80ZHP/Z18.png')
var Z16 = loadSecureAsset('health/80ZHP/Z16.png')
var Z12 = loadSecureAsset('health/80ZHP/Z12.png')
var Z11 = loadSecureAsset('health/80ZHP/Z11.png')
var Z8 = loadSecureAsset('health/80ZHP/Z8.png')
var Z4 = loadSecureAsset('health/80ZHP/Z4.png')
var Z0 = loadSecureAsset('health/80ZHP/Z0.png')
//#endregion
//#region 35 hp player
var PL35 = loadSecureAsset('health/35HP/P35.png')
var PL34 = loadSecureAsset('health/35HP/P34.png')
var PL33 = loadSecureAsset('health/35HP/P33.png')
var PL32 = loadSecureAsset('health/35HP/P32.png')
var PL31 = loadSecureAsset('health/35HP/P31.png')
var PL30 = loadSecureAsset('health/35HP/P30.png')
var PL29 = loadSecureAsset('health/35HP/P29.png')
var PL28 = loadSecureAsset('health/35HP/P28.png')
var PL27 = loadSecureAsset('health/35HP/P27.png')
var PL26 = loadSecureAsset('health/35HP/P26.png')
var PL25 = loadSecureAsset('health/35HP/P25.png')
var PL24 = loadSecureAsset('health/35HP/P24.png')
var PL23 = loadSecureAsset('health/35HP/P23.png')
var PL22 = loadSecureAsset('health/35HP/P22.png')
var PL21 = loadSecureAsset('health/35HP/P21.png')
var PL20 = loadSecureAsset('health/35HP/P20.png')
var PL19 = loadSecureAsset('health/35HP/P19.png')
var PL18 = loadSecureAsset('health/35HP/P18.png')
var PL17 = loadSecureAsset('health/35HP/P17.png')
var PL16 = loadSecureAsset('health/35HP/P16.png')
var PL15 = loadSecureAsset('health/35HP/P15.png')
var PL14 = loadSecureAsset('health/35HP/P14.png')
var PL13 = loadSecureAsset('health/35HP/P13.png')
var PL12 = loadSecureAsset('health/35HP/P12.png')
var PL11 = loadSecureAsset('health/35HP/P11.png')
var PL10 = loadSecureAsset('health/35HP/P10.png')
var PL9 = loadSecureAsset('health/35HP/P9.png')
var PL8 = loadSecureAsset('health/35HP/P8.png')
var PL7 = loadSecureAsset('health/35HP/P7.png')
var PL6 = loadSecureAsset('health/35HP/P6.png')
var PL5 = loadSecureAsset('health/35HP/P5.png')
var PL4 = loadSecureAsset('health/35HP/P4.png')
var PL3 = loadSecureAsset('health/35HP/P3.png')
var PL2 = loadSecureAsset('health/35HP/P2.png')
var PL1 = loadSecureAsset('health/35HP/P1.png')
var PL0 = loadSecureAsset('health/35HP/P0.png')
//#endregion
// extra images
var interactButton = loadSecureAsset('extraResources/interactButton.png')
//#region main menu buttons + back
// images and sources for each button   (s = selected, u = unselected)
var playButtonS = loadSecureAsset('mainMenuText/playSelected.png')
var playButtonU = loadSecureAsset('mainMenuText/playUnselected.png')
var tutorialButtonS = loadSecureAsset('mainMenuText/tutorialSelected.png')
var tutorialButtonU = loadSecureAsset('mainMenuText/tutorialUnselected.png')
var creditsButtonS = loadSecureAsset('mainMenuText/creditsSelected.png')
var creditsButtonU = loadSecureAsset('mainMenuText/creditsUnselected.png')
var enterCodeS = loadSecureAsset('mainMenuText/enterCodeSelected.png')
var enterCodeU = loadSecureAsset('mainMenuText/enterCodeUnselected.png')
var backS = loadSecureAsset('mainMenuText/backSelected.png')
var backU = loadSecureAsset('mainMenuText/backUnselected.png')
//#endregion

//#region tutorial text images
//images for the tutorial text  P = part L = line (e.g: P1L1 = Part 1 Line 1)
var P1L1 = loadSecureAsset('tutorialText/P1L1.png')
var P1L2 = loadSecureAsset('tutorialText/P1L2.png')
var P2L1 = loadSecureAsset('tutorialText/P2L1.png')
var P2L2 = loadSecureAsset('tutorialText/P2L2.png')
var P3L1 = loadSecureAsset('tutorialText/P3L1.png')
var P3L2 = loadSecureAsset('tutorialText/P3L2.png')
var P4L1 = loadSecureAsset('tutorialText/P4L1.png')
var P4L2 = loadSecureAsset('tutorialText/P4L2.png')
var P4L3 = loadSecureAsset('tutorialText/P4L3.png')
var P5L1 = loadSecureAsset('tutorialText/P5L1.png')
var P5L2 = loadSecureAsset('tutorialText/P5L2.png')
var P6L1 = loadSecureAsset('tutorialText/P6L1.png')
var P6L2 = loadSecureAsset('tutorialText/P6L2.png')
var P7 = loadSecureAsset('tutorialText/P7.png')
var P8 = loadSecureAsset('tutorialText/P8.png')
var P9 = loadSecureAsset('tutorialText/P9.png')
var P10 = loadSecureAsset('tutorialText/P10.png')
var P11 = loadSecureAsset('tutorialText/P11.png')
var P12 = loadSecureAsset('tutorialText/P12.png')
var zContune = loadSecureAsset('tutorialText/ztocontinue.png')
//#endregion

//#region ending text images
var L1 = loadSecureAsset('tutorialText/ENDING/L1.png')
var L2 = loadSecureAsset('tutorialText/ENDING/L2.png')
var L3 = loadSecureAsset('tutorialText/ENDING/L3.png')
var L4 = loadSecureAsset('tutorialText/ENDING/L4.png')
//#endregion
//#region chracters
var astronautLeft = loadSecureAsset('characters/astronautLeft.png')
var astronautRight = loadSecureAsset('characters/astronautRight.png')
var atkBuffC = loadSecureAsset('characters/atkBuff.png')
var defBuffC = loadSecureAsset('characters/defBuff.png')
var zombieIdle = loadSecureAsset('zombies/zombie_idle.png')
var zombieFlex = loadSecureAsset('zombies/zombie_flex.png')
var zombieMoving = loadSecureAsset('zombies/zombie_moving.png')
//#endregion

//#region lore backgrounds
var P1 = loadSecureAsset('backgrounds/P1.png')
var P2 = loadSecureAsset('backgrounds/P2.png')
var P3 = loadSecureAsset('backgrounds/P3.png')
var P4 = loadSecureAsset('backgrounds/P4.png')
var P5 = loadSecureAsset('backgrounds/P5.png')
var P6 = loadSecureAsset('backgrounds/P6.png')
var battle = loadSecureAsset('ExtraResources/Battle.png')
var battleTwo = loadSecureAsset('ExtraResources/BattleTwo.png')
var nothing = loadSecureAsset('ExtraResources/nothing.png')
//#endregion

var marsBackground = loadSecureAsset('backgrounds/marsTest.png')
var earthBackground = loadSecureAsset('backgrounds/earthTest.png')
var tentBackground = loadSecureAsset('backgrounds/tentbackground.png')
var trainBackground = loadSecureAsset('backgrounds/backgroundSubway.png')
var officeBackground = loadSecureAsset('backgrounds/office.png')
var officeBackgroundZ = loadSecureAsset('backgrounds/officeZombie.png')
var labBackground = loadSecureAsset('backgrounds/Lab.png')
//starts the canvas when the window opens
window.onload=startCanvasz

function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 20) // set framerate
	playerXPosition = 280
 	playerYPosition = 180
}
function updateCanvas(){
	if (assetsLoaded < totalAssets) {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.fillStyle = 'white';
		ctx.font = "20px monospace";
		ctx.fillText("LOADING GAME FILES: " + assetsLoaded + " / " + totalAssets, 50, 240);
		return; 
	}
	// reset the canvas
	ctx.fillStyle = 'white'
	ctx.fillRect(0,0,WIDTH, HEIGHT)	
	checkStage()
	manageMovement()
	mainMenuText()
	manageTutorial()
	updateCode()
	moveBackground()
	updateHousePositions()
	houseThings()
	detectBedCollision()
	detectStairsCollision()
	detectTVCollision()	
	detectDoorCollision()
	detectDeskCollision()
	marsThings()
	detectMarsDoorCollision()
	detectCafeCollision()
	detectLieutenantCollision()
	detectNoteBoardCollision()
	updateMarsPositions()
	updateEarthPositions()
	earthThings()
	detectTentCollision()
	detectTrainCollision()
	tentThings()
	updateTentPositions()
	detectExitCollision()
	detectbullitinCollision()
	trainThings()
	updateTrainPositions()
	detectOfficeCollision()
	detectDrawerCollision()
	detectATKBuffCollision()
	updateLabPositions()
	detectTrainExit()
	labThings()
	detectComputerCollision()
	checkBattle()
	updateHealth()
	theEnd()

	//console.log("stage " + stage) //this is my testing console.log
	//console.log("bgx " + BGxPosition)
	//console.log("bgy " + BGyPosition)
	//console.log("tent "+ tentYPosition)
	//console.log("atkdmg " + attackDamage)
	//console.log("hp " + health)
	//console.log("def buff " + defBuff)
	//console.log(Math.random() * 10)
	//console.log(zPressed)
	chracterFacing()
	manageInventory()
	yesOrNoF()
	toggleNoteF()
	drawBorders()
	//console.log("player HP: " + health + " || " + "zombie HP: " + zombieHP)
	//console.log(turn)

	/*
	ctx.strokeStyle = "rgb(0,255,0)" // Draw the hitboxes bright green
	if (stage == 5){
		ctx.strokeRect(tvXPosition, tvYPosition, 225, 141) // tv
		ctx.strokeRect(bedXPosition, bedYPosition, 210, 102) // bed
		ctx.strokeRect(stairsXPosition, stairsYPosition, 156, 93) // stairs
		ctx.strokeRect(doorXPosition, doorYPosition, 165, 27) // door	
		ctx.strokeRect(deskXPosition, deskYPosition, 182, 54) // desk
	} else if (stage == 4){		
		ctx.strokeRect(marsDoorXPosition,marsDoorYPosition, 133, 200) // mars
		ctx.strokeRect(cafeXPosition, cafeYPosition,263, 148) // cafe
		ctx.strokeRect(lieutenantXPosition,lieutenantYPosition,PLAYERWIDTH,PLAYERHEIGHT) // other player on mars
		ctx.strokeRect(boardXposition, boardYPosition,147, 219) // noteboard
	} else if (stage == 6){
		ctx.strokeRect(tentXPosition, tentYPosition, 257, 234) // tent enterance
		ctx.strokeRect(trainXPosition, trainYPosition, 282, 357) // train enterance
	} else if (stage == 7){
		ctx.strokeRect(exitxPosition, exityPosition, 18, 369) // exit
		ctx.strokeRect(bullitinxPosition, bullitinyPosition, 145, 98) // bullitin
		ctx.strokeRect(drawersxPosition, drawersyPosition, 168, 111)//drwaers
		ctx.strokeRect(atkBuffXPosition, atkBuffYPosition, 55, 90) // atk buff character
	} else if (stage == 8){
		ctx.strokeRect(officexPosition,officeyPosition,136,210) // office door
	} else if (stage == 10){
		ctx.strokeRect(computerXPosition, computerYPositon, 127, 131) // computer in lab
	}
	*/
}
function updateStats(){ // will update stats depending on if you have the buff or not
	if (atkBuff == true){
		attackDamage = 7
	} else if (atkBuff == false){
		attackDamage = 4
	}
	if (defBuff == true){
		health = 35
	} else if (defBuff == false){
		health = 15
	}
}
function yesOrNoF(){ // updates visual for the yes or no
	if(yesOrNoOpen == true){ // if the yes or no bar is open
		if (yesOrNo == 1){ // if its yes
			ctx.drawImage(yesReady,0,0,WIDTH,HEIGHT) // draw yes
		} else if (yesOrNo == 2){ // if its no
			ctx.drawImage(noReady,0,0,WIDTH,HEIGHT) // draw no
		}
	} else { // if its no open
		return; // do nothing
	}
}
//#region tutorialthings
function manageTutorial(){ // updates what is shown for the tutorial and lore
	if (stage == 1){
		if (tutorialScreen == 0){ //part one line one
			ctx.drawImage(P1,0,0, 640, 480)
			ctx.drawImage(P1L1, 0, 50, 650, 26)
			ctx.drawImage(zContune, 150, 350, 325, 13)
		} else if (tutorialScreen == 1){ // part one line two
			ctx.drawImage(P1,0,0, 640, 480)
			ctx.drawImage(P1L1, 0, 50, 650, 26)
			ctx.drawImage(P1L2, 0, 90, 650, 52)
			ctx.drawImage(zContune, 150, 350, 325, 13)
		} else if (tutorialScreen == 2){ //part two line one
			ctx.drawImage(P2,0,0, 640, 480)
			ctx.drawImage(P2L1,0,50, 650, 26)
		} else if (tutorialScreen == 3){ //part two line two
			ctx.drawImage(P2,0,0,640,480)
			ctx.drawImage(P2L1,0,50, 650, 26)
			ctx.drawImage(P2L2,0,90, 650, 52)
		} else if (tutorialScreen == 4){ // part three line one
			ctx.drawImage(P3,0,0)
			ctx.drawImage(P3L1,0,50, 650, 52)
		} else if (tutorialScreen == 5){ //part three line two
			ctx.drawImage(P3,0,0)
			ctx.drawImage(P3L1,0,50, 650, 52)
			ctx.drawImage(P3L2,0,130, 650, 26)
		} else if (tutorialScreen == 6){ // part four line one
			ctx.drawImage(P4,0,0)
			ctx.drawImage(P4L1,0,50,650,52)
		} else if (tutorialScreen == 7){ // part four line two
			ctx.drawImage(P5,0,0)
			ctx.drawImage(P4L2,0,50,650,52)
		} else if (tutorialScreen == 8){ // part four line three
			ctx.drawImage(P5,0,0)
			ctx.drawImage(P4L2,0,50,650,52)
			ctx.drawImage(P4L3,0,120,650,26)
		} else if (tutorialScreen == 9){ // part five line one
			ctx.drawImage(P6,0,0)
			ctx.drawImage(P5L1,0,50,650,52)
		} else if (tutorialScreen == 10){ // part five line two
			ctx.fillStyle = 'black'
			ctx.fillRect(0,0,WIDTH,HEIGHT)
			ctx.fillStyle = 'white'
			ctx.drawImage(P5L1,0,50,650,52)
			ctx.drawImage(P5L2,0,120,650,26)
		} else if (tutorialScreen == 11){ // part six Line one
			ctx.fillStyle = 'black'
			ctx.fillRect(0,0,WIDTH,HEIGHT)
			ctx.fillStyle = 'white'
			ctx.drawImage(P6L1, 0,50,650,26)
		} else if (tutorialScreen == 12){ // part six line two
			ctx.fillStyle = 'black'
			ctx.fillRect(0,0,WIDTH,HEIGHT)
			ctx.fillStyle = 'white'
			ctx.drawImage(P6L2,0,200,650,26)
		} else if (tutorialScreen == 13){
			ctx.drawImage(P7, 0,0)
		} else if (tutorialScreen == 14) {
			ctx.drawImage(P8,0,0)
		} else if (tutorialScreen == 15) {
			ctx.drawImage(P9,0,0)
		} else if (tutorialScreen == 16) {
			ctx.drawImage(P10,0,0)
		} else if (tutorialScreen == 17) {
			ctx.drawImage(P11,0,0)
		} else if (tutorialScreen == 18) {
			ctx.drawImage(P12,0,0)
		} else if (tutorialScreen == 19) {
			stage = 0
			tutorialScreen = 0
		}
	}
}
//#endregion

//#region mainMenuSelection
function mainMenuText(){ // depending on what the player cursor is hovering it will change the images to display the change
	if (stage == 0){
		if (playerSelection == 0){ // play is selected
			ctx.drawImage(playButtonS, 25,100)
			ctx.drawImage(tutorialButtonU, 55,150)
			ctx.drawImage(creditsButtonU, 55, 200)
			ctx.drawImage(enterCodeU,55, 250)
		} else if (playerSelection == 1){ // tutorial is selected
			ctx.drawImage(playButtonU, 55, 100)
			ctx.drawImage(tutorialButtonS, 25, 150)
			ctx.drawImage(creditsButtonU,55, 200)
			ctx.drawImage(enterCodeU,55, 250)
		} else if (playerSelection == 2){ // credits are selected
			ctx.drawImage(playButtonU,55, 100)
			ctx.drawImage(tutorialButtonU,55, 150)
			ctx.drawImage(creditsButtonS,25, 200)
			ctx.drawImage(enterCodeU,55, 250)
		} else if (playerSelection == 3){ // enter code is selected
			ctx.drawImage(playButtonU,55, 100)
			ctx.drawImage(tutorialButtonU,55, 150)
			ctx.drawImage(creditsButtonU,55, 200)
			ctx.drawImage(enterCodeS,25, 250)
		}
	} else if (stage == 1){
	} else if (stage == 2){
		if (codeSelection == 0){ // back button is selected
			ctx.drawImage(backS,0,0)
		} else if (codeSelection == 1){
			ctx.drawImage(backU,30,0)
		}
	} else if (stage == 3){
		if (codeSelection == 0){ // back button is selected
			ctx.drawImage(backS,0,0)
		} else if (codeSelection == 1){
			ctx.drawImage(backU,30,0)
		}
	}
}
//#endregion

function checkStage(){ // will update background based on what stage youre on
	if (stage == 0){ // main menu and main menu backgrounds
		ctx.fillStyle = BACKGROUNDCOLOR
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(backgroundMenu,150,-80,WIDTH,HEIGHT)
	} else if (stage == 1){ // tutorial backgrounds
		ctx.drawImage(P1, 0, 0, WIDTH, HEIGHT)
	} else if (stage == 2){ // creidts or something
		ctx.fillStyle = 'black'
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(credits,0,50)
	} else if (stage == 3){ // enter codes
		ctx.drawImage(backgroundCode,0,0)
		if (goodCode){
			ctx.drawImage(saveLoaded,0,100,640,100)
		}
	} else if (stage == 69){
		ctx.drawImage(battle, 0,0,WIDTH,HEIGHT)
	} else if (stage == 420){
		ctx.drawImage(battleTwo, 0,0,WIDTH,HEIGHT)
	}
}
function manageInventory(){ // updates the visual of the inventory.
	if(stage == 4 || stage == 5 || stage == 6 || stage == 7 || stage == 8 || stage == 10){ // only in active game states
		if (!inventoryOpen){ // if the inventory isnt open
			ctx.drawImage(inventoryClosed,0,0) // draw the image of it closed
		}
		else if (inventoryOpen){ // but if it is open
			if (inventorySelection == 0){
				ctx.drawImage(inventoryTeam,0,0)
			} else if (inventorySelection == 1){
				ctx.drawImage(inventoryItems,0,0)
			} else if (inventorySelection == 2){
				ctx.drawImage(inventorySave,0,0)
			}
		}
	} else if (stage == 69 || stage == 420){
		if (turn == 0){
			if (battleSelection == 0){
				ctx.drawImage(attackSelected,0,0)
			} else if (battleSelection == 1){
				ctx.drawImage(blockSelected,0,0)
			} else if (battleSelection == 2){
				ctx.drawImage(runSelected,0,0)
			}
		}
	}
 }
function manageMovement(){ // makes it so that moving in two directions at the same time, wont mess it up
	if (((movingUp) && (movingLeft)) || ((movingUp) && (movingRight)) || ((movingUp) && (movingDown)) || ((movingLeft) && (movingRight)) || ((movingLeft) && (movingDown)) || ((movingRight) && (movingDown))){ // if any two movement keys are pressed, it will loewr the movement so its the same as if it was only one key pressed
		moveSpeed = 3.7
	} else {
		moveSpeed = 5
	}
 }
function drawBorders(){
	var borderColor =  'green'
	var unpressedColor = BACKGROUNDCOLOR
	if (movingDown){
		var borderXPosition = 0
		ctx.fillStyle = borderColor
		for (var i = 0; i < 15; i++){
			ctx.fillRect(borderXPosition,475,50,5)
			borderXPosition = borderXPosition + 50
			console.log(borderXPosition)
		}
	} else if (movingUp){
		var borderXPosition = 0
		ctx.fillStyle = borderColor
		for (var i = 0; i < 15; i++){
			ctx.fillRect(borderXPosition,0,50,5)
			borderXPosition = borderXPosition + 50
			console.log(borderXPosition)
		}
	} else if (movingLeft){
		var borderYPosition = 0
		ctx.fillStyle = borderColor
		for (var i = 0; i < 15; i++){
			ctx.fillRect(0,borderYPosition,5,50)
			borderYPosition = borderYPosition + 50
			console.log(borderYPosition)
		}
	} else if (movingRight){
		var borderYPosition = 0
		ctx.fillStyle = borderColor
		for (var i = 0; i < 15; i++){
			ctx.fillRect(635,borderYPosition,5,50)
			borderYPosition = borderYPosition + 50
			console.log(borderYPosition)
		}
	}
}
function moveBackground(){ // moves the background
	if (stage == 5){ // only works in the house
		ctx.fillStyle = BACKGROUNDCOLOR
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(houseBackground,BGxPosition, BGyPosition)
		if (movingUp){
			if (BGyPosition <= 170){ // if not touching the edge
				BGyPosition = BGyPosition + moveSpeed // move the background
			} else { // if it is
				BGyPosition = BGyPosition // keep it the same
			}
		}
		if(movingLeft){
			if (BGxPosition <= 270){ // if not touching the edge
				BGxPosition = BGxPosition + moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		if(movingDown){
			if (BGyPosition >= -330){ // if not touching the edge
				BGyPosition = BGyPosition - moveSpeed // move the background
			} else { // if it is
				BGyPosition = BGyPosition // keep it the same
			}
			
		}
		if(movingRight){
			if (BGxPosition >= -560){ // if not touching the edge
				BGxPosition = BGxPosition - moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
			
		}
	}
	if (stage == 4){ // only works in the mars phase of the game
		ctx.fillStyle = BACKGROUNDCOLOR
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(marsBackground,BGxPosition, BGyPosition)
		if (movingUp){
			if (BGyPosition <= -5){ // if not touching the edge
				BGyPosition = BGyPosition + moveSpeed // move the background
			} else { // if it is
				BGyPosition = BGyPosition // keep it the same
			}
		}
		if(movingLeft){
			if (BGxPosition <= -5){ // if not touching the edge
				BGxPosition = BGxPosition + moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		if(movingDown){
			if (BGyPosition >= -2350){ // if not touching the edge
				BGyPosition = BGyPosition - moveSpeed // move the background
			} else { // if it is
				BGyPosition = BGyPosition // keep it the same
			}
			
		}
		if(movingRight){
			if (BGxPosition >= -2350){ // if not touching the edge
				BGxPosition = BGxPosition - moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
			
		}
		//console.log("bg X: " + BGxPosition)
		//console.log("bg Y: " + BGyPosition)
	}
	if (stage == 6){ // only works in the earth
		ctx.fillStyle = BACKGROUNDCOLOR
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(earthBackground,BGxPosition, BGyPosition)
		if (movingUp){
			if (BGyPosition <= -5){ // if not touching the edge
				BGyPosition = BGyPosition + moveSpeed // move the background
			} else { // if it is
				BGyPosition = BGyPosition // keep it the same
			}
		}
		if(movingLeft){
			if (BGxPosition <= -5){ // if not touching the edge
				BGxPosition = BGxPosition + moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		if(movingDown){
			if (BGyPosition >= -2350){ // if not touching the edge
				BGyPosition = BGyPosition - moveSpeed // move the background
			} else { // if it is
				BGyPosition = BGyPosition // keep it the same
			}
			
		}
		if(movingRight){
			if (BGxPosition >= -2400){ // if not touching the edge
				BGxPosition = BGxPosition - moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
			
		}
		//console.log("bg X: " + BGxPosition)
		//console.log("bg Y: " + BGyPosition)
	}
	if (stage == 7){ // only works in the tent
		ctx.fillStyle = BACKGROUNDCOLOR
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(tentBackground,BGxPosition, BGyPosition)
		if(movingLeft){
			if (BGxPosition <= 270){ // if not touching the edge
				BGxPosition = BGxPosition + moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		if(movingRight){
			if (BGxPosition >= -1700){ // if not touching the edge
				BGxPosition = BGxPosition - moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		//console.log("bg X: " + BGxPosition)
		//console.log("bg Y: " + BGyPosition)
	}
	if (stage == 8){ // only works in the train station
		ctx.fillStyle = BACKGROUNDCOLOR
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(trainBackground,BGxPosition, BGyPosition)
		if(movingLeft){
			if (BGxPosition <= 270){ // if not touching the edge
				BGxPosition = BGxPosition + moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		if(movingRight){
			if (BGxPosition >= -2275){ // if not touching the edge
				BGxPosition = BGxPosition - moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		//console.log("bg X: " + BGxPosition)
		//console.log("bg Y: " + BGyPosition)
	}
	if (stage == 9){
		if (zombieDead == false){
			ctx.fillStyle = BACKGROUNDCOLOR
			ctx.fillRect(0,0,WIDTH,HEIGHT)
			ctx.drawImage(officeBackgroundZ,0,0)
		} else if (zombieDead == true){
			ctx.fillStyle = BACKGROUNDCOLOR
			ctx.fillRect(0,0,WIDTH,HEIGHT)
			ctx.drawImage(officeBackground,0,0)
		}
	}
	if (stage == 10){
		ctx.fillStyle = BACKGROUNDCOLOR
		ctx.fillRect(0,0,WIDTH,HEIGHT)
		ctx.drawImage(labBackground,BGxPosition, BGyPosition)
		if(movingLeft){
			if (BGxPosition <= 270){ // if not touching the edge
				BGxPosition = BGxPosition + moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
		if(movingRight){
			if (BGxPosition >= -1370){ // if not touching the edge
				BGxPosition = BGxPosition - moveSpeed // move the background
			} else { // if it is
				BGxPosition = BGxPosition // keep it the same
			}
		}
	}
}
function toggleNoteF(){ // updates dialogue for every part of the game
	if (stage == 5){ // only works in house
		if (toggleNote == true){ // if note is open
			if (diologueNumber == 2){ //if the dialogue number is 2
				ctx.drawImage(note,0,0,WIDTH,HEIGHT) //draw the dialogue accociated with 2
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			} else if (diologueNumber == 0){ // if its 0
				ctx.drawImage(dia0,0,0, WIDTH,HEIGHT) // draw dialogue 0
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			} else if (diologueNumber == 1){ // if its one
				//draw dialogue one
			} else if (diologueNumber == 3){ //if its three
				ctx.drawImage(dia3, 0,0,WIDTH,HEIGHT) //draw three
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			} else if (diologueNumber == 6){
				ctx.drawImage(SavedTooEarly,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (toggleNote == true){
				if(diologueNumber == 13){ // no buffs
					ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if(diologueNumber == 14){ // only atk buff
					ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
	
				}
				if(diologueNumber == 15){ // only def buff
					ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if(diologueNumber == 16){ // atk and def buff
					ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 60){
					ctx.drawImage(inventoryShield, 0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 61){
					ctx.drawImage(inventoryNothing, 0, 0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 106){
					ctx.drawImage(savedOverATK,0,0)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 107){
					ctx.drawImage(savedOverDef,0,0)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
			}
		}
	} else if (stage == 4){ // only works on mars
		if (toggleNote == true){ // if note is open
			if (diologueNumber == 4){ // if its four
				ctx.drawImage(dia4, 0,0,WIDTH,HEIGHT) //draw dialogue four
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 6){ // if 6
				ctx.drawImage(SavedTooEarly,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 8){ // noteboard 1
				ctx.drawImage(dia8,0,0,WIDTH,HEIGHT)
				yesOrNoOpen = false
				contiunedDialogue = 2
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 9){ // noteboard 2
				ctx.drawImage(dia9,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 3
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 10){ // noteboard 3
				ctx.drawImage(dia10,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 4
				setTimeout(() => {checkZ();}, 100)

			}
			if(diologueNumber == 11){ // noteboard 4
				ctx.drawImage(dia11,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 5
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 12){ // noteboard 5
				ctx.drawImage(dia12,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 6
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 23){
				ctx.drawImage(dia23,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 700){
				ctx.drawImage(dia700,0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 701){ // noteboard
				ctx.drawImage(dia701,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (toggleNote == true){
				if(diologueNumber == 13){ // no buffs
					ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if(diologueNumber == 14){ // only atk buff
					ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
	
				}
				if(diologueNumber == 15){ // only def buff
					ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if(diologueNumber == 16){ // atk and def buff
					ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 60){
					ctx.drawImage(inventoryShield, 0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 61){
					ctx.drawImage(inventoryNothing, 0, 0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 106){
					ctx.drawImage(savedOverATK,0,0)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 107){
					ctx.drawImage(savedOverDef,0,0)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
			}
		}	
	} else if (stage == 6){//only works on earth
		if (toggleNote == true){
			if (diologueNumber == 7){
				ctx.drawImage(SavedEarthOne,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 27){
				ctx.drawImage(SavedEarthOneATK,0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (toggleNote == true){
				if(diologueNumber == 13){ // no buffs
					ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if(diologueNumber == 14){ // only atk buff
					ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
	
				}
				if(diologueNumber == 15){ // only def buff
					ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if(diologueNumber == 16){ // atk and def buff
					ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 60){
					ctx.drawImage(inventoryShield, 0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 61){
					ctx.drawImage(inventoryNothing, 0, 0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
			}
		}
	} else if (stage == 7){ // if in tent
		if (toggleNote == true){
			if (diologueNumber == 17){
				ctx.drawImage(SavedTent,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 18){
				ctx.drawImage(dia18, 0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 19){
				ctx.drawImage(dia19,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 20){
				ctx.drawImage(dia20,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 12
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 21){
				ctx.drawImage(dia21,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 22){
				ctx.drawImage(savedTentATK, 0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 24){
				ctx.drawImage(dia24, 0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (toggleNote == true){ // i do toggle note again just so i know where the team cut off is
				if(diologueNumber == 13){ // no buffs
					ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if(diologueNumber == 14){ // only atk buff
					ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
	
				}
				if(diologueNumber == 15){ // only def buff
					ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if(diologueNumber == 16){ // atk and def buff
					ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 60){
					ctx.drawImage(inventoryShield, 0,0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
				if (diologueNumber == 61){
					ctx.drawImage(inventoryNothing, 0, 0,WIDTH,HEIGHT)
					contiunedDialogue = 0
					setTimeout(() => {checkZ();}, 100)
				}
			}
		}
	} else if (stage == 8){ // in trian station
		if (toggleNote == true){
			if (diologueNumber == 25){
				ctx.drawImage(savedTrain,0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 28){
				ctx.drawImage(savedTrainATK,0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 26){
				ctx.drawImage(dia26, 0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 30){
				ctx.drawImage(savedTrainDef, 0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 31){ // both buffs
				ctx.drawImage(savedTrainATKDEF, 0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
		}
		if (toggleNote == true){ // i do toggle note again just so i know where the team cut off is
			if(diologueNumber == 13){ // no buffs
				ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 14){ // only atk buff
				ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)

			}
			if(diologueNumber == 15){ // only def buff
				ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 16){ // atk and def buff
				ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 60){
				ctx.drawImage(inventoryShield, 0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 61){
				ctx.drawImage(inventoryNothing, 0, 0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
		}
	} else if (stage == 9){ // if in the office
		if (toggleNote == true){
			if (diologueNumber == 29){
				ctx.drawImage(cantSave,0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 32){
				ctx.drawImage(dia32,0,0)
				contiunedDialogue = 13
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 33){
				ctx.drawImage(dia33,0,0)
				contiunedDialogue = 14
				setTimeout(() => {checkZ();}, 100)
			}
		}
		if (toggleNote == true){
			if (diologueNumber == 50){
				ctx.drawImage(dia50,0,0)
				if (returnToOffice == false){
					contiunedDialogue = 50
				} else {
					contiunedDialogue = 53
				}
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 51){
				ctx.drawImage(dia51,0,0)
				contiunedDialogue = 51
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 52){
				ctx.drawImage(dia52,0,0)
				contiunedDialogue = 52
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 53){
				ctx.drawImage(dia53,0,0)
				contiunedDialogue = 53
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 54){
				ctx.drawImage(dia54,0,0)
				contiunedDialogue = 54
				setTimeout(() => {checkZ();}, 100)
			}
		}
		if (toggleNote == true){ // i do toggle note again just so i know where the team cut off is
			if(diologueNumber == 13){ // no buffs
				ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 14){ // only atk buff
				ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)

			}
			if(diologueNumber == 15){ // only def buff
				ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 16){ // atk and def buff
				ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 60){
				ctx.drawImage(inventoryShield, 0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 61){
				ctx.drawImage(inventoryNothing, 0, 0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
		}
	} else if (stage == 10){
		if (toggleNote == true){
			if (diologueNumber == 29){
				ctx.drawImage(cantSave,0,0)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 13){ // no buffs
				ctx.drawImage(team0,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 14){ // only atk buff
				ctx.drawImage(team1,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)

			}
			if(diologueNumber == 15){ // only def buff
				ctx.drawImage(team2,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if(diologueNumber == 16){ // atk and def buff
				ctx.drawImage(team3,0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 60){
				ctx.drawImage(inventoryShield, 0,0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 61){
				ctx.drawImage(inventoryNothing, 0, 0,WIDTH,HEIGHT)
				contiunedDialogue = 0
				setTimeout(() => {checkZ();}, 100)
			}
		}
		if (toggleNote == true){
			if (diologueNumber == 81){
				ctx.drawImage(dia81, 0,0)
				contiunedDialogue = 81
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 82){
				ctx.drawImage(dia82, 0,0)
				contiunedDialogue = 82
				setTimeout(() => {checkZ();}, 100)
			}
		}
	} else if (stage == 69 || stage == 420){ // if in office battle
		if (toggleNote == true){
			if (diologueNumber == 41){
				ctx.drawImage(cantRun,0,0)
				contiunedDialogue = 17
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 42){
				ctx.drawImage(dia42, 0,0)
				contiunedDialogue = 17
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 34){
				ctx.drawImage(dia34, 0,0)
				contiunedDialogue = 17
				calculateDamage("zombie", 4)
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 35){
				ctx.drawImage(dia35, 0,0)
				contiunedDialogue = 17
				calculateDamage("zombie", 4)
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 36){
				ctx.drawImage(dia36, 0,0)
				contiunedDialogue = 17
				calculateDamage("zombie", 7)
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 37){
				ctx.drawImage(dia37, 0,0)
				contiunedDialogue = 17
				calculateDamage("zombie", 7)
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 38){
				ctx.drawImage(dia38, 0,0)
				contiunedDialogue = 16
				calculateDamage("player", 4)
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 39){
				ctx.drawImage(dia39, 0,0)
				contiunedDialogue = 16
				calculateDamage("player", 12)
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 40){ // blocking with no shield
				ctx.drawImage(dia40, 0,0)
				contiunedDialogue = 16
				calculateDamage("player", 1)
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 43){ // zombie dies
				ctx.drawImage(dia43, 0,0)
				contiunedDialogue = 43
				zombieDead = true
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 44){ // blocking with advancedshield
				ctx.drawImage(dia44, 0,0)
				contiunedDialogue = 17
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 45){ // blocked + heal
				ctx.drawImage(dia45, 0,0)
				contiunedDialogue = 16
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 46){ // blocked no heal
				ctx.drawImage(dia46, 0,0)
				contiunedDialogue = 16
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 47){ // blocked no heal
				ctx.drawImage(dia47, 0,0)
				contiunedDialogue = 47
				setTimeout(() => {checkZ();}, 100)
			}
			if (diologueNumber == 48){ // if you die
				ctx.drawImage(dia48,0,0)
				contiunedDialogue = 48
				setTimeout(() => {checkZ();}, 100)
			}
		}
	} else if (stage == 106){
		if (toggleNote == true){
			if (diologueNumber == 49){ // if you die
				console.log("drawing")
				ctx.drawImage(dia49,0,0)
				contiunedDialogue = 49
				setTimeout(() => {checkZ();}, 100)
			}
		}
	} else if (stage == 222){
		if (toggleNote == true){
			if (diologueNumber == 222){
				ctx.drawImage(tysmforplaying,0,0)
				contiunedDialogue = 222
				setTimeout(() => {checkZ();}, 100)
			}
		}
	}
}
function checkZ(){ // check if z is pressed
	if (yesOrNoOpen == true){ // unless yes or no is open
		if (zPressed == true){ // if z is pressed
			if (yesOrNo == 1){ // and yes or no is set tp yes
				console.log("yes")
				BGxPosition = -275
				BGyPosition = -325
				stage = 6 // go to earth
				toggleNote = false
				dialogueOpen = false
				yesOrNoOpen = false
			}
			if (yesOrNo == 2){ // if its set to no
				console.log("no")
				yesOrNoOpen = false
				toggleNote = false
				dialogueOpen = false
				yesOrNo = 1
			}
		}
	} else if (yesOrNoOpen == false){
		if (zPressed){
			if (contiunedDialogue == 0){
				toggleNote = false
				dialogueOpen = false
			}
			if (contiunedDialogue == 2){
				setTimeout(() => {oneToTwo();}, 100)
			} else if (contiunedDialogue == 3){
				setTimeout(() => {twoToThree();}, 100)
			} else if (contiunedDialogue == 4){
				setTimeout(() => {threeToFour();}, 100)
			} else if (contiunedDialogue == 5){
				setTimeout(() => {fourToFive();}, 100)
			} else if (contiunedDialogue == 6){
				toggleNote = false
				dialogueOpen = false
				noteboardOpen = false
			} else if (contiunedDialogue == 12){
				setTimeout(() => {addATKBuff();}, 100)
			} else if (contiunedDialogue == 13){
				setTimeout(() => {zombAttacks();}, 100)
			} else if (contiunedDialogue == 14){
				setTimeout(() => {startBattle('Office', 15);}, 100)
				toggleNote = false
				dialogueOpen = false
				return;
			}
			if (contiunedDialogue == 16){
				toggleNote = false
				dialogueOpen = false
				setTimeout(() => {playersTurn();}, 100)
			}
			if (contiunedDialogue == 17){
				toggleNote = false
				dialogueOpen = false
				setTimeout(() => {zombiesTurn();}, 100)
			} 
			if (contiunedDialogue == 43){
				stage = 9
				diologueNumber = 50
				toggleNote = true
				dialogueOpen = true
			}
			if (contiunedDialogue == 50){
				setTimeout(() => {fiveToOne();}, 100)
			} else if (contiunedDialogue == 51){
				setTimeout(() => {fiveToTwo();}, 100)
			} else if (contiunedDialogue == 52){
				setTimeout(() => {fiveToThree();}, 100)
			}else if (contiunedDialogue == 53){
				setTimeout(() => {fiveToFour();}, 100)
			} else if (contiunedDialogue == 54){
				toggleNote = false
				dialogueOpen = false
				BGxPosition = -665
				BGyPosition = -100
				playerXPosition = 280
				playerYPosition = 180
				updateStats()
				returnToOffice = true
				stage = 8
			}
			if (contiunedDialogue == 81){
				setTimeout(() => {t81o82();}, 100)
			}
			if (contiunedDialogue == 82){
				setTimeout(() => {startBattle('Lab', 60);}, 100)
				toggleNote = false
				dialogueOpen = false
				return;
			}
			if (contiunedDialogue == 47){
				stage = 105
				ending = 1
			}
			if (contiunedDialogue == 48){
				stage = 106
			}
			if (contiunedDialogue == 49){
				toggleNote = false
				dialogueOpen = false
				stage = 0
				return;
			}
			if (contiunedDialogue == 222){
				toggleNote = false
				dialogueOpen = false
				stage = 0
				return;
			}
		}
	}
}
function theEnd(){ // you've beat the game or youve died\
	if (stage == 105){
		if(ending == 1){
			ctx.drawImage(L1, 0,0)
		} else if (ending == 2){
			ctx.drawImage(L2, 0,0)
		} else if (ending == 3){
			ctx.drawImage(L3, 0,0)
		} else if (ending == 4){
			ctx.drawImage(L4, 0,0)
		} else if (ending >= 5){
			over = true
			BGxPosition = -500
			BGyPosition = 130
			stage = 5
			toggleNote = false
			dialogueOpen = false
			ending = 0
		}
	} else if (stage == 106){
		diologueNumber = 49
		toggleNote = true
		dialogueOpen = true
	} else if (stage == 222){
		diologueNumber = 222
		toggleNote = true
		dialogueOpen = true
	}
}
//#region continutedDialogue
function t81o82(){
	diologueNumber = 82
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 82
}
function fiveToOne(){
	diologueNumber = 51
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 51
}
function fiveToTwo(){
	diologueNumber = 52
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 52
}
function fiveToThree(){
	diologueNumber = 53
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 53
	defBuff = true
}
function fiveToFour(){
	diologueNumber = 54
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 54
}
function oneToTwo(){ // two to the one
	diologueNumber = 9
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 3
}
function twoToThree(){ // to the one
	diologueNumber = 10
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 4
}
function threeToFour(){ // to the three
	diologueNumber = 11
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 5
}
function fourToFive(){ //
	diologueNumber = 12
	toggleNote = true
	dialogueOpen = true
	contiunedDialogue = 6
}
function playersTurn(){
	counter = false
	diologueNumber = 420
	block = false
	battleSelection = 0
	turn = 0
	console.log("palyers turn")
}
function zombiesTurn(){
	counter = false
	turn = 1
	zAttack = Math.random() * 10
	console.log("zombies turn")
}
function addATKBuff(){ // attack buff joins ur team
	diologueNumber = 21
	toggleNote = true
	dialogueOpen = true
	atkBuff = true
}
//#endregion
function updateHealth(){
	if (stage == 69){
		if (health == 15){
			ctx.drawImage(HP15,50,50)
		} else if (health == 14){
			ctx.drawImage(HP14,50,50)
		} else if (health == 13){
			ctx.drawImage(HP13,50,50)
		} else if (health == 12){
			ctx.drawImage(HP12,50,50)
		} else if (health == 11){
			ctx.drawImage(HP11,50,50)
		} else if (health == 10){
			ctx.drawImage(HP10,50,50)
		} else if (health == 9){
			ctx.drawImage(HP9,50,50)
		} else if (health == 8){
			ctx.drawImage(HP8,50,50)
		} else if (health == 7){
			ctx.drawImage(HP7,50,50)
		} else if (health == 6){
			ctx.drawImage(HP6,50,50)
		} else if (health == 5){
			ctx.drawImage(HP5,50,50)
		} else if (health == 4){
			ctx.drawImage(HP4,50,50)
		} else if (health == 3){
			ctx.drawImage(HP3,50,50)
		} else if (health == 2){
			ctx.drawImage(HP2,50,50)
		} else if (health == 1){
			ctx.drawImage(HP1,50,50)
		} else if (health <= 0){
			ctx.drawImage(PL0,50,50)
		}
		if (zombieHP == 15){
			ctx.drawImage(ZHP15,400,50)
		} else if (zombieHP == 11){
			ctx.drawImage(ZHP11,400,50)
		} else if (zombieHP == 9){
			ctx.drawImage(ZHP9,400,50)
		} else if (zombieHP == 8){
			ctx.drawImage(ZHP8,400,50)
		} else if (zombieHP == 7){
			ctx.drawImage(ZHP7,400,50)
		} else if (zombieHP == 3){
			ctx.drawImage(ZHP3,400,50)
		} else if (zombieHP == 1){
			ctx.drawImage(ZHP1,400,50)
		} else if (zombieHP <= 0){
			ctx.drawImage(ZHP0,400,50)
		}
	} else if (stage == 420){
		if (zombieHP == 60){ //sets display helath based on health variable
			ctx.drawImage(Z60,400,50)
		} else if (zombieHP == 56){
			ctx.drawImage(Z56,400,50)
		}else if (zombieHP == 53){
			ctx.drawImage(Z53,400,50)
		}else if (zombieHP == 52){
			ctx.drawImage(Z52,400,50)
		}else if (zombieHP == 48){
			ctx.drawImage(Z48,400,50)
		}else if (zombieHP == 46){
			ctx.drawImage(Z46,400,50)
		}else if (zombieHP == 44){
			ctx.drawImage(Z44,400,50)
		}else if (zombieHP == 40){
			ctx.drawImage(Z40,400,50)
		}else if (zombieHP == 39){
			ctx.drawImage(Z39,400,50)
		}else if (zombieHP == 36){
			ctx.drawImage(Z36,400,50)
		}else if (zombieHP == 32){
			ctx.drawImage(Z32,400,50)
		}else if (zombieHP == 28){
			ctx.drawImage(Z28,400,50)
		}else if (zombieHP == 25){
			ctx.drawImage(Z25,400,50)
		}else if (zombieHP == 24){
			ctx.drawImage(Z24,400,50)
		}else if (zombieHP == 20){
			ctx.drawImage(Z20,400,50)
		}else if (zombieHP == 18){
			ctx.drawImage(Z18,400,50)
		}else if (zombieHP == 16){
			ctx.drawImage(Z16,400,50)
		}else if (zombieHP == 12){
			ctx.drawImage(Z12,400,50)
		}else if (zombieHP == 11){
			ctx.drawImage(Z11,400,50)
		}else if (zombieHP == 8){
			ctx.drawImage(Z8,400,50)
		}else if (zombieHP == 4){
			ctx.drawImage(Z4,400,50)
		}else if (zombieHP <= 0){
			ctx.drawImage(Z0,400,50)
		}
		if (health == 35){
			ctx.drawImage(PL35,50,50)
		} else if (health == 34){
			ctx.drawImage(PL34,50,50)
		} else if (health == 33){
			ctx.drawImage(PL33,50,50)
		} else if (health == 32){
			ctx.drawImage(PL32,50,50)
		} else if (health == 31){
			ctx.drawImage(PL31,50,50)
		} else if (health == 30){
			ctx.drawImage(PL30,50,50)
		} else if (health == 29){
			ctx.drawImage(PL29,50,50)
		} else if (health == 28){
			ctx.drawImage(PL28,50,50)
		} else if (health == 27){
			ctx.drawImage(PL27,50,50)
		} else if (health == 26){
			ctx.drawImage(PL26,50,50)
		} else if (health == 25){
			ctx.drawImage(PL25,50,50)
		} else if (health == 24){
			ctx.drawImage(PL24,50,50)
		} else if (health == 23){
			ctx.drawImage(PL23,50,50)
		} else if (health == 22){
			ctx.drawImage(PL22,50,50)
		} else if (health == 21){
			ctx.drawImage(PL21,50,50)
		} else if (health == 20){
			ctx.drawImage(PL20,50,50)
		} else if (health == 19){
			ctx.drawImage(PL19,50,50)
		} else if (health == 18){
			ctx.drawImage(PL18,50,50)
		} else if (health == 17){
			ctx.drawImage(PL17,50,50)
		} else if (health == 16){
			ctx.drawImage(PL16,50,50)
		} else if (health == 15){
			ctx.drawImage(PL15,50,50)
		} else if (health == 14){
			ctx.drawImage(PL14,50,50)
		} else if (health == 13){
			ctx.drawImage(PL13,50,50)
		} else if (health == 12){
			ctx.drawImage(PL12,50,50)
		} else if (health == 11){
			ctx.drawImage(PL11,50,50)
		} else if (health == 10){
			ctx.drawImage(PL10,50,50)
		} else if (health == 9){
			ctx.drawImage(PL9,50,50)
		} else if (health == 8){
			ctx.drawImage(PL8,50,50)
		} else if (health == 7){
			ctx.drawImage(PL7,50,50)
		} else if (health == 6){
			ctx.drawImage(PL6,50,50)
		} else if (health == 5){
			ctx.drawImage(PL5,50,50)
		} else if (health == 4){
			ctx.drawImage(PL4,50,50)
		} else if (health == 3){
			ctx.drawImage(PL3,50,50)
		} else if (health == 2){
			ctx.drawImage(PL2,50,50)
		} else if (health == 1){
			ctx.drawImage(PL1,50,50)
		} else if (health <= 0){
			ctx.drawImage(PL0,50,50)
		}
	}
}
function zombAttacks(){
	diologueNumber = 33
	toggleNote = true
	dialogueOpen = true
}
function calculateDamage(target, damage){
	if (target == "zombie"){
		if (counter == false){
			zombieHP = zombieHP - damage
			counter = true
		}
	} else if (target == "player"){
		if (counter == false){
			health = health - damage
			counter = true
		}
	}
}
function startBattle(Zlocation, Zhealth){
	battleSelection = 0
	console.log("Started battle")
	zombieHP = Zhealth
	zombieLocation = Zlocation
	block = false
	if (zombieLocation == "Office"){
		stage = 69
	} else if (zombieLocation == "Lab"){
		stage = 420
	}
}
function checkBattle(){
	if (stage == 69){
		if (health  > 0 || zombieHP > 0){
			if (turn == 0){
				if (zPressed){
					if (battleSelection == 0){
						var attack = Math.random() * 10
						if (atkBuff == false){
							if (attack > 5){
								diologueNumber = 34
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							} else {
								diologueNumber = 35
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							}
						} else {
							if (attack > 5){
								diologueNumber = 36
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							} else {
								diologueNumber = 37
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							}
						}
					} else if (battleSelection == 1){
						console.log('block')
						block = true
						diologueNumber = 42
						toggleNote = true
						dialogueOpen = true
						battleSelection = 4
						zPressed = false
					} else if (battleSelection == 2){
						console.log('run')
						diologueNumber = 41
						toggleNote = true
						dialogueOpen = true
						battleSelection = 4
						zPressed = false
					}
				}
			} else {
				if (block == false){
					if (zAttack > 9.7){
						//console.log("heavy attack")
						diologueNumber = 39
						toggleNote = true
						dialogueOpen = true
					} else {
						//console.log("light attack")
						diologueNumber = 38
						toggleNote = true
						dialogueOpen = true
					}
				} else {
					console.log("blocked attack")
					diologueNumber = 40
					toggleNote = true
					dialogueOpen = true
				}
			}
		}
		if (health <= 0){
			console.log("kill player")
			diologueNumber = 48
			toggleNote = true
			dialogueOpen = true
		} else if (zombieHP <= 0){
			console.log("kill zombie")
			diologueNumber = 43
			toggleNote = true
			dialogueOpen = true
		}
	}
	if (stage == 420){
		if (health  > 0 || zombieHP > 0){
			if (turn == 0){
				if (zPressed){
					if (battleSelection == 0){
						if (atkBuff == false){
							if (attack > 5){
								diologueNumber = 34
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							} else {
								diologueNumber = 35
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							}
						} else {
							if (attack > 5){
								diologueNumber = 36
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							} else {
								diologueNumber = 37
								toggleNote = true
								dialogueOpen = true
								battleSelection = 4
								zPressed = false
							}
						}
					} else if (battleSelection == 1){
						if (defBuff == false){
							console.log('block')
							block = true
							diologueNumber = 42
							toggleNote = true
							dialogueOpen = true
							battleSelection = 4
							zPressed = false
						} else if (defBuff == true){
							console.log('advanced block')
							block = true
							diologueNumber = 44
							toggleNote = true
							dialogueOpen = true
							battleSelection = 4
							zPressed = false
						}
					} else if (battleSelection == 2){
						console.log('run')
						diologueNumber = 41
						toggleNote = true
						dialogueOpen = true
						battleSelection = 4
						zPressed = false
					}
				}
			} else {
				if (block == false){
					if (zAttack > 6){
						//console.log("heavy attack")
						diologueNumber = 39
						toggleNote = true
						dialogueOpen = true
					} else {
						//console.log("light attack")
						diologueNumber = 38
						toggleNote = true
						dialogueOpen = true
					}
				} else {
					if (defBuff == false){
						console.log("blocked attack")
						diologueNumber = 40
						toggleNote = true
						dialogueOpen = true
					} else {
						if (health >= 35){
							health = 35
							diologueNumber = 46
							toggleNote = true
							dialogueOpen = true
						} else {
							calculateDamage("player", -3)
							diologueNumber = 45
							toggleNote = true
							dialogueOpen = true
						}
					}
				}
			}
		}
		if (health <= 0){
			console.log("kill player")
			diologueNumber = 48
			toggleNote = true
			dialogueOpen = true
		} else if (zombieHP <= 0){
			console.log("kill zombie")
			diologueNumber = 47
			toggleNote = true
			dialogueOpen = true
		}
	}
}
function setTrue(){ // open text
	toggleNote = true
	dialogueOpen = true
}
function updateHousePositions(){ // keep the interactables moving with the background
	bedXPosition = BGxPosition + 690
	bedYPosition = BGyPosition + 130
	tvXPosition = BGxPosition + 50
	tvYPosition = BGyPosition
	stairsXPosition = BGxPosition + 380
	stairsYPosition = BGyPosition
	doorXPosition = BGxPosition + 355
	doorYPosition = BGyPosition + 575
	deskXPosition = BGxPosition + 590
	deskYPosition = BGyPosition
}
function houseThings(){ // draw the interactables in the house
	if (stage == 5){
		ctx.drawImage(houseDoor, doorXPosition, doorYPosition)
		ctx.drawImage(houseBed, bedXPosition, bedYPosition)
		ctx.drawImage(houseStairs, stairsXPosition, stairsYPosition)
		ctx.drawImage(deskWithNote, deskXPosition, deskYPosition)
		if (tvToggle == 0){
			ctx.drawImage(tvOff, tvXPosition, tvYPosition)
		} else if (tvToggle == 1){
			ctx.drawImage(tvOn, tvXPosition, tvYPosition)
		}
	}
}
function updateMarsPositions(){ // keep the interactables moving with the background
	marsDoorXPosition = BGxPosition +  2410
	marsDoorYPosition = BGyPosition + 559
	cafeXPosition = BGxPosition + 570
	cafeYPosition = BGyPosition + 1633
	lieutenantXPosition = BGxPosition + 2200
	lieutenantYPosition = BGyPosition + 2500
	boardXposition = BGxPosition + 390
	boardYPosition = BGyPosition + 1572
}
function marsThings(){ // draw the interactables on mars
	if (stage == 4){
		ctx.drawImage(marsHouseDoor, marsDoorXPosition, marsDoorYPosition)
		ctx.drawImage(marsFoodCafe, cafeXPosition, cafeYPosition)
		ctx.drawImage(lieutenant, lieutenantXPosition, lieutenantYPosition, PLAYERWIDTH, PLAYERHEIGHT)
		ctx.drawImage(marsNoteBoard, boardXposition, boardYPosition)
	}
}
function updateEarthPositions(){ // keep the interactables moving with the background
	tentXPosition = BGxPosition + 2155
	tentYPosition = BGyPosition + 485
	trainXPosition = BGxPosition + 1700
	trainYPosition = BGyPosition + 2425
}
function earthThings(){ // draw the interactables on earth
	if (stage == 6){
		ctx.drawImage(tentEnterance, tentXPosition, tentYPosition)
		ctx.drawImage(trainEnterance, trainXPosition, trainYPosition)
	}
}
function updateTentPositions(){ // keep the interactables moving with the background
	exitxPosition = BGxPosition + 10
	exityPosition = BGyPosition
	bullitinxPosition = BGxPosition + 350
	bullitinyPosition = BGyPosition + 215
	drawersxPosition = BGxPosition + 680
	drawersyPosition = BGyPosition + 215
	atkBuffXPosition = BGxPosition + 1565
	atkBuffYPosition = BGyPosition + 280
}
function tentThings(){ // draw the interactables in the tent
	if (stage == 7){
		ctx.drawImage(tentExit,tentXPosition,tentYPosition)
		ctx.drawImage(bullitin, bullitinxPosition, bullitinyPosition)
		ctx.drawImage(drawers, drawersxPosition, drawersyPosition)
		ctx.drawImage(atkBuffC, atkBuffXPosition, atkBuffYPosition)
	}
}
function updateTrainPositions(){
	officexPosition = BGxPosition + 910
	officeyPosition = BGyPosition + 125
}
function trainThings(){
	if (stage == 8){
		ctx.drawImage(officeEnterance, officexPosition, officeyPosition)
	}
}
function updateLabPositions(){
	computerXPosition = BGxPosition + 1400
	computerYPositon = BGyPosition + 315
}
function labThings(){
	if (stage == 10){
		ctx.drawImage(computer, computerXPosition, computerYPositon)
	}
}
function detectComputerCollision(){
	if (stage == 10){
		if (toggleNote == false){
			if(playerXPosition + PLAYERWIDTH >= computerXPosition && playerYPosition + PLAYERHEIGHT >= computerYPositon && playerXPosition <= computerXPosition + 127 && playerYPosition <= computerYPositon + 131)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching computer")
				return(true)
			}else{
				//console.log("not touching computer")
				return(false)
			}
		}
	}
}
//#region earth object collisions
function detectTentCollision(){ // detect collision on the tent enterance
	if (stage == 6){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= tentXPosition && playerYPosition + PLAYERHEIGHT >= tentYPosition && playerXPosition <= tentXPosition + 257 && playerYPosition <= tentYPosition + 234)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching tent enterance")
				return(true)
			}else{
				//console.log("not touching tent enterance")
				return(false)
			}
		}
	}
}
function detectTrainCollision(){ // detect collision on the train station enterance
	if (stage == 6){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= trainXPosition && playerYPosition + PLAYERHEIGHT >= trainYPosition && playerXPosition <= trainXPosition + 282 && playerYPosition <= trainYPosition + 357)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching tent enterance")
				return(true)
			}else{
				//console.log("not touching tent enterance")
				return(false)
			}
		}
	}
}
//#endregion
//#region tent object collisions
function detectExitCollision(){ // detect collision on the exit
	if (stage == 7){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= exitxPosition && playerYPosition + PLAYERHEIGHT >= exityPosition && playerXPosition <= exitxPosition + 18 && playerYPosition <= exityPosition + 369)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching tent enterance")
				return(true)
			}else{
				//console.log("not touching tent enterance")
				return(false)
			}
		}
	}
}
function detectbullitinCollision(){ // detect collision on the bulliten board
	if (stage == 7){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= bullitinxPosition && playerYPosition + PLAYERHEIGHT >= bullitinyPosition && playerXPosition <= bullitinxPosition + 145 && playerYPosition <= bullitinxPosition + 98)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching tent enterance")
				return(true)
			}else{
				//console.log("not touching tent enterance")
				return(false)
			}
		}
	}
}
function detectDrawerCollision(){ // detect collision on the drawers
	if (stage == 7){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= drawersxPosition && playerYPosition + PLAYERHEIGHT >= drawersyPosition && playerXPosition <= drawersxPosition + 168 && playerYPosition <= drawersyPosition + 111)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching tent enterance")
				return(true)
			}else{
				//console.log("not touching tent enterance")
				return(false)
			}
		}
	}
}
function detectATKBuffCollision(){ // detect collision on the atk buff in tent
	if (stage == 7){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= atkBuffXPosition && playerYPosition + PLAYERHEIGHT >= atkBuffYPosition && playerXPosition <= atkBuffXPosition + 55 && playerYPosition <= atkBuffYPosition + 90)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching tent enterance")
				return(true)
			}else{
				//console.log("not touching tent enterance")
				return(false)
			}
		}
	}
}
//#endregion
//#region mars object collisions
function detectMarsDoorCollision(){ // detect collision on the door to house
	if (stage == 4){ 
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= marsDoorXPosition && playerYPosition + PLAYERHEIGHT >= marsDoorYPosition && playerXPosition <= marsDoorXPosition + 133 && playerYPosition <= marsDoorYPosition + 200)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching mars door")
				return(true)
			}else{
				//console.log("not touching mars door")
				return(false)
			}
		}
	}
}
function detectNoteBoardCollision(){ // detect collision on the noteboard
	if (stage == 4){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH > boardXposition && playerYPosition + PLAYERHEIGHT >= boardYPosition && playerXPosition <= boardXposition + 147 && playerYPosition <= boardYPosition + 219)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching mars door")
				return(true)
			}else{
				//console.log("not touching mars door")
				return(false)
			}
		}
	}
}
function detectLieutenantCollision(){ // detect collision on the lietenant
	if (stage == 4){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= lieutenantXPosition && playerYPosition + PLAYERHEIGHT >= lieutenantYPosition && playerXPosition <= lieutenantXPosition + PLAYERWIDTH && playerYPosition <= lieutenantYPosition + PLAYERHEIGHT)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				return(true)
			}else{
				return(false)
			}
		}
	}
}
function detectCafeCollision(){ // detect collision on the cafe front
	if (stage == 4){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= cafeXPosition && playerYPosition + PLAYERHEIGHT >= cafeYPosition && playerXPosition <= cafeXPosition + 263 && playerYPosition <= cafeYPosition + 148)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching bed")
				return(true)
			}else{
				//console.log("not touching bed")
				return(false)
			}
		}
	}
}
//#endregion
//#region house object collisions
function detectDeskCollision(){ // detect collision on the desk
	if (stage == 5){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= deskXPosition && playerYPosition + PLAYERHEIGHT >= deskYPosition && playerXPosition <= deskXPosition + 182 && playerYPosition <= deskYPosition + 54)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching bed")
				return(true)
			}else{
				//console.log("not touching bed")
				return(false)
			}
		}
	}
}
function detectBedCollision(){ // detect collision on the bed
	if (stage == 5){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= bedXPosition && playerYPosition + PLAYERHEIGHT >= bedYPosition && playerXPosition <= bedXPosition + 210 && playerYPosition <= bedYPosition + 102)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching bed")
				return(true)
			}else{
				//console.log("not touching bed")
				return(false)
			}
		}
	}
}
function detectTVCollision(){ // detect collision on the tv
	if (stage == 5){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= tvXPosition && playerYPosition + PLAYERHEIGHT >= tvYPosition && playerXPosition <= tvXPosition + 225 && playerYPosition <= tvYPosition + 141)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching tv")
				return(true)
			}else{
				//console.log("not touching tv")
				return(false)
				
			}
		}
	}
}
function detectStairsCollision(){ // detect collision on the stairs
	if (stage == 5){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= stairsXPosition && playerYPosition + PLAYERHEIGHT >= stairsYPosition && playerXPosition <= stairsXPosition + 156 && playerYPosition <= stairsYPosition + 93)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching stairs")
				return(true)
			}else{
				//console.log("not touching stairs")
				return(false)
				
			}
		}
	}
}
function detectDoorCollision(){ // detect collision on the door
	if (stage == 5){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= doorXPosition && playerYPosition + PLAYERHEIGHT >= doorYPosition && playerXPosition <= doorXPosition + 165 && playerYPosition <= doorYPosition + 27)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching door")
				return(true)
				
			}else{
				//console.log("not touching door")
				return(false)
				
			}
		}
	}
}
//#endregion
//#region train object collisions
function detectOfficeCollision(){ // detect collision on the desk
	if (stage == 8){
		if (dialogueOpen == false){
			if(playerXPosition + PLAYERWIDTH >= officexPosition && playerYPosition + PLAYERHEIGHT >= officeyPosition && playerXPosition <= officexPosition + 136 && playerYPosition <= officeyPosition + 210)
			{
				ctx.drawImage(interactButton, playerXPosition + 15, playerYPosition - 30, 25, 25)
				//console.log("touching bed")
				return(true)
			}else{
				//console.log("not touching bed")
				return(false)
			}
		}
	}
}
function detectTrainExit(){ // detect collision on the desk
	if (stage == 8){
		if (dialogueOpen == false){
			if(BGxPosition <= -2275)
			{
				stage = 10
				BGxPosition = 200
				BGyPosition = -190
			}
		}
	}
}
//#endregion
function chracterFacing(){ // for which way the character is facing depending on which direction was last pressed
	if (stage == 4 || stage == 5 || stage == 6 || stage == 7 || stage == 8 || stage == 9 || stage == 10){
		if (lastPressed == 1){
			ctx.drawImage(astronautRight,playerXPosition,playerYPosition,PLAYERWIDTH,PLAYERHEIGHT)
		} else if (lastPressed == 0){
			ctx.drawImage(astronautLeft,playerXPosition,playerYPosition,PLAYERWIDTH,PLAYERHEIGHT)
		}
	}
}

//#region codes
function updateCode(){ // this just takes the input field in the html and puts it into a variable
	codeInput = document.getElementById("enterCode").value
	//console.log(codeInput)
}
function submitCode(){ // when the code button is pressed, check if the code works and implement it, else give an error
	if (stage == 3){
		if (codeInput == null || codeInput == ""){ // checks there is acutally a code written in and if there isnt it will give error
			var warningText = document.getElementById("warningText")
			var errorCode = document.getElementById("errorCode")
			errorCode.innerHTML = "Error Code: 131202"
			warningText.innerHTML = "Please enter a code <br> Press x to close this notice"
		} else { // if there is a code it checks it with the following list
			if(codeInput == "186010"){ // will send you to earth with no teammates
				startingStage = 1
				atkBuff = false
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
				BGxPosition = 69 //change this
				BGyPosition = 420 // and this
			} else if (codeInput == "188565"){//sends you to the tent no teammates
				startingStage = 7
				atkBuff = false
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			}
			else if (codeInput == "186635"){ // sends you to earth with attack buff teammate
				startingStage = 2
				atkBuff = true
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
				BGxPosition = 420 // and this
				BGyPosition = 69 // and this
			} else if (codeInput == "188239"){ // tent with attack buff
				startingStage = 7
				atkBuff = true
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else if (codeInput == "184372"){ // trainstation with no buffs
				startingStage = 8
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else if (codeInput == "187812"){ // trainstation attack buff
				startingStage = 8
				updateStats()
				atkBuff = true
				updateStats()
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else if (codeInput == "186902"){ // train station just defense buff
				startingStage = 8
				defBuff = true
				updateStats()
				zombieDead = true
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else if (codeInput == "186891"){ // trian station attakc and defense buffs // 31
				startingStage = 8
				atkBuff = true
				defBuff = true
				returnToOffice = true
				updateStats()
				zombieDead = true
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else if (codeInput == "2018215"){ //beat game atk buff
				over = true
				atkBuff = true
				defBuff = true
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else if (codeInput == "21214619"){ //beat game no atk buff
				over = true
				atkBuff = false
				defBuff = true
				updateStats()
				console.log("good code")
				goodCode = true
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				warningText.innerHTML = ""
				errorCode.innerHTML = ""
			} else { // if thez code they entered was wrong
				var warningText = document.getElementById("warningText")
				var errorCode = document.getElementById("errorCode")
				errorCode.innerHTML = "Error Code: 188010"
				warningText.innerHTML = "Please enter a correct code <br> Press x to close this notice"
			}
		}
	} else if (stage == 1){
		var warningText = document.getElementById("warningText")
		var errorCode = document.getElementById("errorCode")
		errorCode.innerHTML = "Error Code: 129031"
		warningText.innerHTML = "Code cannot be entered in tutorial <br> Press x to close this notice"
	} else if (stage == 2){ // if they are trying to access this button by using another tab ingame
		var warningText = document.getElementById("warningText")
		var errorCode = document.getElementById("errorCode")
		errorCode.innerHTML = "Error Code: 164384"
		warningText.innerHTML = "Code cannot be entered in credits <br> Press x to close this notice"
	} else if (stage == 0){ // if they are trying to access this button by using another tab ingame
		var warningText = document.getElementById("warningText")
		var errorCode = document.getElementById("errorCode")
		errorCode.innerHTML = "Error Code: 154384"
		warningText.innerHTML = "Code cannot be entered in the Main Menu <br> Press x to close this notice"
	}
}
//#endregion

function setFalse(){
	zPressed = false
}
//#region LISTENERS + all keyboard interactions

window.addEventListener('keydown', keyDownFunction)
window.addEventListener('keydown', inGameFunction)
window.addEventListener('keyup', keyUpFunction)

function keyUpFunction(keyboardEvent){ // sets the moving to false if the key is stopped being held down
	var keyUp = keyboardEvent.key
	if (stage == 0 || stage == 2 || stage == 3 || stage == 4 || stage == 5 || stage == 6 || stage == 7 || stage == 8 || stage == 9 || stage == 10 || stage == 69 || stage == 420){
		if (keyUp == "ArrowUp"){ // release up key
			movingUp = false
			//console.log("up released")
		}
		if (keyUp == "ArrowLeft"){ // release left key
			movingLeft = false
			//console.log("left released")
		}
		if (keyUp == "ArrowDown"){ // release down key
			movingDown = false
			//console.log("down released")
		}
		if (keyUp == "ArrowRight"){ // release right key
			movingRight = false
			//console.log("right released")
		}
		if (keyUp == 'z' || keyUp == 'Z'){ // release z key
			zPressed = false
			//console.log("z released")
		}
	}
}

function inGameFunction(keyboardEvent){
	var keyDown = keyboardEvent.key
	if (yesOrNoOpen){
		console.log("opened yes or no")
		if (keyDown == 'ArrowUp'){
			yesOrNo = 1
			console.log("changed to yes")
		}
		if (keyDown == 'ArrowDown'){
			yesOrNo = 2
			console.log("changed to no")
		}
	}
	if (stage == 0 || stage == 2 || stage == 3 || stage == 4 || stage == 5 || stage == 6 || stage == 7 || stage == 8 || stage == 9 || stage == 10 || stage == 69 || stage == 420){ // this makes it only work in the game stage
		if (!dialogueOpen){ 
			if (keyDown == "ArrowUp"){ // press up key
				if (inventoryOpen == false){
					movingUp = true
				}
			}
			if (keyDown == "ArrowDown"){ // press down key
				if(inventoryOpen == false){
					movingDown = true
				}
			}
			if (keyDown == "ArrowLeft"){ // press left key
				if (!inventoryOpen){
					movingLeft = true
					lastPressed = 0
					//console.log("left pressed")
				} else if (inventoryOpen){
					if (inventorySelection <= 0) // if the number is less than or equal to zero
					{
						inventorySelection = 0 // keep it at zero
					} else {
						inventorySelection-- // other wise decrease it
					}
				}
			}
			if (keyDown == "ArrowRight"){ // press right key
				if (!inventoryOpen){ // if inventory is closed
					movingRight = true // move right
					lastPressed = 1
					//console.log("right pressed")
				} else if (inventoryOpen){ // if its open
					if (inventorySelection >= 2) // if the number is greater than or equal to two
					{
						inventorySelection = 2 // keep it the same
					} else {
						inventorySelection++ // otherwise incresae it
					}
				}
			}
		}
		if (keyDown == 'z' || keyDown == 'Z'){
			zPressed = true
			setTimeout(() => {setFalse();}, 15)
			if (inventoryOpen){ // if inventory is open
				if (inventorySelection == 0) { // open team
					console.log("open team")
					if (atkBuff == false && defBuff == false){
						console.log("team0")
						diologueNumber = 13
						toggleNote = true
						dialogueOpen = true
					} else if (atkBuff == true && defBuff == false){
						diologueNumber = 14
						toggleNote = true
						dialogueOpen = true
					} else if (atkBuff == false && defBuff == true){
						diologueNumber = 15
						toggleNote = true
						dialogueOpen = true
					} else if (atkBuff == true && defBuff == true){
						//console.log("team3")
						diologueNumber = 16
						toggleNote = true
						dialogueOpen = true
					}
				} else if (inventorySelection == 1) { // open items
					console.log("go to items")
					if (defBuff == true){
						diologueNumber = 60
						toggleNote = true
						dialogueOpen = true
					} else {
						diologueNumber = 61
						toggleNote = true
						dialogueOpen = true
					}
				} else if (inventorySelection == 2) { // save game
					if (stage == 5){
						if (atkBuff == true){
							console.log("Saved Stage: Give code: 2018215")
							navigator.clipboard.writeText("2018215")
							diologueNumber = 106
							toggleNote = true
							dialogueOpen = true
						} else {
							console.log("Saved Stage: Give code: 21214619")
							navigator.clipboard.writeText("21214619")
							diologueNumber = 107
							toggleNote = true
							dialogueOpen = true
						}
					}
					if (stage == 5 || stage == 4){ // house and mars
						if (over == false){
							console.log("Its too early to save now")
							diologueNumber = 6
							toggleNote = true
							dialogueOpen = true
						}	
					} else if (stage == 6){ // earth stage 
						if (atkBuff == false){
							console.log("Saved Stage: Give code: 186010")
							navigator.clipboard.writeText("186010")
							diologueNumber = 7
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == true){
							console.log("Saved Stage: Give code: 186635")
							navigator.clipboard.writeText("186635")
							diologueNumber = 27
							toggleNote = true
							dialogueOpen = true
						}
					} else if (stage == 7){ // inside the tent
						if (atkBuff == false){
							console.log("Saved Stage: Give code: 188565")
							navigator.clipboard.writeText("188565")
							diologueNumber = 17
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == true){
							console.log("Saved Stage: Give code: 188239")
							navigator.clipboard.writeText("188239")
							diologueNumber = 22
							toggleNote = true
							dialogueOpen = true
						}
					} else if (stage == 8){ // in train station
						if (atkBuff == false && defBuff == false){ // no buffs
							console.log("Saved Stage: Give code: 184372")
							navigator.clipboard.writeText("184372")
							diologueNumber = 25
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == true && defBuff == false){ // just attack buff
							console.log("Saved Stage: Give Code: 187812")
							navigator.clipboard.writeText("187812")
							diologueNumber = 28
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == false && defBuff == true){ // just defense buff
							console.log("Saved Stage: Give Code: 186902")
							navigator.clipboard.writeText("186902")
							diologueNumber = 30
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == true && defBuff == true){ // both buffs
							console.log("Saved Stage: Give Code: 186891")
							navigator.clipboard.writeText("186891")
							diologueNumber = 31 
							toggleNote = true
							dialogueOpen = true
						}
					} else if (stage == 9 || stage == 10){ // if in the office
						console.log("You cant save here")
						diologueNumber = 29
						toggleNote = true
						dialogueOpen = true
					}
				}
			} else if (!inventoryOpen) { // if inventory is closed
				if (stage == 5){ // if in the house
					if (detectBedCollision()){// if touching bed
						toggleNote = true
						dialogueOpen = true
						diologueNumber = 3
					}
					if (detectStairsCollision()){ // if touching stairs
						if (over == false){
							//console.log("The second floor hasnt been built yet. Please come back later")
							toggleNote = true
							dialogueOpen = true
							diologueNumber = 0
						} else {
							console.log("upstairs is the trophy case")
							stage = 222
						}
					}
					if (detectDoorCollision()){ // if touching door
						console.log("want to go outside")
						BGxPosition = -2050
						BGyPosition = -450
						stage = 4
					}
					if (detectTVCollision()){// if touching tv
						if (tvToggle == 1){
							tvToggle = 0
						} else if (tvToggle == 0){
							tvToggle = 1
						}
					}
					if (detectDeskCollision()){
						console.log("open the note on the desk")
						diologueNumber = 2
						dialogueOpen = true
						toggleNote = true
					}
				} else if (stage == 4) { // if on mars
					if (detectMarsDoorCollision()){
						console.log("go back inside")
						stage = 5
						BGxPosition = -130
						BGyPosition = -340
					}
					if (detectCafeCollision()){
						diologueNumber = 23
						toggleNote = true
						dialogueOpen = true
					}
					if(detectLieutenantCollision()){	
						if (over == false){
							yesOrNoOpen = true
							diologueNumber = 4
							toggleNote = true
							dialogueOpen = true
						} else {
							diologueNumber = 700
							toggleNote = true
							dialogueOpen = true
						}
					}
					if (noteboardOpen == false){
						if (detectNoteBoardCollision()){
							if (over == false){
								console.log("read notes")
								diologueNumber = 8
								contiunedDialogue = 5
								toggleNote = true
								dialogueOpen = true
								noteboardOpen = true
							} else {
								diologueNumber = 701
								toggleNote = true
								dialogueOpen = true
							}
						}
					}
				} else if (stage == 6){ // if on earth
					if (detectTentCollision()){
						console.log("go to tent")
						stage = 7
						lastPressed = 1
						BGxPosition = 250
						BGyPosition = -120
					}
					if (detectTrainCollision()){
						console.log("go to train station")
						stage = 8
						lastPressed = 1
						BGxPosition = 250
						BGyPosition = -100
						diologueNumber = 26
						toggleNote = true
						dialogueOpen = true
					}			
				} else if (stage == 7){ // if in the tent
					if (detectExitCollision()){
						console.log("go to earth")
						stage = 6
						BGxPosition = -1959
						BGyPosition = -439
					}
					if (detectbullitinCollision()){
						diologueNumber = 18
						toggleNote = true
						dialogueOpen = true
					}
					if (detectDrawerCollision()){
						diologueNumber = 19
						toggleNote = true
						dialogueOpen = true
					}
					if (detectATKBuffCollision()){
						if (atkBuff == false){ // if you dont already own attack buff
							diologueNumber = 20 // get attack buff
							toggleNote = true
							dialogueOpen = true
						} else if (atkBuff == true){ // if you do however own the attack buff
							diologueNumber = 24 // she will point you in the direction of the trainstation
							toggleNote = true
							dialogueOpen = true
						}
					}
				} else if (stage == 8){ // if in train station
					if (detectOfficeCollision()){
						if (zombieDead == false){
							stage = 9
							playerXPosition = 280
							playerYPosition = 369
							diologueNumber = 32
							toggleNote = true
							dialogueOpen = true
						} else {
							stage = 9
							playerXPosition = 280
							playerYPosition = 369
							diologueNumber = 50
							toggleNote = true
							dialogueOpen = true
						}
					}
				} else if (stage == 10){
					if (detectComputerCollision()){
						diologueNumber = 81
						dialogueOpen = true
						toggleNote = true
					}
				}
				else if (stage == 69 || stage == 420){
        			checkBattle()
				}
			}
			//console.log("z pressed")
		}
		if (!dialogueOpen){
			if (keyDown == 'i' || keyDown == 'I'){ // release i key
				if (!inventoryOpen){ // if inventory is closed
					inventoryOpen = true // open it
				} else if (inventoryOpen){ // if inventory is open
					inventoryOpen = false // close it
					inventorySelection = 0
				}
			}
		}
	}
}
function keyDownFunction(keyboardEvent){
	var keyDown = keyboardEvent.key
	if (keyDown == 'x' || keyDown == 'X'){
		var warningText = document.getElementById("warningText")
		var errorCode = document.getElementById("errorCode")
		warningText.innerHTML = ""
		errorCode.innerHTML = ""
	}
	if (stage == 0){ // only if we are on the main menu do these commands do these thnigs
		if (keyDown == 'ArrowUp'){ // if youve reached the lowest you can go, dont go lower, if no go one lower.
			if (playerSelection <= 0)
			{
				playerSelection = 0
			} else {
				playerSelection--
			}
		}
		if (keyDown == 'ArrowDown'){ // if youve reached the highest you can go, dont go higher, if not go one higher
			if (playerSelection >= 3)
			{
				playerSelection = 3
			} else {
				playerSelection++
			}
		}	
		if (keyDown == 'z' || keyDown == 'Z'){ // pressing z will send you to different screens depending on where the selector is.
			if(playerSelection == 0){ // play game
				if (startingStage == 0){
					BGxPosition = -500
					BGyPosition = 130
					stage = 5
				} else if (startingStage == 1){ // start from stage one earth no teammates
					BGxPosition = -275
					BGyPosition = -325
					stage = 6
				} else if (startingStage == 2){ //start from stage one earth attack buff teammate
					BGxPosition = -275
					BGyPosition = -325
					stage = 6
				} else if (startingStage == 3){ // start from stage two earth no teammates

				} else if (startingStage == 4){ // start from stage two earth attack buff teammate

				} else if (startingStage == 5){ // start from stage two earth defence buff teammate

				} else if (startingStage == 6){ // start from stage two earth both teammates
					
				} else if (startingStage == 7){ // start from right before boss battle no teammates
					BGxPosition = 200
					BGyPosition = -114
					stage = 7
				} else if (startingStage == 8){ // start from trainstation no teammates
					stage = 8
					lastPressed = 1
					BGxPosition = -665
					BGyPosition = -100
				}
			} else if (playerSelection == 1){ // go to tutorial
				stage = 1
				console.log("go to tutorial")
				console.log(stage)
			} else if (playerSelection == 2){ // go to credits
				stage = 2
				console.log("go to credits")
				console.log(stage)
			} else if (playerSelection == 3){ // go to enter code
				stage = 3
				console.log("go to enter Code")
				console.log(stage)
			}
		}
	} else if (stage == 1){ // only works in tutorial
		if (keyDown == 'z' || keyDown == 'Z'){
			tutorialScreen++
			console.log(tutorialScreen)
		}
	} else if (stage == 3 || stage == 2){ // only works in enter code
	if (keyDown == 'ArrowUp'){
		if (codeSelection <= 0)
		{
			codeSelection = 0
		} else {
			codeSelection--
		}
	}
	if (keyDown == 'ArrowDown'){ // if youve reached the highest you can go, dont go higher, if not go one higher
		if (codeSelection >= 1){
			codeSelection = 1
		} else {
			codeSelection++
		}
	}
		if (keyDown == 'z' || keyDown == 'Z'){
			if (codeSelection == 0){
				stage = 0
			}
		}
	}  else if (stage == 69 || stage == 420){
		if (keyDown == 'ArrowLeft'){ // if youve reached the lowest you can go, dont go lower, if no go one lower.
			if (battleSelection <= 0)
			{
				battleSelection = 0
			} else {
				battleSelection--
			}
		}
		if (keyDown == 'ArrowRight'){ // if youve reached the highest you can go, dont go higher, if not go one higher
			if (battleSelection >= 2)
			{
				battleSelection = 2
			} else {
				battleSelection++
			}
		}
	} else if (stage == 105){
		if (keyDown == 'z' || keyDown == 'Z'){
			ending++
			console.log(ending)
		}
	}
}
window.addEventListener("keydown", function(e) { // this is something i learned from google to prevent scrolling and stuff like that 
    if(["Space","ArrowUp","ArrowDown"].indexOf(e.code) > -1) { // complettly forgot where i learnt it from, so sorry about that.
        e.preventDefault(); 
    }
}, false);
//#endregion