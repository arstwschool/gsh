(_=>{var q = {};(localStorage?.scrollber != undefined) && (typeof JSON.parse(localStorage.scrollber) != 'number') && (q = JSON.parse(localStorage.scrollber));
document.querySelector('main').style.pointerEvent = 'none';
onload = function () { (q[location.pathname.replaceAll('/gsh2024/en', '').replaceAll('/gsh2024/zh_TW', '')] != undefined)&&(document.querySelector('main').scrollTop = q[location.pathname.replaceAll('/gsh2024/en', '').replaceAll('/gsh2024/zh_TW', '')]);
}

document.querySelector('main').onscroll = function () {
    q[location.pathname.replaceAll('/gsh2024/en', '').replaceAll('/gsh2024/zh_TW', '')] = document.querySelector('main').scrollTop;
    localStorage.setItem('scrollber', JSON.stringify(q));
    if (document.querySelector('main').scrollTop + document.querySelector('main').clientHeight + (window.innerHeight * .05) > document.querySelector('main').scrollHeight) {
        document.getElementById('gsh2024Block')?.classList.add('hide');
    }
    else {
        document.getElementById('gsh2024Block')?.classList.remove('hide');
    }
}})()