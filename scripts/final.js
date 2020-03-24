"use strict;"

class Wallet {
    constructor() {
        this.cards = {};
        this.categories = {};
        this.stores = {};
        this.rewards = {};
        this.init();
    }
    addCard(card_id, provider, product, card_type) {
        if(card_id in this.cards)
            throw `Card with id '${card_id}' already present`;
        if(['Credit', 'Debit'].indexOf(card_type) == -1)
            throw `Invalid card type '${card_type}'`;
        var card = new Card(provider, product, card_type)
        this.cards[card_id] = card;
    }
    addCategory(category_id, category_name) {
        if(category_id in this.categories)
            throw `Category with id ${category_id} already present`;
        if(category_id in this.stores)
            throw `Category with id ${category_id} already present as Store`;
        var category = new Category(category_name);
        this.categories[category_id] = category;
    }
    addStore(store_id, store_name, category_id) {
        if(store_id in this.stores)
            throw `Store with id ${store_id} already present`;
        if(store_id in this.categories)
            throw `Store with id ${store_id} already present as Category`;
        if ((category_id) && !(category_id in this.categories))
            throw `Category with id ${store_id} does not exist`;
        var store = new Store(store_name, category_id);
        this.stores[store_id] = store;
    }
    addReward(reward_id, reward_type, returnValue, startDate, endDate, note) {
        if(reward_id in this.rewards)
            throw `Reward with id ${reward_id} already present`;
        if(['Cashback', 'Coupon', 'Points'].indexOf(reward_type) == -1)
            throw `Invalid reward type '${reward_type}'`;
        var reward = new Reward(reward_type, returnValue, startDate, endDate, note);
        this.rewards[reward_id] = reward;
    }
    addRewardToCard(card_id, merchant_id, reward_id) {
        if (!(card_id in this.cards))
            throw `Card with id ${card_id} does not exist`;
        if (!(merchant_id in this.stores) && !(merchant_id in this.categories))
            throw `Merchant with id ${merchant_id} does not exist`;
        if (!(reward_id in this.rewards))
            throw `Reward with id ${reward_id} does not exist`;
        this.cards[card_id].addReward(merchant_id, reward_id);
    }
    getRewards(merchantsLike) {

        var selected = [];

        for(var card_id in this.cards) {
            var card = this.cards[card_id];
            var rewards = card.getRewards(merchantsLike);
            for(var merchant_id in rewards) {
                var reward_ids = rewards[merchant_id];
                reward_ids.forEach((reward_id) => {
                    var reward = this.rewards[reward_id];
                    var selected_reward = {};

                    selected_reward['card_id'] = card_id;
                    selected_reward['card_name'] = card.name;
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
    }
    init() {
        // Add all Cards
        this.addCard('amexGold'    , 'American Express', 'Gold'      , 'Credit');
        this.addCard('citiPremiere', 'Citi'            , 'Premiere'  , 'Credit');
        this.addCard('discoverIt'  , 'Discover'        , 'It'        , 'Credit');
        this.addCard('chaseFreedom', 'Chase'           , 'Freedom'   , 'Credit');
        this.addCard('bofaDebit'   , 'Bank of America' , 'Debit Card', 'Debit');

        // Add all Categories
        this.addCategory('airTravel'    , 'Air Travel');
        this.addCategory('cab'          , 'Cabs & Taxis');
        this.addCategory('entertainment', 'Entertainment');
        this.addCategory('gasStation'   , 'Gas Stations');
        this.addCategory('grocery'      , 'Grocery Stores');
        this.addCategory('pharmacy'     , 'Pharmacy & Prespcriptions');
        this.addCategory('rentalCar'    , 'Rental Cars');
        this.addCategory('restaurant'   , 'Restaurant And Dining');
        this.addCategory('wholesale'    , 'Wholesale Clubs');

        // Add all Stores
        this.addStore('aerie', 'Aerie');
        this.addStore('amazon', 'Amazon.com');
        this.addStore('amc', 'AMC Theaters', 'entertainment');
        this.addStore('athleta', 'Athleta');
        this.addStore('bananaRepublic', 'Banana Republic');
        this.addStore('barnesNoble', 'Barnes & Noble');
        this.addStore('bathBodyWorks', 'Bath & Body Works');
        this.addStore('bedBathBeyond', 'Bed Bath & Beyond');
        this.addStore('chartHouse', 'Chart House Restaurants', 'restaurant');
        this.addStore('cheesecake', 'The Cheesecake Factory', 'restaurant');
        this.addStore('chipotle', 'Chipotle Mexican Grill', 'restaurant');
        this.addStore('crateBarrel', 'Crate & Barrel');
        this.addStore('cvs', 'CVS', 'pharmacy');
        this.addStore('daveBusters', 'Dave and Busters');
        this.addStore('dominos', 'Dominos', 'restaurant');
        this.addStore('express', 'Express');
        this.addStore('fandago', 'Fandago', 'entertainment');
        this.addStore('footLocker', 'Foot Locker');
        this.addStore('gamestop', 'GameStop');
        this.addStore('gap', 'Gap');
        this.addStore('groupon', 'Groupon');
        this.addStore('grubhub', 'Grubhub');
        this.addStore('homedepot', 'Home Depot');
        this.addStore('homegoods', 'Home Goods');
        this.addStore('ihop', 'IHOP', 'restaurant');
        this.addStore('itunes', 'iTunes');
        this.addStore('jcpenny', 'JcPenny');
        this.addStore('loews', "Loew's");
        this.addStore('lyft', 'Lyft', 'cab');
        this.addStore('marshalls', 'Marshalls');
        this.addStore('michales', 'Michaels');
        this.addStore('nike', 'Nike');
        this.addStore('nordstrom', 'Nordstrom');
        this.addStore('nordstromRack', 'Nordstrom Rack');
        this.addStore('oldnavy', 'Old Navy');
        this.addStore('olivegarden', 'Olive Garden', 'restaurant');
        this.addStore('panerabread', 'Panera Bread', 'restaurant');
        this.addStore('paypal', 'Paypal');
        this.addStore('pfchang', "PF Chang's", 'restaurant');
        this.addStore('regal', 'Regal Cinemas', 'entertainment');
        this.addStore('rei', 'REI');
        this.addStore('saks', 'Saks Fift Avenue');
        this.addStore('sephora', 'Sephora');
        this.addStore('shakeShack', 'ShakeShack', 'restaurant');
        this.addStore('shutterfly', 'Shutterfly');
        this.addStore('spotify', 'Spotify');
        this.addStore('staples', 'Staples');
        this.addStore('starbucks', 'Starbucks', 'restaurant');
        this.addStore('sunglassHut', 'Sunglass Hut');
        this.addStore('target', 'Target');
        this.addStore('target.com', 'Target.com');
        this.addStore('tgif', 'TGI Fridays', 'restaurant');
        this.addStore('tjmaxx', 'TJ Maxx');
        this.addStore('uber', 'Uber', 'cab');
        this.addStore('ulta', 'Ulta Beauty');
        this.addStore('underArmour', 'Under Armour');
        this.addStore('walgreens', 'Walgreens', 'pharmacy');
        this.addStore('walmart', 'Walmart');
        this.addStore('walmart.com', 'Walmart.com');
        this.addStore('yarHouse', 'The Yard House', 'restaurant');

        // Add all Rewards
        this.addReward('2020_quater1', 'Cashback', '5%', '01-01-2020', '03-31-2020', 'Reward valid from Jan 1st 2020 - March 31st 2020');
        this.addReward('2020_quater2', 'Cashback', '5%', '04-01-2020', '06-30-2020', 'Reward valid from Jan 1st 2020 - March 31st 2020');
        this.addReward('2020_quater3', 'Cashback', '5%', '07-01-2020', '09-30-2020', 'Reward valid from Jan 1st 2020 - March 31st 2020');
        this.addReward('2020_quater4', 'Cashback', '5%', '10-01-2020', '12-31-2020', 'Reward valid from Jan 1st 2020 - March 31st 2020');
        this.addReward('amexDiningCredit', 'Coupon', '$10 off per month', '', '', 'Amex Dining Credit valid at The Cheesecake Factory/Grubhub/Shakeshack');
        this.addReward('giftCard', 'Coupon', 'various values', '', '', 'Check card website for amounts');
        this.addReward('4pts' , 'Points', '4pts/$', '', '', 'Earn 4 points for every dollar spent');
        this.addReward('3pts' , 'Points', '3pts/$', '', '', 'Earn 3 points for every dollar spent');
        this.addReward('2pts' , 'Points', '2pts/$', '', '', 'Earn 2 points for every dollar spent');

        // Add rewards to card
        this.addRewardToCard('amexGold', 'cheesecake', 'amexDiningCredit');
        this.addRewardToCard('amexGold', 'restaurant', '4pts');
    }
}

class Category {
    constructor(name) {
        this.name = name;
    }
}

class Store {
    constructor(name, category_id) {
        this.name = name;
        this.category_id = category_id;
    }
}

class Card {
    constructor(provider, product, type) {
        this.provider = provider;
        this.product = product;
        this.type = type;
        this.rewards = {};
    }
    // TODO : Check if reward added twice
    addReward(merchant_id, reward_id) {
        (merchant_id in this.rewards)
            ? this.rewards[merchant_id].push(reward_id)
            : this.rewards[merchant_id] = [reward_id];
    }
    getRewards(merchantsLike) {
        var merchants = Util.matchingElements(merchantsLike, Object.keys(this.rewards));
        return Util.values(merchants, this.rewards);
    }
    get name() {
        return this.provider + " " + this.product;
    }
}

class Reward {
    constructor(type, returnValue, startDate, endDate, note) {
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
}

class Util {
    static matchingElements(key, list) {
        return list.filter(element => element.includes(key));
    }
    static values(keys, dictionary) {
        var selected = {};
        for(var key in dictionary) {
            if (key in dictionary)
                selected[key] = dictionary[key];
        }
        return selected;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    var wallet = new Wallet();
    console.log(wallet.getRewards('chee'));
})