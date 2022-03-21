import React, { Component } from "react";
import Particles from "react-tsparticles";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
// import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";

const particlesInit = (main) => {
  console.log(main);
  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
};
const particlesLoaded = (container) => {
  console.log(container);
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      route: 'signin'
    };
  }
  onInputChange = (event) => {
    console.log(event.target.value);
  };
  onButtonSubmit = () => {
    console.log("click");
    ///////
    
const raw = JSON.stringify({
  "user_app_id": {
      "user_id": "clarifai",
      "app_id": "main"
  },
"inputs": [
  {
    "data": {
      "image": {
        "url": "https://samples.clarifai.com/metro-north.jpg"
      }
    }
  }
]
});

const requestOptions = {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Authorization': 'Key {2ae1a0c0574240b290d6fe559e46b70f}'
},
body: raw
};

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch("https://api.clarifai.com/v2/models/people-detection-yolov5/versions/a7ab2517c6e24364a479cd42d405e714/outputs", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));

    ///////
  };

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "linear-gradient(89deg, #ff5edf 0%, #04c8de 100%);",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: true,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 500,
                },
                value: 30,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "polygon",
              },
              size: {
                random: true,
                value: 5,
              },
            },
            detectRetina: true,
          }}
        />
        <Navigation onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' ?
        <div><Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        </div>
        : (
          this,this.state.route === 'signin' ?
          <SignIn onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
        )
          
        
        }
      </div>
    );
  }
}

export default App;
