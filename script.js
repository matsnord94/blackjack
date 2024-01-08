

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

function translateNumber(number)
{
    for (let i = 0; i < 13; i++) 
    {

        let a = 0 + i;
        let b = 13 + i;
        let c = 26 + i;
        let d = 39 + i;
        if(number === a  || number === b || number === c || number === d )
        {
            if(i === 0)
            {
                return 11;
            }
    
            else if(i === 1) 
            {
                return 2;
            }
            else if(i === 2) 
            {
                return 3;
            }
            else if(i === 3) 
            {
                return 4;
            }
            else if(i === 4) 
            {
                return 5;
            }
            else if(i === 5) 
            {
                return 6;
            }
            else if(i === 6) 
            {
                return  7;
            }
            else if(i === 7) 
            {
                return  8;
            }
            else if(i === 8) 
            {
                return 9;
            }
            else if(i === 9 || i === 10 || i === 11 || i === 12) 
            {
               return 10;
            }
          
            
        }
        
    }


}

function hit() 
{
    return new Promise((resolve) => {
        let randomNumber = getRandomNumber(1, 52);
        console.log(randomNumber);
        resolve(randomNumber);
    });
}


    const resetButton =document.getElementById('reset');
    resetButton.style.display = 'none';


// Variabler
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
    dealerSum += translatedNumber;
    antalDealerHits++;
    let dealerImage = document.getElementById(`dealerContainer${antalDealerHits}`)
    dealerImage.src = imageArray[dealerHit-1].src;
    console.log(dealerHit);
    document.getElementById('dealerSum').textContent = `Total: ${dealerSum}`;
    if(dealerSum > 21){
        dealerBust = true;
        playerWin = true;
    }   

    else if (dealerSum >= 17 && dealerSum < playerSum){
       playerWin = true;
    }
    
    else if(dealerSum >= playerSum)
    {
        dealerWin =true;
        
    }


    await new Promise(resolve => setTimeout(resolve, 1500))
}

checkGameResult();

};


async function funcHitButton(){
    if(!playerBust && !playerWin && !playerStay){
    hitResult = await hit();
    antalHits = antalHits +1 ;
    const translatedNumber = translateNumber(hitResult);
    playerSum += translatedNumber;
    let playerImage = document.getElementById(`playerContainer${antalHits}`)
    playerImage.src = imageArray[hitResult-1].src;
    document.getElementById('playerSum').textContent = `Total: ${playerSum}`;
    if(playerSum > 21){
        playerBust = true;
        dealerWin = true;
        // resetButton.style.display = 'block';
        checkGameResult();
        }
   
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
}



resetButton.addEventListener('click', function() {
    location.reload();

});




let hitButton = document.getElementById('hit');
hitButton.addEventListener('click', funcHitButton);

let stayButton = document.getElementById('stay');
stayButton.addEventListener('click', function(){
    if(!playerBust){
        playerStay = true;
        console.log("Player decided to stay, triggering dealer's turn");
        dealerTurn();
    }
    
});

console.log(imageArray);

// let dealerImage = document.getElementById('dealerContainer1');
// dealerImage.src = imageArray[12].src;







