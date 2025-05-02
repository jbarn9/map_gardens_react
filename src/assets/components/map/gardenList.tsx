import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Gardens } from '../../../types';

export default function GardenList() {
    const [response, setResponse] = useState<Gardens[]>([]);
        useEffect(() => {
            fetch('http://localhost:3001/gardens/all')
            .then((response) => response.json())
            .then((data) => { 
                setResponse(data.gardens);
            })
            .catch((error) => console.error('Error:', error));
    }, []);
    

  return (
    <div className='fixed carousel max-width'>
        {response.length > 0 ? (
            response.map((garden) => (
            <div className="carousel-item md:w-1/4">
                <div className="card bg-base-100 image-full w-100 shadow-sm">
                    <figure>
                        <img
                            src="https://www.lhaylesroses.fr/images/3-Cadre-de-vie/developpementdurable/1.jpg"
                            alt="garden picture" />
                    </figure>
                    <div className='network-hd'>
                        {/* Display garden network */}
                        {garden.networks && (
                            <div>
                                <div className="flex justify-between">
                                    <div >
                                        {garden.networks.name} 
                                    </div>
                                    <div className='pr-3'>
                                        <FontAwesomeIcon icon={faEye} />
                                    </div>
                                </div>
                            </div> 
                        )}
                    </div>
                    <div className="card-body align-center">
                        <h2 className="card-title">{garden.name}</h2>
                        <p className='description'>{garden.description}</p>
                        <p className='email'>{garden.email}</p>
                        <div className="card-actions self-end">
                            <div className='flex justify-between'>
                                <a><FontAwesomeIcon icon={faPhone}/></a>
                                <button className="btn btn-primary">Voir</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    ))
    ) : (
        <p>Aucun jardin trouvé.</p>
    )}
    <div/>
</div>
)};