import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {fetchApi} from "api/api";

import { Searchbar } from './Searchbar/Searchbar';
import { ModalContainer } from './Modal/Modal';
import {Loader} from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';


export const App = () => {
    const [query, setQuery] = useState('');
    const [hits, setHits] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalHits, setTotalHits] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (query === '') {
        return;
      }

    async function fetchGallery () {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchApi(query, page);

        if (!totalHits) {
          toast.error(`Nothing found for your request`);
          return;
        }
        const images = hits.map(
          ({  id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags
          })
        );

        setHits(prevState => [...prevState, ...images]);
        setTotalHits(totalHits);
        setIsLoading(false);
        
      } catch (error) {
        toast.error('Something went wrong...');
      } finally {
        setIsLoading(false);
      }}

      fetchGallery();
    }, [query, page]);
    

  const handleSubmit = inputValue => {
      setQuery(inputValue)
      setHits([]);
      setPage(1);
  };

  const loadMoreImage = () => {
    setPage(prevState => prevState + 1);
  };

  const selectImage = imageURL => setSelectedImage(imageURL);

  const closeImage = () => setSelectedImage(null);

    return (
        <div>
          <Searchbar handleSubmit={handleSubmit} />
          {isLoading && <Loader isLoading={isLoading} />}
          {hits.length > 0 && (
            <ImageGallery selectImage={selectImage} hits={hits} />
          )}
          {totalHits && totalHits !== hits.length && (
            <Button loadMore={loadMoreImage} />
          )}
          {selectedImage && (
          <ModalContainer
            selectedImage={selectedImage}
            closeImage={closeImage}
          />
          )}
          <ToastContainer autoClose={2000} />
        </div>
    );
  };
