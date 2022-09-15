import React, { useState, useContext } from "react";
//import EntryFinder from "../api/EntryFinder";
import { albumsRequest } from "../api/EntryFinder";
import {EntriesContext} from "../context/EntriesContext";

const AddEntry = () => {
  const { addEntries } = useContext(EntriesContext);
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [year,setYear] = useState("");
  const [genre,setGenre] = useState("")
  const [description,setDescription] = useState("")
 
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
const response = await albumsRequest.post("/add", {
        album:album,
        artist:artist,
        year:year,
        genre:genre,
        description:description
},
{
  headers: {
    'authorization': `bearer ${document.cookie}`
  }}  
)
      console.log(response)
     addEntries(response.data.album)
}
     catch (err) {
      console.log(err);
    }
  
  }  
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
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
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEntry;