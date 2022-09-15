import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EntriesContext } from "../context/EntriesContext";
import { ThemeContext } from "../context/ThemeContext";
//import EntryFinder from "../api/EntryFinder";
import { albumsRequest } from "../api/EntryFinder";

import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";


const EntryDetailsPage = () => {
  const { id } = useParams();
  const { selectedEntry, setSelectedEntry } = useContext(EntriesContext);
  const { theme, setTheme } = useContext(ThemeContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetching')
        const response = await albumsRequest.get(`/${id}`, {
          headers: {
            'authorization': `bearer ${document.cookie}`
          }
        })
        console.log(response.data.album)
        setSelectedEntry(response.data.album)
      } catch (response) {
        console.log(response)

      }

    }
    fetchData();


  }, [])
  /*
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await EntryFinder.get(`/${id}`);
          console.log(response.data);
  console.log('hi response')
          setSelectedEntry(response.data);;
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchData();
    }, []);
    */
  return (
    <div className={theme.bg === 'dark' ? 'bg-dark text-light details' : 'bg-light text-dark details'}>
      {selectedEntry && (
        <>
          <h1 className="text-center display-1">
            {selectedEntry.album}

          </h1>
          <div className="text-center">
         
            <span className="text-warning ml-1">
              {selectedEntry.artist}
            </span>
          </div>
          <div className="mt-3">
{selectedEntry.year}
          </div>
          <div>
            {selectedEntry.genre}
          </div>
          <div>
            {selectedEntry.patron_name}
          </div>
          <div>
            {selectedEntry.description}
          </div>
          
        </>
      )}
    </div>
  );
};

export default EntryDetailsPage;