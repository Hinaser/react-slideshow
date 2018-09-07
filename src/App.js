import React, { Component } from 'react';
import './app.css';
import slide1_jpg from './images/slide_1.jpg';
import slide2_jpg from './images/slide_2.jpg';
import slide3_jpg from './images/slide_3.jpg';

const slideImages = [
  slide1_jpg,
  slide2_jpg,
  slide3_jpg,
];

let Slide, Fade, Zoom;

const properties = {
  duration: 300,
  transitionDuration: 3000,
  infinite: true,
  indicators: true
};

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      scene: "",
      effect: "slide",
    };
  }
  
  render() {
    let {scene, effect} = this.state;
    let content;
    
    if(["buggy", "fixed"].includes(scene)){
      let Effect;
      if(effect === "slide"){
        Effect = (
          <Slide {...properties}>
            {
              [0,1,2].map(index => (
                <div className="each-slide" key={index}>
                  <div style={{backgroundImage: `url(${slideImages[index]})`}}>
                    <span>Slide {index+1}</span>
                  </div>
                </div>
              ))
            }
          </Slide>
        );
      }
      else if(effect === "fade"){
        Effect = (
          <Fade {...properties}>
            {
              [0,1,2].map(index => (
                <div className="each-fade" key={index}>
                  <div className="image-container">
                    <img src={slideImages[index]} alt={index} />
                  </div>
                  <h2>Slide {index+1}</h2>
                </div>
              ))
            }
          </Fade>
        );
      }
      else{
        Effect = (
          <Zoom {...properties} scale={0.4}>
            {
              [0,1,2].map(index => (
                <img key={index} style={{width: "100%"}} src={slideImages[index]} alt={index} />
              ))
            }
          </Zoom>
        );
      }
      
      content = (
        <div>
          <h2>
            {effect}
          </h2>
          <p>
            react-slideshow has an issue where browser/tab crashes when re-render is dispatched DURING animation.<br/>
            This page can reproduce this issue. When you are ready, click 'Re-render!' button below.<br />
          </p>
          {
            scene === "buggy" ? (
                <div>
                  <h4 style={{color: "red"}}>
                    Waring! The browser may crash after you click 'Re-render' button.<br/>
                    You should open Developer console and see console messages to understand what happens.<br/>
                    If you find that error message is filling console, you should close tab/browser immediately.
                  </h4>
                  <pre>
                    Slide properties = 
                      duration: 10,
                      transitionDuration: 3000,
                      infinite: true,
                      indicators: true
                  </pre>
                </div>
              )
              :
              (
                <div>
                  This is the fixed version of the module. Browser will not crash.
                </div>  
              )
          }
          <div style={{marginTop: 20}}>
            {Effect}
          </div>
          <div style={{textAlign: "center", marginTop: 20,}}>
            <button style={{
              display: "inline-block",
              height: 30,
              width: 200,
              textAlign: "center",
            }}
                    onClick={() => {
                      this.setState({
                        scene: "re-rendered",
                      });
                    }}
            >
              Re-render!
            </button>
          </div>
        </div>
      );
    }
    else if(scene === "re-rendered"){
      content = (
        <div style={{textAlign: "center"}}>
          Re-rendered!
        </div>
      );
    }
    else{
      content = (
        <div style={{textAlign: "center"}}>
          <select value={scene} onChange={e => {
            let scene = e.target.value;
           
            let onLoad = module => {
              ({Slide, Fade, Zoom} = module);
              this.setState({
                scene,
              });
            };
            
            if(scene === "buggy"){
              import('./lib').then(onLoad);
            }
            else{
              import('./libFixed').then(onLoad);
            }
          }}>
            <option value="" disabled>Select module</option>
            <option value="buggy">Current module with bug</option>
            <option value="fixed">Fixed module</option>
          </select>
          <select value={effect} onChange={e => {
            let effect = e.target.value;
            this.setState({effect});
          }}
                  style={{marginLeft: 20}}
          >
            <option value="slide">Slide</option>
            <option value="fade">Fade</option>
            <option value="zoom">Zoom</option>
          </select>
        </div>
      );
    }
  
    return (
      <div style={{
        width: 800,
        margin: "auto",
      }}>
        <h3>
          <a href="https://github.com/andela-foladeji/react-slideshow/issues/12" target='_blank' rel='noreferrer noopener'>
            Reproduce issue #12
          </a>
        </h3>
        {content}
      </div>
    );
  }
}

export default App;
