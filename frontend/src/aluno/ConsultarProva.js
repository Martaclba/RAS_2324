import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import NavbarAluno from "../componentes/NavbarAluno";


function RealizarProva() {
  const history = useNavigate();
  const questao2 = () => {
    history('/realizarProva2');
  }
  const questao3 = () => {
    history('/realizarProva3');
  }
  const voltar = () => {
    history('/provasAluno');
  }

  const consultar = () => {
    //history('/consultar');
}


  return (
    <>
      <NavbarAluno />
      <div className="hero min-h-screen bg-base-200">
        <div
          className="card w-1290 text-neutral-content rounded-lg bg-base-100 "
          style={{width: "90%", marginTop: '100px'}}
        >
          <div className="card-body">
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h1
                    className="text-base font-semibold leading-10 text-gray-900"
                    style={{ fontSize: "2rem"}}
                  >
                    ASCN - Teste Teórico {/* ir buscar ao microserviço */}
                  </h1>
                  <div className="sm:col-span-4">
                  </div>
                  <br></br>
                  <hr></hr>
                  <hr></hr>
                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                    <label
                        htmlFor="questao"
                        className="block text-md font-medium leading-10 text-gray-900"
                      >
                        Questão 1
                      </label>
                      <label
                        htmlFor="questao"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        A complexidade da replicação de um serviço multi-camada não varia de acordo com o componente alvo (p.ex., servidor web, servidor aplicacional, base de dados) 
                        a replicar. Indique e justifique se concorda ou não com esta afirmação.
                      </label>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="tipo"
                        className="block text-md font-medium text-gray-900"
                      >
                        Resposta
                      </label>
                      <div className="mt-2">
                      <label
                        htmlFor="resposta"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Concordo. A complexidade da replicação de um serviço multi-camada geralmente não varia significativamente com o componente alvo. A replicação envolve desafios semelhantes, 
                        como garantir consistência, balanceamento de carga e coordenação entre instâncias, independentemente do tipo de componente (servidor web, aplicacional, base de dados)
                      </label>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <label className="text-black" style={{color: 'oklch(var(--p))'}}>4.5/5 valores</label>
                  <hr></hr>
                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                    <label
                        htmlFor="questao"
                        className="block text-md font-medium leading-10 text-gray-900"
                      >
                        Questão 2
                      </label>
                      <label
                        htmlFor="questao"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        A complexidade da replicação de um serviço multi-camada não varia de acordo com o componente alvo (p.ex., servidor web, servidor aplicacional, base de dados) 
                        a replicar. Indique e justifique se concorda ou não com esta afirmação.
                      </label>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="tipo"
                        className="block text-md font-medium text-gray-900"
                      >
                        Resposta
                      </label>
                      <div className="mt-2">
                      <label
                        htmlFor="resposta"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Opção C.
                      </label>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <label className="text-black" style={{color: 'oklch(var(--p))'}}>2/2 valores</label>
                  <hr></hr>
                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                    <label
                        htmlFor="questao"
                        className="block text-md font-medium leading-10 text-gray-900"
                      >
                        Questão 3
                      </label>
                      <label
                        htmlFor="questao"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        A complexidade da replicação de um serviço multi-camada não varia de acordo com o componente alvo (p.ex., servidor web, servidor aplicacional, base de dados) 
                        a replicar. Indique e justifique se concorda ou não com esta afirmação.
                      </label>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="tipo"
                        className="block text-md font-medium text-gray-900"
                      >
                        Resposta
                      </label>
                      <div className="mt-2">
                      <label
                        htmlFor="resposta"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        <p>F (afirmação 1)</p>
                        <p>V (afirmação 2)</p>
                        <p style={{color: 'red'}}>V (afirmação 3)</p>
                        <p>F (afirmação 4)</p>
                        </label>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <label className="text-black" style={{color: 'oklch(var(--p))'}}>3/4 valores</label>
                </div>
              </div>
              
            <div className="flex justify-between">
                
                <label 
                    className="text-base text-md font-bold leading-10 text-gray-900"
                    style={{fontSize: '22px'}}
                    >
                <label 
                    className="text-base text-md font-bold leading-10 text-gray-900"
                    style={{fontSize: '22px'}}
                    >
                    Classificação:
                </label><span> </span>
                    15/20 valores
                </label>
                
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        className="btn btn-sm btn-primary" type="button"
                        onClick={voltar}
                        >
                        Voltar
                    </button>
                </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RealizarProva;