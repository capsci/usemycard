define(function(require) {
    "use strict";

    var Render = require('Render');
    var Wallet = require('Wallet');

    var wallet = new Wallet();
    var render = new Render("rewards-table");
    document.getElementById("searchBox").addEventListener("input", function() {
        render.addToHTML(wallet.getRewards(document.getElementById("searchBox").value));
    });
});
