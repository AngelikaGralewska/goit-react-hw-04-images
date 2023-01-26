import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {fetchApi} from "api/api";

import { Searchbar } from './Searchbar/Searchbar';
import { ModalContainer } from './Modal/Modal';
import {Loader} from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';



export class App extends Component {
  state = {
    query: '',
    hits: [],
    page: 1,
    loading: false,
    totalHits: "",
    selectedImage: null,
    shouModal: false,
  };

  async componentDidUpdate(_, prevState) {
    if ( prevState.query !== this.state.query || prevState.page !== this.state.page) 
    {
      try {
        this.setState({ loading: true });
        const { query, page } = this.state;
        const { hits, totalHits } = await fetchApi(query, page);

        if (!totalHits) {
          toast.error(`Nothing found for your request`);
          return;
        }

        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          totalHits: totalHits,
          loading: false,
        }));
      } catch (error) {
        toast.error('Something went wrong...');
      } finally {
        this.setState({ loading: false });
      }}}

  handleSubmit = query => {
    this.setState({
      query,
      hits: [],
      page: 1,
    });
  };

  loadMoreImage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  selectImage = imageURL => {
    this.setState({ selectedImage: imageURL });
  };

  closeImage = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { loading, hits, totalHits, selectedImage } = this.state;
    return (
        <div>
          <Searchbar handleSubmit={this.handleSubmit} />
          {loading && <Loader isLoading={loading} />}
          {hits.length > 0 && (
            <ImageGallery selectImage={this.selectImage} hits={hits} />
          )}
          {totalHits && totalHits !== hits.length && (
            <Button loadMore={this.loadMoreImage} />
          )}
          {selectedImage && (
          <ModalContainer
            selectedImage={selectedImage}
            closeImage={this.closeImage}
          />
          )}
          <ToastContainer autoClose={2000} />
        </div>
    );
  }
}