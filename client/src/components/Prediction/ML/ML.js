import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './ml.css'

const ML = () => {
  const [image, setImage] = useState();
  const [prediction, setPrediction] = useState();

  useEffect(() => {
    getPrediction();
  }, []);

  function convertToBase64(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const submitImage = async(e) => {
    fetch("http://localhost:4000/upload", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64: image
      })
    })
    .then((response) => {
      response.json().then((data) => { console.log(data); })
    })
  }

  const getPrediction = async() => {
    try{
      const result = await axios.get("http://localhost:4000/getPrediction");
      setPrediction(result.data.data);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" accept="image/*" onChange={convertToBase64}></input>
        <button type="submit">Submit</button>
      </form>
      {image && <img src={image} alt="" />}
      {prediction?.[0]?.prediction && <p>{prediction[0].prediction}</p>}
    </div>
  )
}

export default ML