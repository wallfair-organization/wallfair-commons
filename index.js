const {notificationEvents} = require("./constants/eventTypes");
const {
    getPostgresConnection,
    createDBTransaction,
    commitDBTransaction,
    rollbackDBTransaction,
} = require("./utils/db_helpers");

function Common() {
    this.models = {};

    this.initModels = (mongoose) => {
        require('./models/Bet');
        require('./models/ChatMessage');
        require('./models/Event');
        require('./models/User');
        require('./models/CategoryBetTemplate');
        require('./models/Lottery');
        require('./models/LotteryTicket')
        require('./models/Trade')
        require('./models/UniversalEvent')

        this.models.User = mongoose.model("User");
        this.models.ChatMessage = mongoose.model('ChatMessage');
        this.models.Event = mongoose.model('Event');
        this.models.Bet = mongoose.model('Bet');
        this.models.CategoryBetTemplate = mongoose.model('CategoryBetTemplate');
        this.models.Lottery = mongoose.model('Lottery');
        this.models.LotteryTicket = mongoose.model('LotteryTicket');
        this.models.Trade = mongoose.model('Trade');
        this.models.UniversalEvent = mongoose.model('UniversalEvent');
    }

    this.utils = {
        getGaussian: (mean, stdev) => {
            return require("./utils/gaussian")(mean, stdev);
        },
        getPostgresConnection,
        createDBTransaction,
        commitDBTransaction,
        rollbackDBTransaction,
    };

    this.constants = {
        events: {
            notification: notificationEvents
        }
    };
}

var common = new Common();

module.exports = common;
