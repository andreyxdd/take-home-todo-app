import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './styles.css';
import ProjectTitleController from '../../components/TitleController';
import TaskList from '../../components/TaskList';

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className="layout">
      <div className="top-bar">
        <button
          className="back-btn"
          type="button"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft
            size="1em"
            style={{
              verticalAlign: 'middle',
              marginRight: '0.3em',
              marginLeft: '0.6em',
            }}
            color="white"
          />
          <span style={{ verticalAlign: 'middle' }}>
            Go back
          </span>
        </button>
      </div>
      <div className="container">
        <ProjectTitleController />
        <TaskList />
      </div>
      <div className="bottom-bar" />
    </div>
  );
}

export default WelcomePage;
