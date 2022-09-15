import React, { useEffect, useContext } from "react";
import { albumsRequest } from "../api/EntryFinder";
import { EntriesContext } from "../context/EntriesContext";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import { Table } from "react-bootstrap";

const EntryList = (props) => {
  const { entries, setEntries } = useContext(EntriesContext);
  const {theme} = useContext(ThemeContext);
  let history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(document.cookie)
        const response = await albumsRequest.get('/all', {
          headers: {
            'authorization': `bearer ${document.cookie}`
          }
        });
        console.log(response.data);

        setEntries(response.data.albums);
      } catch (response) {
        console.log(response); alert('You must Login to view joes albums')
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await albumsRequest.delete(`/${id}`, {
        headers: {
          'authorization': `bearer ${document.cookie}`
        }
      });

  
        console.log(response)
        setEntries(
          entries.filter((entry) => {
            return entry.id !== id;
          })
        );
      
    } catch (response) {
      console.log(response);
      alert(response.response.data.error)
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history(`/albums/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history(`/albums/${id}`);
  };


  return (
    <div className="list-group">
      <Table className={theme.bg === 'dark' ? 'bg-dark text-light' : ''}>
        <thead className={theme.bg === 'dark' ? 'bg-dark text-light' : ''}>
          <tr className={theme.bg === 'dark' ? 'bg-light text-dark border border-dark' : 'bg-dark text-light border-light'}>
            <th scope="col">Album</th>
            <th scope="col">Genre</th>
            <th scope="col">Arist</th>
            <th scope="col">Year</th>
            <th scope="col">Patron Name</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {entries &&
            entries.map((entry) => {
              return (
                <tr className={theme.bg === 'dark' ? 'bg-dark text-light border-light' : 'bg-light text-dark border-dark'}
                  onClick={() => handleRestaurantSelect(entry.id)}
                  key={entry.id}
                >
                  <td>{entry.album}</td>
                  <td>{entry.genre}</td>
                  <td>{entry.artist}</td>
                  <td>{entry.year}</td>
                  <td>{entry.patron_name}</td>
                  <td>{entry.description}</td>



                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, entry.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, entry.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {/* <tr>
            <td>mcdonalds</td>
            <td>New YOrk</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>mcdonalds</td>
            <td>New YOrk</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
};

export default EntryList;