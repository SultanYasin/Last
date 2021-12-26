// först skapar jag en bild Array.
const imges = [
    {
        filename: "1.jpg",
        alt: "hair_style"
    },

    {
        filename: "2.jpg",
        alt: "hair_style"
    },

    {
        filename: "3.jpg",
        alt: "hair_style"
    },

    {
        filename: "4.jpg",
        alt: "hair_style"
    },

    {
        filename: "5.jpg",
        alt: "hair_style"
    },

    {
        filename: "6.jpg",
        alt: "hair_style"
    },

    {
        filename: "7.jpg",
        alt: "hair_style"
    },

    {
        filename: "8.jpg",
        alt: "hair_style"
    }
];


/* skapa kopia av bild arrayen för att randera bilderna i. bilderna ska renderas ifrån HTML sidan, därför kommer
jag att kalla varje individ bild igenom bildens sorce. Sorcen i sin tur ska vara det bild namnet på 
denna arrayen som jag  skapade alltså i "const imges[]"*/

const imgeElems = imges.map(
    (img) => `<img alt="${img.alt}" src="./media/img/${img.filename}" 
   onclick = "openLightbox('${img.filename}')" >`).join("");

// --------------------------thumbnail----------------------//

// skapa en kopia av imges för att de ska visas som thumbnail under den stora bilden när man öppnar med hjälp av setMainImg()
const imgThumbs = imges.map(
    (img) => `<img alt ="${img.alt}" 
       src="./media/img/${img.filename}" 
       onclick="setMainImg('${img.filename}')"
         class="thumbnail"> `).join("")

//------------------------------------------------------------------//

//lightboxen ska öppnas när man trycker på en av bilderna 
const openLightbox = (filename) => {
    setMainImg(filename);
    document.querySelector("#lightbox-wrapper").style.display = "flex"
}

/*Funktionen anropas via openlightBox funktionen efter det kommer setMainImge med hjälp av 
setAttribute() å sätta sorcen för denna bilden som jag tryckade på och öppna den i openLightBox  */
const setMainImg = (filename) => {
    document.querySelector("#main-img").
    setAttribute("src", `./media/img/${filename}`);
    setActiveThumbnail();
}

/*sätta en färgat border runt den bilden som visas i openLightbox med 
hjälp av forEach. och if satas, då varje bild som visas i openLightbox
 kommer å ha färgat border runtomkring sig "funktionen ska anropas i setMainImg, preimg , nextimg "
 för att det ska förtsätta och funka.*/

const setActiveThumbnail = () => {
    const thumbs = document.querySelectorAll(".thumbnail");
    thumbs.forEach((thumb) => {
        if (thumb.src === document.querySelector("#main-img").src) {
            thumb.style.border = "2px solid orange"
        } else {
            thumb.style.border = "0px"
        }
    })
};

/* varje gång klicker man på previous button så kommer bilderna rulla 
till baka en bild, det händer igeonm att använda vanlig for loop och
låte "let i" i for loopen gå igenom hella bilderna så typ om bildens index är 
2 och man trycker på knappen så kommer den och ändra den till index 1 istället vilket i sin tur
kommmer och vissas i openLightbox */

const preimg = () => {
    const thumbs = document.querySelectorAll(".thumbnail");
    for (let i = 0; i < thumbs.length; i++) {
        if (
            thumbs[i].src === document.querySelector("#main-img").src && i !== 0
        ) {
            document.querySelector("#main-img")
                .setAttribute("src", thumbs[(i -= 1)].src)
            setActiveThumbnail();
        } else if (
            thumbs[i].src === document.querySelector("#main-img").src && i === 0) {
            document.querySelector("#main-img")
                .setAttribute("src", thumbs[(i += thumbs.length - 1)].src)
            setActiveThumbnail();
        }
    }
}
/*Varje gång man trycker på knappen så kommer "let i" att addera 
1 till sig vilket gör att bilden som ska vissas är den nästa bild efter bilden som visades innan 
alltså om let i var === 1 så blir den lika med 2 istället  */
const nextimg = () => {
    const thumbs = document.querySelectorAll(".thumbnail");
    for (let i = 0; i < thumbs.length; i++) {
        if (
            thumbs[i].src === document.querySelector("#main-img").src &&
            i !== thumbs.length - 1) {
            document.querySelector("#main-img")
                .setAttribute("src", thumbs[i += 1].src)
            setActiveThumbnail();
        } else if (
            thumbs[i].src === document.querySelector("#main-img").src && i === thumbs.length - 1) {
            document.querySelector("#main-img")
                .setAttribute("src", thumbs[0].src)
            setActiveThumbnail();
        }
    }
}
/* stänger lightboxen igenom att ändra stylen på lightboxen från display flrx till display none  */
const closeLightbox = () => {
    document.querySelector("#lightbox-wrapper").style.display = "none"
}

//creat addEventListner to make sure that all files has been uploded

window.addEventListener("load", () => {
    document.querySelector("#img-grid").innerHTML = imgeElems;
    document.querySelector("#thumbnails-wrapper").innerHTML = imgThumbs;
})