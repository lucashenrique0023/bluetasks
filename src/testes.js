const letras = [ "10", "20", "30"];

const [ a, b, c, d] = letras;

console.log(`${a}, ${b}, ${c}, ${d}`);

const [ ,num2,] = letras;

console.log(num2);

const Carro = {
    marca: "celta",
    ano: 2008,
    km: [ 
        {
            marca2: "moto"
        }, 
        {
            marca2: "patinete"
        }
    ]
}

const { marca, ano, marca2 } = Carro;

const ki = Carro.km;

console.log(ki);

console.log(`${marca}, ${ano}, ${marca2}`);