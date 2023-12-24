import styled from 'styled-components'
import { useEffect, useState } from 'react'
import SearchResult from './components/SearchResults/SearchResult'

export const BASE_URL = "http://localhost:9000"

const App = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filteredData, setFilteredData] = useState(null)
  const [error, setError] = useState(null)
  const [selectedBtn, setSelectedBtn] = useState ("all")
  useEffect(() => {
    const FetchFoodData = async () => {

      setLoading(true);

      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false)
      }
      catch (error) {
        setError("Unable to fetch data");
      }
    }
    FetchFoodData();
  }, [])


  const filteredFood = (type) =>{
    if (type === ""){
      setFilteredData (data);
      setSelectedBtn ("all");
      return;
    }
    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
    setFilteredData (filter);
    selectedBtn (type);

  }


  const SearchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    if (searchValue === "") {
      setFilteredData(null);
    }
    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredData (filter);
  }


  if (error) return <div>{error} </div>
  if (loading) return <div>Your Page is Loading</div>
  return (
    <>
      <Container>
        <Topsection>
          <div className="logo">
            <img src="/logo.svg" alt="" />
          </div>
          <div className="search">
            <input onChange={SearchFood} placeholder='Search Food' />
          </div>
        </Topsection>
        <Filtercounter>
          <Button onClick={() => filteredFood ("all")}>All</Button>
          <Button onClick={() => filteredFood ("breakfast")}>Breakfast</Button>
          <Button onClick={() => filteredFood ("lunch")}>Lunch</Button>
          <Button onClick={() => filteredFood ("dinner")}>Dinner</Button>
        </Filtercounter>

      </Container>
      <SearchResult data={filteredData} />
    </>

  )
}

export default App
export const Container = styled.div`
max-width: 1200px;
margin: 0 auto;
`
const Topsection = styled.section`
min-height: 140px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 16px ;

.search{
  input{
    background-color: transparent;
  border: 1px solid red;
  border-radius: 4px;
  color: white;
  height: 40px;
  font-size: 16px;
  padding: 0 10px;
  }
 
  }
  @media (0 < width < 600px) {
    flex-direction: column;
  }
`
const Filtercounter = styled.div`
display: flex;
justify-content: center;
gap: 12px;
padding-bottom: 40px;
`

export const Button = styled.button`
background: #ff4343;
border-radius: 5px;
padding: 6px 12px;
border: none;
color: white;
cursor: pointer;
&:hover{
  background-color: #8d0909;
}
`



