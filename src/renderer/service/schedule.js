import nedb from 'nedb';

const db = new nedb({
    filename: 'path/to/data/schedule.db',
    autoload: true
});

const Schedule  = {
    add: function(args, callback) {
        db.insert(args, (err, ret) => {callback && callback(err, ret)});
    },

    delete: function(args, callback) {
        db.remove(args, (err, ret) => {callback && callback(err, ret)});
    },

    update: function(args, callback) {
        db.update({_id: args.id}, {$set: {}}, (err, ret) => {callback && callback(err, ret)});
    },
    find: function(args, callback) {
        db.find(args)
          .sort({
            _id: -1
          })
          .exec((err, ret) => {callback && callback(err, ret)});
    }
}

export default Schedule;
