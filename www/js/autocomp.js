function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*An array containing all the country names in the world:*/
var countries = ["Eva naturale 1.5L x12 5.00€", "Eva gasata 1.5L x12 5.00€", "Eva naturale 0.5L x24 5.00€",
    "Eva gasata 0.5L x24 5.00€", "Sparea naturale 0.5L x24 5.12€", "Sparea gasata 0.5L x24 5.12€",
    "Sparea naturale 1.5L x12 5.12€", "Sparea gasata 1.5L x12 5.12€", "San Benedetto naturale 0.5L x24 4.51€",
    "San Benedetto gasata 0.5L x24 4.51€", "San Benedetto naturale 1.5L x12 4.51€", "San Benedetto gasata 1.5L x12 4.51 €",
    "San Bernardo naturale 0.5L x24 4.88€", "San Bernardo gasata 0.5L x24 4.88€", "San Bernardo naturale 1.5L x12 4.88€",
    "San Bernardo gasata 1.5L x12 4.88€", "S.B. premium nat 0.5L x24 5.98€", "S.B. premium gas 0.5L x24 5.98€",
    "Lilia naturale 0.5L x24 5.98€", "Lilia gasata 0.5L x24 5.98€", "Baffo oro 0.33L x24 21.91€",
    "Heineken 0.33L x24 21.91€", "Ceres 0.33L x24 37.45€", "Becks 0.33L x24 19.76€", "Corona 0.33L x24 35.14€",
    "Menabrea 0.33L x24 25.50€", "Ichnusa 0.33L x24 20.62€", "Ichnusa non filtrata 0.33L x24 24.16€",
    "Moretti filtrata a freddo 0.30L x24 20.00€", "Tennent s 0.33L x24 36.36€", "Moretti 0.33L x24 17.81€",
    "Moretti lattina 0.33L x24 17.81€", "Ichnusa cruda 0.33L x24 29.04€", "San Miguel 0.33L x24 15.62€",
    "Messina 0.33L x24 23.13€", "Messina cris. sale 0.33L x24 30.26€", "Bulldog 0.33L x24 39.04€",
    "Blanche de Bruxelles 0.33L x12 24.16€", "Erdinger 0.5L x12 18.06€", "Ichnusa 0.66L x15 20.98€",
    "Ichnusa non filtrata 0.50L x15 21.05€", "Moretti 0.66L x15 16.35€", "Menabrea 0.66L x15 24.89€",
    "Heineken 0.66L x15 20.98€", "Peroni 0.66L x15 16.84€", "Heineken blade 8L x1 34.16€",
    "Blade Messina c.s. 8L x1 37.82€", "Leffe Bionda fusto 6L x1 32.94€", "Leffe Rouge fusto 6L x1 34.16€",
    "Coca-cola bott.vetro 0.33L x24 17.32€", "Coca zero bott.vetro 0.33L x24 17.32€",
    "Coca-cola lattina 0.33L x24 13.79€", "Coca zero lattina 0.33L x24 13.79€", "Fanta lattina 0.33L x24 13.79€",
    "Sprite lattina 0.33L x24 13.79€", "Coca latt.piccola 0.25L x24 12.08€", "Coca-cola pet 0.44L x24 22.45€",
    "Coca-cola zero pet 0.44L x24 22.45€", "Pepsi lattina 0.33L x24 10.98€", "Lemonsoda lattina 0.33L x24 12.69€",
    "Estathe latt lim 0.33L x24 19.64€", "Estathe latt pes 0.33L x24 19.64€", "Estathe pet limone 0.50L x24 22.94€",
    "Estathe pet pesca 0.50L x24 22.94€", "Estathe vetro limone 0.25L x24 21.91€", "Estathe vetro pesca 0.25L x24 21.91€",
    "Chinotto lattina 0.33L x24 12.69€", "Redbull 0.33L x24 31.96€", "Schweppes lattina 0.33L x24 14.40€",
    "Schweppes bott. vetro 0.18L x24 13.66€", "Lemonsoda bott. vetro 0.20L x24 13.18€", "Gatorade blu 0.50L x12 11.96€",
    "Gatorade rosso 0.50L x12 11.96€", "Gatorade limone 0.50L x12 11.96€", "Gatorade lemon ice 0.50L x12 11.96€",
    "Chinotto lurisia 0.27L x24 24.89€", "Gazzosa lurisia 0.27L x24 24.89€", "Aranciata lurisia 0.27L x24 24.89€",
    "Acqua tonica lurisia 0.27L x24 24.89€", "Coca-cola pet 1L x6 8.54€", "Schweppes pet 1L x6 7.93€",
    "Pago ace 0.20L x24 19.03€", "Pago albicocca 0.20L x24 19.03€", "Pago ananas 0.20L x24 32.94€",
    "Pago arancia 0.20L x24 19.03€", "Pago mirtillo 0.20L x24 32.94€", "Pago pesca 0.20L x24 19.03€",
    "Pago pomodoro 0.20L x24 19.03€", "Pago pera 0.20L x24 19.03€", "Amita ace 0.20L x24 19.03€",
    "Amita albicocca 0.20L x24 19.03€", "Amita ananas 0.20L x24 21.35€", "Amita arancia 0.20L x24 19.03€",
    "Amita mirtillo 0.20L x24 21.35€", "Amita pesca 0.20L x24 19.03€", "Amita pomodoro 0.20L x24 19.03€",
    "Amita pera 0.20L x24 19.03€", "Crodino 0.10L x48 27.82€", ">Campari soda 0.10L x100 92.72€",
    "San Bitter 0.10L x48 25.50€", "Aperol 1L x1 11.96€", "Ginger beer fever tree 0.2L x24 26.93€",
    "Ginger beer f.tree ale 0.2L x24 26.93€", "Bag in box vino rosso 10L x1 25.62€",
    "Bag in box vino bianco 10L x1 25.62€", "Prosecco Treviso doc 0.75L x6 31.48€", "Albaluna Cuvee 0.75L x6 20.50€",
    "Arneis i filari 0.75L x6 28.55€", "Favorita i filari 0.75L x6 28.55€", "Barbera la teresina 0.75L x6 28.55€",
    "Dolcetto i filari 0.75L x6 28.55€", "Gewurztraminer ken. 0.75L x6 33.55€", "Piemonte barbera 0.75L x6 16.84€",
    "Piemonte dolcetto 0.75L x6 16.84€", "Traminer aromatico IGT 0.75L x6 19.76€", "958 Santero 0.75L x6 29.22€",
    "Bag in box vino rosso 10L x1 25.62€", "Bag in box vino bianco 10L x1 25.62€", "Amaro del capo 1L x1 18.70€",
    "Fernet branca  0.70L x1 17.90€", "Jagermeister 1L x1 19.00€", "Montenegro 1L x1 21.80€",
    "San Simone 0.70L x1 15.00€", "Vecchia Roamgna et.nera 1L x1 24.00€", "Cubical gin 0.70L x1 34.00€",
    "Bosford gin 1L x1 14.00€", "Bombay gin 1L x1 21.50€", "Gin del professore mad 0.7L x1 42.00€",
    "Gin del professore mons 0.7L x1 42.00€", "Gin pink 47 0.7L x1 23.00€", "Gin Sabatini 0.7L x1 34.00€",
    "Gordons gin 1L x1 16.00€", "Hendricks gin 0.70L x1 33.00€", "Malfy gin limone 1L x1 32.00€",
    "Malfy gin original 1L x1 32.00€", "Malfy gin pomp.rosa 1L x1 32.00€", "Tanqueray gin  1L x1 25.00€",
    "Grappa Julia bianca 0.70L x1 10.50€", "Grappa Julia gialla 0.70L x1 10.50€", "Grappa Nardini 1L x1 24.00€",
    "Nardini riserva 1L x1 26.00€", "Genepy valli occ 0.70L x1 14.50€", "Limoncello riviera 2L x1 15.00€",
    "Mirto rosso 0.70L x1 10.00€", "San Buca Molinari 0.70L x1 13.00€", "Rum Cacique 500 0.70L x1 28.00€",
    "Rum Kraken 0.70L x1 24.00€", "Pampero bianco 1L x1 15.00€", "Pampero especial 1L x1 16.00€",
    "Rum Don Papa 0.70L x1 37.00€"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);

//creare la funzione che genera il prodotto cercato
function find() {
    let valu = document.getElementById('myInput').value;
    if (valu === 'Eva naturale 0.5L x24 5.00€') {
        let nval = document.getElementById('Eva naturale 0.5L x24 5.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Eva gasata 0.5L x24 5.00€') {
        let nval = document.getElementById('Eva gasata 0.5L x24 5.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Eva naturale 1.5L x12 5.00€') {
        let nval = document.getElementById('Eva naturale 1.5L x12 5.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Eva gasata 1.5L x12 5.00€') {
        let nval = document.getElementById('Eva gasata 1.5L x12 5.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Sparea naturale 0.5L x24 5.12€') {
        let nval = document.getElementById('Sparea naturale 0.5L x24 5.12€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Sparea gasata 0.5L x24 5.12€') {
        let nval = document.getElementById('Sparea gasata 0.5L x24 5.12€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Sparea naturale 1.5L x12 5.12€') {
        let nval = document.getElementById('Sparea naturale 1.5L x12 5.12€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Sparea gasata 1.5L x12 5.12€') {
        let nval = document.getElementById('Sparea gasata 1.5L x12 5.12€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Benedetto naturale 0.5L x24 4.51€') {
        let nval = document.getElementById('San Benedetto naturale 0.5L x24 4.51€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Benedetto gasata 0.5L x24 4.51€') {
        let nval = document.getElementById('San Benedetto gasata 0.5L x24 4.51€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Benedetto naturale 1.5L x12 4.51€') {
        let nval = document.getElementById('San Benedetto naturale 1.5L x12 4.51€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Benedetto gasata 1.5L x12 4.51 €') {
        let nval = document.getElementById('San Benedetto gasata 1.5L x12 4.51 €').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Bernardo naturale 0.5L x24 4.88€') {
        let nval = document.getElementById('San Bernardo naturale 0.5L x24 4.88€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Bernardo gasata 0.5L x24 4.88€') {
        let nval = document.getElementById('San Bernardo gasata 0.5L x24 4.88€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Bernardo naturale 1.5L x12 4.88€') {
        let nval = document.getElementById('San Bernardo naturale 1.5L x12 4.88€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Bernardo gasata 1.5L x12 4.88€') {
        let nval = document.getElementById('San Bernardo gasata 1.5L x12 4.88€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'S.B. premium nat 0.5L x24 5.98€') {
        let nval = document.getElementById('S.B. premium nat 0.5L x24 5.98€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'S.B. premium gas 0.5L x24 5.98€') {
        let nval = document.getElementById('S.B. premium gas 0.5L x24 5.98€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Lilia naturale 0.5L x24 5.98€') {
        let nval = document.getElementById('Lilia naturale 0.5L x24 5.98€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Lilia gasata 0.5L x24 5.98€') {
        let nval = document.getElementById('Lilia gasata 0.5L x24 5.98€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Baffo oro 0.33L x24 21.91€') {
        let nval = document.getElementById('Baffo oro 0.33L x24 21.91€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Heineken 0.33L x24 21.91€') {
        let nval = document.getElementById('Heineken 0.33L x24 21.91€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Ceres 0.33L x24 37.45€') {
        let nval = document.getElementById('Ceres 0.33L x24 37.45€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Becks 0.33L x24 19.76€') {
        let nval = document.getElementById('Becks 0.33L x24 19.76€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Corona 0.33L x24 35.14€') {
        let nval = document.getElementById('Corona 0.33L x24 35.14€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Menabrea 0.33L x24 25.50€') {
        let nval = document.getElementById('Menabrea 0.33L x24 25.50€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Ichnusa 0.33L x24 20.62€') {
        let nval = document.getElementById('Ichnusa 0.33L x24 20.62€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Ichnusa non filtrata 0.33L x24 24.16€') {
        let nval = document.getElementById('Ichnusa non filtrata 0.33L x24 24.16€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Moretti filtrata a freddo 0.30L x24 20.00€') {
        let nval = document.getElementById('Moretti filtrata a freddo 0.30L x24 20.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Tennent s 0.33L x24 36.36€') {
        let nval = document.getElementById('Tennent s 0.33L x24 36.36€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Moretti 0.33L x24 17.81€') {
        let nval = document.getElementById('Moretti 0.33L x24 17.81€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Moretti lattina 0.33L x24 17.81€') {
        let nval = document.getElementById('Moretti lattina 0.33L x24 17.81€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Ichnusa cruda 0.33L x24 29.04€') {
        let nval = document.getElementById('Ichnusa cruda 0.33L x24 29.04€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Miguel 0.33L x24 15.62€') {
        let nval = document.getElementById('San Miguel 0.33L x24 15.62€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Messina 0.33L x24 23.13€') {
        let nval = document.getElementById('Messina 0.33L x24 23.13€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Messina cris. sale 0.33L x24 30.26€') {
        let nval = document.getElementById('Messina cris. sale 0.33L x24 30.26€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Bulldog 0.33L x24 39.04€') {
        let nval = document.getElementById('Bulldog 0.33L x24 39.04€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Blanche de Bruxelles 0.33L x12 24.16€') {
        let nval = document.getElementById('Blanche de Bruxelles 0.33L x12 24.16€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Erdinger 0.5L x12 18.06€') {
        let nval = document.getElementById('Erdinger 0.5L x12 18.06€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Ichnusa 0.66L x15 20.98€') {
        let nval = document.getElementById('Ichnusa 0.66L x15 20.98€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Ichnusa non filtrata 0.50L x15 21.05€') {
        let nval = document.getElementById('Ichnusa non filtrata 0.50L x15 21.05€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Moretti 0.66L x15 16.35€') {
        let nval = document.getElementById('Moretti 0.66L x15 16.35€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Menabrea 0.66L x15 24.89€') {
        let nval = document.getElementById('Menabrea 0.66L x15 24.89€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Heineken 0.66L x15 20.98€') {
        let nval = document.getElementById('Heineken 0.66L x15 20.98€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Peroni 0.66L x15 16.84€') {
        let nval = document.getElementById('Peroni 0.66L x15 16.84€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Heineken blade 8L x1 34.16€') {
        let nval = document.getElementById('Heineken blade 8L x1 34.16€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Blade Messina c.s. 8L x1 37.82€') {
        let nval = document.getElementById('Blade Messina c.s. 8L x1 37.82€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Leffe Bionda fusto 6L x1 32.94€') {
        let nval = document.getElementById('Leffe Bionda fusto 6L x1 32.94€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Leffe Rouge fusto 6L x1 34.16€') {
        let nval = document.getElementById('Leffe Rouge fusto 6L x1 34.16€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Coca-cola bott.vetro 0.33L x24 17.32€') {
        let nval = document.getElementById('Coca-cola bott.vetro 0.33L x24 17.32€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Coca zero bott.vetro 0.33L x24 17.32€') {
        let nval = document.getElementById('Coca zero bott.vetro 0.33L x24 17.32€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Coca-cola lattina 0.33L x24 13.79€') {
        let nval = document.getElementById('Coca-cola lattina 0.33L x24 13.79€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Coca zero lattina 0.33L x24 13.79€') {
        let nval = document.getElementById('Coca zero lattina 0.33L x24 13.79€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Fanta lattina 0.33L x24 13.79€') {
        let nval = document.getElementById('Fanta lattina 0.33L x24 13.79€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Sprite lattina 0.33L x24 13.79€') {
        let nval = document.getElementById('Sprite lattina 0.33L x24 13.79€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Coca latt.piccola 0.25L x24 12.08€') {
        let nval = document.getElementById('Coca latt.piccola 0.25L x24 12.08€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Coca-cola pet 0.44L x24 22.45€') {
        let nval = document.getElementById('Coca-cola pet 0.44L x24 22.45€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Coca-cola zero pet 0.44L x24 22.45€') {
        let nval = document.getElementById('Coca-cola zero pet 0.44L x24 22.45€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Pepsi lattina 0.33L x24 10.98€') {
        let nval = document.getElementById('Pepsi lattina 0.33L x24 10.98€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Lemonsoda lattina 0.33L x24 12.69€') {
        let nval = document.getElementById('Lemonsoda lattina 0.33L x24 12.69€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Estathe latt lim 0.33L x24 19.64€') {
        let nval = document.getElementById('Estathe latt lim 0.33L x24 19.64€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Estathe latt pes 0.33L x24 19.64€') {
        let nval = document.getElementById('Estathe latt pes 0.33L x24 19.64€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Estathe pet limone 0.50L x24 22.94€') {
        let nval = document.getElementById('Estathe pet limone 0.50L x24 22.94€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Estathe pet pesca 0.50L x24 22.94€') {
        let nval = document.getElementById('Estathe pet pesca 0.50L x24 22.94€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Estathe vetro limone 0.25L x24 21.91€') {
        let nval = document.getElementById('Estathe vetro limone 0.25L x24 21.91€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Estathe vetro pesca 0.25L x24 21.91€') {
        let nval = document.getElementById('Estathe vetro pesca 0.25L x24 21.91€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Chinotto lattina 0.33L x24 12.69€') {
        let nval = document.getElementById('Chinotto lattina 0.33L x24 12.69€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Redbull 0.33L x24 31.96€') {
        let nval = document.getElementById('Redbull 0.33L x24 31.96€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Schweppes lattina 0.33L x24 14.40€') {
        let nval = document.getElementById('Schweppes lattina 0.33L x24 14.40€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Schweppes bott. vetro 0.18L x24 13.66€') {
        let nval = document.getElementById('Schweppes bott. vetro 0.18L x24 13.66€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Lemonsoda bott. vetro 0.20L x24 13.18€') {
        let nval = document.getElementById('Lemonsoda bott. vetro 0.20L x24 13.18€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Gatorade blu 0.50L x12 11.96€') {
        let nval = document.getElementById('Gatorade blu 0.50L x12 11.96€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Gatorade rosso 0.50L x12 11.96€') {
        let nval = document.getElementById('Gatorade rosso 0.50L x12 11.96€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Gatorade limone 0.50L x12 11.96€') {
        let nval = document.getElementById('Gatorade limone 0.50L x12 11.96€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Gatorade lemon ice 0.50L x12 11.96€') {
        let nval = document.getElementById('Gatorade lemon ice 0.50L x12 11.96€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Chinotto lurisia 0.27L x24 24.89€') {
        let nval = document.getElementById('Chinotto lurisia 0.27L x24 24.89€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Gazzosa lurisia 0.27L x24 24.89€') {
        let nval = document.getElementById('Gazzosa lurisia 0.27L x24 24.89€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Aranciata lurisia 0.27L x24 24.89€') {
        let nval = document.getElementById('Aranciata lurisia 0.27L x24 24.89€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Acqua tonica lurisia 0.27L x24 24.89€') {
        let nval = document.getElementById('Acqua tonica lurisia 0.27L x24 24.89€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Coca-cola pet 1L x6 8.54€') {
        let nval = document.getElementById('Coca-cola pet 1L x6 8.54€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Schweppes pet 1L x6 7.93€') {
        let nval = document.getElementById('Schweppes pet 1L x6 7.93€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Pago ace 0.20L x24 19.03€') {
        let nval = document.getElementById('Pago ace 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Pago albicocca 0.20L x24 19.03€') {
        let nval = document.getElementById('Pago albicocca 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Pago ananas 0.20L x24 32.94€') {
        let nval = document.getElementById('Pago ananas 0.20L x24 32.94€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Pago arancia 0.20L x24 19.03€') {
        let nval = document.getElementById('Pago arancia 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Pago mirtillo 0.20L x24 32.94€') {
        let nval = document.getElementById('Pago mirtillo 0.20L x24 32.94€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Pago pesca 0.20L x24 19.03€') {
        let nval = document.getElementById('Pago pesca 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Pago pomodoro 0.20L x24 19.03€') {
        let nval = document.getElementById('Pago pomodoro 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Pago pera 0.20L x24 19.03€') {
        let nval = document.getElementById('Pago pera 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Amita ace 0.20L x24 19.03€') {
        let nval = document.getElementById('Amita ace 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Amita albicocca 0.20L x24 19.03€') {
        let nval = document.getElementById('Amita albicocca 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Amita ananas 0.20L x24 21.35€') {
        let nval = document.getElementById('Amita ananas 0.20L x24 21.35€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Amita arancia 0.20L x24 19.03€') {
        let nval = document.getElementById('Amita arancia 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Amita mirtillo 0.20L x24 21.35€') {
        let nval = document.getElementById('Amita mirtillo 0.20L x24 21.35€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Amita pesca 0.20L x24 19.03€') {
        let nval = document.getElementById('Amita pesca 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Amita pomodoro 0.20L x24 19.03€') {
        let nval = document.getElementById('Amita pomodoro 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Amita pera 0.20L x24 19.03€') {
        let nval = document.getElementById('Amita pera 0.20L x24 19.03€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Crodino 0.10L x48 27.82€') {
        let nval = document.getElementById('Crodino 0.10L x48 27.82€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === '>Campari soda 0.10L x100 92.72€') {
        let nval = document.getElementById('>Campari soda 0.10L x100 92.72€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Bitter 0.10L x48 25.50€') {
        let nval = document.getElementById('San Bitter 0.10L x48 25.50€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Aperol 1L x1 11.96€') {
        let nval = document.getElementById('Aperol 1L x1 11.96€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Ginger beer fever tree 0.2L x24 26.93€') {
        let nval = document.getElementById('Ginger beer fever tree 0.2L x24 26.93€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Ginger beer f.tree ale 0.2L x24 26.93€') {
        let nval = document.getElementById('Ginger beer f.tree ale 0.2L x24 26.93€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Bag in box vino rosso 10L x1 25.62€') {
        let nval = document.getElementById('Bag in box vino rosso 10L x1 25.62€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Bag in box vino bianco 10L x1 25.62€') {
        let nval = document.getElementById('Bag in box vino bianco 10L x1 25.62€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Prosecco Treviso doc 0.75L x6 31.48€') {
        let nval = document.getElementById('Prosecco Treviso doc 0.75L x6 31.48€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Albaluna Cuvee 0.75L x6 20.50€') {
        let nval = document.getElementById('Albaluna Cuvee 0.75L x6 20.50€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Arneis i filari 0.75L x6 28.55€') {
        let nval = document.getElementById('Arneis i filari 0.75L x6 28.55€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Favorita i filari 0.75L x6 28.55€') {
        let nval = document.getElementById('Favorita i filari 0.75L x6 28.55€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Barbera la teresina 0.75L x6 28.55€') {
        let nval = document.getElementById('Barbera la teresina 0.75L x6 28.55€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Dolcetto i filari 0.75L x6 28.55€') {
        let nval = document.getElementById('Dolcetto i filari 0.75L x6 28.55€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Gewurztraminer ken. 0.75L x6 33.55€') {
        let nval = document.getElementById('Gewurztraminer ken. 0.75L x6 33.55€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Piemonte barbera 0.75L x6 16.84€') {
        let nval = document.getElementById('Piemonte barbera 0.75L x6 16.84€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Piemonte dolcetto 0.75L x6 16.84€') {
        let nval = document.getElementById('Piemonte dolcetto 0.75L x6 16.84€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Traminer aromatico IGT 0.75L x6 19.76€') {
        let nval = document.getElementById('Traminer aromatico IGT 0.75L x6 19.76€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === '958 Santero 0.75L x6 29.22€') {
        let nval = document.getElementById('958 Santero 0.75L x6 29.22€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Bag in box vino rosso 10L x1 25.62€') {
        let nval = document.getElementById('Bag in box vino rosso 10L x1 25.62€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Bag in box vino bianco 10L x1 25.62€') {
        let nval = document.getElementById('Bag in box vino bianco 10L x1 25.62€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Amaro del capo 1L x1 18.70€') {
        let nval = document.getElementById('Amaro del capo 1L x1 18.70€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Fernet branca  0.70L x1 17.90€') {
        let nval = document.getElementById('Fernet branca  0.70L x1 17.90€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Jagermeister 1L x1 19.00€') {
        let nval = document.getElementById('Jagermeister 1L x1 19.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Montenegro 1L x1 21.80€') {
        let nval = document.getElementById('Montenegro 1L x1 21.80€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Simone 0.70L x1 15.00€') {
        let nval = document.getElementById('San Simone 0.70L x1 15.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Vecchia Roamgna et.nera 1L x1 24.00€') {
        let nval = document.getElementById('Vecchia Roamgna et.nera 1L x1 24.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Cubical gin 0.70L x1 34.00€') {
        let nval = document.getElementById('Cubical gin 0.70L x1 34.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Bosford gin 1L x1 14.00€') {
        let nval = document.getElementById('Bosford gin 1L x1 14.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Bombay gin 1L x1 21.50€') {
        let nval = document.getElementById('Bombay gin 1L x1 21.50€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Gin del professore mad 0.7L x1 42.00€') {
        let nval = document.getElementById('Gin del professore mad 0.7L x1 42.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Gin del professore mons 0.7L x1 42.00€') {
        let nval = document.getElementById('Gin del professore mons 0.7L x1 42.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Gin pink 47 0.7L x1 23.00€') {
        let nval = document.getElementById('Gin pink 47 0.7L x1 23.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Gin Sabatini 0.7L x1 34.00€') {
        let nval = document.getElementById('Gin Sabatini 0.7L x1 34.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Gordons gin 1L x1 16.00€') {
        let nval = document.getElementById('Gordons gin 1L x1 16.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Hendricks gin 0.70L x1 33.00€') {
        let nval = document.getElementById('Hendricks gin 0.70L x1 33.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Malfy gin limone 1L x1 32.00€') {
        let nval = document.getElementById('Malfy gin limone 1L x1 32.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Malfy gin original 1L x1 32.00€') {
        let nval = document.getElementById('Malfy gin original 1L x1 32.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Malfy gin pomp.rosa 1L x1 32.00€') {
        let nval = document.getElementById('Malfy gin pomp.rosa 1L x1 32.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Tanqueray gin  1L x1 25.00€') {
        let nval = document.getElementById('Tanqueray gin  1L x1 25.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Grappa Julia bianca 0.70L x1 10.50€') {
        let nval = document.getElementById('Grappa Julia bianca 0.70L x1 10.50€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Grappa Julia gialla 0.70L x1 10.50€') {
        let nval = document.getElementById('Grappa Julia gialla 0.70L x1 10.50€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Grappa Nardini 1L x1 24.00€') {
        let nval = document.getElementById('Grappa Nardini 1L x1 24.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Nardini riserva 1L x1 26.00€') {
        let nval = document.getElementById('Nardini riserva 1L x1 26.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Genepy valli occ 0.70L x1 14.50€') {
        let nval = document.getElementById('Genepy valli occ 0.70L x1 14.50€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Limoncello riviera 2L x1 15.00€') {
        let nval = document.getElementById('Limoncello riviera 2L x1 15.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Mirto rosso 0.70L x1 10.00€') {
        let nval = document.getElementById('Mirto rosso 0.70L x1 10.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'San Buca Molinari 0.70L x1 13.00€') {
        let nval = document.getElementById('San Buca Molinari 0.70L x1 13.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Rum Cacique 500 0.70L x1 28.00€') {
        let nval = document.getElementById('Rum Cacique 500 0.70L x1 28.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Rum Kraken 0.70L x1 24.00€') {
        let nval = document.getElementById('Rum Kraken 0.70L x1 24.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Pampero bianco 1L x1 15.00€') {
        let nval = document.getElementById('Pampero bianco 1L x1 15.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Pampero especial 1L x1 16.00€') {
        let nval = document.getElementById('Pampero especial 1L x1 16.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }
    if (valu === 'Rum Don Papa 0.70L x1 37.00€') {
        let nval = document.getElementById('Rum Don Papa 0.70L x1 37.00€').innerHTML;
        document.getElementById('demo').innerHTML = nval;
    }


    console.log(valu);
}
