
document.querySelectorAll(".carousel").forEach(carousel =>{
    // list of all the items in the carousel
    const items = carousel.querySelectorAll(".carousel__item");
    // generate the HTML for each individual circular button
    const buttonHtml = Array.from(items, () =>{ //call back function
        return `<span class = "carousel__button"></span>`; //same html as the code in html doc
    }); //create a new array of 3 items and the function will run for every item in the list
     
  
    /*before end of carousel element we will insert html*/
    carousel.insertAdjacentHTML("beforeend", `
      <div class = ".carousel__nav">
       ${buttonHtml.join("")}
      </div>
    `);

    //activate button
    const buttons = carousel.querySelectorAll("carousel__button");

    buttons.forEach((button, i) => {
       button.addEventListener("click", () => {
          //unselect all the items 
          items.forEach(item => item.classList.remove("carousel__item--selected"));
          button.forEach(button => button.classList.remove("carousel__button--selected"));
       
          items[i].classList.add("carousel__item--selected");
          button.classList.add("carousel__button--selected");
          
        });
    });

    //activate the button when the class first loads up else it shows as blank page
    items[0].classList.add("carousel__item--selected");
    buttons[0].classList.add("carousel__button--selected");

    //console.log(buttonHtml); //displays the buttons on the console log on the inspect of the website
});

