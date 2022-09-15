import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { EntriesContext } from "../context/EntriesContext";
//import EntryFinder from "../api/EntryFinder";

const UpdateEntry = (props) => {
  const { id } = useParams();
  let history = useNavigate();
  const { entries } = useContext(EntriesContext);
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [year,setYear] = useState("");
  const [genre,setGenre] = useState("")
  const [description,setDescription] = useState("")
/*
  useEffect(() => {
    const fetchData = async () => {
      const response = await EntryFinder.get(`/${id}`);
      console.log(response.data.restaurant);
      setName(response.data.restaurant.name);
      setLocation(response.data.restaurant.location);
      setPriceRange(response.data.restaurant.price_range);
    };

    fetchData();
  }, []);
/*
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await EntryFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    history("/");
  };*/

  

  return (
    <div className='updateForm'>
      <form  action="">
      <div className="col">
            <input
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              type="text"
              className="form-control"
              placeholder="album"
            />
          </div>
          <div className="col">
            <input
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="form-control"
              type="text"
              placeholder="artist"
            />
          </div>
          <div className="col">
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="form-control"
              type="text"
              placeholder="year"
            />
          </div>
          <div className="col">
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>Genre</option>
              <option value="Rock">Rock</option>
              <option value="Rap">Rap</option>
              <option value="Psychedelic">Psychedelic</option>
              <option value="Jazz">Jazz</option>
              <option value="Punk">Punk</option>
              <option value="Funk">Funk</option>
              <option value="Soul">Soul</option>
              <option value="Pop">Pop</option>
              <option value="Indie">Indie</option>
            </select>
          </div>
          <div className="col">
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              type="text"
              placeholder="description"
            />
          </div>
   
        
        <button
          type="submit"
          onClick={''}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateEntry;