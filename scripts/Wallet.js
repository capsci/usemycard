define(['Store', 'Category', 'Card', 'Reward', 'Entries'],
    function(Store, Category, Card, Reward, Entries) {
    "use strict";

    function Wallet() {
        if (!(this instanceof Wallet)) {
            throw new TypeError("Wallet constructor cannot be called as a function.");
        }
        this.cards = {};
        this.categories = {};
        this.stores = {};
        this.rewards = {};
        Entries.init(this);
    }

    Wallet.prototype  = {

        addCard : function(card_id, provider, product, card_type) {
            if(card_id in this.cards)
                throw `Card with id '${card_id}' already present`;
            if(['Credit', 'Debit'].indexOf(card_type) == -1)
                throw `Invalid card type '${card_type}'`;
            var card = new Card(provider, product, card_type)
            this.cards[card_id] = card;
        },

        addCategory : function (category_id, category_name) {
            if(category_id in this.categories)
                throw `Category with id ${category_id} already present`;
            if(category_id in this.stores)
                throw `Category with id ${category_id} already present as Store`;
            var category = new Category(category_name);
            this.categories[category_id] = category;
        },

        addStore : function(store_id, store_name, category_id) {
            if(store_id in this.stores)
                throw `Store with id ${store_id} already present`;
            if(store_id in this.categories)
                throw `Store with id ${store_id} already present as Category`;
            if ((category_id) && !(category_id in this.categories))
                throw `Category with id ${store_id} does not exist`;
            var store = new Store(store_name, category_id);
            this.stores[store_id] = store;
        },

        addReward : function(reward_id, reward_type, returnValue, startDate, endDate, note) {
            if(reward_id in this.rewards)
                throw `Reward with id ${reward_id} already present`;
            if(['Cashback', 'Coupon', 'Points'].indexOf(reward_type) == -1)
                throw `Invalid reward type '${reward_type}'`;
            var reward = new Reward(reward_type, returnValue, startDate, endDate, note);
            this.rewards[reward_id] = reward;
        },

        addRewardToCard : function(card_id, merchant_id, reward_id) {
            if (!(card_id in this.cards))
                throw `Card with id ${card_id} does not exist`;
            if (!(merchant_id in this.stores) && !(merchant_id in this.categories))
                throw `Merchant with id ${merchant_id} does not exist`;
            if (!(reward_id in this.rewards))
                throw `Reward with id ${reward_id} does not exist`;
            this.cards[card_id].addReward(merchant_id, reward_id);
        },

        getMerchants : function(merchantsLike) {
            var merchants = new Set();
            for(var store_id in this.stores) {
                if(this.stores[store_id].matchingStore(merchantsLike)) {
                    merchants.add(store_id);
                    if(this.stores[store_id].category_id) merchants.add(this.stores[store_id].category_id);
                }
            }
            for(var category_id in this.categories) {
                if(this.categories[category_id].matchingCategory(merchantsLike)) {
                    merchants.add(category_id);
                }
            }
            return [...merchants];
        },

        getRewards : function(merchantsLike) {
            var selected = [];
            var merchant_ids = this.getMerchants(merchantsLike);
            for(var card_id in this.cards) {
                var card = this.cards[card_id];
                var rewards = card.getRewards(merchant_ids);
                for(var merchant_id in rewards) {
                    var reward_ids = rewards[merchant_id];
                    reward_ids.forEach((reward_id) => {
                        var reward = this.rewards[reward_id];
                        var selected_reward = {};

                        selected_reward['card_id'] = card_id;
                        selected_reward['card_name'] = card.name();
                        selected_reward['reward_type'] = card.type;
                        if(merchant_id in this.stores) {
                            selected_reward['merchant_type'] = 'Store';
                            selected_reward['merchant_name'] = this.stores[merchant_id].name;
                        }
                        else if(merchant_id in this.categories) {
                            selected_reward['merchant_type'] = 'Category';
                            selected_reward['merchant_name'] = this.categories[merchant_id].name;
                        }
                        else {
                            throw `Cannot find merchant with id ${merchant_id}`;
                        }
                        selected_reward['reward_value'] = reward.returnValue;
                        selected_reward['reward_type'] = reward.type;
                        selected_reward['start_date'] = reward.startDate;
                        selected_reward['end_date'] = reward.endDate;
                        selected_reward['note'] = reward.note;

                        selected.push(selected_reward);
                    });
                }
            }
            return selected;
        },
    }

    return Wallet;
});
