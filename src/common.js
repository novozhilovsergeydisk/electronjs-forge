// const constants = require('./js/const')

// console.log(urls[5])

// обработчик на document сработает и выведет сообщение.

// document.getElementById('save').addEventListener('click', (e) => {
//     e.preventDefault()
//
//     console.log('save')
//
//     let select = document.getElementById('answer')
//
//     // save the selected option
//     let selected = [];
//
//     for (let i = 0; i < select.options.length; i++) {
//         selected[i] = select.options[i];
//     }
//
//     let n = document.getElementById('answer').options.selectedIndex
//     let val = document.getElementById('answer').options[n].value
//     let id = document.getElementById('id').innerText
//     let comments = document.getElementById('comments').value
//
//     // console.log(comments)
//
//     let options = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         data: {id: id, result: val, comments: comments},
//         url: urls[5]
//     }
//
//     console.log(options)
//
//     axios(options)
//         .then(res => {
//             mda.block = false
//
//             // Mda.prototype.res = res.data
//             console.log('response.data =', res.data)
//             // console.log('POST ================================================')
//
//             let win = remote.getCurrentWindow()
//
//             win.hide()
//         })
//         .catch(function (error) {
//             console.error('error post =', error)
//         })
// })

// const post = document.getElementById('post')

document.getElementById('reset')



// // ловим на document...
// save.addEventListener("hello", function(event) { // (1)
//     alert("Привет от " + event.target.tagName); // Привет от H1
// });

// // ...запуск события на элементе!
// let event = new Event("hello", {bubbles: true}); // (2)
// save.dispatchEvent(event);


// document.getElementById('get').addEventListener('click', (e) => {
//     get(e)
// })

// post.addEventListener('click', (e) => {
//     e.preventDefault()
//
//     console.log('post')
//
//     let select = document.getElementById('answer')
//
//     // save the selected option
//     let selected = [];
//
//     for (let i = 0; i < select.options.length; i++) {
//         selected[i] = select.options[i];
//     }
//
//     let n = document.getElementById('answer').options.selectedIndex;
//     let val = document.getElementById('answer').options[n].value;
//
//     let comments = document.getElementById('comments').value
//
//     console.log(comments)
//
//     let options = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         data: {id: 1, result: val, comments: comments},
//         url: urls[5]
//     }
//
//     console.log(options)
//
//     // axios(options)
//     //     .then(res => {
//     //         // Mda.prototype.res = res.data
//     //         console.log('response.data =', res.data)
//     //         // console.log('POST ================================================')
//     //     })
//     //     .catch(function (error) {
//     //         console.error('error post =', error)
//     //     })
// })

// reset.addEventListener('click', () => {
//     // e.preventDefault()
//
// })

// params = 'email=sergionov@mail.ru&pass=12345&save=true'

// headers = { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }
// headers = { 'Content-Type': 'text/html; charset=UTF-8' }
headers = { 'Content-Type': 'application/json' }

const urls = [
    'http://localhost:80/ajUser.php',
    'http://httpbin.org/post',
    'http://yandex.ru',
    'http://localhost:80',
    'https://трансплант.net/ajUser.php',
    'https://mc21.medsenger.ru/api/alert?key=workstation-key-1',
    'https://mc21.medsenger.ru/api/reset?key=workstation-key-1'
]

url = urls[5]
method = 'GET'

const mda = new classes.Mda()

console.log('mda.block', mda.block)

const interval = 10000 // 10000 // 2000000

// повторить с интервалом 2 секунды
let timerId = setInterval(() => {
    // mda.get(url, {})
    //
    // console.log('mda.res=', mda.res)
    //
    // // console.log('******************************* mda.block =', mda.block)
    //
    // if (mda.res != null) {
    //     console.log('mda.res[state] =', mda.res['state'])
    //
    //     if (mda.res['state'] == 'alert') {
    //         let optionArray = mda.res['answer_options']
    //
    //         console.log('optionArray =', optionArray)
    //         // console.log('')
    //
    //         mda.block = true
    //         let max = optionArray.length
    //         let select = document.getElementById('answer')
    //
    //         // console.log('count select.length', max)
    //
    //         for (var i = 0; i <= max - 1; i++){
    //             let newOption = new Option(optionArray[i], i);
    //             select.appendChild(newOption);
    //         }
    //
    //         let win = remote.getCurrentWindow()
    //         win.show()
    //
    //         mda.res = null
    //     }
    // }
    //
    // if (mda.block) {
    //     // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> mda.block =', mda.block)
    //     mda.block = false
    // }

    console.log('Interval >>> mda.block =', mda.block)

    // mda.block = true


    if (mda.block == false) {
        // let win = remote.getCurrentWindow()
        //
        // win.show()

        params = {}
        url = urls[5]
        method = 'GET'

        console.log('Interval >>> url =', url, method, params)

        axios.get(url, {params: params})
            .then(function (res) {
                // Mda.prototype.res = res.data
                console.log('Interval >>> response.data =', res.data)

                if (res.data['state'] == 'alert') {
                    let optionArray = res.data['answer_options']

                    console.log('Interval >>> alert =',res.data['alert'])

                    // mda.block = true

                    let max = optionArray.length
                    let select = document.getElementById('answer')

                    let opts = select.options

                    while(opts.length > 0){
                        opts[opts.length-1] = null
                    }

                    // console.log('count select.length', max)

                    for (var i = 0; i <= max - 1; i++){
                        let newOption = new Option(optionArray[i], optionArray[i])
                        select.appendChild(newOption)
                    }

                    document.getElementById('patient').innerText = res.data['alert']['name']
                    document.getElementById('age').innerText = res.data['alert']['age']
                    document.getElementById('contract_id').innerText = res.data['alert']['contract_id']
                    document.getElementById('birthday').innerText = res.data['alert']['birthday']
                    document.getElementById('phone').innerText = res.data['alert']['phone']
                    document.getElementById('message').innerHTML = res.data['alert']['message']
                    document.getElementById('comment').innerText = res.data['alert']['comment']
                    document.getElementById('id').innerText = res.data['alert']['id']

                    mda.block = true

                    let win = remote.getCurrentWindow()

                    win.show()
                }

                console.log('================================================')
            })
            .catch(function (error) {
                console.error('error get =', error)
            })
            .then(function () {
                // always executed
            })

        // if (mda.block) {
        //     console.log('if mda.block')
        //
        //     let win = remote.getCurrentWindow()
        //
        //     win.show()
        // }
    }

    // if (mda.block) {
    //     let win = remote.getCurrentWindow()
    //
    //     win.show()
    // }

}, 100000)

console.log('common.js')