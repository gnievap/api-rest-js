//console.log("Hello, world");

const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=3';


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

        console.log(data);
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        //img.src = data[0].url;
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

    }

    randomDog();

   //const button = document.querySelector("button");
   
   //button.onclick = randomDog(URL);