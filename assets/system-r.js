var system = {
    bowser: {},
    alert: function (title, content, bt1content, bt1function, bt2content, bt2function) { },
    small_alert: function (content, btcontent, btfunction) { },
    window: { all: [] }
};

if (localStorage.getItem('lang') == null) {
    var language = window.navigator.userLanguage || window.navigator.language;
}
else {
    var language = localStorage.getItem('lang');
}

system.delay = function (n) {
    return new Promise(function (r) {
        setTimeout(r, n);
    });
}

system.alert = function (title, content, bt1content, bt1function, bt2content, bt2function) {
    if (typeof (title) === 'string' && typeof (content) === 'string' && typeof (bt1content) === 'string' && typeof (bt1function) === 'function') {
        var bf = document.createElement('div');
        bf.classList.add('black-filter');
        document.body.appendChild(bf);
        var af = document.createElement('div');
        af.classList.add('alert_frame');
        bf.appendChild(af);
        var at = document.createElement('h2');
        at.innerHTML = title;
        af.appendChild(at);
        var ac = document.createElement('p');
        ac.innerHTML = content;
        af.appendChild(ac);
        var bt = document.createElement('button');
        bt.innerHTML = bt1content;
        bt.addEventListener('click', () => {
            bf.remove(); bt1function();
        });
        bt.classList.add('allow');
        af.appendChild(bt);
        bt.focus();
        if (typeof (bt2content) === 'string' && typeof (bt2function) === 'function') {
            var bt2 = document.createElement('button');
            bt2.innerHTML = bt2content;
            bt2.addEventListener('click', () => {
                bf.remove(); bt2function();
            });
            bt2.classList.add('not-allow');
            af.appendChild(bt2);
        } else if (typeof (bt2content) === 'string' && typeof (bt2function) === 'undefined') {
            var bt2 = document.createElement('button');
            bt2.innerHTML = bt2content;
            bt2.addEventListener('click', () => {
                bf.remove();
            });
            bt2.classList.add('not-allow');
            af.appendChild(bt2);
        }
        var a = document.createElement('audio');
        a.src = 'sysalert.mp3';
        a.play();
    }
    else if (typeof (title) === 'string' && typeof (content) === 'string' && typeof (bt1content) === 'string' && typeof (bt1function) === 'string') {
        var bf = document.createElement('div');
        bf.classList.add('black-filter');
        document.body.appendChild(bf);
        var af = document.createElement('div');
        af.classList.add('alert_frame');
        bf.appendChild(af);
        var at = document.createElement('h2');
        at.innerHTML = title;
        af.appendChild(at);
        var ac = document.createElement('p');
        ac.innerHTML = content;
        af.appendChild(ac);
        var bt = document.createElement('button');
        bt.innerHTML = bt1content;
        bt.addEventListener('click', () => {
            bf.remove(); bt1function();
        });
        bt.classList.add('allow');
        af.appendChild(bt);
        bt.focus();
        var bt2 = document.createElement('button');
        bt2.innerHTML = bt2content;
        af.appendChild(bt2);
        bt2.classList.add('not-allow');
        if (typeof (bt2content) === 'function') {
            bt2.addEventListener('click', () => {
                bf.remove(); bt2content();
            });
        } else {
            bt2.addEventListener('click', () => {
                bf.remove();
            });
        }
        var a = document.createElement('audio');
        a.src = 'sysalert.mp3';
        a.play();
    }
    else {
        return undefined;
    }
}

system.small_alert = function (content, btcontent, btfunction) {
    if (content === undefined) {
        content = '';
    }
    if (btcontent === undefined) {
        if (language == 'zh-TW') {
            btcontent = '確定';
        } else {
            btcontent = 'Sure';
        }
    }
    if (btfunction === undefined) {
        btfunction = function () { };
    }
    if (typeof (content) === 'string' && typeof (btcontent) === 'string' && typeof (btfunction) === 'function') {
        var bf = document.createElement('div');
        bf.classList.add('black-filter');
        document.body.appendChild(bf);
        var af = document.createElement('div');
        af.classList.add('small_alert_frame');
        bf.appendChild(af);
        var ac = document.createElement('p');
        ac.innerHTML = content;
        af.appendChild(ac);
        var bt = document.createElement('button');
        bt.innerHTML = btcontent;
        bt.addEventListener('click', () => {
            bf.remove(); btfunction();
        });
        bt.classList.add('allow');
        af.appendChild(bt);
        bt.focus();
        var a = document.createElement('audio');
        a.src = '../assets/sysalert.mp3';
        try{a.play();}catch(e){}
    }
    else {
        return undefined;
    }
}

system.window.create = function (title, windowHTML, windowHeight, windowWidth, canResize) {
    (typeof (title) !== 'string') && (title = '');
    (typeof (windowHeight) === 'number') || ((typeof (windowHeight) === 'string') ? ((typeof (Number(windowHeight)) != NaN) ? windowHeight = Number(windowHeight) : windowHeight = window.innerHeight * (35 / 54)) : windowHeight = window.innerHeight * (35 / 54));
    (typeof (windowWidth) === 'number') || ((typeof (windowWidth) === 'string') ? ((typeof (Number(windowWidth)) != NaN) ? windowWidth = Number(windowHeight) : windowWidth = window.innerWidth * (115 / 192)) : windowWidth = window.innerWidth * (115 / 192));
    (typeof (canResize) !== 'boolean') && (canResize = true);
    var windowElement = document.createElement('div');
    var windowContent = document.createElement('div');
    var windowContentBody = document.createElement('div');
    system.window.all.push(windowElement)
    windowElement.classList.add('syswindow');
    windowContent.classList.add('windowInner');
    windowContentBody.classList.add('windowInnerBody');
    windowContent.appendChild(windowContentBody);
    windowContentBody.innerHTML = windowHTML;
    title = title.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll(' ', '&nbsp;')
    windowElement.innerHTML = '<span class="title">' + title + '</span><span class="sysxbt"></span><button id="windowPreFocus" style="width:0;height:0;opacity:0;pointer-event:none;border:0;padding:0;"></button>'
    windowElement.style.setProperty('--sizew', String(windowWidth) + 'px');
    windowElement.style.setProperty('--sizeh', String(windowHeight) + 'px');
    windowElement.style.setProperty('--posw', '0px');
    windowElement.style.setProperty('--posh', '0px');
    windowElement.moveStart = false;
    windowElement.moveX1 = 0;
    windowElement.moveY1 = 0;
    windowElement.moveX2 = 0;
    windowElement.moveY2 = 0;
    windowElement.close = function () {
        windowElement.childNodes[1].onclick = () => {
            (windowElement.onclosebtclick !== null) && (windowElement.onclosebtclick());
            windowElement.remove();
        };
    }
    windowElement.body = windowContentBody;
    windowElement.onclosebtclick = null;
    windowElement.positionZ = system.window.all.length + 5;
    windowElement.setTitle = (text) => { windowElement.querySelector('span.title').innerHTML = text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll(' ', '&nbsp;'); }
    windowElement.style.setProperty('--posz', windowElement.positionZ);
    windowElement.move = (e) => {
        if (windowElement.moveStart) {
            const dx = -windowElement.moveX1 + (e.pageX);
            const dy = -windowElement.moveY1 + (e.pageY);
            windowElement.style.setProperty('--posw', windowElement.moveX2 + dx + 'px');
            windowElement.style.setProperty('--posh', windowElement.moveY2 + dy + 'px');
        }
    }
    windowElement.addEventListener('mousedown', function (e) {
        if (e.target === windowElement || e.target === windowElement.childNodes[0]) {
            windowElement.moveStart = true;
            windowElement.moveX1 = e.pageX;
            windowElement.moveY1 = e.pageY;
            document.addEventListener('mousemove', windowElement.move);
        }
        system.window.all.forEach(e => {
            if (e !== windowElement && e.positionZ >= windowElement.positionZ) {
                e.positionZ -= 1;
            }
            e.style.setProperty('--posz', e.positionZ);
        });
        windowElement.positionZ = system.window.all.length + 5;
        windowElement.style.setProperty('--posz', windowElement.positionZ);
    })
    document.addEventListener('mouseup', function (e) {
        if (windowElement.moveStart) {
            windowElement.moveX2 -= windowElement.moveX1 - (e.pageX);
            windowElement.moveY2 -= windowElement.moveY1 - (e.pageY);
        }
        windowElement.moveStart = false;
        document.removeEventListener('mousemove', windowElement.move);
    })
    windowElement.childNodes[1].onclick = () => {
        (windowElement.onclosebtclick !== null) && (windowElement.onclosebtclick());
        windowElement.remove();
    };
    windowElement.addEventListener('mouseup', function (event) {
        if (!windowElement.contains(document.activeElement)) {
            document.activeElement.blur();
            windowElement.querySelector('button#windowPreFocus').focus();
        }
    })
    windowElement.appendChild(windowContent);
    document.querySelector('main').appendChild(windowElement);
    document.activeElement.blur();
    windowElement.querySelector('button#windowPreFocus').focus();
    return windowElement;
}

system.bowser.alert = alert;
alert = system.small_alert;
system.bowser.confirm = confirm;
confirm = system.alert;

//system.alert('⚠️ 需要重新整理', '您剛剛在設定中變更了一些設定，需要重新整理以啟用這些變更。<br>現在是否要重新整理?', '立即重新整理', () => {console.log('true');}, '稍後重新整理', () => {console.log('false');})