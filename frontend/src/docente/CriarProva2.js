import React, { useState } from "react";
import NavbarDocente from "../componentes/NavbarDocente";
import { useNavigate } from 'react-router-dom';


function CriarProva2() {
  const history = useNavigate();
  const voltar = () => {
      history('/criarProva');
  }
  const continuar = () => {
    history('/salas');
  }
    return (
        <><NavbarDocente />
        <div className="hero min-h-screen bg-base-200">
            <div className="card shadow-xl w-1290 text-neutral-content rounded-lg bg-base-100 " style={{width: '70%'}}>
                <div className="card-body">
                <form> 
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '2rem' }}>
                                Criar Prova
                            </h1>
                            <hr></hr>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="provaData" className="block text-md font-medium leading-6 text-gray-900">
                                        Data
                                    </label>
                                    <div className="mt-1">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="date"
                                                name="provaData"
                                                id="provaData"
                                                autoComplete="provaData"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Nome da prova"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <label htmlFor="provaHora" className="block text-md font-medium leading-6 text-gray-900">
                                        Hora
                                    </label>
                                    <div className="mt-1">
                                        <div className="flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="provaHoraHoras"
                                                id="provaHoraHoras"
                                                autoComplete="provaHoraHoras"
                                                className="block w-1/2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Horas"
                                            />
                                            <span className="px-2" style={{ color: 'black', fontSize: '12px' }}>: </span>
                                            <input
                                                type="text"
                                                name="provaHoraMinutos"
                                                id="provaHoraMinutos"
                                                autoComplete="provaHoraMinutos"
                                                className="block w-1/2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Minutos"
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="sm:col-span-2">
                                    <label htmlFor="provaDuracao" className="block text-md font-medium leading-6 text-gray-900">
                                        Duração (minutos)
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="number"
                                            name="provaDuracao"
                                            id="provaDuracao"
                                            autoComplete="provaDuracao"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Duração da prova"
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button className="btn btn-sm btn-outline btn-error" type="button" 
                        onClick={voltar}
                    >
                        Voltar
                    </button>
                    <button
                        className="btn btn-sm btn-primary" type="button"
                        onClick={continuar}
                        >
                        Continuar
                    </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CriarProva2;
