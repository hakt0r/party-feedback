import React from 'react';
import logo from './skye.svg';
import bg from './bg.png';
import paw from './paw.png';
import './App.css';
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const fetchJSON = async (url,opts)=> {
  let reqopts = { method: (opts ? "POST" : "GET" ) }
  if (opts){
    reqopts.headers = { 'Content-Type': 'application/json' }
    reqopts.body = JSON.stringify(opts)
  }
  let res = await fetch(url,reqopts)
  return await res.json()
}

class App extends React.Component {
  constructor(props){
    super(props);
    let data = localStorage.getItem('savedState'), { dispatch } = props;
    if ( data ){
      data = JSON.parse(data);
      dispatch({type:'loadedLocalStorage',data})
    }
  }
  render() {
    let { name, kids, parents, email, phone, submitting, dispatch } = this.props
    let submitRef = React.createRef()
    let formRef = React.createRef()
    const submit = e => {
      e.preventDefault()
      fetchJSON('https://leas-party.kasualevents.de/',{
        ...this.props
      })
      console.log(submitRef);
      submitRef.current.innerText = 'Speichern...'
      formRef.current.classList.add('disabled')
      dispatch({type:'submitForm'})
    }
    const change = e => {
      dispatch({
        type:'changeField',
        name:e.target.name,
        value:e.target.value,
        fieldType:e.target.type
      })
    }
    return (
      <div className="App" style={{display:'flex',alignItems:'flex-end',justifyContent:'center',flexWrap:'wrap'}}>
        <img style={{zIndex:'-1',position:'fixed',top:'50%',left:'50%',minWidth:'100%',minHeight:'100%',transform:'translate(-50%,-50%)'}} src={bg} className="App-logo" alt="logo" />
        <div style={{display:"inline-block",margin:'1em'}}>
          <img style={{display:'block',margin:'auto'}} src={logo} className="App-logo" alt="logo" />
          <div style={{textAlign:"center",padding:'1em',background:'white',borderRadius:'1em',maxWidth:'40ch',opacity:'0.8'}}>
            <h1 style={{textAlign:'center'}}>LEA WIRD 4</h1>
            Bitte lass mich wissen, dass du kommst, gerne kannst du auch deine Eltern und Geschwister mitbringen.<br/>
            Ich feiere im <a href="http://familienhofcafe.de/kontakt/">Familien Hofcafe in Monheim</a>.
          </div>
        </div>
        <div style={{display:"inline-block",margin:'1em'}} ref={formRef}>
          <div style={{textAlign:"center",padding:'1em',background:'white',borderRadius:'1em',maxWidth:'40ch',opacity:'0.8',position:'relative'}}>
            <Form style={{display:'inline-block'}} onSubmit={submit}>
              <p>
                <Form.Label>Name</Form.Label>
                <Form.Control type="phone" name='name' onChange={change} value={name} placeholder="Name" />

                <Form.Label>Kinder</Form.Label>
                <Form.Control type="number" name='kids' onChange={change} value={kids} placeholder="Kinder" />

                <Form.Label>Eltern</Form.Label>
                <Form.Control type="number" name='parents' onChange={change} value={parents} placeholder="Eltern" />

                <Form.Label>eMail</Form.Label>
                <Form.Control type="email" name='email' onChange={change} value={email} placeholder="eMail" />

                <Form.Label>Telefon</Form.Label>
                <Form.Control type="phone" name='phone' onChange={change} value={phone} placeholder="Telefon" />
              </p>
              <p>
              <Button variant="primary" type="submit" ref={submitRef}>
                Speichern
              </Button>
            </p>
          </Form>
          <img style={{display:'none',zIndex:'1',position:'absolute',top:'50%',left:'50%',width:'10em',height:'10em',opacity:'0.8',transform:'translate(-50%,-50%)'}} src={paw} alt="Speichern" />
        </div>
      </div>
    </div>
)}}

export default connect(state=>{return state})(App);
