import React from 'react';
import './Aboutus.css';
import game001 from '../assets/images/game001.webp';
import ceo from '../assets/images/ceo.jpg'
import ceo1 from '../assets/images/ce02.jpeg'
import ceo2 from '../assets/images/ceo3.jpeg'

const AboutUs = () => {
  // Define teamMembers array
  const teamMembers = [
    {
      id: 1,
      name: "Jude Neista",
      position: "CEO & Founder",
      photo: ceo
    },
    {
      id: 2,
      name: "Bradly Williams",
      position: "CTO",
      photo: ceo2
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Marketing Director",
      photo: ceo1
      
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "Product Manager",
      photo: game001,
    }
  ];

  return (
    <section className="about-us-section">
      <div className="about-container">
        <h2>Who We Are</h2>
        <div className="about-grid">
          <div className="about-card">
            <div className="icon-box">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Our Vision</h3>
            <p>To be the most trusted partner in our industry, driving innovation that matters.</p>
          </div>
          
          <div className="about-card">
            <div className="icon-box">
              <i className="fas fa-bullseye"></i>
            </div>
            <h3>Our Mission</h3>
            <p>Deliver exceptional value through cutting-edge solutions and unparalleled service.</p>
          </div>
          
          <div className="about-card">
            <div className="icon-box">
              <i className="fas fa-handshake"></i>
            </div>
            <h3>Our Values</h3>
            <p>Integrity, Excellence, Collaboration, and Continuous Improvement guide everything we do.</p>
          </div>
        </div>
        
        <div className="team-showcase">
          <h3>Meet Our Leadership</h3>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member">
                <img src={member.photo} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;