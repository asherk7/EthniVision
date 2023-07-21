import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './ml.css'

const ML = () => {
  const [image, setImage] = useState();
  const [allImages, setAllImages] = useState();

  useEffect(() => {
    getImages();
  }, []);

  const submitImage = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("http://localhost:4000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  const onInputChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const getImages = async() => {
    const result = await axios.get("http://localhost:4000/getImages");
    console.log(result);
    setAllImages(result.data.data);
  }

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" accept="image/*" onChange={onInputChange}></input>
        <button type="submit">Submit</button>
      </form>
      {allImages && allImages.map(data => {
        return (
          <img src={require(`../../../resources/uploads/${data.image}`)} alt="image" />
        )
      })}
    </div>
  )
}

export default ML