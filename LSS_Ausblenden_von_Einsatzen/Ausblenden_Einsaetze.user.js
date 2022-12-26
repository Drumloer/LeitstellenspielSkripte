// ==UserScript==
// @name         Ausblenden von eigenen kompletten Einsätzen
// @version      1.0
// @description  Ausblenden von Einsätzen
// @author       FenodsLSS bearbietet durch Drumloer
// @match        https://www.leitstellenspiel.de/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leitstellenspiel.de
// @updateURL    https://github.com/Drumloer/LeitstellenspielSkripte/raw/main/LSS_Ausblenden_von_Einsatzen/Ausblenden_Einsaetze.user.js
// @downloadURL  https://github.com/Drumloer/LeitstellenspielSkripte/raw/main/LSS_Ausblenden_von_Einsatzen/Ausblenden_Einsaetze.user.js
// ==/UserScript==

(function() {
    'use strict';

    function hideComplete() {
        $('#btn-group-mission-select').prepend('<a href="#" class="btn btn-xs btn-success" id="hideShowComplete" title="Komplett bestückte eigene Einsätze ausblenden"><i class="glyphicon glyphicon-ok"></i></a>');

  function hideShowComplete() {
    var e = $(this);
    if (e.hasClass('btn-success')) {
      e.removeClass('btn-success').addClass('btn-danger');

      function hideShowLoopComplete() {
        if (e.hasClass('btn-danger')) {
          $('#mission_list > div').each(function() {
            var panel = $(this).find('div.panel-default');
            if (panel.hasClass('mission_panel_green')) {
                $(this).addClass('hide');
            } else {
              $(this).removeClass('hide');
            }
          });
          if (e.hasClass('btn-danger')) {
            setTimeout(hideShowLoopComplete, 1000);
          }
        } else {
          return false;
        }
      }
      hideShowLoopComplete();
    } else {
      e.removeClass('btn-danger').addClass('btn-success');
      $('#mission_list > div').each(function() {
        var panel = $(this).find('div.panel-default');
        if (panel.hasClass('mission_panel_green')) {
            $(this).removeClass('hide');
        }
      });
    }
    return false;
  }

  $(document).ready(function() {
    $("#hideShowComplete").click(hideShowComplete);
  });
}

hideComplete();

})();
