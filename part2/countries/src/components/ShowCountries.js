
const ShowMaxTen = ({ countries, handleButtonClick }) => {
    return ( 
      <div>
        <ul>
        {countries.map(country =>
        <li key={country.name}> {country.name} <button onClick={() => handleButtonClick(country.name)}>show</button></li>)}
        </ul>
      </div>
    )
  }
  
const MoreThan10 = () => {
    return (
      <div>
      <p>Too many searches</p>
      </div>
    )
  }
  
const None = () => <div></div>
  
const Languages = ({languages}) => {
    return(
      <div>
        {languages.map(language => 
          <li key={language.name}>{language.name}</li>
        )}
      </div>
    )}
  
const ShowSingle = ({ country }) => {
    const single = country[0];
    return (
      <div>
        <h1>{single.name}</h1>
        <p>capital {single.capital}</p>
        <p>population {single.population}</p>
        <h2>languages</h2>
        <Languages languages={single.languages} />
        <img src={single.flag} 
            alt="country flag"
            width="200" height="100"/>
      </div>
      )
    }
  

const ShowCountries = ({ countries, handleButtonClick }) => {
    if( countries.length > 10) {
      return (
        <MoreThan10 />
      )
    }
    else if(countries.length > 1){
      return(
      <ShowMaxTen countries={countries} handleButtonClick={handleButtonClick}/>
      )
    }
    else if(countries.length === 1){
      return(
      <ShowSingle country={countries} />
    )}
    return (
      <None />
    )
  }

export default ShowCountries