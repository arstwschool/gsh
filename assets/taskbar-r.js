system.taskbar = {
    menu: {},
    setting: {},
    notes: {
        infos: [],
        windows: []
    },
    helper: {}
};
fetch("/gsh2024/" + language + "/menu.html?t=" + new Date().getTime())
    .then(function (r) {
        return r.text();
    })
    .then(function (q) {
        system.taskbar.menu.list = q.replaceAll('    ', '');
    })

system.taskbar.pmam = () => {
    if (language == 'zh_TW') {
        if (new Date().getHours() <= 11) {
            return '上午';
        }
        else {
            return '下午';
        }
    } else {
        if (new Date().getHours() <= 11) {
            return 'A.M.';
        }
        else {
            return 'P.M.';
        }
    }
}

try{clock.innerHTML = system.taskbar.pmam() + String(new Date().getHours() % 12).padStart(2, '0') + ":" + String(new Date().getMinutes()).padStart(2, '0') + ":" + String(new Date().getSeconds()).padStart(2, '0') + "<br>" + String(new Date().getFullYear()).padStart(2, '0') + "/" + String(new Date().getMonth() + 1).padStart(2, '0') + "/" + String(new Date().getDate()).padStart(2, '0');}catch(e){};
system.taskbar.clock = setInterval(() => {
    try{clock.innerHTML = system.taskbar.pmam() + String(new Date().getHours() % 12).padStart(2, '0') + ":" + String(new Date().getMinutes()).padStart(2, '0') + ":" + String(new Date().getSeconds()).padStart(2, '0') + "<br>" + String(new Date().getFullYear()).padStart(2, '0') + "/" + String(new Date().getMonth() + 1).padStart(2, '0') + "/" + String(new Date().getDate()).padStart(2, '0');}catch(e){clearInterval(system.taskbar.clock);};
}, 100);

system.bowser.windowResizeAlerted = false;

if (window.innerWidth < 900 || window.innerHeight < 500) {
    if (language == 'zh_TW') {
        system.small_alert('您的螢幕解析度低於建議值，建議您調整縮放比例或換至解析度較高的裝置檢視!');
    }
    else {
        system.small_alert('Your screen resolution is lower than the recommended value. We suggest switching to a device with a higher resolution for better viewing.');
    }
    system.bowser.windowResizeAlerted = true;
}

window.onresize = function () {
    if (window.innerWidth < 900 || window.innerHeight < 500) {
        if (!system.bowser.windowResizeAlerted) {
            if (language == 'zh_TW') {
                system.small_alert('現在您的螢幕解析度已經低於建議值，部分網頁元素可能會不正常顯示!');
            }
            else {
                system.small_alert('The current screen resolution is below the recommended value, and some web page elements may not display properly.');
            }
        }
        system.bowser.windowResizeAlerted = true;
    } else {
        system.bowser.windowResizeAlerted = false;
    }
}

system.taskbar.menu.open = function () {
    var a = document.createElement('div');
    a.classList.add('black-filter');
    a.innerHTML = '<div class="sysblock"><h1>MENU</h1><h1 class="sysxbt"></h1><div class="menu-selections"></div></div>';
    var b = a.querySelector('.menu-selections');
    b.innerHTML = system.taskbar.menu.list;
    b.querySelectorAll('li.close').forEach((e) => {
        e.onclick = () => {
            if (e.classList.contains('open')) {
                e.classList = 'close';
            }
            else if (e.classList.contains('close')) {
                e.classList = 'open';
            }
        }
    })
    a.onclick = (event) => {
        if (event.target === a) {
            a.remove();
        }
    };
    a.querySelector('h1.sysxbt').onclick = () => {
        a.remove();
    };
    document.body.appendChild(a);
}

system.taskbar.setting.open = function (event) {
    var a = document.createElement('div');
    a.classList.add('black-filter');
    a.innerHTML = '<div class="sysblock"><h1>SETTING</h1><h1 class="sysxbt"></h1></div>';
    a.querySelector('h1.sysxbt').onclick = () => {
        a.remove();
    };
    a.onclick = (event) => {
        if (event.target === a) {
            a.remove();
        }
    };
    document.body.appendChild(a);
}

system.taskbar.helper.open = function (event) {
    var a = document.createElement('div');
    a.classList.add('black-filter');
    a.innerHTML = '<div class="sysblock"><h1>HELP</h1><h1 class="sysxbt"></h1></div>';
    a.querySelector('h1.sysxbt').onclick = () => {
        a.remove();
    };
    a.onclick = (event) => {
        if (event.target === a) {
            a.remove();
        }
    };
    document.body.appendChild(a);
}

call_menu.onclick = system.taskbar.menu.open;
call_setting.onclick = system.taskbar.setting.open;
help.onclick = system.taskbar.helper.open;
languagebt.onclick = () => {
    if (language == 'zh_TW') {
        var a = '⚠️ 變更語言';
        var b = '您剛剛變更了語言設定，必須跳轉頁面才能啟用這項變更。<br>現在是否要進行跳轉?';
        var c = '立即跳轉至英文頁面';
        var d = '還原這項變更';
    }
    else {
        var a = '⚠️ Change language';
        var b = 'You have just changed the language settings, and a page refresh is required to apply this change. Would you like to proceed with the redirection now?';
        var c = 'Redirecting to the Chinese page.';
        var d = 'Reverting this change.';
    }
    system.alert(a, b, c, () => {
        if (language == 'zh_TW') {
            language = 'en';
            var e = location.href;
            location.href = e.replace('/zh_TW/', '/en/');
        }
        else {
            language = 'zh_TW';
            var e = location.href;
            location.href = e.replace('/en/', '/zh_TW/');
        }
    },
        d)
};

system.taskbar.reloadNote = function () {
    note_list.innerHTML = '';
    for (let i = 0; i < system.taskbar.notes.infos.length; i++) {
        var noteapp = document.createElement('button');
        noteapp.innerText = '📓 ' + system.taskbar.notes.infos[i].name;
        if (language == 'zh_TW') {
            noteapp.title = '點兩下以刪除筆記';
        }
        else {
            noteapp.title = 'Double-click to delete the note.';
        }
        noteapp.ondblclick = () => {
            try {
                system.window.all[system.taskbar.notes.windows[i]].remove()
            } catch (e) { };
            system.taskbar.notes.infos.splice(i, 1);
            system.taskbar.notes.windows.splice(i, 1);
            localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
            system.taskbar.reloadNote();
        }
        noteapp.onclick = () => {
            try {
                system.window.all[system.taskbar.notes.windows[i]].remove()
            } catch (e) { };
            if (language == 'zh_TW') {
                var a = ' - 筆記本'
            }
            else {
                var a = ' - Note Book'
            }
            var app = system.window.create(system.taskbar.notes.infos[i].name + a, '<textarea class="note"></textarea>', 700, 500, true);
            app.body.querySelector('textarea.note').value = system.taskbar.notes.infos[i].content;
            app.body.querySelector('textarea.note').oninput = function () {
                system.taskbar.notes.infos[i].content = app.body.querySelector('textarea.note').value;
                localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
            }
            system.taskbar.notes.windows[i] = (Number(system.window.all.length) - 1);
        }
        note_list.appendChild(noteapp);
    }
}

if (localStorage.getItem('notes') == null) {
    localStorage.setItem('notes', '[]');
    system.taskbar.notes.infos = [];
}
else {
    system.taskbar.notes.infos = JSON.parse(localStorage.getItem('notes'));
    system.taskbar.reloadNote();
}

call_note.onclick = () => {
    if (language == 'zh_TW') {
        var queryName = system.window.create('請輸入筆記名稱', '<input style="margin-top:10px;margin-left:25px;width:200px;height:30px;font-size:25px;text-align:center;"><br><button style="float:right;font-size:18px;width:75px;margin-right:25px;scale:.8;">創建</button>', 140, 250, false);
        queryName.querySelector('input').focus();
        queryName.body.querySelector('button').onclick = () => {
            noteName = queryName.querySelector('input').value;
            var app = system.window.create(noteName + ' - 筆記本', '<textarea class="note"></textarea>', 700, 500, true);
            opened(app, noteName);
            queryName.remove();
            setTimeout(()=>{app.focus()}, 0);
        }
        queryName.body.querySelector('input').onkeydown = (e) => {
            if (e.keyCode == 13) {
                noteName = queryName.querySelector('input').value;
                var app = system.window.create(noteName + ' - 筆記本', '<textarea class="note"></textarea>', 700, 500, true);
                opened(app, noteName);
                queryName.remove();
                setTimeout(()=>{app.focus()}, 0);
            }
        }
        queryName.onclosebtclick = () => {
            noteName = '未命名';
            var app = system.window.create(noteName + ' - 筆記本', '<textarea class="note"></textarea>', 700, 500, true);
            opened(app, noteName);
            setTimeout(()=>{app.focus()}, 0);
        }
    }
    else {
        var queryName = system.window.create('Set Note Name', '<input style="margin-top:10px;margin-left:25px;width:200px;height:30px;font-size:25px;text-align:center;"><br><button style="float:right;font-size:18px;width:75px;margin-right:25px;scale:.8;">Create</button>', 140, 250)
        queryName.querySelector('input').focus();
        queryName.body.querySelector('button').onclick = () => {
            noteName = queryName.querySelector('input').value;
            var app = system.window.create(noteName + ' - Note Book', '<textarea class="note"></textarea>', 700, 500, true);
            opened(app, noteName);
            queryName.remove();
            setTimeout(()=>{app.focus()}, 0);
        }
        queryName.body.querySelector('input').onkeydown = (e) => {
            if (e.keyCode == 13) {
                noteName = queryName.querySelector('input').value;
                var app = system.window.create(noteName + ' - Note Book', '<textarea class="note"></textarea>', 700, 500, true);
                opened(app, noteName);
                queryName.remove();
                setTimeout(()=>{app.focus()}, 0);
            }
        }
        queryName.onclosebtclick = () => {
            noteName = 'Untitled';
            var app = system.window.create(noteName + ' - Note Book', '<textarea class="note"></textarea>', 700, 500, true);
            opened(app, noteName);
            setTimeout(()=>{app.focus()}, 0);
        }
    }
    function opened(app, noteName) {
        var nc = Number(system.taskbar.notes.infos.length);
        system.taskbar.notes.windows.push(Number(system.window.all.length) - 1);
        var info = {
            name: noteName,
            content: '',
        }
        system.taskbar.notes.infos.push(info);
        localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
        system.taskbar.reloadNote();
        app.onclosebtclick = () => {
            system.taskbar.notes.infos[nc] = {
                name: noteName,
                content: app.body.querySelector('textarea.note').value,
            };
            localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
        }
        app.body.querySelector('textarea.note').oninput = function () {
            system.taskbar.notes.infos[nc].content = app.body.querySelector('textarea.note').value;
            localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
        }
    }
};