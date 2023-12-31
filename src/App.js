import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import * as Level1Questions from './Level1';
import * as Level2Questions from './Level2';
import * as Level3Questions from './Level3';
import * as Level4Questions from './Level4';
import * as Level5Questions from './Level5';
import * as Level6Questions from './Level6';

function App() {
    const [openLevel, setOpenLevel] = useState(null);

    const toggleDropdown = (level) => {
        if (openLevel === level) {
            setOpenLevel(null);
        } else {
            setOpenLevel(level);
        }
    };

    const closeDropdown = () => {
        setOpenLevel(null);
    };

    function sortQuestions(questions) {
        return Object.values(questions).sort((a, b) => {
            const aNumber = parseInt(a.name.replace('Question', ''), 10);
            const bNumber = parseInt(b.name.replace('Question', ''), 10);
            return aNumber - bNumber;
        });
    }

    const levels = {
        1: sortQuestions(Level1Questions),
        2: sortQuestions(Level2Questions),
        3: sortQuestions(Level3Questions),
        4: sortQuestions(Level4Questions),
        5: sortQuestions(Level5Questions),
        6: sortQuestions(Level6Questions),
    };

    console.log(levels)
    return (
        <Router>
            <div className="bg-gray-100 min-h-screen">
                <div className="bg-blue-500 p-4 text-white">
                    <img src="/fullstackfactoid-github-narrow.png" alt="Banner" className="w-full"/>
                </div>

                <nav className="bg-gray-200 p-4 flex justify-between">
                    {Object.keys(levels).map((level) => (
                        <div className="relative inline-block text-left" key={level}>
                            <button onClick={() => toggleDropdown(level)} className="text-blue-500 hover:underline">
                                Level {level}
                            </button>
                            {openLevel === level && (
                                <div
                                    className={`origin-top-${level === '1' ? 'left' : 'right'} absolute ${level === '1' ? 'left-0' : 'right-0'} mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                                    <div className="py-1" role="menu" aria-orientation="vertical"
                                         aria-labelledby="options-menu">
                                        {levels[level].map((QuestionComponent, index) => (
                                            <Link
                                                key={index}
                                                onClick={closeDropdown}
                                                to={`/level${level}/question${index + 1}`}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem"
                                            >
                                                Question {index + 1}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="p-4">
                    <Routes>
                        {Object.keys(levels).map((level) =>
                            levels[level].map((QuestionComponent, index) => (
                                <Route key={index} path={`/level${level}/question${index + 1}`}
                                       element={<QuestionComponent/>}/>
                            ))
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
