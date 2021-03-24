import React, { useState } from 'react'
import listaDeAcoes from "../arquivos/acoes.json"
import "./acoes.css"



function Acoes () {
    const [sorteados,setSorteados] = useState([])
    const [botao,setBotao] =useState(true)
    const [numeroItens,setNumeroItens]= useState(5)
    const listaacoes = Object.keys(listaDeAcoes)

    const geraLista = () => {
        var lista = []
        var index = 1
        listaacoes.forEach(element => {
            let item =(
                <p key={`key${index}`}>
                    <span className="coluna1">{index}</span>
                    <span className="coluna2">{element}</span>
                    <span className="coluna3">{listaDeAcoes[element]}</span>
                    </p>
            )
            lista.push(item)
            index++
        })
        return lista
    }
    const reinicia = () => {
        setSorteados([])
        setBotao(true)
    }
    const sorteia = () => {
        const newArray = [...sorteados]
        console.log(newArray.length)
        console.log(listaacoes.length)
        if (newArray.length === numeroItens-1) {
            setBotao(false)
        }
        var fim = false
        var numero
        while (!fim) {
            numero = Math.floor(Math.random() * listaacoes.length )
            const teste = newArray.indexOf(numero)
            if (teste === -1) {
                newArray.push(numero)
                setSorteados(newArray)
                fim = true
            }
        }
    }
    const acoesSorteadas = () => {
        console.log("sorteados")
        var lista =[]
        var i = 1
        if (sorteados.length > 0) {
            sorteados.forEach(element => {
                listaacoes.forEach((nome,index) => {
                    if(index ===element) {
                        let item =(
                            <p key={`keyS${i}`}>
                                <span className="coluna1">{element+1}</span>
                                <span className="coluna2">{nome}</span>
                                <span className="coluna3">{listaDeAcoes[nome]}</span>
                            </p>
                        )
                        lista.push(item)
                        i++
                    }
                })
            })
        }
        return lista
    }
    const handleChange = (e) => {   
        setNumeroItens(e.target.value)
        reinicia()

    }

    return (
        <div>
            <div className = "div-main">
            <div>
                {geraLista()}
            </div>
            <input type="number" defaultValue={numeroItens} onChange={handleChange}></input>
            {botao && <button onClick = {() => sorteia()}>Sorteia</button>}
            {!botao && <button onClick = {() => reinicia()}>Reinicia</button>}
            <ul>
                {acoesSorteadas()}
            </ul>
            </div>

        </div>
    )
}
export default Acoes