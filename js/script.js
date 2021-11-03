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


//genero la griglia una volta cliccato il bottone PLAY
const playButton = document.querySelector('header .play button.btn_custom');

playButton.addEventListener('click', function () {

   //svoto il myContainer prima di generare la griglia
   myContainer.innerHTML = '';

   //memorizzo il value della difficoltá
   let valueDifficult = selectDifficult.value;
   console.log('difficoltá: ', valueDifficult);

   // inizializzo un array di bombe che conterrá 'BOMBS_NUMBER' numeri
   // riempio l'array bombs
   const bombs = getBombNumbers(BOMBS_NUMBER);
   console.log(bombs);
   
   //per generare la griglia ho bisogno di passare alla funzione un argomento che indichi la dimensione della stessa(griglia), dipendentemente dalla difficoltá selezionata
   initGrid(getNumberByValue(valueDifficult));
   console.log('Quantitá di square in griglia: ', getNumberByValue(valueDifficult));

});


//*********FUNZIONI********** */

//funzione che genera la visualizzazione della griglia
function initGrid(value) {
   
   //cicolo che crea TOT quadrati dipendentemente dalla difficoltá scelta
   for (let i = 0; i < value; i++) {
      
      //creo l'elemento square e lo aggiungo dentro al container
      const square = createSquare(myContainer);
      //imposto la classe pre esistente al div square
      square.className = ('square');
      //aggiungo la classe allo square dopo aver controllato il livello di difficoltá
      switch (value) {
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
      //inserisco il numbero indice+1 dentro lo square
      square.innerHTML = (i+1);
      
   }
}

//funzione che crea quadrati 'square' e li inserire nel container (target)
function createSquare(target) {
   
   const square = document.createElement('div');
   target.append(square);

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

// funzione che genera una array di N numeri
function getBombNumbers(n) {

   const array = [];

   while (array.length < n) {
      
      const bombNumber = getRandomNumber(1, getNumberByValue());

      if (!array.includes(bombNumber)) {
         array.push(bombNumber);
         console.log('numero bomba inserito', bombNumber);
      }

   }
   
   return array;
 }

function getRandomNumber(min, max) {
    
   return Math.floor(Math.random() * (max - min + 1) + min);
}
// funzione che genera numeri casuali