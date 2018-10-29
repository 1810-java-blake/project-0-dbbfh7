// First order of business, establish the 'player' class, and then allow for a way to make 
// player1 and player2.

let statBlock = [0,0,0,0]

let player1;
let player2;

function characterCreation()
{
    player1 = new Player();
    player2 = new Player();

    player1.playerGen();
    player2.playerGen();

        // Writes for player 1 and then player 2.
        document.getElementById("header1").innerHTML =
        `BRING IT! <br>`
        document.getElementById("demo").innerHTML = 
            `Player1 Race:  ${player1.race} <br>
            Player1 Class:  ${player1.build} <br>
            Player1 Armor:  ${player1.ac} <br>
            Player1 Health Points:  ${player1.hp} <br>
            <br>
            Player2 Race: ${player2.race}<br>
            Player2 Class: ${player2.build}<br>
            Player2 Armor: ${player2.ac}<br>
            Player2 Health Points: ${player2.hp}`;       
}

class Player {

    constructor() {
        this.message = 'null';
        this.race = 'null';
        this.build = 'null'; //class is a reserved word, apparently.
        this.ac = 0; // Armor Class
        this.hp = 0; // Hit points
        this.toHit = 0; //Formed later in the game, toHit is 10+D20+strMod
        this.strMod = 0; 
        this.dexMod = 0;
        this.conMod = 0;
        this.isAlive = true //Is the player still alive?
    }
   
    statRoll()
    {
        for (let i=0; i<4; i++)
        {
            statBlock[i] = ((Math.floor(Math.random() * 5) + 1)+(Math.floor(Math.random() * 5) + 1)+
                            (Math.floor(Math.random() * 5) + 1));
        }
        statBlock.sort(function(a, b){return a - b});
    }

    statAssign()
    {
        if (this.build=='Fighter')
        {
            this.strMod = (Math.floor((statBlock[0]-10)/2));
            if (this.strMod <= 0)
            {
                this.strMod = 0;
            }
            this.conMod = (Math.floor((statBlock[1]-10)/2));
            this.dexMod = (Math.floor((statBlock[2]-10)/2));
            //print out stat results for all classes that follow.
        }
        if (this.build=='Ranger')
        {
            this.strMod = (Math.floor((statBlock[2]-10)/2));
            if (this.strMod <= 0)
            {
                this.strMod = 0;
            }
            this.conMod = (Math.floor((statBlock[1]-10)/2));
            this.dexMod = (Math.floor((statBlock[0]-10)/2));
        }
        if (this.build=='Paladin')
        {
            this.strMod = (Math.floor((statBlock[1]-10)/2));
            if (this.strMod <= 0)
            {
                this.strMod = 0;
            }
            this.conMod = (Math.floor((statBlock[0]-10)/2));
            this.dexMod = (Math.floor((statBlock[2]-10)/2));
        }
    }
    
    raceChoice() //Determines Race for Players
    {
        let x=false;
        while (x===false)
        {
            var race = prompt("My eyes are failing me, what race are you?")
            if ((race=='Dwarf')||(race=='dwarf'))
            {
                this.race='Dwarf';
                x=true;
            }
            else if ((race=='Human')||(race=='human'))
            {
                this.race='Human';
                x=true;
            }
            else if ((race=='Orc')||(race=='orc'))
            {
                x=true;
                this.race='Orc';
            }
            else if ((race=="Elf")||(race=="elf"))
            {
                x=true;
                this.race='Elf';
            }
            else
            {
                window.alert("I have never heard of that people!");
            }
        }
    }

    buildChoice() //Determines Class 
    {
        let y=false;
        while (y===false)
        {
            var classChoice = prompt("That is some impressive armor. What sort of warrior are you?")
            {
                if ((classChoice=='Fighter')||(classChoice=='fighter'))
                {
                    this.build='Fighter';
                    y=true;
                }
                else if ((classChoice=='Paladin')||(classChoice=='paladin'))
                {
                    this.build='Paladin';
                    y=true;
                }        
                else if ((classChoice=='Ranger')||(classChoice=='ranger'))
                {
                    this.build='Ranger';
                    y=true;
                }
                else
                {
                    window.alert("Who ever heard of such a thing?")
                }
            }    
        }
    }

    raceAssign(strMod, conMod, dexMod)
    {
        if (this.race=='Dwarf')
        {
            conMod=conMod+1;
            dexMod=dexMod-1;
        }
        if (this.race=='Elf')
        {
            dexMod=dexMod+1;
            conMod=conMod-1;
        }
        if (this.race=='Orc')
        {
            strMod=strMod+1;
            dexMod=dexMod-1;
        }
        if (this.race=='Human')
        {
            //do nothing.
        }
    }

    assignAC()
    {
        if (this.build=='Paladin')
        {
            this.ac=21+this.dexMod;
        }
        if (this.build=='Fighter')
        {
            this.ac=18+this.dexMod;
        }
        if (this.build=='Ranger')
        {
            this.ac=15+(2*this.dexMod);
        }
    }

    assignHP()
    {
        for(let i=0; i<10; i++)
        {
            this.hp = this.hp + ((Math.floor(Math.random() * 10) + 1) + this.conMod);
        }
    }
    
    playerGen()
    {
    this.buildChoice();
    this.raceChoice();
    this.statRoll();
    this.statAssign();
    this.raceAssign();
    this.assignHP();
    this.assignAC();
    }
}

function fight(player1, player2)
{
    let randRoll = 0;
    let dmg = 0;
    if ((player1.isAlive==false)||(player2.isAlive==false))
    {
        document.getElementById("demo").innerHTML = 'GAME OVER';
    }
    else
    {
        randRoll = ((Math.floor(Math.random() * 20) + 1));
        player1.toHit = randRoll+player1.strMod + 10;
        if (player1.toHit >= player2.ac)
        {
            if (player1.build=='Fighter')
            {
                dmg = ((3*(Math.floor(Math.random() *3)+1))+(2*(player1.strMod)));
                player2.hp=player2.hp-dmg;
                player1.message=`Player 1 swings his awesome hammer doing ${dmg} points of damage to player 2! <br>
                Player 2 has ${player2.hp} health left!`;
            }
            else if (player1.build=='Paladin')
            {
                dmg = ((Math.floor(Math.random() *3) +1) + (player1.strMod));
                dmg = (((Math.floor(Math.random() * 7)+1))+(player1.strMod));
                player2.hp=player2.hp-dmg;
                player1.message=`Player 1 swings his mighty sword doing ${dmg} points of damage to player 2! <br>
                Player 2 has ${player2.hp} health left!`;
            }
            else
            {
                dmg = (2*((Math.floor(Math.random() * 5)+1)) +(player1.strMod));
                player2.hp=player2.hp-dmg;
                player1.message=`Player 1 swings his mighty sword doing ${dmg} points of damage to player 2! <br>
                Player 2 has ${player2.hp} health left!`;
                //fight message "Player 2 has taken damage."
            }
            if (player2.hp<=0)
            {
                //print out "Player 2 has been Slain!"
                player1.message = (player1.message +
                `Player 2 has been slain! Player 1 is Victorious!`);
                player2.isAlive = false;
            }
        }
        else
        {
            //print out "Player 1 swings with all his might, and misses!"
            player1.message = 
                `Player 1 swings with all his might and misses!`;
        }

        if (player2.isAlive == true)
        {
            randRoll= (Math.floor(Math.random() * 20 + 1));
            player2.toHit = randRoll+player2.strMod + 10;
            if(player2.toHit >= player1.ac)
            {
                if (player2.build=='Fighter')
            {
                dmg = ((3*(Math.floor(Math.random() *3)+1))+(2*(player2.strMod)));
                player1.hp=player1.hp-dmg;
                player2.message=`Player 2 swings his awesome hammer doing ${dmg} points of damage to player 1! <br>
                Player 1 has ${player1.hp} health left!`;
                //Fight message is "player 2 takes damage"
            }
            else if (player2.build=='Paladin')
            {
                dmg = (((Math.floor(Math.random() * 7)+1))+(player2.strMod));
                player1.hp=player1.hp-dmg;
                player2.message=`Player 2 swings his mighty sword doing ${dmg} points of damage to player 1! <br>
                Player 1 has ${player2.hp} health left!`;
                //Fight message "Player 2 has taken damage"
            }
            else
            {
                dmg = (2*((Math.floor(Math.random() * 5)+1)) +(player2.strMod));
                player1.hp=player1.hp-dmg;
                player1.message=`Player 2 swipes with both blades doing ${dmg} points of damage to player 1! <br>
                Player 1 has ${player1.hp} health left!`;

            }
                if (player1.hp<=0)
                {
                    player1.isAlive = false;
                    player2.message = (player2.message+
                    `Player 1 has been killed! Player 2 is victorious!`);
                }
            }
            else
            {
                player2.message=`Player 2 swings with all his might and misses!`;
            }
            document.getElementById("demo").innerHTML =
            `${player1.message} <br>
            ${player2.message}`;
        }
        else
        {
            document.getElementById("demo").innerHTML=
            `GAME OVER`;
        }
    }
}