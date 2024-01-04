import React, { useState } from 'react';
import NavbarAluno from '../componentes/NavbarAluno';
import { useNavigate } from 'react-router-dom';
import Modal from '../componentes/Modal';

function ProvasDocente() {
    const [showModal, setShowModal] = useState(false);
    const history = useNavigate();
    const realizar = () => {
        history('/realizarProva');
    }
    const consultar = () => {
        history('/consultarProva');
    }
    return (
        <><NavbarAluno />
            <div className="overflow-x-auto">
                <div className="overflow-x-auto">
                    <div className="hero  min-h-screen bg-base-200">
                        <div className="card shadow-xl w-1290 text-neutral-content rounded-lg bg-base-100 " style={{ width: '70%', marginTop: '20px' }}>
                            <div className="card-body justify-between" style={{}}>
                                <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '1.5rem'}}>
                                    Provas
                                </h1>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Prova</th>
                                        <th>Data</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='text-black rounded-md'>
                                    <tr>
                                        <th>1</th>
                                        <td>DAA</td>
                                        <td>14/12/2023</td>
                                        <td className="mt-6 flex items-center justify-end gap-x-6">
                                            <button className="btn btn-sm" type="button" onClick={consultar}>
                                                Consultar
                                            </button>
                                        </td>
                                    </tr>
                                    <hr></hr>
                                    <tr>
                                        <th>2</th>
                                        <td>MFES</td>
                                        <td>16/12/2023</td>
                                        <td className="mt-6 flex items-center justify-end gap-x-6">
                                            <button className="btn btn-sm" type="button" onClick={consultar}>
                                                Consultar
                                            </button>
                                        </td>
                                    </tr>
                                    <hr></hr>
                                    <tr>
                                        <th>3</th>
                                        <td>RAS</td>
                                        <td>03/01/2024</td>
                                        <td className="mt-6 flex items-center justify-end gap-x-6">
                                            <button className="btn btn-sm btn-accent" 
                                            onClick={realizar}
                                            >
                                                Realizar
                                            </button>
                                        </td>
                                    </tr>
                                    <hr></hr>
                                    <tr>
                                        <th>4</th>
                                        <td>CP</td>
                                        <td>05/01/2024</td>
                                        <td className="mt-6 flex items-center justify-end gap-x-6">
                                        </td>
                                    </tr>
                                    <hr></hr>
                                    <tr>
                                        <th>5</th>
                                        <td>ESR</td>
                                        <td>06/01/2024</td>
                                        <td className="mt-6 flex items-center justify-end gap-x-6">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProvasDocente;