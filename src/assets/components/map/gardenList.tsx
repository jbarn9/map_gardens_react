import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Gardens } from '../../../types/form.interfaces';
import { gardenServices } from '../../../services/gardenServices';

export default function GardenList({handleSeeGarden, handleGardenIndex, handleSeeGardenDetails, gardenDetails}: {handleSeeGarden: (long: number, lat: number, id: string) => void, handleGardenIndex: (id: string) => void, handleSeeGardenDetails: (id: string) => void, gardenDetails: string | null  }) {
    const [response, setResponse] = useState<Gardens[]>([]);
    // Icons
    const facebook = <FontAwesomeIcon icon={faFacebook} size='lg'/>
    const instagram = <FontAwesomeIcon icon={faInstagram} size='lg'/>
    const youtube = <FontAwesomeIcon icon={faYoutube} size='lg'/>

    useEffect(() => {
        gardenServices.getGardens().then((gardens) => {
            if (gardens.success) {
                setResponse(gardens.data);
            } else {
                console.error('Error fetching gardens:', gardens.error);
            }
        });
    }, []);

    const getLarLongSeeGarden = (long: number, lat: number, id: string) => {
       handleSeeGarden(long, lat, id);
    }
    // Handle see garden index
    const getGardenIndex = (id: string) => {
        handleGardenIndex(id);
    }
    // Handle see garden details
    const seeGardenDetails = (id: string) => {
        handleSeeGardenDetails(id);
    }

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
                                        <a className='col-span-1 item-center  gap-2'><FontAwesomeIcon icon={faEye} color='white'/></a>
                                    </div>
                                </div>
                            </div> 
                        )}
                    </div>
                    <div className="card-body align-center">
                        <h2 className="card-title">{garden.name}</h2>
                        <p className='description'>{garden.description}</p>
                        <p className='email'>{garden.email}</p>
                        <div className="card-actions">
                            <div className='container flex justify-between '>
                                <div className='network-actions col-span-1 flex justify-center gap-4'>
                                    <div className='flex items-center gap-2 fa-brands'>
                                        <a className='col-span-1 item-center  gap-2' target='_blank'>{facebook}</a>
                                    </div>
                                    <div className='flex items-center gap-2 fa-brands'>
                                        <a className='col-span-1 item-center  gap-2' target='_blank' >{instagram}</a>
                                    </div>
                                    <div className='flex items-center gap-2 fa-brands'>
                                        <a className='col-span-1 item-center  gap-2' target='_blank'>{youtube}</a>
                                    </div>
                                </div>
                                <button className="btn btn-primary" onClick={() => {
                                    getLarLongSeeGarden(garden.address.long, garden.address.lat, garden.id);
                                    getGardenIndex(garden.id);
                                }}>Voir</button>
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