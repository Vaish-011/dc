// pages/dataForm.js
import { useState } from 'react';

export default function DataSubmissionForm() {
    const [sections, setSections] = useState([
        {
            title: '',
            description: '',
            imagePath: '',
            levels: [
                { levelNumber: '', icon: '', positionX: '', positionY: '' },
            ],
        },
    ]);

    const addSection = () => {
        setSections([...sections, {
            title: '',
            description: '',
            imagePath: '',
            levels: [
                { levelNumber: '', icon: '', positionX: '', positionY: '' },
            ],
        }]);
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = [...sections];
        newSections[index][field] = value;
        setSections(newSections);
    };

    const handleLevelChange = (sectionIndex, levelIndex, field, value) => {
        const newSections = [...sections];
        newSections[sectionIndex].levels[levelIndex][field] = value;
        setSections(newSections);
    };

    const addLevel = (sectionIndex) => {
        const newSections = [...sections];
        newSections[sectionIndex].levels.push({ levelNumber: '', icon: '', positionX: '', positionY: '' });
        setSections(newSections);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sections),
        });
        const data = await response.json();
        alert(data.message);
    };

    return (
        <div>
            <h2>Submit Section Data</h2>

            <form onSubmit={handleSubmit}>
                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="section">
                        <h3>Section {sectionIndex + 1}</h3>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={section.title}
                            onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                            required
                        />
                        <br /><br />

                        <label>Description:</label>
                        <textarea
                            value={section.description}
                            onChange={(e) => handleSectionChange(sectionIndex, 'description', e.target.value)}
                            required
                        />
                        <br /><br />

                        <label>Image Path:</label>
                        <input
                            type="text"
                            value={section.imagePath}
                            onChange={(e) => handleSectionChange(sectionIndex, 'imagePath', e.target.value)}
                            required
                        />
                        <br /><br />

                        <h4>Levels</h4>
                        {section.levels.map((level, levelIndex) => (
                            <div key={levelIndex} className="level">
                                <label>Level Number:</label>
                                <input
                                    type="number"
                                    value={level.levelNumber}
                                    onChange={(e) => handleLevelChange(sectionIndex, levelIndex, 'levelNumber', e.target.value)}
                                    required
                                />
                                <br /><br />

                                <label>Icon:</label>
                                <input
                                    type="text"
                                    value={level.icon}
                                    onChange={(e) => handleLevelChange(sectionIndex, levelIndex, 'icon', e.target.value)}
                                    required
                                />
                                <br /><br />

                                <label>Position X:</label>
                                <input
                                    type="number"
                                    value={level.positionX}
                                    onChange={(e) => handleLevelChange(sectionIndex, levelIndex, 'positionX', e.target.value)}
                                    required
                                />
                                <br /><br />

                                <label>Position Y:</label>
                                <input
                                    type="number"
                                    value={level.positionY}
                                    onChange={(e) => handleLevelChange(sectionIndex, levelIndex, 'positionY', e.target.value)}
                                    required
                                />
                                <br /><br />
                            </div>
                        ))}
                        <button type="button" onClick={() => addLevel(sectionIndex)}>Add Level</button>
                        <br /><br />
                    </div>
                ))}

                <button type="button" onClick={addSection}>Add Section</button>
                <br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
