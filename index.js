const {notificationEvents} = require("./constants/eventTypes");
const {
    getPostgresConnection,
    createDBTransaction,
    commitDBTransaction,
    rollbackDBTransaction,
} = require("./utils/db_helpers");
const {
    initAmqp,
    sendMessage,
} = require('./utils/amqp');

function Common() {
    this.models = {};

    this.initModels = (mongoose) => {
        require('./models/Bet')(mongoose);
        require('./models/ChatMessage')(mongoose);
        require('./models/Event')(mongoose);
        require('./models/User')(mongoose);
        require('./models/CategoryBetTemplate')(mongoose);
        require('./models/Lottery')(mongoose);
        require('./models/LotteryTicket')(mongoose)
        require('./models/Trade')(mongoose)
        require('./models/UniversalEvent')(mongoose)

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
        initAmqp,
        sendMessage,
    };

    this.constants = {
        events: {
            notification: notificationEvents
        }
    };
}

var common = new Common();

module.exports = common;
