// ==UserScript==
// @name         Zeige RTH Wahrscheinlichkeit
// @version      1.0
// @description  Zeigt neben der Anzahl verletzter Personen in der Einsatzmaske die Wahrscheinlichkeit für einen Rettungshubschrauber.
// @author       Drumloer, auf Basis von "Zeige NA Wahrscheinlichkeit" von Tuteplays
// @match        https://www.leitstellenspiel.de/missions/*
// ==/UserScript==

(function() {
    'use strict';
    const missionID = $("#mission_help").attr('href').split("/").pop().replace(/\?.*/, '');
    let mission_specs_cache = {};

    async function output()
    {
        let RTH_Wahrscheinlichkeit = mission_specs_cache.filter(e => e.id == missionID)[0].chances.helicopter;
        RTH_Wahrscheinlichkeit && $('.mission_header_info .col-md-6:first-of-type>small').append(` | ${RTH_Wahrscheinlichkeit}% RTH (${Math.ceil(RTH_Wahrscheinlichkeit * $('.mission_patient').length / 100)})`);
    }

    async function init()
    {
        if(!sessionStorage.getItem("mission_specs_cache")){
            await $.getJSON(`https://www.leitstellenspiel.de/einsaetze.json`, data => {
                mission_specs_cache = data;
                sessionStorage.setItem("mission_specs_cache", JSON.stringify(data));
            });
        }else{
            mission_specs_cache = JSON.parse(sessionStorage.getItem("mission_specs_cache"));
        }
        output();
    }
    init();
})();
