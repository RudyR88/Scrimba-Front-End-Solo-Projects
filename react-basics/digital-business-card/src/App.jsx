import {person} from './js/data.js';
import Info from './components/Info.jsx';
import Section from './components/Section.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const {
    profileImgURL,
    profileAlt,
    name,
    jobTitle,
    website,
    email,
    linkedIn,
    about,
    interests
  } = person;
  return (
    <div className="App container">
      <main>
        <Info 
          profileImgURL = {profileImgURL}
          profileAlt = {profileAlt} 
          name = {name} 
          jobTitle = {jobTitle}
          website = {website}
          email = {email}
          linkedIn = {linkedIn}
          />
        <Section
          title='About'
          content = {about} 
        />
        <Section
          title='Interests'
          content = {interests} 
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
