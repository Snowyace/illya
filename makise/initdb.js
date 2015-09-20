var item_maker = require('./models/item_model.js');
var seed = require('./lib/init_items.json');

exports.initSeed = function(){
        item_maker.find(function(err,items){ console.log(items)});
        item_maker.find(function(err,items){
            if(items.length) return;
            // item is a temporary variable holding the current index of the loop iteration
            for(var item in seed){
                new item_maker({
                name: seed[item].name,
                coin: seed[item].coin
                }).save();
                console.log(seed[item]);
                console.log(seed[item].name);
                console.log(seed[item].coin);
            }
        });
}





/*for(var item in seed){
   var objArray = [ seed[item]];
}
return objArray;
});
*/