import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs';
import labels from './data2.json'

function App() {

  const [pillImage, setPillImage] = useState();
  const [displayShown, setDisplayShown] = useState(0);
  const [pillResult, setPillResult] = useState();
  const [model, setModel] = useState();

  const imageRef = useRef();

  const hiddenFileInput = useRef(null);

  const DisplayType = {
    NONE: 0,
    UPLOAD: 1,
    LOADING: 2,
    RESULT: 3
  }

  function readImage(file) {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader();
      fileReader.onload = () => rs(fileReader.result);
      fileReader.onerror = () => rj(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  }

  const handleIdentify = async (e) => {
    e.preventDefault();
    setDisplayShown(DisplayType.LOADING);
    const model2 = await tf.loadGraphModel("result3/model.json")

    let image = document.createElement("img");
    // image.src = imageRef.current
    const fileData = await readImage(pillImage);
    image.src = fileData
    image.width = 224;
    image.height = 224;

    image.onload = async () => {
      let tfTensor = tf.browser.fromPixels(image)
      // tfTensor = tfTensor.div(255, 0);
      tfTensor = tfTensor.expandDims(0);
      tfTensor = tfTensor.cast("float32")
  
  
      const pred = model2.predict(tfTensor)
  
      const label = pred.as1D().argMax().dataSync()[0];
      const score = Math.max(...pred.softmax().as1D().dataSync().sort().reverse())*100
  
      
    setPillResult(`${labels[label]} with ${score.toFixed(2)}% accuracy`)
    }

    //do api call when backend is setup
    setDisplayShown(DisplayType.RESULT);


  }

  return (
    <div className="App">
      <div className = "Grid">
        <div className="Container">
          <h1 className="Title">Pill Identifier</h1>
        </div>
        {pillImage != null && 
          <div className='Container'>
            <img className='Image' alt="pill" ref={imageRef} src={(URL.createObjectURL(pillImage))}/>
          </div>}
        <div className="Container">
          <input 
            ref={hiddenFileInput} 
            type="file" style={{display: 'none'}} 
            name="ImageUpload" accept="image/*" 
            onChange={e => 
              {e.preventDefault(); 
              setPillImage(e.target.files[0]); 
              setDisplayShown(DisplayType.UPLOAD);
              }}
          />
          <span onClick={e => { e.preventDefault(); hiddenFileInput.current.click();}}>Upload An Image</span>
        </div> 
        <div className='bottom-content'>
          {displayShown === DisplayType.UPLOAD && 
            <div className="Identify">
              <span onClick={e => handleIdentify(e)}>Identify!</span>
            </div>
          }
          {displayShown === DisplayType.LOADING && 
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          }
          {displayShown === DisplayType.RESULT && pillResult != null &&
            <div className="Container">{pillResult}</div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
