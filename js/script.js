//variabile booleana globale per stoppare il gioco
let lost = false;
//inizializzo la variabile tentativi uguale a 0
let attempts = 0
//creo una variabile stringa vuota
let textLost = '';
// intercetto l'elemento che conterrá il testo
const textContainer = document.querySelector('.text-container');
//seleziono il mio container della griglia
const myContainer = document.querySelector('.myContainer');
//memorizzo il tag select
const selectDifficult = document.getElementById('selectDifficult');

//all'interno di myContainer scrivo un istruzione per il giocatore. questa frase viene visualizzata solo al caricamento della pagina
myContainer.innerHTML = `
   <h2 class="text-center">Seleziona il livello di difficoltá e genera la griglia</h2>
`;

// inizializzo la costante del numero di bombe presenti nella griglia
const BOMBS_NUMBER = 16;
let bombs = [];


//genero la griglia una volta cliccato il bottone PLAY
const playButton = document.querySelector('header .play button.btn_custom');

playButton.addEventListener('click', function () {

   //inizializzo ancora una volta lost = false nel caso in cui il giocatore voglia ripetere il gioco una volta perso;
   lost = false;

   //inizializzo ancora una volta attempts uguale a 0 nel caso in cui il giocatore voglia ripetere il gioco una volta perso;
   attempts = 0;

   //inizializzo ancora una volta  svuoto il tag p che cont
   textContainer.innerHTML = ``;

   //svoto il myContainer prima di generare la griglia
   myContainer.innerHTML = '';

   //memorizzo il value della difficoltá
   let valueDifficult = selectDifficult.value;
   console.log('difficoltá: ', valueDifficult);

   // inizializzo un array di bombe che conterrá 'BOMBS_NUMBER' numeri
   // riempio l'array bombs
   bombs = getBombNumbers(valueDifficult);
   console.log(`array di bombe lungo ${BOMBS_NUMBER} elementi:`, bombs);
   
   //per generare la griglia ho bisogno di passare alla funzione un argomento che indichi la dimensione della stessa(griglia), dipendentemente dalla difficoltá selezionata
   initGrid(getNumberByValue(valueDifficult));
   console.log('Quantitá di square in griglia: ', getNumberByValue(valueDifficult));

});

//*********FUNZIONI********** */

//funzione che genera la visualizzazione della griglia
function initGrid(numberSquare) {
   
   //cicolo che crea TOT quadrati dipendentemente dalla difficoltá scelta
   for (let i = 0; i < numberSquare; i++) {
      
      //creo l'elemento square e lo aggiungo dentro al container
      const square = createSquare(numberSquare);
      //inserisco il numbero indice+1 dentro lo square
      square.innerHTML = (i+1);
      
      //aggiungo un evento click a tutti gli square
      square.addEventListener('click', handleClickSquare);

   }
}

//funzione che crea quadrati 'square' e li inserire nel container (target)
function createSquare(numberSquare) {
   
   const square = document.createElement('div');
   //imposto la classe pre esistente al div square
   square.className = ('square');
   //aggiungo la classe allo square dopo aver controllato il livello di difficoltá
   switch (numberSquare) {
      case 49:
         square.classList.add('crazy');
         break;

      case 81:
         square.classList.add('hard');
         break;
   
      case 100:
         square.classList.add('easy');
         break;
   }

   myContainer.append(square);

   return square;
}

// funzione che restituisce un numero intero che dipende dal value di valueDifficult
function getNumberByValue(difficult) {
   
   if (difficult === 'easy') {

      return 100;
   } else if (difficult === 'hard') {
      
      return 81;
   }

   return 49;
}

/**
 * funzione che genera una array di 'BOMBER_NUMBER' numeri da 1 a difficult
 * @param {string}  difficult
 * @returns 
 */
function getBombNumbers(difficult) {

   const array = [];

   while (array.length < BOMBS_NUMBER) {
      
      const bombNumber = getRandomNumber(1, getNumberByValue(difficult));

      if (!array.includes(bombNumber)) {
         array.push(bombNumber);
         // console.log('numero bomba inserito', bombNumber);
      }

   }
   
   return array;
 }

// funzione che genera un numero casuale dato il range
function getRandomNumber(min, max) {
    
   return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * funzione che verifica prima se il giocatore ha perso. poi se il numero contenuto all'interno dello square é incluso nell'array bombs. Aggiunge la classe clicked allo square. se contenuto, aggiunge ANCHE la classe bomb.
 * @param {Event} event 
 */
function handleClickSquare(event) {

   if (lost === false) {

      console.log('numero contenuto nello square', parseInt(event.target.innerText));
      
      // console.log(this, 'clicked'); 
      if (bombs.includes(parseInt(event.target.innerText))) {
         
         //utente ha perso, quindi lost é vero
         lost = true;
         
         // ora visualizzo all'utente tutte le bombe
         showAllBombs();

         // textLost = `<p id="textAttempts" class="justify-self-end">
         // Peccato, hai perso, hai azzeccato ${attempts} tentativi. Gioca ancora...
         // </p>`;
         
         // stampo il testo di perdita
         textContainer.innerHTML = `
         <p id="textAttempts" class="justify-self-end">
            Peccato, hai perso, hai azzeccato ${attempts} tentativi. Gioca ancora...
         </p>`;

         console.log('hai perso');
         this.classList.add('bomb', 'clicked');

      } else {

         // incremento il conteggio dei tetativi svolti con successo
         attempts++;

         console.log('continua');
         this.classList.add('clicked');
      }
      
   }

}

/**
 * funzione che aggiunge la classe bomb a tutti gli square
 * @param {HTMLDivElement} square 
 */
function showAllBombs() {
   
   const allSquare = document.querySelectorAll('.square');

   // verifico quadrato per quadrato
   for (let i = 0; i < allSquare.length; i++) {

      if (bombs.includes(parseInt(allSquare[i].innerText))) {
         
         allSquare[i].classList.add('bomb', 'clicked');

      }
      // console.log('square', allSquare[i].innerText);
   }

}