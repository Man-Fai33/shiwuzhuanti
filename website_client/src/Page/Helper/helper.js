
import URL from "./url"

export const helper = {
    //Upload Async
    AsyncUploadImage: async (image) => {
        try {

            let url = URL.Url.UpLoad
            let response = await fetch(url, {
                method: 'POST',
                body: image
            })

            let responseJson = await response.json();

            return responseJson;
        } catch (error) {

        }
    },

    // user Async
    AsyncUserByEmailPass: async (email, password) => {
        try {
            let jsonBody = JSON.stringify({
                email: email,
                password: password
            })
            console.log(jsonBody);
            let url = URL.Url.CheckLogin
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: jsonBody
            })
            let responseJson = await response.json();
            // if(responseJson.status == "success"){

            // }

            return responseJson;
        } catch (error) {

            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;

        }
    },
    AsyncUserByID: async (id) => {

    },
    AsyncUsers: async () => {
        let url = URL.Url.User
        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncMarketCreate: async (data) => {
        console.log(data)
        try {
            let jsonBody = JSON.stringify({

                market: data.market
            })

            let url = URL.Url.Market
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                },
                method: "post",
                body: jsonBody
            })
            let respJson = await response.json();
            return respJson;

        } catch (e) {
            console.log(e)
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncUserCreate: async (userData) => {
        console.log(userData)
        try {
            let jsonBody = JSON.stringify({
                requesterid: null,

                user: userData.user
            })
            console.log(jsonBody)
            let url = URL.Url.User
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: jsonBody
            })
            let respJson = await response.json();
            return respJson;

        } catch (e) {
            console.log(e)
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncFeedbackCreate: async (feedback) => {
        try {
            let jsonBody = JSON.stringify({
                requesterid: null,
                feedback: feedback.feedback
            })
            console.log(jsonBody)
            let url = URL.Url.FeedBack
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: jsonBody
            })
            let respJson = await response.json();
            return respJson;
        } catch (e) {
            console.log(e)
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncBulletinCreate: async (bulletin) => {
        try {
            let jsonBody = JSON.stringify({
                requesterid: null,
                bulletin: bulletin.bulletin
            })
            console.log(jsonBody)
            let url = URL.Url.Bulletin
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: jsonBody
            })
            let respJson = await response.json();
            return respJson;
        } catch (e) {
            console.log(e)
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncUserEdit: async (userData) => {
        try {
            let jsonBody = JSON.stringify({
                user: userData
            })
            console.log(jsonBody)
            let url = URL.Url.User
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: jsonBody
            })
            let responseJson = await response.json();
            return responseJson;
        } catch (e) {
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncCommentCreate: async (comment) => {
        try {
            let jsonBody = JSON.stringify({
                comment: comment
            })
            console.log(jsonBody)
            let url = URL.Url.Comment
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: jsonBody
            })
            let responseJson = await response.json();
            return responseJson;
        } catch (e) {
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncComments: async () => {
        let url = URL.Url.Comment
        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },

    AsyncFeedBackAll: async () => {
        let url = URL.Url.FeedBack
        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncMarketData: async () => {
        let url = URL.Url.Market
        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncShopData: async () => {
        let url = URL.Url.Shop
        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncShopOne: async (id) => {
        let url = URL.Url.Shop
        let response = await fetch(url + "/" + id, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncBulletin: async () => {
        let url = URL.Url.Bulletin

        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncMarketOne: async (id) => {
        let url = URL.Url.Market

        let response = await fetch(url + id, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'post',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncFoodOne: async (id) => {
        let url = URL.Url.Food

        let response = await fetch(url + id, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncEditFood: async (id, food) => {
        let url = URL.Url.Food
        let jsonBody = JSON.stringify({

            food: food
        })

        let response = await fetch(url + id, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'put',
            body: jsonBody
        })
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson;
    },
    AsyncEditShop: async (id, shop) => {
        let url = URL.Url.Shop
        let jsonBody = JSON.stringify({

            shop: shop
        })

        let response = await fetch(url + "/" + id, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'put',
            body: jsonBody
        })
        let responseJson = await response.json();
        return responseJson;
    },
    AsyncFood: async () => {
        let url = URL.Url.Food

        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncCreateShop: async (shop) => {

        try {
            let jsonBody = JSON.stringify({
                shop: shop
            })

            let url = URL.Url.Shop
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: jsonBody
            })
            let respJson = await response.json();
            return respJson;

        } catch (e) {
            console.log(e)
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }

    }

}

export const functions = {
    loginChecker: (role) => {
        if (role === "user") {

        }

    }
}



export default {
    helper, functions
}