import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import Movie from "./Movie";

function MoviePage() {
  const { id } = useParams();
  const [ post, setMovie ] = useState({results: []});


  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{data: movie}] = await Promise.all([
          axiosReq.get(`/movies/${id}`)
        ])
        setMovie({results: [movie]})
        console.log(movie)
      } catch(err){
        console.log(err)
      }
    }

    handleMount()
  }, [id]);


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Movie {...post.results[0]} setMovies={setMovie} moviePage />
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default MoviePage;