var mongoose = require("mongoose");
var loanSchema = mongoose.Schema({
    name: String,
    days: {
        type:Number,
        min: 1
    },
    crops: [String]
});

var Loan = mongoose.model('loan',loanSchema);
module.exports = Loan;
//export model so that when requiring file you can reference model itself