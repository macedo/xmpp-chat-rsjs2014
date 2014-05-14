"use strict";

require(
  [
    "backbone",
    "views/rsjs_web_chat"
  ],

  function (Backbone, RSJSWebChat) {
    var chat = new RSJSWebChat({el: "#chat-app" });
    chat.init();
   // var Chat = {
   //   connection: null,
   //   room: null,
   //   nickname: null,
   //   NS_MUC: "http://jabber.org/protocol/muc",
   //   joined: null,
   //   participants: null,

   //  // onPresence: function(presence) {
   //  //   var from = $(presence).attr("from")
   //  //     , room = Strophe.getBareJidFromJid(from);

   //  //   if (room === Chat.room) {
   //  //     var nick = Strophe.getResourceFromJid(from);
   //  //   }

   //  //   if ($(presence).attr("type") === "error" && !Chat.joined) {
   //  //     Chat.connection.disconnect();
   //  //   } else if (!Chat.participants[nick] && $(presence).attr("type") !== "unavailable") {
   //  //     Chat.participants[nick] = true;
   //  //     $(".contact-list").append("<li>" + nick + "</li>");
   //  //   }

   //  //   if ($(presence).attr("type") !== "error" && !Chat.joined) {
   //  //     if($(presence).find("status[code='110']").length > 0) {
   //  //       if($(presence).find("status[code='210']").length >0 ) {
   //  //         Chat.nickname = Strophe.getResourceFromJid(from);
   //  //       }
   //  //     $(document).trigger("room:joined");
   //  //     }
   //  //   }
   //  //   return true;
   //  // }
   // };

   // $(document).bind("connect", function(e, data) {
   //   Chat.connection = new Strophe.Connection("http://taskie.org:5280/xmpp-httpbind");

   //   Chat.connection.connect(data.jid, data.passwd, function(status) {
   //     if (status === Strophe.Status.CONNECTED) {
   //       console.log("Connected");
   //     } else {
   //       if (status === Strophe.Status.DISCONNECTED) {
   //         console.log("Disconnected");
   //       }
   //     }
   //   });
   // });

   // $(document).bind("connected", function() {
   //   Chat.joined = false;
   //   Chat.participants = {};
   //   //Chat.connection.send($pres().c("priority").t("-1"));
   //   Chat.connection.addHandler(Chat.onPresence, null, "presence");
   //   //Chat.connection.send(
   //   //  $pres({ to: Chat.room + "/" + Chat.nickname })
   //   //    .c("x", { xmlns: Chat.NS_MUC });
   //   //);
   // });

   // $("#join").on("click", function(e) {
   //   e.preventDefault();

   //   Chat.room     = $("#room").val();
   //   Chat.nickname = $("#nickname").val();

   //   $(document).trigger("connect", {
   //     jid:    $("#jid").val(),
   //     passwd: $("#passwd").val()
   //   });
   // });
  }//
);
