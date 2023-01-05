export const HOST = 'http://localhost:3000'
// export const HOST = 'https://calorist.ddns.net'



export const Url = {
    CheckLogin: (HOST + "/users/user/emailPass"),
    User: (HOST + "/users/user"),
    Food: (HOST, "/foods/food"),
    Shop: (HOST, "/shops/shop"),
    UpLoad: (HOST + "/upload"),
    Market: (HOST + "/market/"),
    FeedBack: (HOST + "/feedback/"),
    Bulletin:(HOST + "/bulletin/")

}



export default {
    Url
}