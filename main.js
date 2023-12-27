//Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {

    //Prompt Window To Ask For Name
    let yourName = prompt("Wahts Your Name");

    if (yourName == null || yourName == "") {
        //Set Name To UnKnown 
        document.querySelector(".name span").innerHTML = 'UnKknown';
        //Name Is Not Empty
    }else {
        //Set Name To Your Name
        document.querySelector(".name span").innerHTML = yourName;
    }
    //Remove Splash Screen
    document.querySelector(".control-buttons").remove();

};
//Effect Duration
let duration = 1000;

//select Blocks Container
let blocksContainer = document.querySelector(".momery-game-bloks");

//Creat Array From Game Blocks
let blocks =Array.from(blocksContainer.children)

//Creat Range Of Kays
//let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

//console.log(orderRange);
Shuffle(orderRange);
//console.log(orderRange);



//Add Order Css Property To Game Bolcks
blocks.forEach((block , index) => {
    block.style.order = orderRange[index];

    //Add blocked event
    block.addEventListener('click', function () {
        //trigger The Flip Block Function
        flipBlock(block);
    });
   
});





//Flip Blocks function
function flipBlock(selectedBlock) {
    //add Class is-Flipped
    selectedBlock.classList.add('is-flipped');

    //Collect All Flipped Cards
    let allflippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    //If Theres Two Selected Blocks
    if (allflippedBlocks.length === 2) {
        
        //stop Clicking Function
        stopClicking ();

        //Check Matched Block Function
        checkMatchedBlocks(allflippedBlocks[0],allflippedBlocks[1]);
    }
}



//Stop Clicking Function
function stopClicking () {

    //Add Class No Cliking On Main Container
    blocksContainer.classList.add('no-Clicking');

    setTimeout(() => {

        //Remove Class No Clicing Afyer The Duration
        blocksContainer.classList.remove('no-Clicking')
    }, duration)
}
//Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
        document.getElementById('fail').play();
    }
}

//Shuffle Function 


function Shuffle (array) {
    //Setting Vars
    let current = array.length,
    
    temp,
    random;
    while (current > 0) {
        //Get Random Number
        random = Math.floor(Math.random() * current);

        //Decrease Length By One 
        current--;

        //[1]Save Current Element In Stash
        temp = array[current];

        //[2]Current Element = Random Element
        array[current] = array[random];

        //[3]Random Element = Get Element From Stash
        array[random] = temp;
    }

    return array;
};

