const parImpar = process.argv[2]
const number = process.argv[3]

const numeroAleatorioEntreZeroEDez = Math.floor(Math.random() * 10)
const soma = parseInt(number)+parseInt(numeroAleatorioEntreZeroEDez)
console.log(numeroAleatorioEntreZeroEDez)
console.log(soma)

const result = () =>{
    if(soma%2===0){
        if(parImpar === "par"){
        console.log(`Você escolheu par e o computador escolheu ímpar. O resultado foi ${soma}.Você ganhou!`)
        }else if(parImpar === "impar"){
            console.log(`Você escolher ímpar e o computador escolheu par. O resultado foi ${soma}.Você perdeu!`)
        }
    }
    else{
        if(parImpar==="impar"){
            console.log(`Você escolher ímpar e o computador escolher par. O resultado foi ${soma}. Você ganhou!`)
        }else if(parImpar==="par"){
            console.log(`Você escolher par e o computador escolher ímpar. O resultado foi ${soma}. Você perdeu!`)
        }

        
    }
}

result()