const Main = document.querySelector('.game');
const Button_start = document.querySelector('.button_start');

const Card_Arr = [];
for (let i = 1; i <= 18; i++) {
    Card_Arr.push(`<img src="images/par${i}.jpg" height="100px" width="100px" alt="image">`)        
}

Active_Card = [];

Button_start.addEventListener('click', startGame)

function startGame() {
    Main.innerHTML = '';
    const Field = createField(Card_Arr);
    Field.forEach(createCards);
}

function createField(arr) {
    const pairArr = [];
    const pairs = {};

    for (const i of arr) {
        pairs[i] = 0;
    }

    while (pairArr.length < 36) {
        const Index = Math.floor(Math.random() * arr.length);
        const Card = arr[Index]

        if (pairs[Card] < 2) {
            pairArr.push(Card);
            pairs[Card]++
        }
    }    
    return pairArr
}

function createCards(picture) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const Front = document.createElement('div');
    Front.classList.add('card-front');

    const Back = document.createElement('div');
    Back.classList.add('card-back');

    Back.innerHTML = picture;

    cardInner.appendChild(Front);
    cardInner.appendChild(Back);

    newCard.appendChild(cardInner);

    Main.appendChild(newCard);

    newCard.addEventListener('click', () => {
        cardClick(newCard);
    })
}

function cardClick(card) {
    card.classList.add('active');

    Active_Card.push(card)

    if (Active_Card.length % 2 !== 0) {
        return
    }

    const [lats, prelast] = Active_Card.slice(-2);
    if (lats.innerHTML !== prelast.innerHTML) {
        setTimeout(() => {
            lats.classList.remove('active');
            prelast.classList.remove('active');
        }, 500)
        Active_Card = Active_Card.slice(0, -2);
    } else {
        lats.classList.add('disabled');
        prelast.classList.add('disabled');
    }

    if (Active_Card.length === Card_Arr.length * 2) {
        setTimeout(() => {
            alert('Вы выиграли!')
        }, 500)
        Active_Card = []
    }
}