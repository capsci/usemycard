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
    getMerchants(merchantsLike) {
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
    }
    getRewards(merchantsLike) {
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
        this.addCategory('airTravel'         , 'Air Travel');
        this.addCategory('cab'               , 'Cabs & Taxis');
        this.addCategory('entertainment'     , 'Entertainment');
        this.addCategory('gasStation'        , 'Gas Stations');
        this.addCategory('grocery'           , 'Grocery Stores');
        this.addCategory('pharmacy'          , 'Pharmacy & Prespcriptions');
        this.addCategory('rentalCar'         , 'Rental Cars');
        this.addCategory('restaurant'        , 'Restaurant And Dining');
        this.addCategory('wholesale'         , 'Wholesale Clubs');
        this.addCategory('travel'            , 'Travel');
        this.addCategory('flightWithAirline' , 'Flights booked directly with airline');
        this.addCategory('streaming'         , 'Streaming Services');

        // Add all Stores
        this.addStore('aerie', 'Aerie');
        this.addStore('amazon', 'Amazon.com');
        this.addStore('amazonPrime', 'Amazon Prime', 'streaming');
        this.addStore('amc', 'AMC Theaters', 'entertainment');
        this.addStore('americanEagle', 'American Eagle');
        this.addStore('athleta', 'Athleta');
        this.addStore('autozone', 'AutoZone');
        this.addStore('bananaRepublic', 'Banana Republic');
        this.addStore('barnesNoble', 'Barnes & Noble');
        this.addStore('bathBodyWorks', 'Bath & Body Works');
        this.addStore('bedBathBeyond', 'Bed Bath & Beyond');
        this.addStore('chartHouse', 'Chart House Restaurants', 'restaurant');
        this.addStore('cheesecake', 'The Cheesecake Factory', 'restaurant');
        this.addStore('chipotle', 'Chipotle Mexican Grill', 'restaurant');
        this.addStore('containerStore', 'The Container Store');
        this.addStore('crateBarrel', 'Crate & Barrel');
        this.addStore('cvs', 'CVS', 'pharmacy');
        this.addStore('daveBusters', 'Dave and Busters');
        this.addStore('dominos', 'Dominos', 'restaurant');
        this.addStore('express', 'Express');
        this.addStore('fanatics', 'Fanatics');
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
        this.addStore('justice', 'Justice');
        this.addStore('kohls', "Kolh's");
        this.addStore('loews', "Loew's");
        this.addStore('lyft', 'Lyft', 'cab');
        this.addStore('marshalls', 'Marshalls');
        this.addStore('michales', 'Michaels');
        this.addStore('nike', 'Nike');
        this.addStore('nordstrom', 'Nordstrom');
        this.addStore('nordstromRack', 'Nordstrom Rack');
        this.addStore('oldnavy', 'Old Navy');
        this.addStore('olivegarden', 'Olive Garden', 'restaurant');
        this.addStore('onTheBorder', 'On The Border', 'restaurant');
        this.addStore('panerabread', 'Panera Bread', 'restaurant');
        this.addStore('paypal', 'Paypal');
        this.addStore('pfchang', "PF Chang's", 'restaurant');
        this.addStore('rainforestCafe', 'Rainforest Cafe', 'restaurant');
        this.addStore('rayban', 'RayBan');
        this.addStore('regal', 'Regal Cinemas', 'entertainment');
        this.addStore('reginaPizzeria', 'Regina Pizzeria', 'restaurant');
        this.addStore('rei', 'REI');
        this.addStore('rosaMexicano', 'Rosa Mexicano', 'restaurant');
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
        this.addStore('yardHouse', 'The Yard House', 'restaurant');

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
        this.addReward('5pc'  , 'Cashback', '5%', '', '', 'Check card website for dates');
        this.addReward('10pc' , 'Cashback', '10%', '', '', 'Check card website for dates');
        this.addReward('5cb'  , 'Cashback', '$5 back', '', '', 'Check card website for dates');

        // Add rewards to card
        this.addRewardToCard('amexGold', 'cheesecake', 'amexDiningCredit');
        this.addRewardToCard('amexGold', 'grubhub', 'amexDiningCredit');
        this.addRewardToCard('amexGold', 'shakeShack', 'amexDiningCredit');
        this.addRewardToCard('amexGold', 'restaurant', '4pts');
        this.addRewardToCard('amexGold', 'grocery', '4pts');
        this.addRewardToCard('amexGold', 'flightWithAirline', '3pts');

        this.addRewardToCard('discoverIt', 'gasStation', '2020_quater2');
        this.addRewardToCard('discoverIt', 'uber', '2020_quater2');
        this.addRewardToCard('discoverIt', 'lyft', '2020_quater2');
        this.addRewardToCard('discoverIt', 'wholesale', '2020_quater2');
        this.addRewardToCard('discoverIt', 'restaurant', '2020_quater3');
        this.addRewardToCard('discoverIt', 'paypal', '2020_quater3');
        this.addRewardToCard('discoverIt', 'amazon', '2020_quater4');
        this.addRewardToCard('discoverIt', 'walmart.com', '2020_quater4');
        this.addRewardToCard('discoverIt', 'target.com', '2020_quater4');
        this.addRewardToCard('discoverIt', 'amc', 'giftCard');
        this.addRewardToCard('discoverIt', 'aerie', 'giftCard');
        this.addRewardToCard('discoverIt', 'americanEagle', 'giftCard');
        this.addRewardToCard('discoverIt', 'athleta', 'giftCard');
        this.addRewardToCard('discoverIt', 'autozone', 'giftCard');
        this.addRewardToCard('discoverIt', 'bananaRepublic', 'giftCard');
        this.addRewardToCard('discoverIt', 'barnesNoble', 'giftCard');
        this.addRewardToCard('discoverIt', 'bathBodyWorks', 'giftCard');
        this.addRewardToCard('discoverIt', 'bedBathBeyond', 'giftCard');
        this.addRewardToCard('discoverIt', 'chartHouse', 'giftCard');
        this.addRewardToCard('discoverIt', 'chipotle', 'giftCard');
        this.addRewardToCard('discoverIt', 'crateBarrel', 'giftCard');
        this.addRewardToCard('discoverIt', 'daveBusters', 'giftCard');
        this.addRewardToCard('discoverIt', 'dominos', 'giftCard');
        this.addRewardToCard('discoverIt', 'express', 'giftCard');
        this.addRewardToCard('discoverIt', 'fandago', 'giftCard');
        this.addRewardToCard('discoverIt', 'footLocker', 'giftCard');
        this.addRewardToCard('discoverIt', 'gamestop', 'giftCard');
        this.addRewardToCard('discoverIt', 'gap', 'giftCard');
        this.addRewardToCard('discoverIt', 'groupon', 'giftCard');
        this.addRewardToCard('discoverIt', 'homegoods', 'giftCard');
        this.addRewardToCard('discoverIt', 'ihop', 'giftCard');
        this.addRewardToCard('discoverIt', 'jcpenny', 'giftCard');
        this.addRewardToCard('discoverIt', 'kohls', 'giftCard');
        this.addRewardToCard('discoverIt', 'loews', 'giftCard');
        this.addRewardToCard('discoverIt', 'marshalls', 'giftCard');
        this.addRewardToCard('discoverIt', 'michales', 'giftCard');
        this.addRewardToCard('discoverIt', 'nike', 'giftCard');
        this.addRewardToCard('discoverIt', 'nordstrom', 'giftCard');
        this.addRewardToCard('discoverIt', 'nordstromRack', 'giftCard');
        this.addRewardToCard('discoverIt', 'oldnavy', 'giftCard');
        this.addRewardToCard('discoverIt', 'olivegarden', 'giftCard');
        this.addRewardToCard('discoverIt', 'pfchang', 'giftCard');
        this.addRewardToCard('discoverIt', 'panerabread', 'giftCard');
        this.addRewardToCard('discoverIt', 'rainforestCafe', 'giftCard');
        this.addRewardToCard('discoverIt', 'rei', 'giftCard');
        this.addRewardToCard('discoverIt', 'regal', 'giftCard');
        this.addRewardToCard('discoverIt', 'saks', 'giftCard');
        this.addRewardToCard('discoverIt', 'sephora', 'giftCard');
        this.addRewardToCard('discoverIt', 'shutterfly', 'giftCard');
        this.addRewardToCard('discoverIt', 'spotify', 'giftCard');
        this.addRewardToCard('discoverIt', 'staples', 'giftCard');
        this.addRewardToCard('discoverIt', 'starbucks', 'giftCard');
        this.addRewardToCard('discoverIt', 'sunglassHut', 'giftCard');
        this.addRewardToCard('discoverIt', 'tjmaxx', 'giftCard');
        this.addRewardToCard('discoverIt', 'tgif', 'giftCard');
        this.addRewardToCard('discoverIt', 'cheesecake', 'giftCard');
        this.addRewardToCard('discoverIt', 'containerStore', 'giftCard');
        this.addRewardToCard('discoverIt', 'homedepot', 'giftCard');
        this.addRewardToCard('discoverIt', 'ulta', 'giftCard');
        this.addRewardToCard('discoverIt', 'underArmour', 'giftCard');
        this.addRewardToCard('discoverIt', 'yardHouse', 'giftCard');

        this.addRewardToCard('citiPremiere', 'gasStation', '3pts');
        this.addRewardToCard('citiPremiere', 'travel', '3pts');
        this.addRewardToCard('citiPremiere', 'gasStation', '3pts');
        this.addRewardToCard('citiPremiere', 'restaurant', '2pts');
        this.addRewardToCard('citiPremiere', 'entertainment', '2pts');

        this.addRewardToCard('chaseFreedom', 'grocery', '2020_quater2');
        this.addRewardToCard('chaseFreedom', 'shakeShack', '10pc');
        this.addRewardToCard('chaseFreedom', 'rayban', '10pc');
        this.addRewardToCard('chaseFreedom', 'starbucks', '5pc');
        this.addRewardToCard('chaseFreedom', 'rosaMexicano', '10pc');
        this.addRewardToCard('chaseFreedom', 'onTheBorder', '10pc');
        this.addRewardToCard('chaseFreedom', 'reginaPizzeria', '10pc');
        this.addRewardToCard('chaseFreedom', 'fanatics', '5pc');
        this.addRewardToCard('chaseFreedom', 'justice', '10pc');

        this.addRewardToCard('bofaDebit', 'amazonPrime', '5cb');

    }
}

class Category {
    constructor(name) {
        this.name = name;
    }
    matchingCategory(merchantsLike) {
        return this.name.toUpperCase().includes(merchantsLike.toUpperCase());
    }
}

class Store {
    constructor(name, category_id) {
        this.name = name;
        this.category_id = category_id;
    }
    matchingStore(merchantsLike) {
        return this.name.toUpperCase().includes(merchantsLike.toUpperCase());
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
    getRewards(merchants) {
        var rewards = {};
        merchants.forEach(merchant => {
            if (this.rewards[merchant]) rewards[merchant] = this.rewards[merchant];
        });
        return rewards;
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

class Render {
    constructor(selectorId) {
        this.selectorId = selectorId;
    }
    addToHTML(data) {
        this.clearTableRows();
        this.addTableRows(data);
    }
    clearTableRows() {
        var table_header = document.getElementById(this.selectorId).getElementsByTagName("thead")[0];
        document.getElementById(this.selectorId).innerHTML = "";
        document.getElementById(this.selectorId).appendChild(table_header);
    }
    addTableRows(data1) {
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

            document.getElementById(this.selectorId).appendChild(tr);
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    var wallet = new Wallet();
    var render = new Render("rewards-table");
    document.getElementById("searchBox").addEventListener("input", function() {
        render.addToHTML(wallet.getRewards(document.getElementById("searchBox").value));
    });

})