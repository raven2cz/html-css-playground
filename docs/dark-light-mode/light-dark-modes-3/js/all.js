function body_onload(userenabled, debugversion) {
    if (debugversion != 1 && (location.href.match('vysledek') || location.href.match('/speedtest') || location.href == 'https://rychlost.cz' ||
        location.href == 'https://rychlost.cz/'))
        window.setTimeout(function () { wbp_xstats() }, 600);
    try { ntmt_dal(); } catch (e) { }
}
function checkframe() {
    try {
        if (top.location != self.location && top.location.length > 0) {
            top.location = 'https://rychlost.cz/?res=11&url=' + top.location;
        }
    } catch (e) { }
} checkframe();
function windowOnLoad() {
    document.getElementById('respshowmenu').onclick = function () {
        ntmt_dom_showhide('d-topmenu', -1);
    }
}
window.addEventListener('load', function () { windowOnLoad(); });
var ntmtDomCache = new Array(); function ntmt_dom_empty(elId) {
    var el = document.getElementById(elId);
    if (el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }
}
var xBl = false;
function ntmt_dom_remove(elId) {
    var el = document.getElementById(elId);
    try {
        el.parentNode.removeChild(el);
    } catch (e) {

    }
}
function ntmt_dom_isvisible(elId) {
    var isVisible = false;
    try {
        if (document.getElementById(elId).style.display == 'block')
            isVisible = true;
    } catch (e) {
        isVisible = false;
    }
    return isVisible;
}
var xBlDone = false;
function ntmt_dom_ischecked(elId) {
    var isChecked = false;
    try {
        isChecked = document.getElementById(elId).checked;
    } catch (e) {
        isChecked = false;
    } return isChecked;
}
function ntmt_dom_showhide(elId, set) {
    if (set == -1) {
        set = true;
        if (ntmt_dom_isvisible(elId)) set = false;
    }
    try {
        document.getElementById(elId).style.display = ((set) ? ('block') : ('none'))
    } catch (e) {
        return false;
    }
    return true;
}
function ntmt_dom_select_count(elId) {
    return document.getElementById(elId).options.length;
}
function ntmt_dom_select_value(elId) {
    try {
        var el = document.getElementById(elId);
        if (el.nodeName.toLowerCase() === 'select') {
            return el.options[el.selectedIndex].value;
        } else {
            return el.value;
        }
    } catch (e) {

    }
    return 0;
}
function ntmt_dom_select_numcount(elId) {
    var tmpPocet = 0;
    var select = document.getElementById(elId);
    if (select.options.length > 0) {
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value > 0) {
                tmpPocet++;
            }
        }
    } return tmpPocet;
}
function ntmt_dom_select_value_set(elId, value) {
    try {
        document.getElementById(elId).value = value;
    } catch (e) {

    }
    return true;
}
function rtBal() {
    console.log('rt: ' + xBl + ' | ' + location.pathname);
    if (!xBl) { return; } if (xBlDone) return;
    xBlDone = true; var el = null;
    var el2 = null; var fWl = false; var tXt = ''; var tLnk = '/_pub/req/ex.php?t=pst';
    var tImg = '/_data/pst/b_969.png'; var tW = 969; tXt = '<a href="' +
        tLnk + '" rel="nofollow noopener"><img src="' + tImg + '" style="max-width:' + tW +
        'px;width:100%;height:auto;" /></a>'; var nEl2 = document.createElement('div');
    nEl2.innerHTML = tXt; if (location.pathname == '/') {
        nEl2.style = "padding:0 25px 10px 0;text-align:left;min-height:80px;";
        el2 = document.getElementsByClassName('testform-btn-over')[0];
        el2.parentNode.insertBefore(nEl2, el2);
    }
    else if (location.pathname == '/vysledek' || location.pathname == '/vysledek/') {
        if (!ntmtSiteVars['nolead']) {
            el2 = document.getElementsByClassName('d-overmain-content')[0];
            nEl2.style = "text-align:center;min-height:80px;"; el2.parentNode.insertBefore(nEl2, el2);
        }
        var nEl3 = document.createElement('div');
        nEl3.innerHTML = tXt;
        nEl3.style = "padding:10px 0;text-align:center;min-height:80px;";
        el2 = document.getElementById('mtrwebtester_progress_bar');
        el2.parentNode.insertBefore(nEl3, el2);
    }
}
function ntmt_dom_select_clear(elId) {
    var select = document.getElementById(elId);
    var i = 0; do {
        select.remove(0); i++; if (i > 500) break;
    }
    while (select.options.length > 0);
    return true;
}
function ntmt_dom_select_add(elId, value, text) {
    var select = document.getElementById(elId);
    var el = document.createElement("option");
    el.text = text; el.value = value; select.appendChild(el);
    return true;
} function ntmt_dom_select_add_class(elId, value, text, className) {
    var select = document.getElementById(elId); var el =
        document.createElement("option"); el.text = text; el.value = value;
    el.className = className; select.appendChild(el); return true;
}
var ntmtRetestTimer = null; var ntmtRetestValue = 0; var ntmtRetestBaseText = '';
function ntmt_retest_btn_countdown_finished() {
    var tmpEl = document.getElementById('retestbtn');
    tmpEl.disabled = false; tmpEl.value = ntmtRetestBaseText;
}
function ntmt_retest_btn_countdown_rewrite() {
    var tmpEl = document.getElementById('retestbtn');
    if (ntmtRetestValue > 0) {
        tmpEl.value = ntmtRetestBaseText + " (" + Math.ceil(ntmtRetestValue) + "s)";
    } else {
        tmpEl.value = ntmtRetestBaseText;
    }
}
function ntmt_retest_btn_countdown_do() { ntmtRetestValue--; if (ntmtRetestValue <= 0) { ntmtRetestValue = 0; ntmt_retest_btn_countdown_finished(); } else { ntmt_retest_btn_countdown_rewrite(); } } function ntmt_retest_btn_countdown(hodnota) { if (ntmtRetestValue == 0) { var tmpEl = document.getElementById('retestbtn'); if (tmpEl) { tmpEl.disabled = true; ntmtRetestValue = hodnota; ntmtRetestBaseText = tmpEl.value; ntmt_retest_btn_countdown_rewrite(); ntmtRetestTimer = window.setInterval(function () { ntmt_retest_btn_countdown_do(); }, 1000); } } } function ntmt_langsw() { ntmt_dom_showhide('top-langsw-items', -1) } function rtChangeHideEmpty() { var tmpToCheck = new Array('okres', 'obec', 'tarif'); var select = document.getElementById('st_idpripojeni'); if (select.options.length < 1) { ntmt_dom_select_clear('st_idpripojeni'); var el = document.createElement("option"); el.text = '- vyberte poskytovatele -'; el.value = 0; select.appendChild(el); } var ok = false; for (var i = 0; i < tmpToCheck.length; i++) { ok = false; if (ntmt_dom_select_count('st_id' + tmpToCheck[i]) > 1) { ok = true; } else if (ntmt_dom_select_count('st_id' + tmpToCheck[i]) == 1) { var el = document.createElement('st_id' + tmpToCheck[i]); if (el.options != null && el.options[0].value > 0) { ok = true; } } if (ok) { ntmt_dom_showhide('testupresnit-' + tmpToCheck[i], true); } else { ntmt_dom_showhide('testupresnit-' + tmpToCheck[i], false); } } } function rtChangeParse(typ, data) { switch (typ) { case "initform": tmp = document.getElementById('testform-zmenit'); tmp.innerHTML = ''; tmp1 = document.createElement('div'); tmp1.className = 'item'; tmp1.id = 'testupresnit-isp'; tmp2 = document.createElement('div'); tmp2.className = 'sl1'; tmp2.innerHTML = 'Poskytovatel:'; tmp1.appendChild(tmp2); tmp2 = document.createElement('div'); tmp2.className = 'sl2'; tmp3 = document.createElement('select'); tmp3.id = 'st_idisp'; tmp3.name = 'idisp'; tmp3.onchange = function () { rtChange('isp'); }; tmp2.appendChild(tmp3); tmp1.appendChild(tmp2); tmp.appendChild(tmp1); tmp1 = document.createElement('div'); tmp1.className = 'item'; tmp1.id = 'testupresnit-pripojeni'; tmp2 = document.createElement('div'); tmp2.className = 'sl1'; tmp2.innerHTML = 'ZpĹŻsob pĹ™ipojenĂ­:'; tmp1.appendChild(tmp2); tmp2 = document.createElement('div'); tmp2.className = 'sl2'; tmp3 = document.createElement('select'); tmp3.id = 'st_idpripojeni'; tmp3.name = 'idpripojeni'; tmp3.onchange = function () { rtChange('pripojeni'); }; tmp2.appendChild(tmp3); tmp1.appendChild(tmp2); tmp.appendChild(tmp1); tmp1 = document.createElement('div'); tmp1.className = 'item'; tmp1.id = 'testupresnit-okres'; tmp2 = document.createElement('div'); tmp2.className = 'sl1'; tmp2.innerHTML = 'Okres:'; tmp1.appendChild(tmp2); tmp2 = document.createElement('div'); tmp2.className = 'sl2'; tmp3 = document.createElement('select'); tmp3.id = 'st_idokres'; tmp3.name = 'idokres'; tmp3.onchange = function () { rtChange('okres'); }; tmp2.appendChild(tmp3); tmp1.appendChild(tmp2); tmp.appendChild(tmp1); tmp1 = document.createElement('div'); tmp1.className = 'item'; tmp1.id = 'testupresnit-obec'; tmp2 = document.createElement('div'); tmp2.className = 'sl1'; tmp2.innerHTML = 'Obec:'; tmp1.appendChild(tmp2); tmp2 = document.createElement('div'); tmp2.className = 'sl2'; tmp3 = document.createElement('select'); tmp3.id = 'st_idobec'; tmp3.name = 'idobec'; tmp3.onchange = function () { rtChange('obec'); }; tmp2.appendChild(tmp3); tmp1.appendChild(tmp2); tmp.appendChild(tmp1); tmp1 = document.createElement('div'); tmp1.className = 'item'; tmp1.id = 'testupresnit-tarif'; tmp2 = document.createElement('div'); tmp2.className = 'sl1'; tmp2.innerHTML = 'Tarif:'; tmp1.appendChild(tmp2); tmp2 = document.createElement('div'); tmp2.className = 'sl2'; tmp3 = document.createElement('select'); tmp3.id = 'st_idtarif'; tmp3.name = 'idtarif'; tmp3.onchange = function () { rtChange('tarif'); }; tmp2.appendChild(tmp3); tmp1.appendChild(tmp2); tmp.appendChild(tmp1); tmp1 = document.createElement('div'); tmp1.className = 'item'; tmp2 = document.createElement('p'); tmp2.className = 'pomozte'; tmp2.innerHTML = 'Pomozte upĹ™esnit testy uvedenĂ­m informacĂ­ o pĹ™ipojenĂ­.'; tmp1.appendChild(tmp2); tmp.appendChild(tmp1); ntmt_dom_select_clear('st_idisp'); ntmt_dom_select_clear('st_idpripojeni'); ntmt_dom_select_clear('st_idokres'); try { var numIspMatch = 0; var ispMatch = 0; data.isp.forEach(function (item, index) { if (item.m != 1) { ntmt_dom_select_add('st_idisp', item.i, item.d); } else { ntmt_dom_select_add_class('st_idisp', item.i, item.d, 'match'); if (item.i > 0) { numIspMatch++; ispMatch = item.i; } } }); if (ntmt_dom_select_value("initisp") > 0) { ntmt_dom_select_value_set('st_idisp', ntmt_dom_select_value('initisp')); } else if (numIspMatch == 1) { ntmt_dom_select_value_set('st_idisp', ispMatch); } data.pripojeni.forEach(function (item, index) { ntmt_dom_select_add_class('st_idpripojeni', item.i, item.d, 'match'); }); ntmt_dom_select_value_set('st_idpripojeni', ntmt_dom_select_value('initpripojeni')); data.okres.forEach(function (item, index) { if (item.m != 1) { ntmt_dom_select_add('st_idokres', item.i, item.d); } else { ntmt_dom_select_add_class('st_idokres', item.i, item.d, 'match'); } }); ntmt_dom_select_value_set('st_idokres', ntmt_dom_select_value('initokres')); data.obec.forEach(function (item, index) { if (item.m != 1) { ntmt_dom_select_add('st_idobec', item.i, item.d); } else { ntmt_dom_select_add_class('st_idobec', item.i, item.d, 'match'); } }); ntmt_dom_select_value_set('st_idobec', ntmt_dom_select_value('initobec')); data.tarif.forEach(function (item, index) { ntmt_dom_select_add_class('st_idtarif', item.i, item.d, 'match'); }); ntmt_dom_select_value_set('st_idtarif', ntmt_dom_select_value('inittarif')); } catch (e) { } try { document.getElementById('stloaded').value = 1; } catch (e) { } rtChangeHideEmpty(); break; case "doplnit": var tmpPocet = 0; try { ntmt_dom_select_clear('st_dopln_idisp'); data.isp.forEach(function (item, index) { ntmt_dom_select_add('st_dopln_idisp', item.Id, item.Description); if (item.Id > 0) tmpPocet++; }); } catch (e) { } ntmt_dom_select_clear('st_dopln_idokres'); try { data.okres.forEach(function (item, index) { ntmt_dom_select_add('st_dopln_idokres', item.Id, item.Description); }); } catch (e) { } rtChangeView(); break; case "dopln-okres": ntmt_dom_select_clear('st_dopln_idobec'); var tmpPocet = 0; try { data.obec.forEach(function (item, index) { ntmt_dom_select_add('st_dopln_idobec', item.Id, item.Description); if (item.Id > 0) tmpPocet++; }); } catch (e) { } rtChangeView(); break; case "isp": var tmpPocet = 0; try { ntmt_dom_select_clear('st_idpripojeni'); data.pripojeni.forEach(function (item, index) { if (item.m != 1) { ntmt_dom_select_add('st_idpripojeni', item.i, item.d); } else { ntmt_dom_select_add_class('st_idpripojeni', item.i, item.d, 'match'); } }); } catch (e) { } rtChangeView(); break; case "pripojeni": ntmt_dom_select_clear('st_idokres'); try { data.okres.forEach(function (item, index) { if (item.m != 1) { ntmt_dom_select_add('st_idokres', item.i, item.d); } else { ntmt_dom_select_add_class('st_idokres', item.i, item.d, 'match'); } }); } catch (e) { } ntmt_dom_select_clear('st_idtarif'); var tmpPocet = 0; try { data.tarif.forEach(function (item, index) { ntmt_dom_select_add_class('st_idtarif', item.i, item.d, 'match'); }); } catch (e) { } rtChangeView(); break; case "okres": ntmt_dom_select_clear('st_idobec'); try { data.obec.forEach(function (item, index) { if (item.m != 1) { ntmt_dom_select_add('st_idobec', item.i, item.d); } else { ntmt_dom_select_add_class('st_idobec', item.i, item.d, 'match'); } }); } catch (e) { } rtChangeView(); break; case "okresall": ntmt_dom_select_clear('st_idobec'); var tmpPocet = 0; try { data.obec.forEach(function (item, index) { ntmt_dom_select_add('st_idobec', item.Id, item.Description); if (item.Id > 0) tmpPocet++; }); } catch (e) { } if (tmpPocet == 0) { ntmt_dom_showhide('testupresnit-obec', false); } else { ntmt_dom_showhide('testupresnit-obec', true); } rtChangeView(); break; case "initall": ntmt_dom_select_clear('st_idobec'); try { data.obec.forEach(function (item, index) { ntmt_dom_select_add('st_idobec', item.Id, item.Description); }); } catch (e) { } if (data.selected.obec > 0) { ntmt_dom_select_value_set('st_idobec', data.selected.obec); } if (data.ispdopln.length > 0) { var tmpPocet = 0; try { ntmt_dom_select_clear('st_dopln_idisp'); data.ispdopln.forEach(function (item, index) { ntmt_dom_select_add('st_dopln_idisp', item.Id, item.Description); if (item.Id > 0) tmpPocet++; }); } catch (e) { } } rtChangeView(); break; } } var rtChangeInited = 0; function rtChange(typ) {
    if (typ == 'initform') { if (rtChangeInited == 1) { return false; } } rtChangeInited = 1; var tmp = ""; var tmpVal = 0; switch (typ) {
        case "initform": tmpVal = ntmt_dom_select_value('initisp'); if (tmpVal > 0) { tmp += '&isp=' + tmpVal; } tmpVal = ntmt_dom_select_value('initpripojeni'); if (tmpVal > 0) { tmp += '&pripojeni=' + tmpVal; } tmpVal = ntmt_dom_select_value('initokres'); if (tmpVal > 0) { tmp += '&okres=' + tmpVal; } tmpVal = ntmt_dom_select_value('initobec'); if (tmpVal > 0) { tmp += '&obec=' + tmpVal; } tmpVal = ntmt_dom_select_value('inittarif'); if (tmpVal > 0) { tmp += '&tarif=' + tmpVal; } var request = new XMLHttpRequest(); request.open('GET', "/_pub/req/stChange.php?typ=" + typ + tmp, true); request.onload = function () { if (request.status >= 200 && request.status < 400) { var data = JSON.parse(request.responseText); rtChangeParse('initform', data); } else { } }; request.onerror = function () { }; request.send(); break; case "doplnit": ntmt_dom_select_clear('st_dopln_idisp'); ntmt_dom_select_add('st_dopln_idisp', 0, '- vyberte poskytovatele -'); ntmt_dom_select_clear('st_idokres'); ntmt_dom_select_add('st_idokres', 0, '- vyberte poskytovatele -');
            var request = new XMLHttpRequest(); request.open('GET', "/_pub/req/stChange.php?typ=" + typ, true); request.onload = function () { if (request.status >= 200 && request.status < 400) { var data = JSON.parse(request.responseText); rtChangeParse('doplnit', data); } else { } }; request.onerror = function () { }; request.send(); break; case "dopln-okres": ntmt_dom_select_clear('st_dopln_idobec'); ntmt_dom_select_add('st_dopln_idobec', 0, '- vyberte okres -'); var request = new XMLHttpRequest(); request.open('GET', "/_pub/req/stChange.php?typ=" + typ + "&okres=" + ntmt_dom_select_value('st_dopln_idokres'), true); request.onload = function () { if (request.status >= 200 && request.status < 400) { var data = JSON.parse(request.responseText); rtChangeParse('dopln-okres', data); } else { } }; request.onerror = function () { }; request.send(); break; case "isp": ntmt_dom_select_clear('st_idpripojeni'); ntmt_dom_select_add('st_idpripojeni', 0, '- vyberte poskytovatele -'); ntmt_dom_select_clear('st_idtarif'); ntmt_dom_select_add('st_idtarif', 0, '- vyberte poskytovatele -'); ntmt_dom_showhide('testupresnit-tarif', false); ntmt_dom_select_clear('st_idokres'); ntmt_dom_select_add('st_idokres', 0, '- vyberte poskytovatele -'); ntmt_dom_showhide('testupresnit-okres', false); ntmt_dom_select_clear('st_idobec'); ntmt_dom_select_add('st_idobec', 0, '- vyberte okres -'); ntmt_dom_showhide('testupresnit-obec', false); var request = new XMLHttpRequest(); request.open('GET', "/_pub/req/stChange.php?typ=" + typ + "&isp=" + ntmt_dom_select_value('st_idisp'), true); request.onload = function () { if (request.status >= 200 && request.status < 400) { var data = JSON.parse(request.responseText); rtChangeParse('isp', data); } else { } }; request.onerror = function () { }; request.send(); break; case "pripojeni": ntmt_dom_select_clear('st_idtarif'); ntmt_dom_select_add('st_idtarif', 0, '- vyberte poskytovatele -'); ntmt_dom_select_clear('st_idokres'); ntmt_dom_select_add('st_idokres', 0, '- vyberte poskytovatele -'); ntmt_dom_showhide('testupresnit-okres', true); ntmt_dom_select_clear('st_idobec'); ntmt_dom_select_add('st_idobec', 0, '- vyberte okres -'); ntmt_dom_showhide('testupresnit-obec', false); var request = new XMLHttpRequest(); request.open('GET', "/_pub/req/stChange.php?typ=" + typ + "&isp=" + ntmt_dom_select_value('st_idisp') + "&pripojeni=" + ntmt_dom_select_value('st_idpripojeni'), true); request.onload = function () { if (request.status >= 200 && request.status < 400) { var data = JSON.parse(request.responseText); rtChangeParse('pripojeni', data); } else { } }; request.onerror = function () { }; request.send(); break; case "okres": var request = new XMLHttpRequest(); request.open('GET', "/_pub/req/stChange.php?typ=" + typ + "&isp=" + ntmt_dom_select_value('st_idisp') + "&pripojeni=" + ntmt_dom_select_value('st_idpripojeni') + "&okres=" + ntmt_dom_select_value('st_idokres'), true); request.onload = function () { if (request.status >= 200 && request.status < 400) { var data = JSON.parse(request.responseText); rtChangeParse('okres', data); } else { } }; request.onerror = function () { }; request.send(); break; case "okresall": var request = new XMLHttpRequest(); request.open('GET', "/_pub/req/stChange.php?typ=" + typ + "&okres=" + ntmt_dom_select_value('st_idokres'), true); request.onload = function () { if (request.status >= 200 && request.status < 400) { var data = JSON.parse(request.responseText); rtChangeParse('okresall', data); } else { } }; request.onerror = function () { }; request.send(); break; case "initall": tmp = ""; tmpVal = ntmt_dom_select_value('initisp'); if (tmpVal > 0) { tmp += '&isp=' + tmpVal; } tmpVal = ntmt_dom_select_value('initpripojeni'); if (tmpVal > 0) { tmp += '&pripojeni=' + tmpVal; } tmpVal = ntmt_dom_select_value('initokres'); if (tmpVal > 0) { tmp += '&okres=' + tmpVal; } tmpVal = ntmt_dom_select_value('initobec'); if (tmpVal > 0) { tmp += '&obec=' + tmpVal; } tmpVal = ntmt_dom_select_value('inittarif'); if (tmpVal > 0) { tmp += '&tarif=' + tmpVal; } var tmpPocet = 0; tmpPocet = ntmt_dom_select_numcount('testupresnit-obec'); if (tmpPocet == 0) { ntmt_dom_showhide('testupresnit-obec', false); } else { ntmt_dom_showhide('testupresnit-obec', true); } tmpPocet = ntmt_dom_select_numcount('testupresnit-tarif'); if (tmpPocet == 0) { ntmt_dom_showhide('testupresnit-tarif', false); } else { ntmt_dom_showhide('testupresnit-tarif', true); } var request = new XMLHttpRequest(); request.open('GET', "/_pub/req/stChange.php?typ=" + typ + tmp, true); request.onload = function () { if (request.status >= 200 && request.status < 400) { var data = JSON.parse(request.responseText); rtChangeParse('initall', data); } else { } }; request.onerror = function () { }; request.send(); break;
    }
} 
function ntmt_dal() { 
    var str = "ift"; xBl = false; 
    var elExists = false; var he1 = 0; 
    var he2 = 0; var tAnd = 'and'; 
    var suffIx = ''; 
    for (var i = 0; i <= 1; i++) { 
        elExists = false; suffIx = ''; 
        try { 
            he1 = document.getElementById('asw' + str + '_' + i).offsetHeight; 
        } catch (e) { 
            he1 = -1; } 
            try { 
                he2 = document.getElementById('asw' + str + '_' + i + '_exp' + tAnd).offsetHeight; 
            } catch (e) { 
                he2 = -1; } 
                if (he1 == -1 && he2 == -1) { 
                    if (i == 0) { xBl = true; } 
                } else { 
                    elExists = true; if (he1 + he2 > 10) { xBl = false; 
                    } else { if (i == 0) { xBl = true; } 
                } 
                if (he2 > 10) { suffIx = '_exp' + tAnd; } 
            } if (elExists) { 
                try { 
                    document.getElementById('asw' + str + '_' + i + suffIx).parentNode.parentNode.style.minHeight = '0px'; 
                    document.getElementById('asw' + str + '_' + i + suffIx).parentNode.parentNode.parentNode.style.minHeight = '0px'; 
                } catch (e) { } 
            } 
        } rtBal(); 
    } 
    function rtChangeView() { rtChangeHideEmpty(); } function rtShowForm() { window.setTimeout(function () { rtShowFormDo() }, 150); } function rtShowFormDo() { rtChange('initform'); ntmt_dom_showhide('testform-zmenit-blk', false); ntmt_dom_showhide('testform-zmenit', true); }

var ntmtSiteVars = new Array(); 
ntmtSiteVars['darkmode_enabled'] = false; 
ntmtSiteVars['theme_active'] = 'light'; 
function load_script(url) { 
    var head = document.getElementsByTagName('head').item(0); 
    var old = document.getElementById('last_id'); 
    if (old) head.removeChild(old); 
    script = document.createElement('script'); 
    script.src = url; 
    script.type = 'text/javascript'; 
    script.defer = true; 
    script.id = 'last_id'; 
    void (head.appendChild(script)); 
} 
function preklapvyvoj(idprovider, idpripojeni, idtarif, idserver, typ, velikost) { document.getElementById('grvyvoj').src = '/_pub/scripts/gr-vyvoj.php?&idserver=' + idserver + '&idprovider=' + idprovider + '&idpripojeni=' + idpripojeni + '&idtarif=' + idtarif + '&typ=' + typ + '&v=' + velikost; document.getElementById('grvyvoj-d').className = ''; document.getElementById('grvyvoj-u').className = ''; document.getElementById('grvyvoj-p').className = ''; document.getElementById('grvyvoj-c').className = ''; document.getElementById('grvyvoj-' + typ).className = 'sel'; } var rchlDm = ''; var rchlDmTyp = ''; function rchlSetDm(set, typ) { rchlDm = set; rchlDmTyp = typ; } function vlozxtop() { document.write('<im' + 'g src="//to' + 'plist.cz/count.asp?id=153529" alt="" width="1" height="1" style="border:none" />'); } function wbp_xstats() { tmp2 = -1; tmp3 = -1; tmpx1 = -1; tmpx2 = -1; tmpo1 = -1; tmpo2 = -1; tmpo3 = -1; tmpo4 = -1; try { tmpo1 = document.getElementById('aswift_0').offsetHeight; } catch (e) { } try { tmpo2 = document.getElementById('aswift_1').offsetHeight; } catch (e) { } try { tmpo3 = document.getElementById('aswift_2').offsetHeight; } catch (e) { } try { tmpo4 = document.getElementById('aswift_3').offsetHeight; } catch (e) { } if (tmpo1 == 0) { tmpo1 = tmpo2; tmpo2 = tmpo3; tmpo3 = tmpo4; tmpo4 = 0; } try { tmp2 = document.getElementById('rcteststart').offsetHeight; } catch (e) { } try { tmp3 = document.getElementById('rcteststart2').offsetHeight; } catch (e) { } try { tmpx1 = document.getElementById('rcteststartx1').offsetHeight; } catch (e) { } try { tmpx2 = document.getElementById('rcteststartx2').offsetHeight; } catch (e) { } tmpx3 = -1; try { if (rchlAdsNotBlock) tmpx3 = 1; } catch (e) { } tmpx4 = 1; try { if (typeof (window.google_jobrunner) === "undefined") { tmpx4 = -1; } } catch (e) { } tmpx5 = 1; try { var xd = document.querySelector("ins.adsbygoogle"); if (xd && xd.innerHTML.replace(/\s/g, "").length == 0) { tmpx5 = -1; } } catch (e) { } if (tmpo1 > 10) { try { document.getElementById('rct' + 'es' + 'tsta' + 'rt' + 'x' + '1').style.display = 'none'; } catch (e) { } } else { try { document.getElementById('c' + 'pc' + 'bs' + 'd9' + 'z' + '1').style.display = 'block'; } catch (e) { } } load_script('/_pub/req/statIP.php?a=' + tmp2 + '&b=' + tmp3 + '&a2=' + tmpx1 + '&b2=' + tmpx2 + '&o1=' + tmpo1 + '&o2=' + tmpo2 + '&o2=' + tmpo3 + '&o3=' + tmpo4 + '&c1=' + tmpx3 + '&c2=' + tmpx4 + '&c3=' + tmpx5 + '&kl=' + Math.floor((Math.random() * 1000000) + 1)); if (rchlDm != '') { var tmpDm = 0; try { tmpDm = document.getElementById(rchlDm).offsetHeight; } catch (e) { } if (tmpDm < 5) { } } } function wbp_statclanek(id) { load_script('/_pub/req/statClanek.php?id=' + id); } ntmt_login_inputs_0 = 0; ntmt_login_inputs_1 = 0; var pgz_tu_menu = ''; function tu_popupmenu(blok) { if (blok == pgz_tu_menu) return true; if (pgz_tu_menu != '') { if (ntmt_login_inputs_0 == 1 || ntmt_login_inputs_1 == 1) { } else { document.getElementById('tu-' + pgz_tu_menu).style.visibility = 'hidden'; document.getElementById('tu-h' + pgz_tu_menu).className = 'menu-item'; pgz_tu_menu = ''; } } if (blok != '') { try { document.getElementById('tu-' + pgz_tu_menu).style.visibility = 'hidden'; document.getElementById('tu-h' + pgz_tu_menu).className = 'menu-item'; pgz_tu_menu = ''; } catch (e) { } pgz_tu_menu = blok; document.getElementById('tu-' + pgz_tu_menu).style.visibility = 'visible'; document.getElementById('tu-h' + pgz_tu_menu).className = 'menu-item menu-item-hover'; try { document.getElementById('input-login').blur(); document.getElementById('input-password').blur(); } catch (e) { } } } function rchl_b(a, b, c, d, e, f) { load_script('/_pub/req/bp.php?a=' + a + '&b=' + b + '&c=' + c + '&d=' + d + '&e=' + e + '&f=' + f); } function ntmt_login_form_inputs(inputId, set) { if (inputId == 0) { ntmt_login_inputs_0 = set; } else if (inputId == 1) { ntmt_login_inputs_1 = set; } } function eu_cookies_btn() { var date = new Date(); date.setFullYear(date.getFullYear() + 2); document.cookie = 'eu-cookies=1; path=/; expires=' + date.toGMTString(); document.getElementById('eu-cookies').style.display = 'none'; } function eu_cookies_btn_cancel() { var date = new Date(); date.setDate(date.getDate() + 1); document.cookie = 'eu-cookies=0; path=/; expires=' + date.toGMTString(); location.reload(); } function eu_cookies2_btn() { setValue = 'set'; setValue += (document.getElementById('eucookie_v2').checked) ? (1) : (0); setValue += ''; setValue += (document.getElementById('eucookie_v3').checked) ? (1) : (0); var date = new Date(); var dayCount = document.getElementById('eucookie_v3').checked ? 730 : 7; date.setDate(date.getDate() + dayCount); document.cookie = 'eu-cookies=' + setValue + '; path=/; expires=' + date.toUTCString() + ';'; document.getElementById('eu-cookies2').style.display = 'none'; document.getElementById('document').style.borderBottom = 'none'; } function eu_cookies2_btn_moreopt() { document.getElementById('eu-cookies2-btn-moreopt').style.display = 'none'; document.getElementById('eu-cookies2-moreopt').style.display = 'block'; } function eu_cookies2_btn_cancel() { var date = new Date(); date.setDate(date.getDate() + 1); document.cookie = 'eu-cookies=0; path=/; expires=' + date.toUTCString(); location.reload(); } function eu_cookies2_blk_show() { var tmp = ''; tmp = '<div id="eu-cookies2">'; tmp += '<div class="header">Tento web pouĹľĂ­vĂˇ cookies</div>'; tmp += '<p>k poskytovĂˇnĂ­ sluĹľeb, analĂ˝ze nĂˇvĹˇtÄ›vnosti a personalizaci reklam. Informace <a href="/informace/cookies/" rel="nofollow">o cookies</a>.</p>'; tmp += '<div class="moreopt" id="eu-cookies2-moreopt">'; tmp += '<div class="sitem" title="NezbytnÄ› nutnĂ© cookies VĂˇm umoĹľnĂ­ pohyb po webovĂ© strĂˇnce a vyuĹľitĂ­ jejĂ­ch zĂˇkladnĂ­ch funkcĂ­. Obvykle jsou nastaveny pouze v reakci na VaĹˇi ÄŤinnost, kterĂˇ je ĹľĂˇdostĂ­ o sluĹľby, jako je napĹ™Ă­klad pĹ™ihlĂˇĹˇenĂ­ se do zabezpeÄŤenĂ© ÄŤĂˇsti naĹˇĂ­ webovĂ© strĂˇnky. Tyto cookies jsou nezbytnĂ© pro pouĹľitĂ­ tĂ©to webovĂ© strĂˇnky."><input type="checkbox" name="eucookie_v1" id="eucookie_v1" value="1" disabled="disabled" checked="checked" /><label for="eucookie_v1"><span></span>NutnĂ©</label></div>'; tmp += '<div class="sitem" title="StatistickĂ© cookies nĂˇm umoĹľĹujĂ­ rozpoznat a spoÄŤĂ­tat poÄŤet nĂˇvĹˇtÄ›vnĂ­kĹŻ a zĂ­skat informace o tom, jak je webovĂˇ strĂˇnka pouĹľĂ­vĂˇna (napĹ™. jakĂ© strĂˇnky uĹľivatel otevĂ­rĂˇ nejÄŤastÄ›ji a jestli uĹľivatel dostĂˇvĂˇ z nÄ›kterĂ˝ch strĂˇnek hlĂˇĹˇenĂ­ o chybÄ›). To nĂˇm pomĂˇhĂˇ vylepĹˇit fungovĂˇnĂ­ webovĂ© strĂˇnky, napĹ™Ă­klad tak, Ĺľe zajiĹˇĹĄujeme, aby uĹľivatelĂ© snadno naĹˇli to, co hledajĂ­."><input type="checkbox" name="eucookie_v2" id="eucookie_v2" value="1" checked="checked" /><label for="eucookie_v2"><span></span>StatistickĂ©</label></div>'; tmp += '<div class="sitem" title="MarketingovĂ© cookies zaznamenĂˇvajĂ­ VaĹˇe nĂˇvĹˇtÄ›vy na webovĂ˝ch strĂˇnkĂˇch a na zĂˇkladÄ› VaĹˇi aktivity zobrazujĂ­ relevantnĂ­ reklamu."><input type="checkbox" name="eucookie_v3" id="eucookie_v3" value="1" checked="checked" /><label for="eucookie_v3"><span></span>MarketingovĂ©</label></div>'; tmp += '</div>'; tmp += '<div class="sokbtn">'; tmp += '<input type="button" value="V poĹ™Ăˇdku" onclick="eu_cookies2_btn()" class="eucookie-btn" />'; tmp += '<input type="button" value="VĂ­ce informacĂ­" onclick="eu_cookies2_btn_moreopt()" id="eu-cookies2-btn-moreopt" class="eucookie-btn-moreopt" />'; tmp += '</div>'; tmp += '</div>'; document.getElementById('document').insertAdjacentHTML("beforeend", tmp); var tmpHeight = document.getElementById('eu-cookies2').offsetHeight; document.getElementById('document').style.borderBottom = tmpHeight + 'px solid #3a3a3a'; } function showservers() { try { document.getElementById('oservers').style.display = 'block'; } catch (e) { } try { document.getElementById('xservers').style.display = 'none'; } catch (e) { } }
