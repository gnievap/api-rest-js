const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_6OcbOSDEuvByGMgT9krNEMu1FdVY4ASuJ55FpMeg2ytAAA2KWc5tiWVFK89J4ToP';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?limit=2&api_key=live_6OcbOSDEuvByGMgT9krNEMu1FdVY4ASuJ55FpMeg2ytAAA2KWc5tiWVFK89J4ToP';
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

        img1.src = data[0].url;
        img2.src = data[1].url;
    }
}

async function loadFavoritesDogs() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();

    console.log('Favs');
    console.log(data);

    if ( res.status !== 200 ){
        spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message;
    }
}

async function saveFavDoggies(){
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: 'J48gxM23-'
        }),
    });

    const data = await res.json();

    console.log('Save');
    console.log(res);

    if ( res.status !== 200 ) {
        spanError.innerHTML = "Hubo un error: " + res.status + " " +  data.message;
    }
}

loadRandomDogs();
loadFavoritesDogs();    
