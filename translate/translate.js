// URL: https://rapidapi.com/googlecloud/api/google-translate1/

window.onload = function() {
    // fetchGet();
}

// GET
async function fetchGet()
{
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages?target=ja';
    const options = {
        method: 'GET',
        headers: {
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': 'c56bdb5a11msh9cf03618f1754acp113452jsn5a356584eb87',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data.languages);
        const items = result.data.languages;
        makeSelect(items);
    } catch (error) {
        console.error(error);
    }
}

function makeSelect(items)
{
    // 翻訳
    var select__update = document.querySelector("#translate__select");
    items.map((item, index) => {
        var option = document.createElement('option');
        option.value = item.language;
        option.innerHTML = item.name;
        select__update.appendChild(option);
    });
}



// POST
var tarnslate__btn = document.querySelector("#translate__post");
tarnslate__btn.addEventListener("click", function() {
    translatePost();
})

async function translatePost()
{
    // source -> 翻訳前
    // target -> 翻訳後

    var source = document.querySelector("#translate__select").value;
    var textarea = document.querySelector("#text").value;

    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': 'c56bdb5a11msh9cf03618f1754acp113452jsn5a356584eb87',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({
            q: textarea,
            target: 'ja',
            source: source
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}