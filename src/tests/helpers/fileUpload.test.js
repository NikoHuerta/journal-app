import cloudinary from 'cloudinary';

import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'nhf', 
    api_key: '439218735257183', 
    api_secret: 'gBsuTq6ose_We89QsHUf7b2K3f8',
    secure: true
});

describe('Pruebas en fileUpload', () => {
   
    jest.setTimeout(5000);

    test('Debe de cargar un archivo y retornar el URL', async () => {
        
        const resp = await fetch('https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png');
        const blob = await resp.blob();

        const fileImg = new File([blob], 'foto.png');
        const url = await fileUpload(fileImg);

        expect(typeof url).toBe('string');

        //Borrar imagen por ID
        const segments = url.split('/');
        const imgId = segments[segments.length - 1].replace('.png', '');

        const { deleted } = await cloudinary.v2.api.delete_resources(imgId);
        // {
        //     deleted: { gzd5a9lc0uzbruavm6y6: 'deleted' },
        //     deleted_counts: { gzd5a9lc0uzbruavm6y6: { original: 1, derived: 0 } },
        //     partial: false,
        //     rate_limit_allowed: 500,
        //     rate_limit_reset_at: 2021-12-27T18:00:00.000Z,
        //     rate_limit_remaining: 494
        // }
        expect(deleted[imgId]).toBe('deleted');
    });

    test('Debe de retornar un error', async () => {
        
        const fileImg = new File([], 'foto.png');
        const url = await fileUpload(fileImg);
        //console.log(url);
        expect(url).toBe(null);
    });
    
});
