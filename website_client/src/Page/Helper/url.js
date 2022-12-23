export const HOST = 'http://localhost:3000'
// export const HOST = 'https://calorist.ddns.net'



export const Url = {
    CheckLogin: (HOST + "/userLogin/emailPass"),
    User: (HOST + "/users/user"),
    Food: (HOST, "/foods/food"),
    Shop: (HOST, "/shops/shop"),
    UpLoad: (HOST + "/upload/"),

    // Viewimage: (HOST + "/binary/img/id/"),
    // Viewuser: (HOST + "/user/view/all"),
    // EmailPass: (HOST + "/user/view/emailPass"),
    // CreateRecipe: (HOST + "/recipe/create"),
    // CreateFood: (HOST + "/food/create"),
    // EditUser: (HOST + "/user/edit"),
    // ViewCustom: (HOST + "/customfood/view/all"),
    // Viewuserbyid: (HOST + "/user/view/id/"),
    // EditCustomFood: (HOST + "/customfood/edit"),
    // CreateUser: (HOST + "/user/create"),
}



export default {
    Url
}