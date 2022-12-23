
import URL from "./url"
export const helper = {
    //Upload Async
    AsyncUploadImage: async (image) => {
        try {
            let url = URL.Url.UpLoad
            let response = await fetch(url, {
                method: 'POST',
                body: image
            }).then(res => {
                console.log(res)
            })

            let responseJson = await response.json();
            console.log(responseJson)
            return responseJson;
        } catch (error) {

        }
    },

    // user Async
    AsyncUserByEmailPass: async (email, password) => {
        try {
            let bodyJSON = JSON.stringify({
                requesterid: null,
                isCreate: false,
                email: email,
                password: password
            })
            let url = URL.Url.User
            let response = await fetch(url, {
                headers: {

                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                method: 'POST',
                body: bodyJSON
            })
            let responseJson = await response.json();
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
    AsyncUserCreate: async (userData) => {
        console.log(userData)
        try {
            let jsonBody = JSON.stringify({
                requesterid: null,
                isCreate: true,
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
    AsyncUserEdit: async (id, userData) => {
        try {
            let jsonBody = JSON.stringify({
                requesterid: id,
                user: userData
            })
            let url = URL.Url.User
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: jsonBody
            })
            let responseJson = await response.json();
            return responseJson;
        } catch (e) {
            console.log(e)
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }


    },
    AsyncUserData: async () => {

        return
    }

}



export default {
    helper
}