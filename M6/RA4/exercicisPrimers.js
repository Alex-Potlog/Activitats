const producte = {
    S124234G : {
        Descripcio: "Samarreta",
        preu : 45,
        colors : ["blau", "negre", "blanc"],
        stock : {
            "M":{"blau":5,"negre":10,"blanc":7},
            "L":{"blau":2,"negre":5,"blanc":1},
            "XL":{"blau":4,"negre":7,"blanc":0}
        }
    },
    P785745Y : {
        Descripcio: "Pantaló",
        preu : 84,
        colors : ["blau", "negre"],
        stock : {
            "M":{"blau":5,"negre":10},
            "L":{"blau":2,"negre":5},
            "XL":{"blau":4,"negre":7}
        }
    },
    A234578W : {
        Descripcio: "Abric",
        preu : 129,
        colors : ["blau", "verd"],
        stock : {
            "M":{"blau":1,"verd":0},
            "L":{"blau":7,"verd":15},
            "XL":{"blau":4,"verd":3}
        }
    }
};

console.log(producte.S124234G.colors.length);

console.log(producte.S124234G.stock.M.blanc);

const totalTallaLBlau = producte.S124234G.stock.L.blau + producte.P785745Y.stock.L.blau + producte.A234578W.stock.L.blau;
console.log(totalTallaLBlau);

const totalBlau = 
    producte.S124234G.stock.M.blau + producte.S124234G.stock.L.blau + producte.S124234G.stock.XL.blau +
    producte.P785745Y.stock.M.blau + producte.P785745Y.stock.L.blau + producte.P785745Y.stock.XL.blau +
    producte.A234578W.stock.M.blau + producte.A234578W.stock.L.blau + producte.A234578W.stock.XL.blau;
console.log(totalBlau);
const nom = "Pere";
const cognom = "Garcia";
const client = {
    nom : 'Ramon',
    cognom : 'Llull',
    naixement : '1232',
    nomSencer : function() {
        return this.nom + " " + this.cognom;
    }
};

console.log(client.nomSencer());

const client2 = {
    nom : 'Ramon',
    cognom : 'Llull',
    naixement : '1232',
    nomSencer : () => {
        return nom + " " + cognom;
    }
};

console.log(client2.nomSencer());