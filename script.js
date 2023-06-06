const text=document.getElementById("quote");
const author=document.getElementById("author");



const getNewQuote = async () =>
{
    //api for quotes
    var url="https://type.fit/api/quotes";    

    // fetch the data from api
    const response=await fetch(url);
    console.log(typeof response);
    //convert response to json and store it in quotes array
    const allQuotes = await response.json();

    // Generates a random number between 0 and the length of the quotes array
    const indx = Math.floor(Math.random()*allQuotes.length);

    //Store the quote present at the randomly generated index
    const quote=allQuotes[indx].text;
    
    //Store the author of the respective quote
    const auth=allQuotes[indx].author;

    if(auth==null)
    {
        author = "Anonymous";
    }
 
    //function to dynamically display the quote and the author
    text.innerHTML=quote;
    author.innerHTML="~ "+auth;
    
}

copyBtn = document.querySelector(".copy"),
copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(text.innerHTML);
});

speechBtn = document.querySelector(".speech"),
synth = speechSynthesis;
speechBtn.addEventListener("click", ()=>{
    let utterance = new SpeechSynthesisUtterance(`${text.innerHTML} by ${author.innerHTML}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    
});


getNewQuote();
