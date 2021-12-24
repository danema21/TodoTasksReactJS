import React from 'react';
import './App.css';
import {Button, Card, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [tareas, setTareas] = React.useState([
    {
      texto: "ejemplo de tarea a realizar",
      tachada: false
    }
  ]);

  const agregarTarea = texto => {
    const nuevaListadeTareas = [...tareas, {texto}];
    setTareas(nuevaListadeTareas);
  };

  const tacharTarea = index => {
    const nuevaListadeTareas = [...tareas];
    nuevaListadeTareas[index].tachada = true;
    setTareas(nuevaListadeTareas);
  }

  const eliminarTarea = index => {
    const nuevaListadeTareas = [...tareas];
    nuevaListadeTareas.splice(index, 1);
    setTareas(nuevaListadeTareas);
  }

  return (
    <div className='App'>
      <div className='container'>
        <h1 className='text-center mb-4'>Todo Tasks</h1>
        <FormTarea agregarTarea={agregarTarea} />
        <div>
          {tareas.map((tarea, index) => (
            <Card>
              <Card.Body>
                <Tarea
                  key={index}
                  index={index}
                  tarea={tarea}
                  tacharTarea={tacharTarea}
                  eliminarTarea={eliminarTarea}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


function FormTarea({agregarTarea}) {
  const [valor, setValor] = React.useState("");

  const manejarSubmit = e => {
    e.preventDefault();
    if(!valor) return;
    agregarTarea(valor);
    setValor("");
  };

  return (
    <Form onSubmit={manejarSubmit}>
      <Form.Group>
        <Form.Label><b>Agregar Tarea</b></Form.Label>
        <Form.Control type='text' className='input' value={valor}
                      onChange={e => setValor(e.target.value)} 
                      placeholder='Agregar nueva tarea' />
      </Form.Group>
      <Button variant='primary mb-3' type='submit'>
        Submit
      </Button>
    </Form>
  );
}


function Tarea({tarea, index, tacharTarea, eliminarTarea}) {
  return (
    <div className='tarea'>
      <span style={{textDecoration: tarea.tachada ? "line-through" : ""}}>{tarea.texto}</span>
      <div>
        <Button variant='outline-success' onClick={() => tacharTarea(index)}>✓</Button>{' '}
        <Button variant='outline-danger' onClick={() => eliminarTarea(index)}>✕</Button>
      </div>
    </div>
  );
}


export default App;
