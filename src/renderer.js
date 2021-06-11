const remote = require('@electron/remote')
const {ipcRenderer} = require('electron')
const classes = require('./classes')
const axios = require('axios').default

const template = [
    {
        label: "Файл",
        submenu: [
            {
                label: "Открыть",
                click: async() => {
                    remote.dialog.showMessageBox({
                        title: "Hello. world!",
                        type: "info",
                        message: 'Выбран пункт меню "Открыть"'
                    });
                }
            },
            {
                label: "Сохранить",
                click: async() => {
                    remote.dialog.showMessageBox({
                        title: "Hello. world!",
                        type: "info",
                        message: 'Выбран пункт меню "Сохранить"'
                    });
                }
            },
            {
                type: "separator"
            },
            {
                role: "close"
            }
        ]
    }
]

const get = () => {
    // e.preventDefault()

    console.warn('get')

    params = {}
    url = urls[5]
    method = 'GET'

    console.log(url, method, params)

    axios.get(url, {params: params})
        .then(function (res) {
            // Mda.prototype.res = res.data
            console.log('response.data =', res.data)

            if (res.data['state'] == 'alert') {
                let optionArray = res.data['answer_options']

                console.log(res.data['alert'])

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
            }

            // console.log('================================================')
        })
        .catch(function (error) {
            console.error('error get =', error)
        })
        .then(function () {
            // always executed
        })
}

const reset = () => {
    console.log('reset')

    let options = {
        method: 'POST',
        headers: headers,
        data: {id: 1},
        url: urls[6]
    }

    console.log(options)

    axios(options)
        .then(res => {
            // Mda.prototype.res = res.data
            console.log('response.data =', res.data)
            // console.log('POST ================================================')
        })
        .catch(function (error) {
            console.error('error post =', error)
        })

    // let data = {id:1}
    //
    // mda.post(urls[6], data, headers)
    //
    // console.log('start application')
    //
    // let win = remote.getCurrentWindow()
    //
    // win.hide()
}

const menu = remote.Menu.buildFromTemplate(template)
remote.Menu.setApplicationMenu(menu)

// renderer
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()

    console.log('contextmenu')

    ipcRenderer.send('show-context-menu')
})

ipcRenderer.on('get-alert', (e, command) => {
    get()

    // console.log(command)
})

ipcRenderer.on('post-reset', (e, command) => {
    reset()

    // console.log(command)
})

ipcRenderer.on('post-alert', (e, command) => {
    console.log(command)
})

console.log('renderer')