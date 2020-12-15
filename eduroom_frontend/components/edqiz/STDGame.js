import React, { Fragment, useState, useEffect } from "react";
import Page1 from "./gamePage1std";
import Page2 from "./correctAnswer";
import Page3 from "./gamePage2std";
import Page4 from "./wrongAnswer";
import Page5 from "./showRankSTD";


import socketIOClient from "socket.io-client";
import { useRouter } from "next/router";
import api from '../../api';

const Content = ({ id }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(1);
  const [questionNumber, setquestionNumber] = useState(0);
  const [messages, setMessages] = useState([]);
  const [nextQuestion, setNextQuestion] = useState([]);
  const [answer, setAnswer] = useState('99');
  const [questionList, setQuestionList] = useState([])
  const [correct, setCorrrect] = useState([])

  const pin=router.query.id;

  const handleChangeQuestionNumber = (val) => {
    setquestionNumber(val);
  };
  const [sessionid, setSesstionID] = useState(null);
  const [data1, setData] = useState([]);
  const [answerAll, setAnswerAll] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      let pin = router.query.id
      const res = await api.get(`/api/kahoot/sessionid/${pin}`);
      // console.log('resdata', res.data)
      setSesstionID(res.data.sessionid)
    };
    fetchSession();

  }, []);
  useEffect(() => {
    const fetchQuestion = async () => {
      const question = await api.get(`/api/kahoot/question/${sessionid}`);
      setData(question.data.question.rows)
      answerAll.push(question.data.answerAll)
      correct.push(question.data.correct)
    };
    if (sessionid != null)
      fetchQuestion();

  }, [sessionid]);
  useEffect(() => {
    console.log('datalenght', data1.length)
    if (answerAll[0]) {
      let j=0
      for (let i =0; i<data1.length; i++)  {
        let questionTemplate = {
          question: '',
          time: '',
          point: '',
          ans: ['', '', '', ''],
          correct: 0,
          image: null,
        }
        questionTemplate.question = data1[i].text;
        questionTemplate.time = data1[i].time;
        questionTemplate.point = data1[i].point
        questionTemplate.ans[0] = answerAll[0][i][0].text
        questionTemplate.ans[1] = answerAll[0][i][1].text
        questionTemplate.ans[2] = answerAll[0][i][2].text
        questionTemplate.ans[3] = answerAll[0][i][3].text
        questionTemplate.correct = correct[0][i]
        j++
        questionTemplate.image = '../../image'
        questionList.push(questionTemplate);
      }
      setQuestionList([...questionList])
    }
  }, [data1, answerAll]);
  useEffect(() => {
  }, [questionList])
 
  const response = () => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_KAHOOT_URL, {
      path: "/kahoot",
    });
    socket.emit("room", (router.query.id));
  };
  const getQuestionNo = () => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_KAHOOT_URL, {
      path: "/kahoot",
    });
    socket.on("new-questionNo", (question) => {
     setquestionNumber(question)
    });
  };
  const responseTime = (tempAnswer) => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_KAHOOT_URL, {
      path: "/kahoot",
    });
    socket.on("sent-seconds", (timeTemp) => {
      
      setTime(timeTemp);
      if (timeTemp == 0) {
        if (tempAnswer == questionList[questionNumber].correct) {
          goto(2);
        } else {
          goto(4);
        }
      }
    });
  };

  const responseNextQuestion = () => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_KAHOOT_URL, {
      path: "/kahoot",
    });
    const temp = messages.slice();
    socket.on("new-Nextquestion", (isNext, pin, questionNo) => {
      setAnswer('99')
      temp.push([isNext, pin, questionNo]);
      setNextQuestion(temp.slice());
      let tempq=questionNumber
      tempq+=1;
      
      goto(1);
    });
  };

  const sentMessage = () => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_KAHOOT_URL, {
      path: "/kahoot",
    });
    socket.emit("sent-message", questionList[questionNumber], id.id);
  };
  useEffect(() => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_KAHOOT_URL, {
      path: "/kahoot",
    });
    socket.emit("room", (router.query.id));
    socket.on("get-Nextquestion", (isNext, pin, questionNo) => {
      if(questionNo<questionList.length){
      setquestionNumber(questionNo)
      if(isNext){
        goto(1)
      }
      }else{
        goto(5);
      }
    })
    response();
    getQuestionNo();
    responseTime(answer);
  }, [questionNumber]);
  const goto = (val) => {
    setCurrent(val);
  };
  const renderPage = () => {
    switch (current) {
      case 1:
        return (
          <Page1
            goto={goto}
            data={questionList}
            questionNumber={questionNumber}
            sentMessage={sentMessage}
            response={response}
            messages={messages}
            setAnswer={setAnswer}
            answer={answer}
            responseTime={responseTime}
            pin={pin}
          />
        );
      case 2:
        return (
          <Page2
          id={id.id}
            goto={goto}
            data={questionList}
            questionNumber={questionNumber}
            ChangeQuestionNumber={handleChangeQuestionNumber}
            responseNextQuestion={responseNextQuestion}
            answer={answer}
          />
        );
      case 3:
        return (
          <Page3
          id={id.id}
            goto={goto}
            data={questionList}
            questionNumber={questionNumber}
            ChangeQuestionNumber={handleChangeQuestionNumber}
            responseNextQuestion={responseNextQuestion}
            answer={answer}
          />
        );
      case 4:
        return (
          <Page4
            id={id.id}
            goto={goto}
            data={questionList}
            questionNumber={questionNumber}
            ChangeQuestionNumber={handleChangeQuestionNumber}
            responseNextQuestion={responseNextQuestion}
            answer={answer}
          />
        );
        case 5:
        return (
          <Page5
            pin={id.id}
            goto={goto}
            data={questionList}
            questionNumber={questionNumber}
            ChangeQuestionNumber={handleChangeQuestionNumber}
            responseNextQuestion={responseNextQuestion}
            answer={answer}
          />
        );
    }
  
  };
  return (
    <Fragment>
      <div className="landing">
        <div>
          <div className="card">{renderPage()}</div>
        </div>
      </div>
      <style jsx>{`
        .content {
          width: 100vw;
          padding: 3% 5%;
          height: 90vh;
        }
        .landing {
          justify-content: center;
          width: 100vw;
          height: 100vh;
          background-image: url("/images/edqiz/create-bg.svg");
          background-repeat: no-repeat;
          background-size: cover;
          overflow: auto;
        }
        .card {
          background: white;
          border-radius: 2vh;
          transition: 0.3s;
          width: 100%;
          height: 100vh;
          text-align: center;
          display: flex;
          flex-wrap: wrap;
          flex-flow: column;
          justify-content: space-around;
        }
      `}</style>
    </Fragment>
  );
};
export default Content;
