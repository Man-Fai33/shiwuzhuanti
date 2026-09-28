import { EXPRESS_SERVER_URL } from '../../config';

export const HOST = EXPRESS_SERVER_URL !== undefined ? EXPRESS_SERVER_URL : 'http://localhost:7788';

export const Url = {
    CheckLogin: (HOST + "/users/user/emailPass"),
    User: (HOST + "/users/user"),
    Food: (HOST + "/foods/"),
    Shop: (HOST + "/shops"),
    UpLoad: (HOST + "/upload"),
    Market: (HOST + "/market/"),
    FeedBack: (HOST + "/feedback/"),
    Bulletin: (HOST + "/bulletin/"),
    Comment: (HOST + "/comment/"),
    Analytics: (HOST + "/analytics"),
    Sync: (HOST + "/sync"),
    System: (HOST + "/system"),
    SendVerificationCode: (HOST + "/users/send-verification-code"),
    VerifyCode: (HOST + "/users/verify-code")
};

const urlExport = {
    Url,
    HOST
};

export default urlExport;