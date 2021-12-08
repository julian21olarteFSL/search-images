import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'

const UNSPLASH_KEY = '6WsHlhmLfQ-MtMcKEra_jg8D_74AmdkZ9p-BwSjLT_c'
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos'
const App = () => {
  const [photos, setPhotos] = useState([]);
  console.log({photos})

  const getPhotos = async values => {
    const response = await fetch(`${UNSPLASH_URL}?per_page=20&query=${values.search}`, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_KEY}`
      }
    });
    const data = await response.json();
    setPhotos(data?.results)
  }

  const open = (url) => window.open(url);
  return (
    <div className="App">
      <header className="App-header">
        <Formik
          initialValues={{ search: '' }}
          onSubmit={getPhotos}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
    <div className='container'>
      <div className='center'>
        {photos.map(photo => (<article key={photo?.id} onClick={() => open(photo.links.html)}>
          <img src={photo.urls.small}/>
          <p>{[photo.description, photo.alt_description].join(' - ')}</p>
        </article>))}
      </div>
    </div>
    </div>
  );
}

export default App;