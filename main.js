//console.log("Hello, world");

const API_URL = 'https://api.thedogapi.com/v1/images/search';


//    const randomDog = async(url) => {
//     try {
//         const res = await fetch(url);
//         const data = await res.json();
//         const img = document.querySelector('img');
//         img.src = data[0].url;
//     } catch (error){
//         console.error(error);
//     }
//    }

    async function randomDog() {
        const res = await fetch(API_URL);
        const data = await res.json();

        const img = document.querySelector('img');
        img.src = data[0].url;
    }

    randomDog();

   //const button = document.querySelector("button");
   
   //button.onclick = randomDog(URL);