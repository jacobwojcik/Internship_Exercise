const input = document.querySelectorAll("input");
const alert = document.querySelector("#alert");
const rate = document.querySelector("#rate");
const api_url = "http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json";

// asynchronous function to get a exchange rate from the api
async function get_exchange_rate(){
    try{
        const response = await fetch(api_url);
        const json = await response.json();
        return json.rates[0].mid;
    } catch(e){
        console.error(e);
    }
};

// setting event listeners on the inputs
const set_event_listeners = (gbp_rate) =>{

    const max_value = 100000000000000000000000; // it seems to be a reasonable max value ;)
    
    input[0].addEventListener("keyup", () => {

        //handling invalid input
        if(input[0].value  < 0 || input[0].value > max_value){
            input[0].value = "";
            input[1].value = "";
            input[0].blur();
            alert.innerHTML = "Please enter a valid amount";
        }
        else
            alert.innerHTML = "";
            input[1].value = (input[0].value * gbp_rate).toFixed(2); // rounding to 2 decimal places
        });
        
    input[1].addEventListener("keyup", () => {

        //handling invalid input
        if(input[1].value  < 0 || input[1].value > max_value){
            input[0].value = "";
            input[1].value = "";
            input[1].blur();
            alert.innerHTML = "Please enter a valid amount";

        }
        else
            alert.innerHTML = "";
            input[0].value = (input[1].value / gbp_rate).toFixed(2);
    });
}

get_exchange_rate().then(gbp_rate => {
    if(rate){
    rate.innerHTML = "1 GBP = " + gbp_rate.toFixed(2).bold() +" PLN".bold();
    set_event_listeners(gbp_rate);
    }
});