import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid';
import React, {useState, useEffect} from 'react';
import AddStudent from './components/AddStudents';
import Student from './components/Student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import './app.css';

function App() {

  const [allStudents, setAllStudents] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    saveStudents(students);
  }, []);

  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
  }

  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent];
    setAllStudents(updatedStudents);
  }

  const searchStudents = () => {
    let keywordsArray = [];

    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if (keywordsArray.length > 0) {
      const searchResults = allStudents.filter(student => {
        for(const word of keywordsArray) {
          if(student.firstName.toLowerCase().includes(word) || student.lastName.toLowerCase().includes(word)){
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(allStudents);
    }
  }

  const removeStudent = (studentToDelete) => {
    console.table(studentToDelete);
    const updatedStudentsArray = allStudents.filter(student => student.id !== studentToDelete.id);
    saveStudents(updatedStudentsArray);
  }

  const updateStudent = (updatedStudent) => {
    const updatedStudentsArray = allStudents.map(student => student.id === updatedStudent.id ? {...student,...updatedStudent} : student);
    saveStudents(updatedStudentsArray);
  }

  const students = [{
    id:nanoid(),
    firstName: "Salome",
    lastName: "Mussett",
    email: "smussett0@unesco.org",
    image: 'images/student1.jpg',
    gradYear: 2011
  }, {
    id:nanoid(),
    firstName: "Ailyn",
    lastName: "Lakey",
    email: "alakey1@cocolog-nifty.com",
    image: 'images/student2.jpg',
    gradYear: 2013
  }, {
    id:nanoid(),
    firstName: "Sapphira",
    lastName: "Cordell",
    email: "scordell2@51.la",
    image: 'images/student3.jpg',
    gradYear: 2012
  }, {
    id:nanoid(),
    firstName: "Fredric",
    lastName: "Druitt",
    email: "fdruitt3@clickbank.net",
    image: 'images/student4.jpg',
    gradYear: 2014
  }, {
    id:nanoid(),
    firstName: "Abigael",
    lastName: "Henstridge",
    email: "ahenstridge4@amazon.de",
    image: 'images/student5.jpg',
    gradYear: 2014
  }, {
    id:nanoid(),
    firstName: "Flint",
    lastName: "Twinbourne",
    email: "ftwinbourne5@yelp.com",
    image: 'images/student6.jpg',
    gradYear: 2010
  }, {
    id:nanoid(),
    firstName: "Merrile",
    lastName: "Le Huquet",
    email: "mlehuquet6@reuters.com",
    image: 'images/student7.jpg',
    gradYear: 2012
  }, {
    id:nanoid(),
    firstName: "Kristofor",
    lastName: "Mackriell",
    email: "kmackriell7@mozilla.com",
    image: 'images/student8.jpg',
    gradYear: 2010
  }, {
    id:nanoid(),
    firstName: "Grazia",
    lastName: "Mountlow",
    email: "gmountlow8@trellian.com",
    image: 'images/student9.jpg',
    gradYear: 2011
  }, {
    id:nanoid(),
    firstName: "Port",
    lastName: "Gilloran",
    email: "pgilloran9@deviantart.com",
    image: 'images/student10.jpg',
    gradYear: 2013
  }];



  return (
    <div className='container'>
      {!allStudents && <button type="button" className='btn btn-lg btn-success' onClick={() => saveStudents(students)}>Save Students</button>}
      <div className='row' id='allStudents'>
        <h3>Current Students</h3>
        {searchResults && searchResults.map((student) => 
        (
          <div className='col-md-2' key={student.id}>
            <Student student={student} removeStudent={removeStudent} updateStudent={updateStudent} />
          </div>)
      )}
        
      </div>
      
      <AddStudent addStudent={addStudent}/>
      <div className='row mt-4' id='searchStudent'>
        <h3>Search Students</h3>
        <div className='col-md-4'>
          <input type="text" className='form-control' placeholder='First Name or Last Name' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords}/>
        </div>
        <div className='col-md-4'>
          <button type='button' className='btn btn-primary' onClick={searchStudents}>Search Student<FontAwesomeIcon icon={faSearch}/></button>
        </div>
      </div>
    </div>
  );
}

export default App
