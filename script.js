

let imageArray = [];

// clubs
for (let i = 1; i <= 13; i++) {
    let img = new Image();
    img.src = `\images/${i}_of_clubs.png`;
    imageArray.push(img);
    
}

// spades
for (let i = 1; i <= 13; i++) {
    let img = new Image();
    img.src = `\images/${i}_of_spades.png`;
    imageArray.push(img);
}

// diamonds
for (let i = 1; i <= 13; i++) {
    let img = new Image();
    img.src = `\images/${i}_of_diamonds.png`;
    imageArray.push(img);
}

// hearts
for (let i = 1; i <= 13; i++) {
    let img = new Image();
    img.src = `images/${i}_of_hearts.png`;

    
    imageArray.push(img);
}
// random nummer
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let dealerHit = 0;
let playerSum = 0;
let dealerSum = 0;
let hitResult;
//functiion for translating the card nr into an actual number.
function translateNumber(number)
{

    const cardValues = [11,2,3,4,5,6,7,8,9,10,10,10,10]
    for (let i = 0; i < 4; i++) {
        let baseIndex = i*13;
        if (number >= baseIndex && number < baseIndex + 13){
            return cardValues[number - baseIndex]
        }
        
    }

}

function hit() 
{
    return new Promise((resolve) => {
        let randomNumber = getRandomNumber(0, 51);
        console.log(randomNumber);
        resolve(randomNumber);
    });
}


    const resetButton =document.getElementById('reset');
    resetButton.style.display = 'none';


// Variabler
    let dealerAceCount = 0;
    let playerAceCount =0;
    let gameDraw = false;
    let playerStay = false;
    let playerWin = false;
    let dealerWin = false;
    let playerBust = false;
    let dealerBust = false;
    let antalHits = 0;
    let antalDealerHits = 0;

async function dealerTurn(){

    


while(dealerSum < 17){
    let dealerHit = await hit();
    const translatedNumber =translateNumber(dealerHit);
    if(translatedNumber === 11){
        dealerAceCount++;
    }
    dealerSum += translatedNumber;
    antalDealerHits++;
    let dealerImage = document.getElementById(`dealerContainer${antalDealerHits}`)
    dealerImage.src = imageArray[dealerHit].src;
    console.log(dealerHit);
    document.getElementById('dealerSum').textContent = `Total: ${dealerSum}`;
    if(dealerSum > 21)
    {
        if(dealerAceCount > 0)
        {
            while(dealerSum > 21 && dealerAceCount > 0)
            {
                dealerSum -=10;
                dealerAceCount--;
            }
        }
        else
        {
        dealerBust = true;
        playerWin = true;

        }
    }
    else if (dealerSum >= 17 && dealerSum < playerSum){
       playerWin = true;
    }
    
    else if(dealerSum > playerSum)
    {
        dealerWin =true;
    }

    else if(dealerSum >= 17 && dealerSum === playerSum)
    {
        gameDraw = true;
    }


    await new Promise(resolve => setTimeout(resolve, 1000))

}
checkGameResult();

};


async function funcHitButton()
{
    if(!playerBust && !playerWin && !playerStay && !gameDraw){
    hitResult = await hit();
    antalHits = antalHits +1 ;
    const translatedNumber = translateNumber(hitResult);
    if(translatedNumber === 11){
        playerAceCount++;
        console.log("player ace count = $playerAceCount")
    }
    playerSum += translatedNumber;

    while (playerSum > 21 && playerAceCount > 0){
        playerSum -=10;
        playerAceCount--;
    }
    let playerImage = document.getElementById(`playerContainer${antalHits}`)
    playerImage.src = imageArray[hitResult].src;
    document.getElementById('playerSum').textContent = `Total: ${playerSum}`;
    if(playerSum > 21 && playerAceCount === 0){
        playerBust = true;
        dealerWin = true;
        // resetButton.style.display = 'block';
        checkGameResult();
        }

    else if (playerSum === 21){
        playerWin = true;
        checkGameResult();
    }
    // else if (playerSum > 21 && playerAceCount > 0){
    //     playerAceCount = playerAceCount - 1;
    //     playerSum = playerSum -10;
    }

 }


function checkGameResult(){
    if(playerWin){
        if(dealerBust){
            document.getElementById('dealerSum').textContent = "BUST";
        }
       
        document.getElementById('playerSum').innerHTML = `Total: ${playerSum}<br> WINNER`;
        document.getElementById('reset').textContent = 'Play again!';
        resetButton.style.display = 'block';
        
    }
    else if(dealerWin){
        document.getElementById('dealerSum').innerHTML = `Total: ${dealerSum}<br> WINNER`;
        resetButton.style.display = 'block';
        document.getElementById('reset').textContent = 'Try again!'
        if(playerBust){
            console.log("Play busted");
            document.getElementById('playerSum').innerHTML = 'BUST';
        }
    }
    else if(gameDraw){
        document.getElementById('playerSum').innerHTML = 'PUSH';
        document.getElementById('dealerSum').innerHTML = 'PUSH';
        resetButton.style.display = 'block';
        document.getElementById('reset').textContent = 'Try again!'
    }
}



resetButton.addEventListener('click', function() {
    location.reload();

});




let hitButton = document.getElementById('hit');
hitButton.addEventListener('click', funcHitButton);

let stayButton = document.getElementById('stay');
stayButton.addEventListener('click', function(){
    if(!playerBust && !playerStay && !playerWin && !gameDraw){
        playerStay = true;
        console.log("Player decided to stay, triggering dealer's turn");
        dealerTurn();
    }
    
});

console.log(imageArray);

// let dealerImage = document.getElementById('dealerContainer1');
// dealerImage.src = imageArray[12].src;







