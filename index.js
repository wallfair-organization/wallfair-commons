function Common() {
    this.models = {};

    this.init = (mongoose) => {
        require('./models/Bet');
        require('./models/ChatMessage');
        require('./models/Event');
        require('./models/User');
    
        this.models.User = mongoose.model("User");
        this.models.ChatMessage = mongoose.model('ChatMessage');
        this.models.Event = mongoose.model('Event');
        this.models.Bet = mongoose.model('Bet');
    }
}

var common = new Common();

module.exports = common;