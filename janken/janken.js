// じゃんけんのルール
function janken(my__hand, enemy__hand)
{
    var rock = "グー";
    var scissors = "チョキ";
    var paper = "パー";

    // グーの場合
    if (my__hand == rock) 
    {
        return compare__rock(enemy__hand);
    }
    // チョキの場合
    else if (my__hand == scissors)
    {
        return compare__scissors(enemy__hand);
    }
    // パーの場合
    else
    {
        return compare__paper(enemy__hand);
    }
}

// 勝ち
const win = "勝ち";
// 負け
const lose = "負け";
// 引き分け
const draw = "引き分け";

// グーの場合、相手の手と比べる
function compare__rock(enemy__hand)
{
    if (enemy__hand == "グー")
    {
        return draw;
    }
    else if (enemy__hand == "チョキ")
    {
        return win;
    }
    else
    {
        return lose;
    }
}

// チョキの場合、相手の手と比べる
function compare__scissors(enemy__hand)
{
    if (enemy__hand == "グー")
    {
        return lose;
    }
    else if (enemy__hand == "チョキ")
    {
        return draw;
    }
    else
    {
        return win;
    }
}

// パーの場合、相手の手と比べる
function compare__paper(enemy__hand)
{
    if (enemy__hand == "グー")
    {
        return win;
    }
    else if (enemy__hand == "チョキ")
    {
        return lose;
    }
    else
    {
        return draw;
    }
}

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
    // var hand = "";
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
    else if (hand === "パー")
    {
        enemy__hand.src = "../img/paper.png"
    }

    comparingResult(hand);
}

// 出した手を比べてどちらの勝ちか判定する
function comparingResult(hand)
{
    var my__hand = document.querySelector("#hand__select").value;
    var enemy__hand = hand;
    if (hand) 
    {
        var result = janken(my__hand, enemy__hand);
        console.log(result);
        reflectScore(result);
    }
    else{
        alert("エラーが発生しました");
        window.location.reload();
    }
}
// 自分の点数　初期
var my_score = 0;
// 敵の点数　初期
var enemy_score = 0;

// 結果をスコアに反映させる
function reflectScore(result)
{
    var score1 = document.querySelector("#score1");
    var score2 = document.querySelector("#score2");
    var score3 = document.querySelector("#score3");
    var enemy_score1 = document.querySelector("#enemy_score1");
    var enemy_score2 = document.querySelector("#enemy_score2");
    var enemy_score3 = document.querySelector("#enemy_score3");

    if (result == "勝ち")
    {
        console.log(score1.textContent);
        if (!score1.textContent)
        {
            score1.textContent = "○";
            enemy_score1.textContent = "✕";
        }
        else if (!score2.textContent)
        {
            score2.textContent = "○";
            enemy_score2.textContent = "✕";
        }
        else if (!score3.textContent)
        {
            score3.textContent = "○";
            enemy_score3.textContent = "✕";
        }
        my_score += 1;
        enemy_score = enemy_score;
    }
    else if (result == "負け")
    {
        console.log(score1.textContent);
        if (!score1.textContent)
        {
            score1.textContent = "✕";
            enemy_score1.textContent = "○";
        }
        else if (!score2.textContent)
        {
            score2.textContent = "✕";
            enemy_score2.textContent = "○";
        }
        else if (!score3.textContent)
        {
            score3.textContent = "✕";
            enemy_score3.textContent = "○";
        }
        my_score = my_score;
        enemy_score += 1;
    }
    else
    {
        console.log(score1.textContent);
        if (!score1.textContent)
        {
            score1.textContent = "△";
            enemy_score1.textContent = "△";
        }
        else if (!score2.textContent)
        {
            score2.textContent = "△";
            enemy_score2.textContent = "△";
        }
        else if (!score3.textContent)
        {
            score3.textContent = "△";
            enemy_score3.textContent = "△";
        }
        my_score = my_score;
        enemy_score = enemy_score;
    }

    // 0.5秒後に実行（score3の結果が表示される前に実行されるため）
    window.setTimeout(function(){
        if (score3.textContent)
        {
            if (my_score > enemy_score)
            {
                alert("You Win");
                nextStage();
            }
            else if (my_score < enemy_score)
            {
                alert("You Lose");
                // window.location.reload();
                nextStage();
            }
            else
            {
                alert("Draw");
                // window.location.reload();
                nextStage();
                console.log("aaaaa");
            }
        }
    }, 500);
}

// 何連勝しているかの数字
var winning_num = 0;

// 勝利した場合、次のステージへ
function nextStage()
{
    var winning_streak = document.querySelector(".winning__streak");
    var score1 = document.querySelector("#score1");
    var score2 = document.querySelector("#score2");
    var score3 = document.querySelector("#score3");
    var enemy_score1 = document.querySelector("#enemy_score1");
    var enemy_score2 = document.querySelector("#enemy_score2");
    var enemy_score3 = document.querySelector("#enemy_score3");
    var enemy__hand = document.querySelector("#enemy_hand");

    winning_num += 1;
    winning_streak.innerHTML = `現在${winning_num}連勝！！`;
    score1.innerHTML = "";
    score2.innerHTML = "";
    score3.innerHTML = "";
    enemy_score1.innerHTML = "";
    enemy_score2.innerHTML = "";
    enemy_score3.innerHTML = "";

    generateEnemy();
    enemy__hand.src = "";
    // 自分の点数　初期
    my_score = 0;
    // 敵の点数　初期
    enemy_score = 0;
}