const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_6OcbOSDEuvByGMgT9krNEMu1FdVY4ASuJ55FpMeg2ytAAA2KWc5tiWVFK89J4ToP';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?&api_key=live_6OcbOSDEuvByGMgT9krNEMu1FdVY4ASuJ55FpMeg2ytAAA2KWc5tiWVFK89J4ToP';
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
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();

    console.log('Favs');
    console.log(data);

    if ( res.status !== 200 ){
        spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message;
    } else {
        data.forEach( doggie => {
            const section = document.getElementById('favoritesDoggies');
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al lomito de favoritos');
            btn.className = "doggie-button";
            
            btn.appendChild(btnText);
            img.src = doggie.image.url;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        })
    }
}

async function saveFavDoggie(id){
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
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
