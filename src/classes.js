const axios = require('axios').default

class User {
    constructor(name, age, email) {
        this.name = name
        this.age = age
        this.email = email
    }
}

// Medsenger doctor alarm (MDA)
const Mda = function() {
    Mda.prototype.res = null
    Mda.prototype.block = false

    Mda.prototype.getRes = () => {
        console.log('res')
    }

    Mda.prototype.get = (url, params) => {
        // console.log('get запрос на адрес:', url, ' с параметрами ', params)

        axios.get(url, {params: params})
            .then(function (res) {
                Mda.prototype.res = res.data
                console.log('response.data =', res.data)
                // console.log('================================================')
            })
            .catch(function (error) {
                console.error('error get =', error)
            })
            .then(function () {
                // always executed
            })
    }

    Mda.prototype.post = (url, params, headers) => {
        console.log('axios post')

        let options = {
            method: 'POST',
            headers: headers,
            data: params,
            url: url
        };

        axios(options)
            .then(res => {
                Mda.prototype.res = res.data
                console.log('response.data =', res.data)
                console.log('POST ================================================')
            })
            .catch(function (error) {
                console.error('error post =', error)
            })
    }
}

module.exports = {User, Mda}