// Rest API Git 【 https://github.com/gytrhu6u-g-2/Laravel-RestAPI.git 】

// URL
const public_url = "http://127.0.0.1:8000/api/students";

// 画面起動時
window.onload = function() {
    fetchGet();
}

// GET
async function fetchGet()
{
    const url = public_url;

    const response = await fetch(url);
    const data = await response.json();

    var items = data.students;

    makeTable(items);
    makeSelect(items);
}

// 登録者一覧のテーブル追加
function makeTable(items)
{
    var table = document.querySelector('#register__table');
    
    items.map((item, index) => {
        var tr = document.createElement('tr');

        var idTd = document.createElement('td');
        idTd.innerHTML = item.id;
        tr.appendChild(idTd);

        var nameTd = document.createElement('td');
        nameTd.innerHTML = item.name;
        tr.appendChild(nameTd);

        var courseTd = document.createElement('td');
        courseTd.innerHTML = item.course;
        tr.appendChild(courseTd);

        var emailTd = document.createElement('td');
        emailTd.innerHTML = item.email;
        tr.appendChild(emailTd);

        var phoneTd = document.createElement('td');
        phoneTd.innerHTML = item.phone;
        tr.appendChild(phoneTd);

        table.appendChild(tr);
    });
}


// 更新・削除の選択リスト追加
function makeSelect(items)
{
    // 更新
    var select__update = document.querySelector("#update__id");
    items.map((item, index) => {
        var option = document.createElement('option');
        option.value = item.id;
        option.innerHTML = item.id;
        select__update.appendChild(option);
    });

    // 削除
    var select_delete = document.querySelector("#delete__id");
    items.map((item, index) => {
        var option = document.createElement('option');
        option.value = item.id;
        option.innerHTML = item.id;
        select_delete.appendChild(option);
    });
}


// POST
var post = document.querySelector('#post');

post.addEventListener("click", function() {
    fetchPost();
});

async function fetchPost()
{
    var name = document.querySelector('#name').value;
    var course = document.querySelector('#course').value;
    var email = document.querySelector('#email').value;
    var phone = document.querySelector('#phone').value;

    const url = public_url;

    var data = {
        name: name,
        course: course,
        email: email,
        phone: phone
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr("content"),
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        if (result.status == 202) {
            window.location.reload();
        }
        
    } catch (error) {
        alert(`通信に失敗しました。\r\n ${error}`);
    }

}


// GET(ID)
var update__id = document.querySelector("#update__id");
update__id.onchange = event => { 
    id = update__id.value;
    fetchGetId(id);  
}

async function fetchGetId(id)
{
    const url = `${public_url}/${id}`;

    const response = await fetch(url);
    const result = await response.json();

    var data = result.student;

    inputHtml(data);
}

function inputHtml(data)
{
    var update__name = document.querySelector("#update__name");
    var update__course = document.querySelector("#update__course");
    var update__email = document.querySelector("#update__email");
    var update__phone = document.querySelector("#update__phone");

    update__name.value = data.name;
    update__course.value = data.course;
    update__email.value = data.email;
    update__phone.value = data.phone;
}



// UPDATE
var put = document.querySelector("#update");
put.addEventListener("click", function() {
    fetchPut();
});

async function fetchPut()
{
    var update__id = document.querySelector("#update__id").value;
    var update__name = document.querySelector("#update__name").value;
    var update__course = document.querySelector("#update__course").value;
    var update__email = document.querySelector("#update__email").value;
    var update__phone = document.querySelector("#update__phone").value;

    var id = Number(update__id);

    var url = `${public_url}/${id}/edit`

    var data = {
        name: update__name,
        course: update__course,
        email: update__email,
        phone: update__phone
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.status == 202) {
            window.location.reload();
        }
    } catch (error) {
        alert(`通信に失敗しました。\r\n ${error}`);
    }
}



// DELETE
var del = document.querySelector("#delete");
del.addEventListener("click", function() {
    fetchDelete();
});

async function fetchDelete()
{
    var del_id = document.querySelector("#delete__id").value;
    var id = Number(del_id);

    var url = `${public_url}/${id}/delete`;

    try {
        const response = await fetch(url, {
            method:"DELETE",
            headers : {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                "Content-Type": "application/json",
            }
        });
        const result = await response.json();
        if (result.status == 202) {
            window.location.reload();
        }
    } catch (error) {
        alert(`通信に失敗しました。\r\n ${error}`);
    }
}


// SEARCH
var search = document.querySelector("#search");
search.addEventListener("click", function() {
    investigationTableNum();
    fetchSearch();
})

async function fetchSearch()
{
    var search__name = document.querySelector("#search__name");
    var search__course = document.querySelector("#search__course");
    var search__email = document.querySelector("#search__email");
    var search__phone = document.querySelector("#search__phone");

    var name = search__name.value == "" ? "" : search__name.value; 
    var course = search__course.value == "コースを選択してください" || "" ? "" : search__course.value; 
    var email = search__email.value == "" ? "" : search__email.value; 
    var phone = search__phone.value == "" ? "" : search__phone.value; 
    

    var url = `${public_url}/search`;

    var data = {
        name: name,
        course: course,
        email: email,
        phone: phone
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr("content"),
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        const items = result.student
        makeSearchTable(items);
    } catch (error) {
        alert(`通信に失敗しました。\r\n ${error}`);
    }

   
}

// テーブルが存在すれば削除
function investigationTableNum()
{
    var table = document.querySelectorAll('#search__table tr');

    if(table.length > 0)
    {
        for(var i=0; i<table.length; i++)
        {
            table[i].remove();
        }
    }
}


// 検索後のテーブル追加
function makeSearchTable(items)
{
    var table = document.querySelector('#search__table');
    
    items.map((item, index) => {
        var tr = document.createElement('tr');

        var idTd = document.createElement('td');
        idTd.innerHTML = item.id;
        tr.appendChild(idTd);

        var nameTd = document.createElement('td');
        nameTd.innerHTML = item.name;
        tr.appendChild(nameTd);

        var courseTd = document.createElement('td');
        courseTd.innerHTML = item.course;
        tr.appendChild(courseTd);

        var emailTd = document.createElement('td');
        emailTd.innerHTML = item.email;
        tr.appendChild(emailTd);

        var phoneTd = document.createElement('td');
        phoneTd.innerHTML = item.phone;
        tr.appendChild(phoneTd);

        table.appendChild(tr);
    });
}
