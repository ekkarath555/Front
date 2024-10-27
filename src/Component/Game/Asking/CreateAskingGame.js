import './CreateAskingGame.css';
import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../../../firebase"; // Adjust the path as needed
import { collection, addDoc, onSnapshot } from "firebase/firestore";


const CreateAskingGame = () => {
  const [storyTH, setStoryTH] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      correctAnswer: "", // เปลี่ยนจาก answerOptions เป็น correctAnswer
    },
  ]);
  const quizGamesCollection = collection(db, "_games");

  useEffect(() => {
    const unsubscribe = onSnapshot(quizGamesCollection, (snapshot) => {
        // If you need to display existing quiz games, you can process the snapshot here
        console.log("Current quiz games:", snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
}, []);

  const handleStoryTHChange = (text) => {
    setStoryTH(text);
  };

  const handleQuestionTextChange = (questionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].questionText = text;
    setQuestions(updatedQuestions);
  };


  const handleAnswerOptionChange = (questionIndex, answerIndex, text) => {  //เพิ่มตัวเลือกสำหรับคำตอบ
    const updatedQuestions = [...questions];
    if (!updatedQuestions[questionIndex].answerOptions) {
      updatedQuestions[questionIndex].answerOptions = [];
    }
    updatedQuestions[questionIndex].answerOptions[answerIndex] = text;
    setQuestions(updatedQuestions);
  };


  const handleAddAnswerOption = (questionIndex) => {   //เพิ่มตัวเลือกสำหรับคำตอบ
    const updatedQuestions = [...questions];
    if (!updatedQuestions[questionIndex].answerOptions) {
      updatedQuestions[questionIndex].answerOptions = [];
    }
    updatedQuestions[questionIndex].answerOptions.push("");
    setQuestions(updatedQuestions);
  };


  const handleCorrectAnswerChange  
 = (questionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = text;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        correctAnswer: "",
      },
    ]);
  };
  const handleSubmit = async () => {
    const formData = {
        storyTH,
        questions,
    };

    try {
        await addDoc(quizGamesCollection, formData);
        console.log("Quiz game added to Firestore!");

        // Clear the form after submission (if desired)
        setStoryTH("");
        setQuestions([
            {
                questionText: "",
                correctAnswer: "",
            },
        ]);
    } catch (error) {
        console.error("Error adding quiz game to Firestore: ", error);
        // Consider adding some user-friendly error handling here
    }
};
return (
  <Box className="Box">
    <div className="background-image" />
    <div className="content">

      <Typography variant="h3" sx={{
            color: '#1976d2', 
            fontFamily: "'IBM Plex Sans Thai', sans-serif",
            fontWeight: 'Bold', 
            textAlign: 'center', 
            padding: '20px', // เพิ่มพื้นที่ภายใน
            borderBottom: '5px solid #1976d2', // ขอบล่าง
            textShadow: '1px 1px 2px rgba(0, 0, 0, 1)', 
            backgroundColor: 'rgba(255, 255, 255, 1)', // พื้นหลังสีขาวโปร่งใส
            borderRadius: '30px', 
            margin: '20px 0' // เพิ่มระยะห่างด้านบนและล่าง
        }}>สร้างแบบถาม-ตอบ
      </Typography>

      <TextField
          label=": เกริ่นนำ"
          multiline
          rows={5}
          value={storyTH}
          onChange={(e) => handleStoryTHChange(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
                fontFamily: "'IBM Plex Sans Thai', sans-serif",
                fontSize: '1rem',
            },
            '& .MuiInputLabel-root': {
                fontFamily: "'IBM Plex Sans Thai', sans-serif",
                fontSize: '1rem',
            }
          }}          
      />

      {questions.map((question, questionIndex) => (
          <Box className="question-box" key={questionIndex}>
              <Typography  
                sx={{
                    fontFamily: "'IBM Plex Sans Thai', sans-serif", // กำหนดฟอนต์ที่ต้องการ
                    fontSize: '1.5rem', 
                    fontWeight: '1000',  
                    }}>- คำถามที่ {questionIndex + 1}
              </Typography>
             
              <TextField
                  className="TextField"
                  label=": ข้อความคำถาม"
                  value={question.questionText}
                  onChange={(e) => handleQuestionTextChange(questionIndex, e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{
                    '& .MuiInputBase-input': {
                        fontFamily: "'IBM Plex Sans Thai', sans-serif",
                    },
                    '& .MuiInputLabel-root': {
                        fontFamily: "'IBM Plex Sans Thai', sans-serif",
                    },
                }}
              />

              <TextField
                  className="TextField"
                  label=": คำตอบที่ถูกต้อง"
                  value={question.correctAnswer}
                  onChange={(e) => handleCorrectAnswerChange(questionIndex, e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{
                    '& .MuiInputBase-input': {
                        fontFamily: "'IBM Plex Sans Thai', sans-serif",
                    },
                    '& .MuiInputLabel-root': {
                        fontFamily: "'IBM Plex Sans Thai', sans-serif",
                    },
                }}
              />

          {question.answerOptions && question.answerOptions.map((answer, answerIndex) => (
                <TextField
                    className="TextField"
                    key={answerIndex}
                    label={`คำตอบที่ถูกเพิ่มเติม ${answerIndex + 1}`}
                    value={answer}
                    onChange={(e) => handleAnswerOptionChange(questionIndex, answerIndex, e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                      '& .MuiInputBase-input': {
                          fontFamily: "'IBM Plex Sans Thai', sans-serif", // สำหรับ input text
                      },
                      '& .MuiInputLabel-root': {
                          fontFamily: "'IBM Plex Sans Thai', sans-serif", // สำหรับ label
                      },
                  }}
                />
          ))}

              <Button variant="contained" onClick={() => handleAddAnswerOption(questionIndex)} 
                sx={{
                  marginTop: '16px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '6px 20px',
                  fontFamily: "'IBM Plex Sans Thai', sans-serif",
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  transition: 'background-color 0.4s ease',
                  '&:hover': {
                      backgroundColor: '#DFA003',
                  }
              }} >เพิ่มตัวเลือกคำตอบ</Button>

        </Box>
      ))}


        <div className="button-group1">

          <Button variant="contained" color="primary" onClick={handleAddQuestion} sx={{ fontFamily: "'IBM Plex Sans Thai', sans-serif", flexGrow: 1 , '&:hover': {
                      backgroundColor: '#006A7D'}, fontWeight: 'bold' }} >เพิ่มคำถาม</Button>

          <Button variant="contained" color="success" onClick={handleSubmit} sx={{ fontFamily: "'IBM Plex Sans Thai', sans-serif",flexGrow: 1 , '&:hover': {
                      backgroundColor: '#235D3A'}, fontWeight: 'bold', }} >ส่ง</Button>

        </div>

        <div className="button-group2">

          <Link to={'/teacher/create'}>
              <Button variant="contained" color="error" sx={{
                    position: 'fixed', // ใช้ตำแหน่ง fixed
                    bottom: 16, // ระยะห่างจากด้านล่าง
                    left: 16, // ระยะห่างจากด้านซ้าย
                    padding: '10px 20px',
                    fontFamily: "'IBM Plex Sans Thai', sans-serif",
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#FD464A'}
                    }}>ย้อนกลับ</Button>
              
          </Link>

        </div>
    </div>
  </Box>
);
};

export default CreateAskingGame;