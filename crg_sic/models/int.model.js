require('log-timestamp');
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
 
const IntSchema = new Schema({
    IntId: String,
    IntCode: String,    
    IntName: String,
    IntDate: Date,
    IntNote: String
});

console.log('users.model.js : Step#01');

IntSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
IntSchema.set('toJSON', {
    virtuals: true
});

IntSchema.findById = function (cb) {
    return this.model('Int').find({id: this.id}, cb);
};

const Int = mongoose.model('Int', IntSchema);

exports.findByCode = (code) => {
    console.log('int.model.js : findByCode('+code+')');
    return Int.find({IntCode: code});
};

exports.findById = (id) => {
    console.log('int.model.js : findById('+id+')');
    return Int.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createInt = (IntData) => {
    console.log('int.model.js : createInt('+IntData+')');
    const int = new Int(IntData);
    return int.save();
};

exports.listInt = (perPage, page) => {
    console.log('int.model.js : listInt('+perPage+', '+page+')');
    return new Promise((resolve, reject) => {
        Int.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
    });
};

exports.patchInt = (id, IntData) => {
    console.log('int.model.js : patchInt('+id+', '+ IntData+ ')');
    return Int.findOneAndUpdate({
        _id: id
    }, IntData);
};