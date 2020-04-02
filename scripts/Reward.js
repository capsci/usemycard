define(function() {
    "use strict";

    function Reward(type, returnValue, startDate, endDate, note) {
        if (!(this instanceof Reward)) {
            throw new TypeError("Reward constructor cannot be called as a function.");
        }
        if((startDate) && isNaN(Date.parse(startDate)))
            throw `Start Date '${start_date}' is not a valid date`;
        if((endDate) && isNaN(Date.parse(endDate)))
            throw `End Date '${end_date}' is not a valid date`;
        this.type = type;
        this.returnValue = returnValue;
        this.startDate = (startDate) ? new Date(startDate) : "";
        this.endDate = (endDate) ? new Date(endDate) : "";
        this.note = note;
    }

    Reward.prototype = {

    };

    return Reward;
});
