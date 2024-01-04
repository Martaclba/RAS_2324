import React, { useState } from 'react';
import NavbarDocente from '../componentes/NavbarDocente';
import { useNavigate } from 'react-router-dom';
import Modal from '../componentes/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProvasDocente() {
    const notify = () => toast("*notificação x*");
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const history = useNavigate();
    const handleClick = () => {
        history('/consultar');
    }
    return (
        <><NavbarDocente />
            <div className="overflow-x-auto">
                <div className="overflow-x-auto">
                    <div className="hero  min-h-screen bg-base-200">
                        <div className="card shadow-xl w-1290 text-neutral-content rounded-lg bg-base-100 " style={{ width: '70%', marginTop: '20px' }}>
                            <div className="card-body justify-between" style={{}}>
                                <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '1.5rem'}}>
                                    Provas
                                </h1>
                                <button
                                    className="btn btn-md btn-secondary"
                                    style={{width: '120px', lineHeight: '20px', alignContent: 'center'}}
                                    onClick={() => {
                                        // Add the logic for the button click here
                                    }}
                                >
                                    Classificação Automática
                                </button>
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
                                            <button className="btn btn-sm btn-primary" onClick={() => setShowModal2(true)} >
                                                Publicar Classificações
                                            </button>
                                            <button className="btn btn-sm btn-accent" onClick={() => setShowModal(true)}>
                                                Partilhar
                                            </button>
                                            <button className="btn btn-sm" type="button" onClick={handleClick}>
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
                                        <button className="btn btn-sm btn-primary" onClick={() => setShowModal2(true)} >
                                                Publicar Classificações
                                            </button>
                                            <button className="btn btn-sm btn-accent" onClick={() => setShowModal(true)}>
                                                Partilhar
                                            </button>
                                            <button className="btn btn-sm" type="button" onClick={handleClick}>
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
                                            <button className="btn btn-sm btn-primary" onClick={() => setShowModal2(true)} >
                                                Publicar Classificações
                                            </button>
                                            <button className="btn btn-sm btn-accent" onClick={() => setShowModal(true)}>
                                                Partilhar
                                            </button>
                                            <button className="btn btn-sm" type="button" onClick={handleClick}>
                                                Consultar
                                            </button>
                                        </td>
                                    </tr>
                                    <hr></hr>
                                    <tr>
                                        <th>4</th>
                                        <td>CP</td>
                                        <td>05/01/2024</td>
                                        <td className="mt-6 flex items-center justify-end gap-x-6">
                                            <button className="btn btn-sm btn-primary" onClick={() => setShowModal2(true)} >
                                                Publicar Classificações
                                            </button>
                                            <button className="btn btn-sm btn-accent" onClick={() => setShowModal(true)}>
                                                Partilhar
                                            </button>
                                            <button className="btn btn-sm" type="button" onClick={handleClick}>
                                                Consultar
                                            </button>
                                        </td>
                                    </tr>
                                    <hr></hr>
                                    <tr>
                                        <th>5</th>
                                        <td>ESR</td>
                                        <td>06/01/2024</td>
                                        <td className="mt-6 flex items-center justify-end gap-x-6">
                                            <button className="btn btn-sm btn-primary" onClick={() => setShowModal2(true)} >
                                                Publicar Classificações
                                            </button>
                                            <button className="btn btn-sm btn-accent" onClick={() => setShowModal(true)}>
                                                Partilhar
                                            </button>
                                            <button className="btn btn-sm" type="button" onClick={handleClick}>
                                                Consultar
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isVisable={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <h2 className="card-title text-lg font-semibold mt-4">Partilhar</h2>
                    <div className="divider my-4"></div>
                    <input type="text" placeholder="Email" className="input input-xs input-bordered w-full max-w-xs" />

                    <div className="flex justify-center mt-4">
                        <button className="btn btn-sm btn-outline btn-error mr-4" type="button">Cancelar</button>
                        <button className="btn btn-sm btn-primary" type="button" onClick={notify}>Partilhar
                        <ToastContainer 
                          position="bottom-center"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="light"
                          /></button>
                    </div>

                </div>
            </Modal>
            <Modal isVisable={showModal2} onClose={() => setShowModal2(false)}>
                <div className="p-6">
                    <h2 className="card-title text-lg font-semibold mt-4">Publicar Classificações prova x</h2>

                    <div className="flex justify-center mt-4">
                        <button className="btn btn-sm btn-outline btn-error mr-4" type="button">Cancelar</button>
                        <button className="btn btn-sm btn-primary" ype="button" onClick={notify}>Partilhar
                        <ToastContainer 
                          position="bottom-center"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="light"
                          /></button>
                    </div>

                </div>
            </Modal>
        </>
    );
};

export default ProvasDocente;