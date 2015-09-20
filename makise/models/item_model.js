var mongoose = require('mongoose');
var itemSchema = mongoose.Schema({
name: String,
coin: Number
}); 
var Item = mongoose.model('item', itemSchema);
module.exports = Item;



