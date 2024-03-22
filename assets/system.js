var system = {
    bowser: {},
    alert: function (title, content, bt1content, bt1function, bt2content, bt2function) { },
    small_alert: function (content, btcontent, btfunction) { },
    window: {
        all: []
    }
};

var language;

try {
    language = location.pathname.split('/')[2]
}
catch (e) {
    language = window.navigator.userLanguage || window.navigator.language
};

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
        a.src = '../assets/sysalert.mp3';
        a.play();
    } else if (typeof (title) === 'string' && typeof (content) === 'string' && typeof (bt1content) === 'string' && typeof (bt1function) === 'string') {
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
        a.src = '../assets/sysalert.mp3';
        a.play();
    } else {
        return undefined;
    }
}

system.small_alert = function (content, btcontent, btfunction) {
    if (content === undefined) {
        content = '';
    }
    if (btcontent === undefined) {
        if (language == 'zh_TW') {
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
        try {
            a.play();
        } catch (e) { }
    } else {
        return undefined;
    }
}

system.window.create = function (title, windowHTML, windowHeight, windowWidth, canResize, playAnimation) {
    (typeof (title) !== 'string') && (title = '');
    (typeof (windowHeight) === 'boolean') && ((canResize = windowHeight), ((typeof (windowWidth) === 'boolean') && (playAnimation = windowWidth)));
    (typeof (playAnimation) !== 'boolean') && (playAnimation = true);
    (typeof (windowHeight) === 'number') || ((typeof (windowHeight) === 'string') ? ((typeof (Number(windowHeight)) != NaN) ? windowHeight = Number(windowHeight) : windowHeight = window.innerHeight * (35 / 54)) : windowHeight = window.innerHeight * (35 / 54));
    (typeof (windowWidth) === 'number') || ((typeof (windowWidth) === 'string') ? ((typeof (Number(windowWidth)) != NaN) ? windowWidth = Number(windowHeight) : windowWidth = window.innerWidth * (115 / 192)) : windowWidth = window.innerWidth * (115 / 192));
    (typeof (canResize) !== 'boolean') && (canResize = false);
    var windowElement = document.createElement('div');
    var windowContent = document.createElement('div');
    var windowTitleBackground = document.createElement('div');
    var windowTitle = document.createElement('span');
    var windowClosebt = document.createElement('span');
    var windowPreFocus = document.createElement('button');
    var windowContentBody = document.createElement('div');
    system.window.all.push(windowElement)
    windowElement.classList.add('syswindow');
    (playAnimation == true) && (windowElement.classList.add('winani'));
    windowContent.classList.add('windowInner');
    windowTitle.classList.add('title');
    windowClosebt.classList.add('sysxbt');
    windowTitleBackground.classList.add('tit-background');
    windowPreFocus.id = 'windowPreFocus';
    windowTitle.innerText = title;
    windowClosebt.innerText = '';
    windowContentBody.classList.add('windowInnerBody');
    windowElement.appendChild(windowTitleBackground);
    windowElement.appendChild(windowTitle);
    windowElement.appendChild(windowClosebt);
    windowElement.appendChild(windowPreFocus);
    windowContent.appendChild(windowContentBody);
    windowContentBody.innerHTML = windowHTML;
    windowElement.style.setProperty('--sizew', String(windowWidth) + 'px');
    windowElement.style.setProperty('--sizeh', String(windowHeight) + 'px');
    windowElement.style.setProperty('--posw', '0px');
    windowElement.style.setProperty('--posh', '0px');
    windowElement.positionX = 0;
    windowElement.positionY = 0;
    windowElement.sizeX = Number(windowWidth);
    windowElement.sizeY = Number(windowHeight);
    windowElement.setSize = function (x, y) {
        (typeof (x) === 'number') || ((typeof (x) === 'string') ? ((typeof (Number(x)) != NaN) ? x = Number(x) : x = window.innerHeight * (35 / 54)) : x = window.innerHeight * (35 / 54));
        (typeof (y) === 'number') || ((typeof (y) === 'string') ? ((typeof (Number(y)) != NaN) ? y = Number(y) : y = window.innerWidth * (115 / 192)) : y = window.innerWidth * (115 / 192));
        windowElement.sizeX = x;
        windowElement.sizeY = y;
        windowElement.style.setProperty('--sizew', String(windowElement.sizeX) + 'px');
        windowElement.style.setProperty('--sizeh', String(windowElement.sizeY) + 'px');
    }
    windowElement.setPos = function (x, y) {
        (typeof (x) === 'number') || ((typeof (x) === 'string') ? ((typeof (Number(x)) != NaN) ? x = Number(x) : x = 0) : x = 0);
        (typeof (y) === 'number') || ((typeof (y) === 'string') ? ((typeof (Number(y)) != NaN) ? y = Number(y) : y = 0) : y = 0);
        windowElement.positionX = x;
        windowElement.positionY = y;
        windowElement.style.setProperty('--posw', String(windowElement.positionX) + 'px');
        windowElement.style.setProperty('--posh', String(windowElement.positionY) + 'px');
    }
    windowElement.close = function () {
        windowClosebt.click();
    }
    windowElement.onresizing = undefined;
    windowElement.onmoved = undefined;
    windowElement.onresized = undefined;
    windowElement.body = windowContentBody;
    windowElement.onclosebtclick = undefined;
    windowElement.positionZ = system.window.all.length + 5;
    windowElement.setTitle = (text) => {
        windowTitle.innerText = text;
    }
    windowElement.focus = () => {
        document.activeElement.blur();
        windowPreFocus.focus();
    }
    windowElement.style.setProperty('--posz', windowElement.positionZ);
    var direction = '',
        moving = false,
        resizing = false,
        resizeX = 0,
        resizeY = 0,
        moveX = 0,
        moveY = 0;
    function move(e) {
        if (moving) {
            const dx = e.pageX - moveX;
            const dy = e.pageY - moveY;
            windowElement.style.setProperty('--posw', windowElement.positionX + dx + 'px');
            windowElement.style.setProperty('--posh', windowElement.positionY + dy + 'px');
            try { windowElement.onmoving() } catch (e) {};
        };
        if (!windowElement.contains(document.activeElement)) {
            document.activeElement.blur();
            windowPreFocus.focus();
        }
    }
    function resize(e) {
        if (resizing) {
            const dx = e.pageX - resizeX;
            const dy = e.pageY - resizeY;
            if (direction == 'bottom') {
                windowElement.style.setProperty('--posh', windowElement.positionY + Math.max((dy / 2), - (windowElement.sizeY / 2) + 20) + 'px');
                windowElement.style.setProperty('--sizeh', Math.max(windowElement.sizeY + dy, 40) + 'px');
            }
            else if (direction == 'left') {
                windowElement.style.setProperty('--posw', windowElement.positionX + Math.min((dx / 2), (windowElement.sizeX / 2) - 90) + 'px');
                windowElement.style.setProperty('--sizew', Math.max(windowElement.sizeX - dx, 180) + 'px');
            }
            else if (direction == 'right') {
                windowElement.style.setProperty('--posw', windowElement.positionX + Math.max((dx / 2), - (windowElement.sizeX / 2) + 90) + 'px');
                windowElement.style.setProperty('--sizew', Math.max(windowElement.sizeX + dx, 180) + 'px');
            }
            else if (direction == 'left-bottom') {
                windowElement.style.setProperty('--posh', windowElement.positionY + Math.max((dy / 2), - (windowElement.sizeY / 2) + 20) + 'px');
                windowElement.style.setProperty('--sizeh', Math.max(windowElement.sizeY + dy, 40) + 'px');
                windowElement.style.setProperty('--posw', windowElement.positionX + Math.min((dx / 2), (windowElement.sizeX / 2) - 90) + 'px');
                windowElement.style.setProperty('--sizew', Math.max(windowElement.sizeX - dx, 180) + 'px');
            }
            else if (direction == 'right-bottom') {
                windowElement.style.setProperty('--posh', windowElement.positionY + Math.max((dy / 2), - (windowElement.sizeY / 2) + 20) + 'px');
                windowElement.style.setProperty('--sizeh', Math.max(windowElement.sizeY + dy, 40) + 'px');
                windowElement.style.setProperty('--posw', windowElement.positionX + Math.max((dx / 2), - (windowElement.sizeX / 2) + 90) + 'px');
                windowElement.style.setProperty('--sizew', Math.max(windowElement.sizeX + dx, 180) + 'px');
            }
            try { windowElement.onresizing() } catch (e) {};
        };
        if (!windowElement.contains(document.activeElement)) {
            document.activeElement.blur();
            windowPreFocus.focus();
        }
    }
    function detectPosition(e) {
        if (canResize) {
            const w = windowElement.sizeX;
            const h = windowElement.sizeY;
            const wy = e.pageY - ((window.innerHeight / 2) + windowElement.positionY - (windowElement.sizeY / 2) - 4);
            const wx = e.pageX - ((window.innerWidth / 2) + windowElement.positionX - (windowElement.sizeX / 2) - 4);
            if (wy >= h - 6) {
                resizing = true;
                resizeY = e.pageY;
                if (wx <= 15) {
                    direction = 'left-bottom';
                    resizeX = e.pageX;
                    document.addEventListener('mousemove', resize);
                    document.addEventListener('touchmove', (e) => { resize(e.touches[0]) });
                }
                else if (wx >= w - 6) {
                    direction = 'right-bottom';
                    resizeX = e.pageX;
                    document.addEventListener('mousemove', resize);
                    document.addEventListener('touchmove', (e) => { resize(e.touches[0]) });
                }
                else if (wy >= h) {
                    direction = 'bottom';
                    document.addEventListener('keyup', () => {
                        setMR(e);
                    })
                    document.addEventListener('mousemove', resize);
                    document.addEventListener('touchmove', (e) => { resize(e.touches[0]) });
                }
            }
            else if (wx <= 7 && wy < h - 6) {
                resizing = true;
                resizeX = e.pageX;
                direction = 'left';
                document.addEventListener('mousemove', resize);
                document.addEventListener('touchmove', (e) => { resize(e.touches[0]) });
            }
            else if (wx >= w && wy < h - 6) {
                resizing = true;
                resizeX = e.pageX;
                direction = 'right';
                document.addEventListener('mousemove', resize);
                document.addEventListener('touchmove', (e) => { resize(e.touches[0]) });
            }
            else if (e.target === windowElement || e.target === windowTitle) {
                moving = true;
                moveX = e.pageX;
                moveY = e.pageY;
                document.addEventListener('mousemove', move);
                document.addEventListener('touchmove', (e) => { move(e.touches[0]) });
            }
        }
        else {
            if (e.target === windowElement || e.target === windowTitle) {
                moving = true;
                moveX = e.pageX;
                moveY = e.pageY;
                document.addEventListener('mousemove', move);
                document.addEventListener('touchmove', (e) => { move(e.touches[0]) });
            }
        }
        system.window.all.forEach(e => {
            if (e !== windowElement && e.positionZ >= windowElement.positionZ) {
                e.positionZ -= 1;
            }
            e.style.setProperty('--posz', e.positionZ);
        });
        windowElement.positionZ = system.window.all.length + 5;
        windowElement.style.setProperty('--posz', windowElement.positionZ);
    }
    function detectCursor(e) {
        if (canResize && !moving && !resizing) {
            const w = windowElement.sizeX;
            const h = windowElement.sizeY;
            const wy = e.pageY - ((window.innerHeight / 2) + windowElement.positionY - (windowElement.sizeY / 2) - 4);
            const wx = e.pageX - ((window.innerWidth / 2) + windowElement.positionX - (windowElement.sizeX / 2) - 4);
            if (wy >= h - 6) {
                if (wx <= 15) {
                    windowElement.body.style.pointerEvents = 'none';
                    windowElement.style.cursor = 'nesw-resize';
                }
                else if (wx >= w - 6) {
                    windowElement.body.style.pointerEvents = 'none';
                    windowElement.style.cursor = 'nwse-resize';
                }
                else if (wy >= h) {
                    windowElement.body.style.pointerEvents = 'none';
                    windowElement.style.cursor = 'ns-resize';
                }
            }
            else if (wx <= 7 && wy < h - 6) {
                windowElement.body.style.pointerEvents = 'none';
                windowElement.style.cursor = 'ew-resize';
            }
            else if (wx >= w && wy < h - 6) {
                windowElement.body.style.pointerEvents = 'none';
                windowElement.style.cursor = 'ew-resize';
            }
            else {
                windowElement.style.cursor = 'auto';
                windowElement.body.style.pointerEvents = 'auto';
            }
        }
    }
    function setMR(e) {
        if (moving) {
            windowElement.positionX -= moveX - e.pageX;
            windowElement.positionY -= moveY - e.pageY;
            document.activeElement.blur();
            windowPreFocus.focus();
            try { windowElement.onmoved() } catch (e) {};
        }
        if (resizing) {
            const dx = e.pageX - resizeX;
            const dy = e.pageY - resizeY;
            if (direction == 'bottom') {
                windowElement.positionY += Math.max((dy / 2), - (windowElement.sizeY / 2) + 20);
                windowElement.sizeY = Math.max(windowElement.sizeY + dy, 40);
            }
            else if (direction == 'left') {
                windowElement.positionX += Math.min((dx / 2), (windowElement.sizeX / 2) - 90);
                windowElement.sizeX = Math.max(windowElement.sizeX - dx, 180);
            }
            else if (direction == 'right') {
                windowElement.positionX += Math.max((dx / 2), - (windowElement.sizeX / 2) + 90);
                windowElement.sizeX = Math.max(windowElement.sizeX + dx, 180);
            }
            else if (direction == 'left-bottom') {
                windowElement.positionY += Math.max((dy / 2), - (windowElement.sizeY / 2) + 20);
                windowElement.sizeY = Math.max(windowElement.sizeY + dy, 40);
                windowElement.positionX += Math.min((dx / 2), (windowElement.sizeX / 2) - 90);
                windowElement.sizeX = Math.max(windowElement.sizeX - dx, 180);
            }
            else if (direction == 'right-bottom') {
                windowElement.positionY += Math.max((dy / 2), - (windowElement.sizeY / 2) + 20);
                windowElement.sizeY = Math.max(windowElement.sizeY + dy, 40);
                windowElement.positionX += Math.max((dx / 2), - (windowElement.sizeX / 2) + 90);
                windowElement.sizeX = Math.max(windowElement.sizeX + dx, 180);
            }
            document.activeElement.blur();
            windowPreFocus.focus();
            try { windowElement.onresized() } catch (e) {};
        }
        direction = '';
        moving = false;
        resizing = false;
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('touchmove', (e) => { move(e.touches[0]) });
        document.removeEventListener('touchmove', (e) => { resize(e.touches[0]) });
    }
    windowElement.addEventListener('mousedown', detectPosition)
    windowElement.addEventListener('mouseover', detectCursor)
    windowElement.addEventListener('mousemove', detectCursor)
    document.addEventListener('mouseup', setMR)
    windowElement.addEventListener('touchstart', (e) => { detectPosition(e.touches[0]) })
    document.addEventListener('touchend', (e) => { if (e.touches.length == 0) setMR(e.changedTouches[0]); })
    windowClosebt.onclick = () => {
        try { (windowElement.onclosebtclick != null) && (windowElement.onclosebtclick()) } catch (e) {};
        windowElement.remove();
    };
    windowElement.addEventListener('mouseup',
        function () {
            if (!windowElement.contains(document.activeElement)) {
                document.activeElement.blur();
                windowPreFocus.focus();
            }
        })
    windowElement.addEventListener('touchend',
        function () {
            if (!windowElement.contains(document.activeElement)) {
                document.activeElement.blur();
                windowPreFocus.focus();
            }
        })
    windowElement.addEventListener('touchstart',
        function () {
            if (!windowElement.contains(document.activeElement)) {
                document.activeElement.blur();
                windowPreFocus.focus();
            }
        })
    windowElement.addEventListener('click',
        function () {
            if (!windowElement.contains(document.activeElement)) {
                document.activeElement.blur();
                windowPreFocus.focus();
            }
        })
    windowElement.appendChild(windowContent);
    document.querySelector('main').appendChild(windowElement);
    document.activeElement.blur();
    windowPreFocus.focus();
    return windowElement;
}

system.bowser.alert = alert;
alert = system.small_alert;
system.bowser.confirm = confirm;
confirm = system.alert;
export {system, language};
//system.alert('⚠️ 需要重新整理', '您剛剛在設定中變更了一些設定，需要重新整理以啟用這些變更。<br>現在是否要重新整理?', '立即重新整理', () => {console.log('true');}, '稍後重新整理', () => {console.log('false');})