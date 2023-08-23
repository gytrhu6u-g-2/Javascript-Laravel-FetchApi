// アバター生成
var generation = document.querySelector("#generation");
generation.addEventListener("click", function(){
    generateCharacter();
});

async function generateCharacter() 
{
    var img = document.querySelector("#img");
    var first = document.querySelector("#first");
    var last = document.querySelector("#last");
    var age = document.querySelector("#age");
    var gender = document.querySelector("#gender");
    var from = document.querySelector("#from");

    const url = "https://randomuser.me/api/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results[0]);

    const human__data = data.results[0];
    console.log(human__data.picture.large)
    // 画像
    img.src = human__data.picture.large;
    // 名前
    first.textContent = human__data.name.first;
    last.textContent = human__data.name.last;
    // 年齢
    age.textContent = human__data.registered.age;
    // 性別
    gender.textContent = human__data.gender;
    // 出身地
    from.textContent = human__data.location.country;

    // 決定ボタンをableに変更
    var decision = document.querySelector("#decision");
    decision.disabled = false;
}

// 決定ボタン
var decision = document.querySelector("#decision");
decision.addEventListener("click", function() {
    decide();
});

function decide()   
{
    var img = document.querySelector("#img").src;
    var first = document.querySelector("#first").textContent;

    var avatar__img = document.querySelector("#avatar__img");
    var avatar__name = document.querySelector("#avatar__name");

    avatar__img.src = img;
    avatar__name.textContent = first;

    var generation = document.querySelector("#generation");
    var decision = document.querySelector("#decision");
    generation.disabled = true;
    decision.disabled = true;


    generateEnemy();

    // 出す手選択をableに変更
    var hand__select = document.querySelector("#hand__select");
    hand__select.disabled = false;
}


// 敵アバターの生成
async function generateEnemy()
{
    var enemy__img = document.querySelector("#enemy__img");
    var enemy__name = document.querySelector("#enemy__name");

    const url = "https://randomuser.me/api/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results[0]);

    const human__data = data.results[0];

    enemy__img.src = human__data.picture.large;
    enemy__name.textContent = human__data.name.first;
}


// selectタグを選択するごとに発火
var hand__select = document.querySelector("#hand__select");
hand__select.onchange = event => { 
    select = hand__select.value;
    handSelect(select);
    
    // 勝負ボタンをableに変更
    var fight = document.querySelector("#fight");
    fight.disabled = false;  
}

function handSelect(select) {
    var avatar__hand = document.querySelector("#avatar__hand");
    if (select === "グー")
    {
        avatar__hand.src = "../img/rock.png"
    }
    else if (select === "チョキ")
    {
        avatar__hand.src = "../img/scissors.png"
    }
    else
    {
        avatar__hand.src = "../img/paper.png"
    }
}

// 勝負ボタン押下
var fight = document.querySelector("#fight");
fight.addEventListener("click", function() {
    let handsArr = ["グー","チョキ","パー"];
    var hand = handsArr[Math.floor(Math.random() * handsArr.length)];
    // console.log(hand);
    handSelectEnemy(hand);
})

// 敵の手を決める
function handSelectEnemy(hand) {
    var enemy__hand = document.querySelector("#enemy_hand");
    if (hand === "グー")
    {
        enemy__hand.src = "../img/rock.png"
    }
    else if (hand === "チョキ")
    {
        enemy__hand.src = "../img/scissors.png"
    }
    else
    {
        enemy__hand.src = "../img/paper.png"
    }
}