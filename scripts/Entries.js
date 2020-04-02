define(function() {
    function Entries() {}

    // Static method
    Entries.init = function(wallet) {
        // Add all Cards
        wallet.addCard('amexGold'    , 'American Express', 'Gold'      , 'Credit');
        wallet.addCard('citiPremiere', 'Citi'            , 'Premiere'  , 'Credit');
        wallet.addCard('discoverIt'  , 'Discover'        , 'It'        , 'Credit');
        wallet.addCard('chaseFreedom', 'Chase'           , 'Freedom'   , 'Credit');
        wallet.addCard('bofaDebit'   , 'Bank of America' , 'Debit Card', 'Debit');

        // Add all Categories
        wallet.addCategory('airTravel'         , 'Air Travel');
        wallet.addCategory('cab'               , 'Cabs & Taxis');
        wallet.addCategory('entertainment'     , 'Entertainment');
        wallet.addCategory('gasStation'        , 'Gas Stations');
        wallet.addCategory('grocery'           , 'Grocery Stores');
        wallet.addCategory('pharmacy'          , 'Pharmacy & Prespcriptions');
        wallet.addCategory('rentalCar'         , 'Rental Cars');
        wallet.addCategory('restaurant'        , 'Restaurant And Dining');
        wallet.addCategory('wholesale'         , 'Wholesale Clubs');
        wallet.addCategory('travel'            , 'Travel');
        wallet.addCategory('flightWithAirline' , 'Flights booked directly with airline');
        wallet.addCategory('streaming'         , 'Streaming Services');

        // Add all Stores
        wallet.addStore('aerie', 'Aerie');
        wallet.addStore('amazon', 'Amazon.com');
        wallet.addStore('amazonPrime', 'Amazon Prime', 'streaming');
        wallet.addStore('amc', 'AMC Theaters', 'entertainment');
        wallet.addStore('americanEagle', 'American Eagle');
        wallet.addStore('athleta', 'Athleta');
        wallet.addStore('autozone', 'AutoZone');
        wallet.addStore('bananaRepublic', 'Banana Republic');
        wallet.addStore('barnesNoble', 'Barnes & Noble');
        wallet.addStore('bathBodyWorks', 'Bath & Body Works');
        wallet.addStore('bedBathBeyond', 'Bed Bath & Beyond');
        wallet.addStore('chartHouse', 'Chart House Restaurants', 'restaurant');
        wallet.addStore('cheesecake', 'The Cheesecake Factory', 'restaurant');
        wallet.addStore('chipotle', 'Chipotle Mexican Grill', 'restaurant');
        wallet.addStore('containerStore', 'The Container Store');
        wallet.addStore('crateBarrel', 'Crate & Barrel');
        wallet.addStore('cvs', 'CVS', 'pharmacy');
        wallet.addStore('daveBusters', 'Dave and Busters');
        wallet.addStore('dominos', 'Dominos', 'restaurant');
        wallet.addStore('express', 'Express');
        wallet.addStore('fanatics', 'Fanatics');
        wallet.addStore('fandago', 'Fandago', 'entertainment');
        wallet.addStore('footLocker', 'Foot Locker');
        wallet.addStore('gamestop', 'GameStop');
        wallet.addStore('gap', 'Gap');
        wallet.addStore('groupon', 'Groupon');
        wallet.addStore('grubhub', 'Grubhub');
        wallet.addStore('homedepot', 'Home Depot');
        wallet.addStore('homegoods', 'Home Goods');
        wallet.addStore('ihop', 'IHOP', 'restaurant');
        wallet.addStore('itunes', 'iTunes');
        wallet.addStore('jcpenny', 'JcPenny');
        wallet.addStore('justice', 'Justice');
        wallet.addStore('kohls', "Kolh's");
        wallet.addStore('loews', "Loew's");
        wallet.addStore('lyft', 'Lyft', 'cab');
        wallet.addStore('marshalls', 'Marshalls');
        wallet.addStore('michales', 'Michaels');
        wallet.addStore('nike', 'Nike');
        wallet.addStore('nordstrom', 'Nordstrom');
        wallet.addStore('nordstromRack', 'Nordstrom Rack');
        wallet.addStore('oldnavy', 'Old Navy');
        wallet.addStore('olivegarden', 'Olive Garden', 'restaurant');
        wallet.addStore('onTheBorder', 'On The Border', 'restaurant');
        wallet.addStore('panerabread', 'Panera Bread', 'restaurant');
        wallet.addStore('paypal', 'Paypal');
        wallet.addStore('pfchang', "PF Chang's", 'restaurant');
        wallet.addStore('rainforestCafe', 'Rainforest Cafe', 'restaurant');
        wallet.addStore('rayban', 'RayBan');
        wallet.addStore('regal', 'Regal Cinemas', 'entertainment');
        wallet.addStore('reginaPizzeria', 'Regina Pizzeria', 'restaurant');
        wallet.addStore('rei', 'REI');
        wallet.addStore('rosaMexicano', 'Rosa Mexicano', 'restaurant');
        wallet.addStore('saks', 'Saks Fift Avenue');
        wallet.addStore('sephora', 'Sephora');
        wallet.addStore('shakeShack', 'ShakeShack', 'restaurant');
        wallet.addStore('shutterfly', 'Shutterfly');
        wallet.addStore('spotify', 'Spotify');
        wallet.addStore('staples', 'Staples');
        wallet.addStore('starbucks', 'Starbucks', 'restaurant');
        wallet.addStore('sunglassHut', 'Sunglass Hut');
        wallet.addStore('target', 'Target');
        wallet.addStore('target.com', 'Target.com');
        wallet.addStore('tgif', 'TGI Fridays', 'restaurant');
        wallet.addStore('tjmaxx', 'TJ Maxx');
        wallet.addStore('uber', 'Uber', 'cab');
        wallet.addStore('ulta', 'Ulta Beauty');
        wallet.addStore('underArmour', 'Under Armour');
        wallet.addStore('walgreens', 'Walgreens', 'pharmacy');
        wallet.addStore('walmart', 'Walmart');
        wallet.addStore('walmart.com', 'Walmart.com');
        wallet.addStore('yardHouse', 'The Yard House', 'restaurant');

        // Add all Rewards
        wallet.addReward('2020_quater1', 'Cashback', '5%', '01-01-2020', '03-31-2020', 'Reward valid from Jan 1st 2020 - March 31st 2020');
        wallet.addReward('2020_quater2', 'Cashback', '5%', '04-01-2020', '06-30-2020', 'Reward valid from Jan 1st 2020 - March 31st 2020');
        wallet.addReward('2020_quater3', 'Cashback', '5%', '07-01-2020', '09-30-2020', 'Reward valid from Jan 1st 2020 - March 31st 2020');
        wallet.addReward('2020_quater4', 'Cashback', '5%', '10-01-2020', '12-31-2020', 'Reward valid from Jan 1st 2020 - March 31st 2020');
        wallet.addReward('amexDiningCredit', 'Coupon', '$10 off per month', '', '', 'Amex Dining Credit valid at The Cheesecake Factory/Grubhub/Shakeshack');
        wallet.addReward('giftCard', 'Coupon', 'various values', '', '', 'Check card website for amounts');
        wallet.addReward('4pts' , 'Points', '4pts/$', '', '', 'Earn 4 points for every dollar spent');
        wallet.addReward('3pts' , 'Points', '3pts/$', '', '', 'Earn 3 points for every dollar spent');
        wallet.addReward('2pts' , 'Points', '2pts/$', '', '', 'Earn 2 points for every dollar spent');
        wallet.addReward('5pc'  , 'Cashback', '5%', '', '', 'Check card website for dates');
        wallet.addReward('10pc' , 'Cashback', '10%', '', '', 'Check card website for dates');
        wallet.addReward('5cb'  , 'Cashback', '$5 back', '', '', 'Check card website for dates');

        // Add rewards to card
        wallet.addRewardToCard('amexGold', 'cheesecake', 'amexDiningCredit');
        wallet.addRewardToCard('amexGold', 'grubhub', 'amexDiningCredit');
        wallet.addRewardToCard('amexGold', 'shakeShack', 'amexDiningCredit');
        wallet.addRewardToCard('amexGold', 'restaurant', '4pts');
        wallet.addRewardToCard('amexGold', 'grocery', '4pts');
        wallet.addRewardToCard('amexGold', 'flightWithAirline', '3pts');

        wallet.addRewardToCard('discoverIt', 'gasStation', '2020_quater2');
        wallet.addRewardToCard('discoverIt', 'uber', '2020_quater2');
        wallet.addRewardToCard('discoverIt', 'lyft', '2020_quater2');
        wallet.addRewardToCard('discoverIt', 'wholesale', '2020_quater2');
        wallet.addRewardToCard('discoverIt', 'restaurant', '2020_quater3');
        wallet.addRewardToCard('discoverIt', 'paypal', '2020_quater3');
        wallet.addRewardToCard('discoverIt', 'amazon', '2020_quater4');
        wallet.addRewardToCard('discoverIt', 'walmart.com', '2020_quater4');
        wallet.addRewardToCard('discoverIt', 'target.com', '2020_quater4');
        wallet.addRewardToCard('discoverIt', 'amc', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'aerie', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'americanEagle', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'athleta', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'autozone', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'bananaRepublic', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'barnesNoble', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'bathBodyWorks', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'bedBathBeyond', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'chartHouse', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'chipotle', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'crateBarrel', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'daveBusters', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'dominos', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'express', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'fandago', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'footLocker', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'gamestop', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'gap', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'groupon', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'homegoods', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'ihop', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'jcpenny', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'kohls', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'loews', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'marshalls', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'michales', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'nike', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'nordstrom', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'nordstromRack', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'oldnavy', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'olivegarden', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'pfchang', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'panerabread', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'rainforestCafe', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'rei', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'regal', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'saks', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'sephora', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'shutterfly', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'spotify', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'staples', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'starbucks', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'sunglassHut', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'tjmaxx', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'tgif', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'cheesecake', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'containerStore', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'homedepot', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'ulta', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'underArmour', 'giftCard');
        wallet.addRewardToCard('discoverIt', 'yardHouse', 'giftCard');

        wallet.addRewardToCard('citiPremiere', 'gasStation', '3pts');
        wallet.addRewardToCard('citiPremiere', 'travel', '3pts');
        wallet.addRewardToCard('citiPremiere', 'gasStation', '3pts');
        wallet.addRewardToCard('citiPremiere', 'restaurant', '2pts');
        wallet.addRewardToCard('citiPremiere', 'entertainment', '2pts');

        wallet.addRewardToCard('chaseFreedom', 'grocery', '2020_quater2');
        wallet.addRewardToCard('chaseFreedom', 'shakeShack', '10pc');
        wallet.addRewardToCard('chaseFreedom', 'rayban', '10pc');
        wallet.addRewardToCard('chaseFreedom', 'starbucks', '5pc');
        wallet.addRewardToCard('chaseFreedom', 'rosaMexicano', '10pc');
        wallet.addRewardToCard('chaseFreedom', 'onTheBorder', '10pc');
        wallet.addRewardToCard('chaseFreedom', 'reginaPizzeria', '10pc');
        wallet.addRewardToCard('chaseFreedom', 'fanatics', '5pc');
        wallet.addRewardToCard('chaseFreedom', 'justice', '10pc');

        wallet.addRewardToCard('bofaDebit', 'amazonPrime', '5cb');

    }

    return Entries;

});
