import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import questionsData from '../data/questions.json';

const Question = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        // Fetch the question based on the ID from the JSON data
        const fetchQuestion = () => {
            const fetchedQuestion = questionsData.find(q => q.id === id);
            setQuestion(fetchedQuestion);
        };

        fetchQuestion();
    }, [id]);

    if (!question) {
        return <div>Loading...</div>;
    }

    const { questionType, questionText, options } = question;

    const renderQuestion = () => {
        if (questionType === 'multipleChoice') {
            return (
                <div>
                    <h2>{questionText}</h2>
                    <ul>
                        {options.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                </div>
            );
        } else if (questionType === 'textInput') {
            return (
                <div>
                    <h2>{questionText}</h2>
                    <input type="text" />
                </div>
            );
        } else {
            return <div>Invalid question type</div>;
        }
    };

    return (
        <div>
            {renderQuestion()}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Previous
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Next
            </button>
        </div>
    );
};

export default Question;