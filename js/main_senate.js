var vue = new Vue({
    el: '#app',
    data: {
        miembros: [],
        membersFiltered: [],
        estadosFiltered: [],
        selectedState: 'All',
        selectedPartys: ['R','D','I']
    },
    methods: {
        filtrar: function () {
            vue.membersFiltered = filter();
        }
    }
})

var url = 'https://api.propublica.org/congress/v1/113/house/members.json';
if(document.getElementById("senate") != null) {
        url = 'https://api.propublica.org/congress/v1/113/senate/members.json'
    }

fetch(url, {
    method: 'GET',
    headers: new Headers({
        "X-API-Key": "ZGzkw0s7fL7ouwvzoEAGIJQh89l2xqUjwD6kSpIL"
    })
}).then(function (response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
}).then(function (json) {
    vue.miembros = json.results[0].members;
    vue.estadosFiltered = estados(vue.miembros);
    vue.filtrar();

}).catch(function (error) {
    alert('Appointment not saved: ' + error.message);
});


function filter() {
    var state = vue.selectedState;
    var selected = [];
    var partys = vue.selectedPartys;
    for (i = 0; i < vue.miembros.length; i++) {
        if (partys.includes(vue.miembros[i].party) && state == vue.miembros[i].state) {
            selected.push(vue.miembros[i]);
        } else if (partys.includes(vue.miembros[i].party) && state == "All") {
            selected.push(vue.miembros[i]);
        }
    }
    //document.getElementById("senate-data").innerHTML = tableSenators(selected);
    return selected;
}

function estados(senadores) {
    var count = [];
    var states = [];
    for (i = 0; i < senadores.length; i++) {
        if (count[senadores[i].state] === undefined) {
            count[senadores[i].state] = 1;
            states.push(senadores[i].state);
        }
    }
    return states;
    console.log(states);
}


/* function estados(senadores) {
    var count = [];
    var states = "";
    states += '<option value="All">All</option>';

    for (i = 0; i < senadores.length; i++) {
        if (count[senadores[i].state] === undefined) {
            count[senadores[i].state] = 1;
            states += '<option name=state value="' + senadores[i].state + '">' + senadores[i].state + '</option>';
        }
    }
    document.getElementById("states").innerHTML = states;
}
*/
