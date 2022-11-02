import logo from './logo.svg';
import './App.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap';
import React, { useState } from 'react';

function App() {
  let [title, setTitle] = useState(['팔협지 부자야!','고흐형님~~~!','하나둘셋 대격변!!!'])
  let [count, setCount] = useState([0,0,0])
  let [modal, setModal] = useState(false)
  let [date, setDate] = useState(['11월 16일','5월 5일','1월1일'])
  let [color] = useState(['powderblue','grey','tomato'])
  let [titleNumber, setTitleNumber] = useState(0)
  let [입력값, 입력값변경] = useState('')

  let today = new Date();
  let nowDate = today.getDate();
  let time = today.getHours();
  let minute = today.getMinutes();
  let seconds = today.getSeconds();

  let realTime = nowDate + '일' + time + ':' + minute + ' / ' + seconds + 's';

  return(
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Eyo25 Blog</Navbar.Brand>
          <Button className='btn btn-danger' onClick={()=>{
            let copy = [...title]
            copy.sort()
            setTitle([...copy])
          }}>ㄱㄴㄷ정렬</Button>
        </Container>
      </Navbar>
      <Container>
        <BlogContent setTitle={setTitle} modal={modal} setTitleNumber={setTitleNumber} date={date} title={title} count={count} setCount={setCount} setModal={setModal}></BlogContent>
      </Container>
      <Container>
        { modal == true ? <Modal titleNumber={titleNumber} color={color} date={date} title={title}/> : null }
      </Container>
      <Container>
          <div className='searchBox'>
            <input className='search' placeholder='검색' onChange={(e)=>{입력값변경(e.target.value)}}/>
            <button onClick={()=>{
              if(입력값 != ''){
                let copy = [...title]
                copy.push(입력값)
                setTitle([...copy])
  
                let copy2 = [...count]
                copy2.push(0)
                setCount([...copy2])

                let copy3 = [...date]
                copy3.push(realTime)
                setDate([...copy3])
              }
            }}>글발행</button>
          </div>
      </Container>
    </div>
  );

}

function BlogContent(props){
  return(
    props.title.map((a, i)=>{
      return(
        <div className="list">
          <br/>
          <h4 onClick={()=>{
            props.setModal( !props.modal)
            props.setTitleNumber(i)
          }}>{props.title[i]}</h4>
          <p>{props.date[i]}</p>
          <h4><span onClick={()=>{
            let copy = [...props.count]
            copy[i] = copy[i] + 1
            props.setCount(copy)
          }}>👍</span>{props.count[i]}</h4>
          <button onClick={()=>{
            let copy2 = [...props.title]
            copy2.splice(i,1)
            props.setTitle([...copy2])
          }}> 삭제 </button>
        </div>
      )
    })
  )
}

function Modal(props){
  return(
    <div className="modal" style={{ 'background': props.color[props.titleNumber] }}>
      <h4>{props.title[props.titleNumber]}</h4>
      <p>{props.date[props.titleNumber]}</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
