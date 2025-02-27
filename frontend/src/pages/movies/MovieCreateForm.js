import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Upload from "../../assets/upload.png";

import styles from "../../styles/MovieCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import axios from "axios";
//import { useGenreData, useSetGenreData } from "../../contexts/GenreDataContext";
import GenreOptions from "./GenreOptions";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import GenreChooser from "../../components/GenreChooser";
import { useRedirect } from "../../hooks/useRedirect";


function MovieCreateForm() {
  useRedirect("loggedOut")
  const [errors, setErrors] = useState({});



    //const genreData = useGenreData();
  //const setGenreData = useSetGenreData();

  //const [genreData, setGenreData ] = useState(null);

  const [movieData, setMovieData] = useState({
    title: "",
    year: "",
    genre: 1,
    director: "",
    actors: "",
    image: "",

  });
  const [allchecked, setAllChecked] = React.useState([]);
  const { title, year, genre, director, actors, image } = movieData;

  const imageInput = useRef(null);

  const history = useHistory();

  const handleChange = (event) => {
    setMovieData({
      ...movieData,
      [event.target.name]: event.target.value,
    });
    console.log(movieData)
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setMovieData({
        ...movieData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
    
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('year', year);
    formData.append('genre', genre);
    formData.append('director', director);
    formData.append('actors', actors);
    formData.append('image', imageInput.current.files[0]);

    try {
      console.log('attempt movie create');
      console.log(title, year, genre, director, actors, image);
      const {data} = await axiosReq.post('/movies/', formData);
      console.log('data returned from attempt:')
      console.log(data);
      history.push(`/movies/${data.id}`)
    } catch(err) {
      console.log(err)
      if (err.response?.status !== 401){
        console.log(err.response?.data);
        setErrors(err.response?.data);
      }
    }

  }


  /*
  useEffect(() => {
    getGenreData()
  }, []);


  const getGenreData = async (event) => {

    try{
    const { data } = await axios.get("/genres");
        setGenreData(data.results);
    } catch(err){
        console.log(err);
    }

  };
  */
  
  
  


  const textFields = (
    <div className="text-center">
      {/* Add your form fields here */}

    
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    
    <Form onSubmit={handleSubmit}>
        
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="">
            <Form.Label className="d-none">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                name="title"
                className={styles.Input}
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
            <Form.Group className="">
            <Form.Label className="d-none">Year</Form.Label>
              <Form.Control
                type="year"
                placeholder="year"
                name="year"
                className={styles.Input}
                value={year}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.year?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

            <Form.Group className="">
            <Form.Label className="d-none">Director</Form.Label>
              <Form.Control
                type="director"
                placeholder="director"
                name="director"
                className={styles.Input}
                value={director}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.director?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
            <Form.Group>
            {['checkbox'].map((type) => (
            <div key={`default-${type}`} className="mb-3">
            <GenreChooser />
            </div>
          ))}
  </Form.Group>

            <Form.Group className="">
            <Form.Label className="d-none">Actors</Form.Label>
              <Form.Control
                type="actors"
                placeholder="actors"
                name="actors"
                className={styles.Input}
                value={actors}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.actors?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
                custom
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
      {/*<GenreOptions />*/}
    </Form>
    
  );
}

export default MovieCreateForm;