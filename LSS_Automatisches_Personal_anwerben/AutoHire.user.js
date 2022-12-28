// ==UserScript==
// @name         Automatisches Anwerben von Personal
// @version      1.0
// @description  Automatisches Anwerben von Personal
// @author       Drumloer
// @match        https://www.leitstellenspiel.de/
// @match        https://www.leitstellenspiel.de/buildings/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leitstellenspiel.de
// @updateURL    https://github.com/Drumloer/LeitstellenspielSkripte/raw/main/LSS_Automatisches_Personal_anwerben/AutoHire.user.js
// @downloadURL  https://github.com/Drumloer/LeitstellenspielSkripte/raw/main/LSS_Automatisches_Personal_anwerben/AutoHire.user.js
// ==/UserScript==

(function() {
    'use strict';
    // Feuerwehrschule, THW-schule,
    var notAllowedBuildingTypeIds = [1, 3, 4, 7, 8, 10, 14];

    $('#navbar_profile_link').after('<a href="#" id="hirePersonal" title="Automatisches Anwerben von Personal"><img class="icon icons8-Contacts" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADtElEQVRoQ+2ZgVEUQRBF/49AiECNQIlAiECJQI1AjECIQIxAiECIQI1AiECIQI2grYczVXN7u7e7MwuUVUzVVS11N7P9p7t/d3+s/3z5P7dfDwC6HoyIl5Kep89W+v63pG+STm3zvNhazAMR8UHSG0lPNliH8e9tnyyFoBlARHDLX9ONY9e5pDNJV5LybfMbwL1OhuONE9unrUCWAPAjGX8paXdTiEQEIA4lPc5AbO+1gGgCEBEHkj5KurRN3E9aEbEr6VjSM0lHtgFVtVoB/Ewxv2P7Yo4FEUGusJ8we1qb3NUAIoIbJ3xm3X4JMiJIZvJi3zZ5M3u1AHgl6YukT7YJpdmrCMHqMGoBQNxCndUvT7kAg323TV7MXg8AGj0ArX5uOaPFA7gc97fkQHMYtgDILFQdvxEB89A77dmmOs9e1QB4U0QEPG57e/ab/+3/JWnLdrUd1RsTgJZClmn4wvZOzQWwpxpA6mtIwNEeqM+4VAgJIfqi2ZU8n9kCoDkBIyKfcS+VOFMgQwrPs9e9JnGnGTu2fTQHQRqA8MAfGsI7b+ZSEud2mj+3pxpRNILse9syoVXnQL7tmo6yIIDqIticxAWATIfntnkeXRFBBaeSVxewxQCkUGL+hQ5HDSo60GvbmwSA0YtoqgPl6UVfDxA4vVc6SQIAQxCGN8X+oh7oeAHj8cTKiJkSl8JHD7XI7S/mgQSAZuxF4RnGxaz/UCfKWtGcvLfhgQwAXYgOs7vge37Dd9VTXPfQZhot2CgDQOchF2CkPCbeCFkpfGCgyYw1lsmLAEjxjWEocEgkAFhbRQHrzZMxY/u+bwYQEe+S2obxo31R0f8A4qBVXqwCkOgQPYdWouTyOTSaL5Q9qHRVyvUsAKmBQ0ohvrN0zjxAUwYYWAj6pD1eCaO0Fx0JGiXRyQn2IS+y8AjzAQw1WeWbBCDFLhpoqd1gBF3ozSybvMJzNghjsiEYnduMlQEoVWbAl8zFOcjwo0BGARRtL3ZChbgbaXwtURMIjOHzqJN0eS+g1yp18hC1otx7ONambwQQEVTOXIDo93tfPsA4eCvnx9VU1aG4BEKVdWZ7f4ihBgFEBDcNw1zj/inurKHBoT2dmXmwcvcCKDpGzq8euFsBdQaf3k53CECWvRfrWWrBFJHQW2OGANwITvd5+0WLkhXAXgFtDUAxrHNGldxXe9sb9mX6Xpu7+wBk0fYW7Gg+ci0P+gAQOpP/Ydds0rwDkCFXashoIZt3/t3/+gHA3d/56hv/AupftUBIKYE8AAAAAElFTkSuQmCC" width="24" height="24" alt="Personal Bild"> Personal anwerben</a>');

    $(document).ready(function() {
        $("#hirePersonal").click(hire);
    });

    close();

    async function hire() {
        var buildings = [];
        var buildingIds = [];

        if (!sessionStorage.getItem("lss_missionList")) {
            await $.getJSON(`https://www.leitstellenspiel.de/api/buildings`, data => {
                buildings = data;
                sessionStorage.setItem("lss_missionList", JSON.stringify(data));
            });
        } else {
            buildings = JSON.parse(sessionStorage.getItem("lss_missionList"));
        }

        for (let i = 0; i < buildings.length; i++) {
            if (!notAllowedBuildingTypeIds.includes(buildings.at(i).building_type)) {
                buildingIds[i] = buildings.at(i).id;
            }
        }

        for (let x in buildingIds) {
            setTimeout(
                function nothing() {
                    window.open('https://www.leitstellenspiel.de/buildings/' + buildingIds.at(x) +'/hire_do/3');
                    }, 250);
        }
    }

    function close() {
        console.log(window.location.href);
        if (window.location.href.startsWith('https://www.leitstellenspiel.de/buildings/') && window.location.href.endsWith('/hire')) {
            setTimeout(
                function nothing() {
                window.close();
                }, 250);

        }
    }

})();