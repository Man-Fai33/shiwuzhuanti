import { EXPRESS_SERVER_URL } from '../../config';

export const HOST = EXPRESS_SERVER_URL || 'http://localhost:7788';

export const Url = {
    CheckLogin: (HOST + "/users/user/emailPass"),
    User: (HOST + "/users/user"),
    Food: (HOST + "/foods/"),
    Shop: (HOST + "/shops"),
    UpLoad: (HOST + "/upload"),
    Market: (HOST + "/market/"),
    FeedBack: (HOST + "/feedback/"),
    Bulletin: (HOST + "/bulletin/"),
    Comment: (HOST + "/comment/")
};

export default {
    Url
};