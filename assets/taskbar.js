import { system, language } from '/gsh2024/assets/system.js'
system.taskbar = {
    menu: {},
    setting: {},
    notes: {
        infos: [],
        windows: []
    },
    readme: {}
};
fetch("/gsh2024/" + language + "/menu.html")
    .then(function (r) {
        return r.text();
    })
    .then(function (q) {
        system.taskbar.menu.list = q;
    })
fetch("/gsh2024/" + language + "/settinglang.json")
    .then(function (b) {
        return b.json();
    })
    .then(function (n) {
        system.taskbar.setting.lang = n;
    })
fetch("/gsh2024/" + language + "/readme.html")
    .then(function (b) {
        return b.text();
    })
    .then(function (n) {
        system.taskbar.readme.content = n;
        if (((typeof +localStorage.getItem('showedreadme') == 'number')? +localStorage.getItem('showedreadme'): 0) <= new Date().getTime()) {
            system.taskbar.readme.open();
        }
    })
    
system.taskbar.setting.content = (localStorage.getItem('set') == null)? {alert: {lang: true, resolution: true, browser: true}, block: {gshad: true, clock: true, lang: true, note: true,}, beta: {window: false}}: JSON.parse(localStorage.getItem('set'));

system.taskbar.pmam = () => {
    if (language == 'zh_TW') {
        if (new Date().getHours() <= 11) {
            return '上午';
        } else {
            return '下午';
        }
    } else {
        if (new Date().getHours() <= 11) {
            return 'A.M.';
        } else {
            return 'P.M.';
        }
    }
}

try {
    clock.innerHTML = system.taskbar.pmam() + String(new Date().getHours() % 12).padStart(2, '0') + ":" + String(new Date().getMinutes()).padStart(2, '0') + ":" + String(new Date().getSeconds()).padStart(2, '0') + "<br>" + String(new Date().getFullYear()).padStart(2, '0') + "/" + String(new Date().getMonth() + 1).padStart(2, '0') + "/" + String(new Date().getDate()).padStart(2, '0');
} catch (e) { };
system.taskbar.clock = setInterval(() => {
    try {
        clock.innerHTML = system.taskbar.pmam() + String(new Date().getHours() % 12).padStart(2, '0') + ":" + String(new Date().getMinutes()).padStart(2, '0') + ":" + String(new Date().getSeconds()).padStart(2, '0') + "<br>" + String(new Date().getFullYear()).padStart(2, '0') + "/" + String(new Date().getMonth() + 1).padStart(2, '0') + "/" + String(new Date().getDate()).padStart(2, '0');
    } catch (e) {
        clearInterval(system.taskbar.clock);
    };
}, 100);

system.bowser.windowResizeAlerted = false;

if ((window.innerWidth < 650 || window.innerHeight < 500) && system.taskbar.setting.content.alert.resolution) {
    if (language == 'zh_TW') {
        system.small_alert('您的螢幕解析度低於建議值，建議您調整縮放比例或換至解析度較高的裝置檢視!');
    } else {
        system.small_alert('Your screen resolution is lower than the recommended value. We suggest switching to a device with a higher resolution for better viewing.');
    }
    system.bowser.windowResizeAlerted = true;
}

if (!(navigator.userAgent.search("Safari") > -1 || navigator.userAgent.search("Chrome") > -1) && system.taskbar.setting.content.alert.resolution) {
    if (language == 'zh_TW') {
        system.small_alert('您的瀏覽器不符合建議的瀏覽器，建議您使用 Chrome 或者 Edge 瀏覽器！');
    } else {
        system.small_alert("Your browser does not meet the recommended browser. We suggest you use Chrome or Edge browser!");
    }
}

window.onresize = function () {
    if ((window.innerWidth < 650 || window.innerHeight < 500) && system.taskbar.setting.content.alert.resolution) {
        if (!system.bowser.windowResizeAlerted) {
            if (language == 'zh_TW') {
                system.small_alert('現在您的螢幕解析度已經低於建議值，部分網頁元素可能會不正常顯示!');
            } else {
                system.small_alert('The current screen resolution is below the recommended value, and some web page elements may not display properly.');
            }
        }
        system.bowser.windowResizeAlerted = true;
    } else {
        system.bowser.windowResizeAlerted = false;
    }
}

var gsh;

function setShowBlock() {
    var g = document.createElement('a');
    g.href = "http://globalschoolnet.org/gsncf/index.cfm";
    g.innerHTML = '<img src="/gsh2024/assets/img/CFParticipantBanner2024.jpg">';
    g.id = "gsh2024Block"
    g.target = '_blank'
    if (system.taskbar.setting.content.block.gshad) {
        try{gsh.remove()}catch(e){};
        gsh = document.querySelector('main').appendChild(g);
    }
    else {
        try{gsh.remove()}catch(e){};
    }
    if (system.taskbar.setting.content.block.clock) {
        document.body.classList.add('clock');
    }
    else {
        document.body.classList.remove('clock');
    }
    if (system.taskbar.setting.content.block.lang) {
        document.body.classList.add('lang');
    }
    else {
        document.body.classList.remove('lang');
    }
    if (system.taskbar.setting.content.block.note) {
        document.body.classList.add('note');
    }
    else {
        document.body.classList.remove('note');
    }
}
setShowBlock()

system.taskbar.menu.open = function () {
    var a = document.createElement('div');
    a.classList.add('black-filter');
    a.innerHTML = '<div class="sysblock"><h1>MENU</h1><h1 class="sysxbt"></h1><div class="menu-selections"></div></div>';
    var b = a.querySelector('.menu-selections');
    b.innerHTML = (system.taskbar.menu.list == undefined)? '<h2>Loading...<br>Please reopen the Menu later.</h2>': system.taskbar.menu.list;
    b.querySelectorAll('li.close').forEach((e) => {
        e.onclick = () => {
            if (e.classList.contains('open')) {
                e.classList = 'close';
            } else if (e.classList.contains('close')) {
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

system.taskbar.readme.open = function () {
    var a = document.createElement('div');
    a.classList.add('black-filter');
    a.innerHTML = '<div class="sysblock" style="height: max-content;"><h1>README</h1><h1 class="sysxbt"></h1><div id="rdframe"></div></div>';
    var b = a.querySelector('#rdframe');
    b.innerHTML = system.taskbar.readme.content;
    a.onclick = (event) => {
        if (event.target === a) {
            a.remove();
        }
    };
    a.querySelector('h1.sysxbt').onclick = () => {
        a.remove();
    };
    document.body.appendChild(a);
    localStorage.setItem('showedreadme', new Date().getTime()+ 36E5);
}

system.taskbar.setting.open = function (event) {
    var a = document.createElement('div');
    a.classList.add('black-filter');
    a.innerHTML = '<div class="sysblock"><h1>SETTING</h1><h1 class="sysxbt"></h1><div class="setting-selections"></div></div>';
    var b = a.querySelector('.setting-selections');
    for (var i in system.taskbar.setting.lang) {
        var r = document.createElement('ul');
        r.name = i;
        for (var j in system.taskbar.setting.lang[i]) {
            var q = document.createElement('li');
            q.name = j;
            system.taskbar.setting.content[i][j]? q.classList.add('on'): q.classList.add('off');
            q.innerHTML = system.taskbar.setting.lang[i][j];
            r.appendChild(q);
        }
        b.appendChild(r);
    }
    function updateSetting(className, name, boolean) {
        system.taskbar.setting.content[className][name] = boolean;
        localStorage.setItem('set', JSON.stringify(system.taskbar.setting.content));
        setShowBlock()
    }
    b.querySelectorAll('li').forEach((e) => {
        e.onclick = () => {
            if (e.classList.contains('on')) {
                e.classList = 'off';
                updateSetting(e.parentNode.name, e.name, false);
            } else if (e.classList.contains('off')) {
                e.classList = 'on';
                updateSetting(e.parentNode.name, e.name, true);
            }
        }
    })
    a.querySelector('h1.sysxbt').onclick = () => {
        a.remove();
    };
    a.onclick = (event) => {
        if (event.target === a) {
            a.remove();
        }
    };
    document.body.appendChild(a);
    (system.taskbar.setting.lang == undefined) && (system.small_alert('Setting is loading! Please reopen the Menu later.'))
}

call_menu.onclick = system.taskbar.menu.open;
call_setting.onclick = system.taskbar.setting.open;
languagebt.onclick = () => {
    if (system.taskbar.setting.content.alert.lang) {
        if (language == 'zh_TW') {
            var a = '⚠️ 變更語言';
            var b = '您剛剛變更了語言設定，必須跳轉頁面才能啟用這項變更。<br>現在是否要進行跳轉?';
            var c = '立即跳轉至英文頁面';
            var d = '還原這項變更';
        } else {
            var a = '⚠️ Change language';
            var b = 'You have just changed the language settings, and a page refresh is required to apply this change. Would you like to proceed with the redirection now?';
            var c = 'Redirecting to the Chinese page.';
            var d = 'Reverting this change.';
        }
        system.alert(a, b, c, () => {
            if (language == 'zh_TW') {
                var e = location.href;
                location.href = e.replace('/zh_TW/', '/en/');
            } else {
                var e = location.href;
                location.href = e.replace('/en/', '/zh_TW/');
            };
        },
            d)
    }
    else {
        if (language == 'zh_TW') {
            var e = location.href;
            location.href = e.replace('/zh_TW/', '/en/');
        } else {
            var e = location.href;
            location.href = e.replace('/en/', '/zh_TW/');
        };
    }
};

system.taskbar.reloadNote = function () {
    note_list.innerHTML = '';
    for (let i = 0; i < system.taskbar.notes.infos.length; i++) {
        var noteapp = document.createElement('button');
        noteapp.innerText = '📓 ' + system.taskbar.notes.infos[i].name;
        if (language == 'zh_TW') {
            noteapp.title = '點兩下以刪除筆記';
        } else {
            noteapp.title = 'Double-click to delete the note.';
        }
        noteapp.ondblclick = () => {
            system.window.all[system.taskbar.notes.windows[i]]?.remove();
            system.taskbar.notes.infos.splice(i, 1);
            system.taskbar.notes.windows.splice(i, 1);
            localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
            system.taskbar.reloadNote();
        }
        noteapp.onclick = () => {
            system.window.all[system.taskbar.notes.windows[i]]?.remove();
            if (language == 'zh_TW') {
                var a = ' - 筆記本'
            } else {
                var a = ' - Note Book'
            }
            system.taskbar.notes.infos[i].windowOpened = true;
            localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
            (system.taskbar.notes.infos[i]?.size == undefined) && (system.taskbar.notes.infos[i].size = [window.innerWidth * (115 / 192), window.innerHeight * (35 / 54)])
            var app = system.window.create(system.taskbar.notes.infos[i].name + a, '<textarea class="note"></textarea>', Number(system.taskbar.notes.infos[i].size[1]), Number(system.taskbar.notes.infos[i].size[0]), true, true);
            app.setPos(system.taskbar.notes.infos[i]?.pos[0], system.taskbar.notes.infos[i]?.pos[1]);
            app.body.querySelector('textarea.note').value = system.taskbar.notes.infos[i].content;
            app.body.querySelector('textarea.note').oninput = function () {
                system.taskbar.notes.infos[i].content = app.body.querySelector('textarea.note').value;
                localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
            }
            app.onresized = function () {
                system.taskbar.notes.infos[i].pos = [app.positionX, app.positionY];
                system.taskbar.notes.infos[i].size = [app.sizeX, app.sizeY];
                localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
            }
            app.onmoved = function () {
                system.taskbar.notes.infos[i].pos = [app.positionX, app.positionY];
                localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
            }
            system.taskbar.notes.windows[i] = (Number(system.window.all.length) - 1);
            app.onclosebtclick = () => {
                system.taskbar.notes.infos[i].content = app.body.querySelector('textarea.note').value;
                system.taskbar.notes.infos[i].windowOpened = false;
                localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
            }
        }
        note_list.appendChild(noteapp);
    }
};

if (localStorage.getItem('notes') == null) {
    localStorage.setItem('notes', '[]');
    system.taskbar.notes.infos = [];
} else {
    system.taskbar.notes.infos = JSON.parse(localStorage.getItem('notes'));
    system.taskbar.reloadNote();
}

if (system.taskbar.setting.content.beta.window) {
    for (let i = 0; i < system.taskbar.notes.infos.length; i++) {
        if (system.taskbar.notes.infos[i]?.windowOpened) {
            (() => {
                if (language == 'zh_TW') {
                    var a = ' - 筆記本'
                } else {
                    var a = ' - Note Book'
                };
                (system.taskbar.notes.infos[i]?.size == undefined) && (system.taskbar.notes.infos[i].size = [window.innerWidth * (115 / 192), window.innerHeight * (35 / 54)]);
                var app = system.window.create(system.taskbar.notes.infos[i]?.name + a, '<textarea class="note"></textarea>', Number(system.taskbar.notes.infos[i]?.size[1]), Number(system.taskbar.notes.infos[i]?.size[0]), false, false);
                app.setPos(system.taskbar.notes.infos[i]?.pos?.[0], system.taskbar.notes.infos[i]?.pos?.[1]);
                app.body.querySelector('textarea.note').value = system.taskbar.notes.infos[i].content;
                app.body.querySelector('textarea.note').oninput = function () {
                    system.taskbar.notes.infos[i].content = app.body.querySelector('textarea.note').value;
                    localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
                }
                app.onresized = function () {
                    system.taskbar.notes.infos[i].pos = [app.positionX, app.positionY];
                    system.taskbar.notes.infos[i].size = [app.sizeX, app.sizeY];
                    localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
                }
                app.onmoved = function () {
                    system.taskbar.notes.infos[i].pos = [app.positionX, app.positionY];
                    localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
                }
                system.taskbar.notes.windows[i] = (Number(system.window.all.length) - 1);
                app.onclosebtclick = function () {
                    system.taskbar.notes.infos[i].content = app.body.querySelector('textarea.note').value;
                    system.taskbar.notes.infos[i].windowOpened = false;
                    localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
                }
            })()
        }
    }
}

/*var a = document.createElement('p');
if (language == 'zh_TW') {
    a.innerText = '網頁由 聖食小組 設計';
}
else {
    a.innerText = 'Designer: Food Sharing Team';
}
a.id = 'team';
document.body.appendChild(a);*/

call_note.onclick = () => {
    if (language == 'zh_TW') {
        var queryName = system.window.create('請輸入筆記名稱', '<input style="margin-top:10px;margin-left:25px;width:200px;height:30px;font-size:25px;text-align:center;"><br><button style="float:right;font-size:18px;width:75px;margin-right:25px;scale:.8;">創建</button>', 140, 250, false);
        queryName.querySelector('input').focus();
        queryName.body.querySelector('button').onclick = () => {
            var noteName = queryName.querySelector('input').value;
            var app = system.window.create(noteName + ' - 筆記本', '<textarea class="note"></textarea>', window.innerHeight * (35 / 54), window.innerWidth * (115 / 192), true);
            opened(app, noteName);
            queryName.remove();
            setTimeout(() => {
                app.focus()
            }, 0);
        }
        queryName.body.querySelector('input').onkeydown = (e) => {
            if (e.keyCode == 13) {
                var noteName = queryName.querySelector('input').value;
                var app = system.window.create(noteName + ' - 筆記本', '<textarea class="note"></textarea>', window.innerHeight * (35 / 54), window.innerWidth * (115 / 192), true);
                opened(app, noteName);
                queryName.remove();
                setTimeout(() => {
                    app.focus()
                }, 0);
            }
        }
        queryName.onclosebtclick = () => {
            var noteName = '未命名';
            var app = system.window.create(noteName + ' - 筆記本', '<textarea class="note"></textarea>', window.innerHeight * (35 / 54), window.innerWidth * (115 / 192), true);
            opened(app, noteName);
            setTimeout(() => {
                app.focus()
            }, 0);
        }
    } else {
        var queryName = system.window.create('Set Note Name', '<input style="margin-top:10px;margin-left:25px;width:200px;height:30px;font-size:25px;text-align:center;"><br><button style="float:right;font-size:18px;width:75px;margin-right:25px;scale:.8;">Create</button>', 140, 250)
        queryName.querySelector('input').focus();
        queryName.body.querySelector('button').onclick = () => {
            var noteName = queryName.querySelector('input').value;
            var app = system.window.create(noteName + ' - Note Book', '<textarea class="note"></textarea>', window.innerHeight * (35 / 54), window.innerWidth * (115 / 192), true);
            opened(app, noteName);
            queryName.remove();
            setTimeout(() => {
                app.focus()
            }, 0);
        }
        queryName.body.querySelector('input').onkeydown = (e) => {
            if (e.keyCode == 13) {
                var noteName = queryName.querySelector('input').value;
                var app = system.window.create(noteName + ' - Note Book', '<textarea class="note"></textarea>', window.innerHeight * (35 / 54), window.innerWidth * (115 / 192), true);
                opened(app, noteName);
                queryName.remove();
                setTimeout(() => {
                    app.focus()
                }, 0);
            }
        }
        queryName.onclosebtclick = () => {
            var noteName = 'Untitled';
            var app = system.window.create(noteName + ' - Note Book', '<textarea class="note"></textarea>', window.innerHeight * (35 / 54), window.innerWidth * (115 / 192), true);
            opened(app, noteName);
            setTimeout(() => {
                app.focus()
            }, 0);
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
        system.taskbar.notes.infos[nc].pos = [0, 0];
        system.taskbar.notes.infos[nc].size = [window.innerWidth * (115 / 192), window.innerHeight * (35 / 54)];
        system.taskbar.notes.infos[nc].name = noteName;
        system.taskbar.notes.infos[nc].windowOpened = true;
        app.onclosebtclick = () => {
            system.taskbar.notes.infos[nc].content = app.body.querySelector('textarea.note').value;
            system.taskbar.notes.infos[nc].windowOpened = false;
            localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
        }
        app.onresized = function () {
            system.taskbar.notes.infos[nc].pos = [app.positionX, app.positionY];
            system.taskbar.notes.infos[nc].size = [app.sizeX, app.sizeY];
            localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
        }
        app.onmoved = function () {
            system.taskbar.notes.infos[nc].pos = [app.positionX, app.positionY];
            localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
        }
        app.body.querySelector('textarea.note').oninput = function () {
            system.taskbar.notes.infos[nc].content = app.body.querySelector('textarea.note').value;
            localStorage.setItem('notes', JSON.stringify(system.taskbar.notes.infos));
        }
    }
};

function insertImgText(className, textZh, textEn) {
    if (typeof className != typeof textZh && typeof textZh != textEn && typeof textZh != 'string') {
        throw 'Type Error';
    }
    var t = document.createElement('span');
    if (language == 'zh_TW') {
        t.innerText = textZh;
    }
    else {
        t.innerText = textEn;
    }
    t.classList.add('tpic');
    document.querySelectorAll('img.' + className).forEach(e=>{
        e.parentNode.insertBefore(t.cloneNode(true), e.nextSibling)
    })
}

insertImgText('t', '圖為自行拍攝', 'photographed by ourselves')
insertImgText('t1', '圖為國語日報提供', 'The image is provided by Mandarin Daily News.')
//insertImgText('t2', '圖截自公視、三立新聞、TVBS新聞、國語日報', 'The image is captured from Public Television , SET News , and TVBS News, Mandarin Daily News.')
insertImgText('t3', '圖由精誠高中提供', 'The image is provided by Ching Cheng High School.')