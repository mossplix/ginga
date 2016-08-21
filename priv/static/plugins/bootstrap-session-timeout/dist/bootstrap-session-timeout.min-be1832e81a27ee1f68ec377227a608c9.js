"use strict";!function(a){jQuery.sessionTimeout=function(b){function c(){i||(a.ajax({type:"POST",url:h.keepAliveUrl,data:h.ajaxData}),i=!0,setTimeout(function(){i=!1},h.keepAliveInterval))}function d(){clearTimeout(f),h.keepAlive&&c(),f=setTimeout(function(){"function"!=typeof h.onWarn?a("#sessionTimeout-dialog").modal("show"):h.onWarn("warn"),e()},h.warnAfter)}function e(){clearTimeout(f),f=setTimeout(function(){"function"!=typeof h.onRedir?(e("start"),window.location=h.redirUrl):h.onRedir()},h.redirAfter-h.warnAfter)}var f,g={message:"Your session is about to expire.",keepAliveUrl:"/keep-alive",ajaxData:"",redirUrl:"/timed-out",logoutUrl:"/log-out",warnAfter:9e5,redirAfter:12e5,keepAliveInterval:5e3,keepAlive:!0,ignoreUserActivity:!1,onWarn:!1,onRedir:!1},h=g;if(b&&(h=a.extend(g,b)),h.warnAfter>=h.redirAfter)return("undefined"!=typeof console||"undefined"!=typeof console.error)&&console.error('Bootstrap-session-timeout plugin is miss-configured. Option "redirAfter" must be equal or greater than "warnAfter".'),!1;"function"!=typeof h.onWarn&&(a("body").append('<div class="modal fade" id="sessionTimeout-dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Your Session is About to Expire!</h4></div><div class="modal-body">'+h.message+'</div><div class="modal-footer"><button id="sessionTimeout-dialog-logout" type="button" class="btn btn-default">Logout</button><button id="sessionTimeout-dialog-keepalive" type="button" class="btn btn-primary" data-dismiss="modal">Stay Connected</button></div></div></div></div>'),a("#sessionTimeout-dialog-logout").on("click",function(){window.location=h.logoutUrl}),a("#sessionTimeout-dialog").on("hide.bs.modal",function(){d()})),h.ignoreUserActivity||a(document).on("keyup mouseup mousemove touchend touchmove",function(){d()});var i=!1;d()}}(jQuery);