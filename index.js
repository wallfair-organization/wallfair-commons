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
    
        this.models.User = mongoose.model("User");
        this.models.ChatMessage = mongoose.model('ChatMessage');
        this.models.Event = mongoose.model('Event');
        this.models.Bet = mongoose.model('Bet');
        this.models.CategoryBetTemplate = mongoose.model('CategoryBetTemplate');
        this.models.Lottery = mongoose.model('Lottery');
        this.models.LotteryTicket = mongoose.model('LotteryTicket');
    }

    this.utils = {
        getGaussian: (mean, stdev) => {
            return require("./utils/gaussian")(mean, stdev);
        }
    };
}

var common = new Common();

module.exports = common;