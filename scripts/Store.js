define(function() {
    "use strict";

    function Store(name, category_id) {
        if (!(this instanceof Store)) {
            throw new TypeError("Store constructor cannot be called as a function.");
        }
        this.name = name;
        this.category_id = category_id;
    }

    Store.prototype = {
        matchingStore : function(merchantsLike) {
            return this.name.toUpperCase().includes(merchantsLike.toUpperCase());
        }
    }

    return Store;
});
