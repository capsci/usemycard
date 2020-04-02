define(function() {

    function Card(provider, product, type) {
        if (!(this instanceof Card)) {
            throw new TypeError("Card constructor cannot be called as a function.");
        }
        this.provider = provider;
        this.product = product;
        this.type = type;
        this.rewards = {};
    }

    Card.prototype = {
        // TODO : Check if reward added twice
        addReward : function(merchant_id, reward_id) {
            (merchant_id in this.rewards)
                ? this.rewards[merchant_id].push(reward_id)
                : this.rewards[merchant_id] = [reward_id];
        },
        getRewards : function(merchants) {
            var rewards = {};
            merchants.forEach(merchant => {
                if (this.rewards[merchant]) rewards[merchant] = this.rewards[merchant];
            });
            return rewards;
        },
        // TODO: Getter method for prototype
        name : function() {
            return this.provider + " " + this.product;
        },
    };

    return Card;
});
