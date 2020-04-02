define(function() {
    "use strict";

    function Render(selectorId) {
        if (!(this instanceof Render)) {
            throw new TypeError("Render constructor cannot be called as a function.");
        }
        this.selectorId = selectorId;
    }

    function clearTableRows(render) {
        var table_header = document.getElementById(render.selectorId).getElementsByTagName("thead")[0];
        document.getElementById(render.selectorId).innerHTML = "";
        document.getElementById(render.selectorId).appendChild(table_header);
    }

    function addTableRows(render, data1) {
        data1.forEach(data => {
            var tr = document.createElement('tr');
            var card_name = document.createElement('th');
            card_name.innerHTML = data['card_name'];
            tr.appendChild(card_name);
            var merchant_type = document.createElement('th');
            merchant_type.innerHTML = data['merchant_type'];
            tr.appendChild(merchant_type);
            var merchant_name = document.createElement('th');
            merchant_name.innerHTML = data['merchant_name'];
            tr.appendChild(merchant_name);
            var reward_type = document.createElement('th');
            reward_type.innerHTML = data['reward_type'];
            tr.appendChild(reward_type);
            var reward_value = document.createElement('th');
            reward_value.innerHTML = data['reward_value'];
            tr.appendChild(reward_value);
            var start_date = document.createElement('th');
            start_date.innerHTML = data['start_date'];
            tr.appendChild(start_date);
            var end_date = document.createElement('th');
            end_date.innerHTML = data['end_date'];
            tr.appendChild(end_date);
            var note = document.createElement('th');
            note.innerHTML = data['note'];
            tr.appendChild(note);

            document.getElementById(render.selectorId).appendChild(tr);
        });
    }

    Render.prototype = {
        addToHTML : function(data) {
            clearTableRows(this);
            addTableRows(this, data);
        }
    }

    return Render;
});
