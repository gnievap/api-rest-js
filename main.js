//console.log("Hello, world");

const URL = 'https://api.thedogapi.com/v1/images/search';

// fetch(URL)
//    .then(res => res.json())
//    .then(data => {
//       const img = document.querySelector('img');
//       img.src = data[0].url;
//    });

   const randomDog = async(url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const img = document.querySelector('img');
        img.src = data[0].url;
    } catch (error){
        console.error(error);
    }
   }

   const button = document.querySelector("button");
   
   button.onclick = randomDog(URL);