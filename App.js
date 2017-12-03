/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// Data Structures used to Represent Lessons
class Slide {
    constructor() {
    }
};

// A text slide shows a centered message, with a button to go to the next slide.
class TextSlide extends Slide {
    constructor(text="Write your message here",button_text="Next") {
        super();
        this.type="text";
        this.text=text;
        this.button_text=button_text;
    }
    GetText() {
        console.log("getting text: " + this.text);
        return this.text
    }
    GetButtonText() {
        return this.button_text
    }
};

// An audio slide shows an audio control, with a button to go to the next slide.
class AudioSlide extends Slide {
    constructor(audio_url="put in url to the audio recording",button_text="Next") {
        super();
        this.type="audio";
        this.button_text=button_text;
        this.audio_url=audio_url;
    }
    GetText() {
        return this.text
    }
    GetButtonText() {
        return this.button_text
    }
    GetAudioUrl() {
        return this.audio_url
    }
}

class Lesson {
    constructor() {
        this.slide=[]

        // lesson state
        this.Reset();
    }

    // builders
    addSlide(slide) {
        this.slide.push(slide);
    }

    Reset() {
        this.curr_slide=0;
    }
    // 
    NextSlide(k) {
        console.log(k);
        if (k < this.slide.length-1) { 
            ++k;
        }
        console.log( "newk " + k); 
        return k;
    }
    GetSlide(k) {
        console.log("Getting slide for -" ,k);
        return this.slide[k];
    }
};

// generate a new data structure holding a lesson in place
function create_new_lesson() {
    let l=new Lesson();
    l.addSlide(new TextSlide("Imagine if you could change  the world","Yes"));
    l.addSlide(new TextSlide("Imagine If you had the potential to do and be anything","Yes"));
    l.addSlide(new AudioSlide("http://mysite/audio.wav","Next"));
    l.addSlide(new TextSlide("Where would you go today","Go"));
    return l;
}

class SlideView extends Component {
  constructor(props) {
    super(props);
    this.lesson=create_new_lesson();
    this.state = { curr_slide: 0 };

  }

  next_slide(lesson) {
    console.log("click" +lesson);
    let next_slide=this.lesson.NextSlide(this.state.curr_slide);
    this.setState( {curr_slide: next_slide });
  }

  play_audio(audio_url) {
    console.log("playing back audio:" + audio_url);
  }

  render() {
  //  /let slide=this.lesson.GetSlide();
    console.log("rendering");
    this.state.curr_slide;
    let stylename=this.props.style;
    let text=this.lesson.GetSlide(this.state.curr_slide).GetText();
    let button_text=this.lesson.GetSlide(this.state.curr_slide).GetButtonText();
  //  let nextSlide=function () { lesson.GetNextSlide(); }
    // only have text slide views for now

    let slide_type=this.lesson.GetSlide(this.state.curr_slide).type;

     if ( slide_type== "text") {
        let text=this.lesson.GetSlide(this.state.curr_slide).GetText();
        let button_text=this.lesson.GetSlide(this.state.curr_slide).GetButtonText();
        return <View>
          <Text style={stylename}>{text}</Text> 
          <Button title={button_text} onPress={() => this.next_slide(this.lesson)}/>
        </View>
    } else if ( slide_type == "audio" ) {
        let text=this.lesson.GetSlide(this.state.curr_slide).GetText();
        let audio_url=this.lesson.GetSlide(this.state.curr_slide).GetAudioUrl();
        return <View style={styles.audioslide_viewstyle}>
          <Button title="PLAY AUDIO" onPress={() => this.play_audio(audio_url)}/>
          <Button title={button_text} onPress={() => this.next_slide(this.lesson)}/>
        </View>
    }
  }
}



export default class App extends Component<{}> {
  render() {
   // return React.createElement(Text, {style: styles.description}, "Start your Lesson Today!");
   // return <Text style={styles.description}>Start your lesson Today!</Text>;
   //return <TextSlideView style={styles.bigblue,styles.textslide} text="Imagine if you could" />;
   return <SlideView style={styles.bigblue,styles.textslide} text="Imagine if you could" />;
  }

}

// StyleSheet
const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textslide: {
    fontSize: 18,
    textAlign: 'center',
    //color: '#656565',
    color: 'blue',
    marginTop: 65,
  },
  textslide_button: {
    fontSize: 18,
    textAlign: 'center',
    //color: '#656565',
    color: 'blue',
    marginTop: 65,
  },
  audioslide_viewstyle: {
    flexDirection: "row", 
    height: 100,    
    paddingTop: 100, 
    padding: 20
  }
});
