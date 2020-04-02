define(function() {
    "use strict";

    function Category(name) {
        if (!(this instanceof Category)) {
            throw new TypeError("Category constructor cannot be called as a function.");
        }
        this.name = name;
    }

    Category.prototype = {
        matchingCategory : function (merchantsLike) {
            return this.name.toUpperCase().includes(merchantsLike.toUpperCase());
        }
    }

    return Category;

});
