const addingContent = document.getElementById('content');
const loadingScreen = document.getElementById("loading-screen");
const section = document.getElementById('main_content');
const themeMode = document.getElementById('theme_mode');
const imgElement = themeMode.querySelector("img");
const filterBar = document.getElementById("filter");
const nameFilter = document.getElementById('filter_by_name');
const continentFilter = document.getElementById('filter_by_continent');
 


loadingScreen.classList.remove('hidden');// remove the hidden class from the loading screen
section.style.display = 'none'; //initially dont display the section part of the screen
addingContent.style.display = 'none'; // initially dont display the content of the contries.

let cachedContent = null; // create a cheche to save the contents of the page and set it to null

//create an async function to call country data from API.
async function fetchData() {    
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
      const data = await response.json();

      // Process the data. different Api return different data... in this cast the data retuned is a array.
        const results = [];        
      data.forEach(function (obj) {
        //   console.log(obj)
          const countryFlag = obj.flags.png; 
          const countryFlagAlt = obj.flags.alt;
          const countryName = obj.name.common;
          const countryPopulation = obj.population;
          const countryRegion = obj.region;
          const countryCapital = obj.capital && (obj.capital[0] || obj.capital[1]);
          const countrySubRegion = obj.subregion;
          const countryTopLevelDomain = obj.tld && (obj.tld[0] || obj.tld[0]);
          const countryCurrency = obj.currencies ? obj.currencies[Object.keys(obj.currencies)[0]].name : 'NO CURRENCY AVAILABLE IN API';
          const countryLanguage = obj.languages ? obj.languages[Object.keys(obj.languages)[0]] :'No LANGUAGE AVAILABLE';
          const countryBorder = obj.borders;
          const countryContinent = obj.continents;
          
          //push all processed data into the created array holder.
          results.push({
              countryFlag,
              countryFlagAlt,
              countryName,
              countryPopulation,
              countryRegion,
              countryCapital,
              countrySubRegion,
              countryTopLevelDomain,
              countryCurrency,
              countryLanguage,
              countryBorder,
              countryContinent
            });
            
        });
        
        return results;
        
    } catch (error) {
        console.error('Error:', error);
    }
}

const apiContent = await fetchData()//Run the  retrieve the contents and save the array of results in apiContent. i could

//create the countries on the page.
createCountry();
handleFilterChange() // search by continent run now!!!... cant remember how i got to think of this idea but it worked

//create a country function that creates html elements based on the api data
function createCountry() {
    //calling the cache if available to render its content to avoid waiting for the page to load everytime else load from apiContent
    if (cachedContent !== null) {
        loadingScreen.style.display = 'none';
        addingContent.innerHTML = cachedContent;
        return;
    } else {
        
        loadingScreen.style.display = 'none';
        addingContent.style.display = 'flex';
        section.style.display = 'flex';
        
        // A forEach method for the array content od the apiContent to create and render the data
        apiContent.forEach(function (country, index) {
            const html = `  
            <div data-index=${index} id="country${index}" class="country">
            
            <img src="${country.countryFlag}" alt="${country.countryFlagAlt}" id="country_image">
            <h2 id="country_name" class="flow_layout_row">${country.countryName}</h2>
            <div id="population" class="flow_layout_row">
            <h4 id="population_title">Populaton:</h4>
            <p id="population_value">${country.countryPopulation}</p>
            </div>
            
            <div id="region" class="flow_layout_row">
            <h4 id="region_title">Region:</h4>
            <p id="region_Value">${country.countryRegion}</p>
            </div>
            <div id="capital" class="flow_layout_row">
            <h4 id="capital_title">capital:</h4>
            <p id="capital_Value">${country.countryCapital}</p>
            </div>
            </div>`
            
            const continent = country.countryContinent;//unused data...
            addingContent.innerHTML += html;            
        });
        
        cachedContent = addingContent.innerHTML; // assigning the addingContent Data to the cache
    }
}

//adding click event listener to the countries through the container using e.target
addingContent.addEventListener('click', function (e) {
    const countryElement = e.target.closest('.country');
    if (countryElement) {
        const index = countryElement.getAttibute('data-index') //using dataset is the best it is better than using id and in this case we get the data instead of assigning
        const selectedCountry = apiContent[index]; //create variable called selectedCountry and let it be apiContent which is an array but adding[index] to it selects the array element with that particular index
        const selectedCountryFlag = selectedCountry.countryFlag;
        const selectedCountryFlagAlt = selectedCountry.countryFlagAlt;
        const selectedCountryName = selectedCountry.countryName;        
        const selectedCountryPopulation = selectedCountry.countryPopulation;
        const selectedCountryRegion = selectedCountry.countryRegion;
        const selectedCountryCapital = selectedCountry.countryCapital;
        const selectedCountrySubRegion = selectedCountry.countrySubRegion;
        const selectedCountryTopLevelDomain = selectedCountry.countryTopLevelDomain;;
        const selectedCountryCurrency = selectedCountry.countryCurrency;
        const selectedCountryLanguage = selectedCountry.countryLanguage;
        const selectedCountryBorder = selectedCountry.countryBorder;
        
        //run the function to display the full detalis of each clicked country. remember the function is called inside the click event listener
        displayFullDetails(selectedCountryFlag,
            selectedCountryFlagAlt,
            selectedCountryName,
            selectedCountryPopulation,
            selectedCountryRegion,
            selectedCountryCapital,
            selectedCountrySubRegion,
            selectedCountryTopLevelDomain,
selectedCountryCurrency,
selectedCountryLanguage,
selectedCountryBorder,)
}
});

//creating a component for clicked country
function displayFullDetails(selectedCountryFlag,
    selectedCountryFlagAlt,
    selectedCountryName,
    selectedCountryPopulation,
    selectedCountryRegion,
    selectedCountryCapital,
    selectedCountrySubRegion,
    selectedCountryTopLevelDomain,
    selectedCountryCurrency,
    selectedCountryLanguage,
    selectedCountryBorder) {
        
        section.innerHTML = ''; //reset the page document.
        addingContent.innerHTML = '';//reset the page document.
        
    //creating the country full details component.
        const detailHtml =`
        <div id="country_full_details">
        
        <button id="back_button">
        <img src="./back-black.svg" alt="back"  id="country_flag">      
        Back
        </button>
        
        <div id="detail_content_wrapper">  
        <img src="${selectedCountryFlag}" alt="${selectedCountryFlagAlt}" id="country_image_border">
        
        <div id="detail_content"> 
        
        <h1 id="country_name" class="flow_layout_row_border">${selectedCountryName}</h1>
        <br>
        <div id="population" class="flow_layout_row_border">
        <b><p id="population_title">Populaton:</p></b>
        <p id="population_value">${selectedCountryPopulation}</p>
        </div>
        
        <div id="region" class="flow_layout_row_border">
        <b><p id="region_title">Region:</p></b>
        <p id="region_Value">${selectedCountryRegion}</p>
        </div>
        
        <div id="sub_region" class="flow_layout_row_border">
        <b><p id="sub_region_title">Sub Region:</p></b>
        <p id="sub_region_Value">${selectedCountrySubRegion}</p>
        </div>
        
        <div id="capital" class="flow_layout_row_border">
        <b><p id="capital_title">Capital:</p></b>
        <p id="capital_Value">${selectedCountryCapital}</p>
        </div>
        
        <div id="top_level_domain" class="flow_layout_row_border">
        <b><p id="top_level_domain_title">Top Level Domain:</p></b>
        <p id="top_level_domain_Value">${selectedCountryTopLevelDomain}</p>
        
        <div id="currency" class="flow_layout_row_border">
        <b><p id="currency_title">Currency:</p></b>
        <p id="currency_Value">${selectedCountryCurrency}</p>
        </div>

        </div>
                        
            <div id="language" class="flow_layout_row_border">
            <b><p id="language_title">Language:</p></b>
            <p id="language_Value">${selectedCountryLanguage}</p>
            </div>
            
            </div>
            
            </div>  
            <br>
            <br>
            <b><p id="border_title">Border Countries:</p></b>
            <br>
            <br>
            <div id="elz" class="flow_layout_row_border">
            
            </div>         
            </div > 
            `
            addingContent.innerHTML = detailHtml;
            section.append(addingContent);
            
            const backButton = document.getElementById('back_button');
            backButton.addEventListener('click', function () {
                section.innerHTML = '';
                addingContent.innerHTML = '';
                section.append(filterBar);
                addingContent.append(createCountry());
                handleFilterChange()//calling gthe filter change function when we go back....trial by error but it worked. cant even remeber what i was thunking
                section.append(addingContent);

            })
            
            const borderElement = document.getElementById('elz');
            
            selectedCountryBorder.forEach(function (border) {
                const borderSpan = document.createElement('span');
                borderSpan.id='border_span_id'
                borderSpan.textContent = border;
                borderElement.appendChild(borderSpan);
            });
            addingContent.appendChild(borderElement);
            
        }
 //changing the theme of the document to dark or light mode.       
themeMode.addEventListener('click', function () {
const body = document.body;
themeMode.textContent = themeMode.textContent === `Dark Mode`
? `Light Mode` : `Dark Mode`; 
body.classList.toggle("dark-theme");
if (themeMode.textContent == 'Light Mode') {
    imgElement.src = './white-mode.svg'
    themeMode.prepend(imgElement);
    themeMode.classList.add('theme_mode_light');
}
if (themeMode.textContent == 'Dark Mode') {
    imgElement.src = './dark-mode.svg'
    themeMode.prepend(imgElement);
    themeMode.classList.remove('theme_mode_light');
    
};

const borderElz = document.getElementById('elz');
if (borderElz) {
    const bor = borderElz.querySelectorAll('#border_span_id');
    bor.forEach(function (el) {
        if (el) {
            // console.log(el);
            el.classList.toggle('dark_mode_borders')
        } else return
    })
} else return

const backBtn = document.getElementById('back_button');
if (backBtn) {
    const bImg = backBtn.querySelector(('img'));
    if (themeMode.textContent == 'Light Mode') {
        bImg.src = './back-white.svg';
        backBtn.prepend(bImg);
        backBtn.classList.toggle('dark_mode_backBtn');
        backBtn.style.backgroundColor = 'black';
        backBtn.style.color = 'white';
        
    }
    if (themeMode.textContent == 'Dark Mode')  {
        bImg.src = './back-black.svg';
        backBtn.prepend(bImg)
        backBtn.classList.remove('dark_mode_backBtn'); 
        backBtn.style.backgroundColor = 'white';
        backBtn.style.color = 'black';
        
    }
    
}
        
    })


    
 // filter by name
 nameFilter.addEventListener('input',  function handleSearchInput() {
        const searchValue = nameFilter.value.toLowerCase();
        
        const filteredContent = apiContent.filter((country) =>
        country.countryName.toLowerCase().includes(searchValue)  //filter apiContent, by returning the value that corresponds with serach value
                );

  // Generate HTML for the filtered content using the map so that all true values are assinged to filteredHtml amd returns the html
  const filteredHtml = filteredContent.map((country, index) => {
    return `
    <div id="country${index}" class="country">
    <img src="${country.countryFlag}" alt="${country.countryFlagAlt}" id="country_image">
    <h2 id="country_name" class="flow_layout_row">${country.countryName}</h2>
    <div id="population" class="flow_layout_row">
    <h4 id="population_title">Populaton:</h4>
    <p id="population_value">${country.countryPopulation}</p>
    </div>
    
    <div id="region" class="flow_layout_row">
    <h4 id="region_title">Region:</h4>
    <p id="region_Value">${country.countryRegion}</p>
    </div>
    <div id="capital" class="flow_layout_row">
    <h4 id="capital_title">capital:</h4>
    <p id="capital_Value">${country.countryCapital}</p>
    </div>
    </div>
    `;
}).join('');

// Update the addingContent with the filtered HTML.
addingContent.innerHTML = filteredHtml;

// If no results found, display a message or handle it as needed.
if (filteredContent.length === 0) {
    addingContent.innerHTML = '<h1>No Matching Countries Found.</h1>';
}

// Add event listeners to the filtered country elements.
const filteredCountryElements = addingContent.querySelectorAll('.country');
filteredCountryElements.forEach((element) => {
    element.addEventListener('click', () => {
        const selectedCountry = filteredContent.find((country) =>
        country.countryName === element.querySelector('#country_name').textContent
        );
        displayFullDetails(selectedCountry.countryFlag, selectedCountry.countryFlagAlt, selectedCountry.countryName,selectedCountry.countryPopulation,selectedCountry.countryRegion,selectedCountry.countryCapital,selectedCountry.countrySubRegion,selectedCountry.countryTopLevelDomain,selectedCountry.countryCurrency,selectedCountry.countryLanguage,selectedCountry.countryBorder);
    });
});

})

//filter by continents
continentFilter.addEventListener('change', handleFilterChange);

function handleFilterChange() {
    const selectedContinent = continentFilter.value;
    // if (selectedContinent === '') { createCountry() }
    const filteredContent = apiContent.filter((country) => {
        const isContinentMatch = selectedContinent === '' || country.countryRegion === selectedContinent;
        return isContinentMatch
    });
    
    
    const filteredHtml = filteredContent.map((country, index) => {
        return `
        <div data-index="${index}" class="country">
        <img src="${country.countryFlag}" alt="${country.countryFlagAlt}" id="country_image">
        <h2 id="country_name" class="flow_layout_row">${country.countryName}</h2>
        <div id="population" class="flow_layout_row">
            <h4 id="population_title">Populaton:</h4>
            <p id="population_value">${country.countryPopulation}</p>
        </div>
        
        <div id="region" class="flow_layout_row">
        <h4 id="region_title">Region:</h4>
        <p id="region_Value">${country.countryRegion}</p>
        </div>
        <div id="capital" class="flow_layout_row">
        <h4 id="capital_title">capital:</h4>
        <p id="capital_Value">${country.countryCapital}</p>
        </div>
        </div>`;
    }).join('');
    
    addingContent.innerHTML = filteredHtml;
    
    const filteredCountryElements = addingContent.querySelectorAll('.country');
    filteredCountryElements.forEach((element) => {
        element.addEventListener('click', () => {
            console.log(element)
            const index = element.dataset.index;
            const selectedCountry = filteredContent[index];
            displayFullDetails(
                selectedCountry.countryFlag,
                selectedCountry.countryFlagAlt,
                selectedCountry.countryName,
                selectedCountry.countryPopulation,
                selectedCountry.countryRegion,
                selectedCountry.countryCapital,
                selectedCountry.countrySubRegion,
                selectedCountry.countryTopLevelDomain,
                selectedCountry.countryCurrency,
                selectedCountry.countryLanguage,
                selectedCountry.countryBorder
            );
        });
    });

}

function createFooter() {
  const footer = document.createElement('footer');
  const designedBy = document.createElement('p');
  designedBy.innerHTML = 'Designed with ❤️ by <a href="https://github.com/anyiamvictor">anyiamvictor</a>';
   const apiCredit = document.createElement('p');
  apiCredit.innerHTML = 'Credit to the API providers: <a href="https://restcountries.com/">restcountries.com</a>';
  footer.appendChild(designedBy);
  footer.appendChild(apiCredit);
  document.body.appendChild(footer);
}

createFooter()