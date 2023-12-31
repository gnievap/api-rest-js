const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
    headers: {'X-API-KEY': 'live_6OcbOSDEuvByGMgT9krNEMu1FdVY4ASuJ55FpMeg2ytAAA2KWc5tiWVFK89J4ToP'}
});
//api.defaults.headers.common['X-API-KEY'] = 'live_6OcbOSDEuvByGMgT9krNEMu1FdVY4ASuJ55FpMeg2ytAAA2KWc5tiWVFK89J4ToP';

const API_URL_RANDOM = 'images/search?limit=2';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';

const spanError = document.getElementById('error');

async function loadRandomDogs() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

    console.log('Random');
    console.log(data);

    if ( res.status !== 200 ){
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const fav_button1 = document.getElementById('fav_button1');
        const fav_button2 = document.getElementById('fav_button2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        fav_button1.onclick = () => saveFavDoggie(data[0].id);
        fav_button2.onclick = () => saveFavDoggie(data[1].id);
    }
}

async function loadFavoritesDogs() {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'live_6OcbOSDEuvByGMgT9krNEMu1FdVY4ASuJ55FpMeg2ytAAA2KWc5tiWVFK89J4ToP',
        },
    });
    const data = await res.json();

    console.log('Favs');
    console.log(data);

    if ( res.status !== 200 ){
        spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message;
    } else {
        const section = document.getElementById('favoritesDoggies');
        section.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Lomitos favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach( doggie => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al lomito de favoritos');
            btn.className = "doggie-button";

            img.src = doggie.image.url;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavDoggie(doggie.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        })
    }
}

async function saveFavDoggie(id){
    const { data, status } = await api.post('/favourites', {
        image_id: id,
    });
    // const res = await fetch(API_URL_FAVORITES, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': 'live_6OcbOSDEuvByGMgT9krNEMu1FdVY4ASuJ55FpMeg2ytAAA2KWc5tiWVFK89J4ToP',
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     }),
    // });

    // const data = await res.json();

    console.log('Save');
    //console.log(res);

    if ( status !== 200 ) {
        spanError.innerHTML = "Hubo un error: " + status + " " +  data.message;
    } else {
        console.log('Lomito guardado en favoritos');
        loadFavoritesDogs();
    }
}

async function deleteFavDoggie(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'live_6OcbOSDEuvByGMgT9krNEMu1FdVY4ASuJ55FpMeg2ytAAA2KWc5tiWVFK89J4ToP',
        },
    });
    const data = await res.json();

    if ( res.status !== 200 ) {
        spanError.innerHTML = "Hubo un error: " + res.status + " " +  data.message;
    } else {
        console.log('Lomito eliminado de favoritos');
        loadFavoritesDogs();
    }
}

async function uploadLomitoPhoto(){
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'live_6OcbOSDEuvByGMgT9krNEMu1FdVY4ASuJ55FpMeg2ytAAA2KWc5tiWVFK89J4ToP' 
        },
        body: formData,
    });

    const data = await res.json();

    if ( res.status !== 201 ){
        spanError.innerHTML = `Hubo un error al subir lomito: ${res.status} ${data.message}`
    } else {
        console.log('Foto de michi subida');
        console.log({ data });
        console.log( data.url );
        saveFavDoggie( data.id );
        loadFavoritesDogs();
    }
}

loadRandomDogs();
loadFavoritesDogs();    
