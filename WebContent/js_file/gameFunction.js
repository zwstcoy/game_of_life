/**
 * 
 */
var boardNum=10;
var live=[];
var myVar;
var genation=0;
function begin(){
	stop();
	createBoard(boardNum);
	live=[];
	genation=0;
}

//create game baord
function createBoard(n){
	var rows = n;
	var cols = n;
	var table = "";
	var num=0;
	for(var i = 0; i < rows; i++){
		table+="<tr>"
		for(var j = 0; j < cols; j++){
			table+="<td><button  id=\""+num+"\" onclick = addOrDeleted("+num+")></button></td>";
			num+=1;
		}
		table+="</tr>";
	}
	document.getElementById('gameBoard').innerHTML = table;
	document.getElementById('genation').innerHTML = "Genation: "+genation;
}

//update user click
function addOrDeleted(n){
	if(!live.includes(n)){
		live.push(n);
		document.getElementById(n).style.background="green";
	}
	else{
		const index = live.indexOf(n);
	    live.splice(index, 1);
		document.getElementById(n).style.background="white";
	}
}
//start program
function start(){
	if(live.length>0){
		myVar = setInterval(runProgram, 500);
	}
	else{
		alert("Plaze Make a selection!!!")
	}
}
//stop program
function stop(){
    clearInterval(myVar);
}

function increment(n){
	for(var i=0; i<n;i++){
		runProgram();
	}
}

//check conditation
function runProgram(){
	var tmpL = live.slice(0);
	for(var i=0; i<boardNum;i++){
		for(var j=0; j<boardNum;j++){
			var num = (i*boardNum)+j;
			var count =checkN(num);
			if(live.includes(num) && (count<2 || count>3)){
				const index = tmpL.indexOf(num);
			    tmpL.splice(index, 1);
			}
			else if(!live.includes(num) && !tmpL.includes(num) && count==3){
				tmpL.push(num);
			}
		}
	}
	live=tmpL.slice(0);
	update();
}

//update board after each genation
function update(){
	for(var i=0; i<10;i++){
		for(var j=0; j<boardNum;j++){
			var num = (i*boardNum)+j;
			if(live.includes(num)){
				document.getElementById(num).style.background="green";
			}
			else{
				document.getElementById(num).style.background="white";
			}
		}
	}
	genation+=1;
	document.getElementById('genation').innerHTML = "Genation: "+genation;
}

//check around life
function checkN(n){
	var x = Math.floor(n/boardNum);
	var y = Math.floor(n%boardNum);
	var count=0;
	for(var i = Math.max(0,x-1); i < Math.min(x+2,boardNum-1); i++){
		for(var j = Math.max(0, y-1); j < Math.min(y+2,boardNum-1); j++){
			var num = (i*boardNum)+j;
			if(n!=num&&live.includes(num)){
				count+=1;
			}
		}
	}
	return count;
}

