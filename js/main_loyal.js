var vue = new Vue({
    el: '#app',
    data: {
        miembros: [],
        statistic: {
            democrats: [],
            republicans: [],
            independents: [],
            porcentajesOrdenados: [],
            porcentajesOrdenadosMayorAMenor: [],
            mostLoyal: [],
            leastLoyal: [],
            democratsVotesWithParty: [],
            republicansVotesWithParty: [],
            independentsVotesWithParty: [],
            porcentajesOrdenadosAttendance: [],
            porcentajesMayorMenorAttendance: [],
            mostEngaged: [],
            leastEngaged: [],
        }
    },
    methods: {
        attendance: function () {
            var menorPorcentaje = [];
            var mayorPorcentaje = [];
            var porcentajesOrdenados = [];
            var diezPorCiento = vue.miembros.length * 10 / 100;
            var porcentajesOrdenadosMayorAMenor = [];

            porcentajesOrdenados = vue.miembros.sort(function (a, b) {
                return b.missed_votes_pct - a.missed_votes_pct;
            });

            vue.statistic.porcentajesOrdenadosAttendance = porcentajesOrdenados;

            for (i = 0; i < diezPorCiento; i++) {
                menorPorcentaje.push(vue.statistic.porcentajesOrdenadosAttendance[i]);
            }

            vue.statistic.porcentajesMayorMenorAttendance = porcentajesOrdenados.reverse();

            for (i = 0; i < diezPorCiento; i++) {
                mayorPorcentaje.push(vue.statistic.porcentajesMayorMenorAttendance[i]);
            }

            vue.statistic.mostEngaged = mayorPorcentaje;
            vue.statistic.leastEngaged = menorPorcentaje;
        },
        partidos: function () {

            for (i = 0; i < vue.miembros.length; i++) {
                if (vue.miembros[i].party == "D") {
                    vue.statistic.democrats.push(vue.miembros[i]);
                } else if (vue.miembros[i].party == "R") {
                    vue.statistic.republicans.push(vue.miembros[i]);
                } else {
                    vue.statistic.independents.push(vue.miembros[i]);
                }
            }
            return vue.statistic.republicans
            vue.statistic.democrats
            vue.statistic.independents
        },
        porcentajes: function () {
            var menorPorcentaje = [];
            var mayorPorcentaje = [];
            var porcentajesOrdenados = [];
            var diezPorCiento = vue.miembros.length * 10 / 100;
            var porcentajesOrdenadosMayorAMenor = [];

            porcentajesOrdenados = vue.miembros.sort(function (a, b) {
                return a.votes_with_party_pct - b.votes_with_party_pct;
            });

            vue.statistic.porcentajesOrdenados = porcentajesOrdenados;

            for (i = 0; i < diezPorCiento; i++) {
                menorPorcentaje.push(vue.statistic.porcentajesOrdenados[i]);
            }

            vue.statistic.porcentajesOrdenadosMayorAMenor = porcentajesOrdenados.reverse();

            for (i = 0; i < diezPorCiento; i++) {
                mayorPorcentaje.push(vue.statistic.porcentajesOrdenadosMayorAMenor[i]);
            }

            vue.statistic.mostLoyal = mayorPorcentaje;
            vue.statistic.leastLoyal = menorPorcentaje;
        },
        votosPorPartido: function () {
            var democratsVotesWithParty = 0;
            var republicansVotesWithParty = 0;
            var independentsVotesWithParty = 0;

            for (i = 0; i < vue.statistic.democrats.length; i++) {
                democratsVotesWithParty += vue.statistic.democrats[i].votes_with_party_pct;
            }
            for (i = 0; i < vue.statistic.republicans.length; i++) {
                republicansVotesWithParty += vue.statistic.republicans[i].votes_with_party_pct;
            }
            for (i = 0; i < vue.statistic.independents.length; i++) {
                independentsVotesWithParty += vue.statistic.independents[i].votes_with_party_pct;
            }

            vue.statistic.democratsVotesWithParty = (democratsVotesWithParty / vue.statistic.democrats.length).toFixed(2);
            vue.statistic.republicansVotesWithParty = (republicansVotesWithParty / vue.statistic.republicans.length).toFixed(2);
            vue.statistic.independentsVotesWithParty = (independentsVotesWithParty / vue.statistic.independents.length).toFixed(2);
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
    vue.partidos();
    vue.porcentajes();
    vue.attendance();
    vue.votosPorPartido();
}).catch(function (error) {
    alert('Appointment not saved: ' + error.message);
});

