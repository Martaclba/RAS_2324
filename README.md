# Probum - Academic Exam Management Platform

## Overview
**Probum** is a platform developed as part of the **Software Requirements and Architectures (RAS)** course. Its main goal is to optimize the process of **creating**, **scheduling**, **performing**, and **correcting academic exams** in higher education institutions.

The system is designed to be **scalable**, **reliable**, and **secure**, even when deployed on limited institutional infrastructures.


## Objectives
- Enable teachers to create and schedule digital exams.  
- Allow students to take exams online in a simple and robust environment.  
- Automate the correction and publication of results.  
- Provide notifications and management tools for all stakeholders.  


## Key Features
- **User Management**: Registration of students and teachers.  
- **Exam Creation & Editing**: Build and update exams with different question types.  
- **Exam Execution**: Students perform exams securely in designated time slots.  
- **Automatic & Manual Correction**: Exams can be graded automatically or by teachers.  
- **Results Publication**: Teachers can release results and corrected versions.  
- **Notifications**: Email and system notifications for important events.  
- **Room Management**: Admins manage physical or virtual exam rooms.  


## Architecture
The system follows a **microservices architecture**, ensuring modularity, scalability, and easier maintenance.  

### Main Components
- **Users Service** → manages students and teachers.  
- **Exams Service** → creation, correction, and distribution of exams.  
- **Rooms Service** → manages exam rooms.  
- **Notifications Service** → sends system/email notifications.  
- **Frontend (Probum App)** → web-based user interface.  

### Communication
- Microservices communicate via **REST APIs** or messaging protocols.  
- Each microservice has its **own database**.  
- The system is containerized with **Docker** for deployment.  



## Quality Goals
- **Usability** → easy to learn and intuitive for students and teachers.  
- **Security** → encryption of sensitive data (e.g., passwords).  
- **Reliability** → robust under load with minimal downtime.  
- **Scalability** → supports many users and future feature extensions.  


## Stakeholders
- **Students** → take exams, receive results and notifications.  
- **Teachers** → create, manage, and grade exams.  
- **Technicians** → manage deployment, rooms, and configurations.  
- **Institution** → benefits from process automation and efficiency.  


## Technologies
- **Frontend**: Web-based interface (React or similar).  
- **Backend**: Node.js microservices.  
- **Databases**: Each service maintains its own storage.  
- **APIs**: RESTful APIs for inter-service communication.  
- **Containerization**: Docker-based deployment.  


## Example Use Cases
- **Teacher registers a new exam** → schedules date, time, rooms, and creates questions.  
- **Student takes an exam** → accesses via the platform with secure login.  
- **System auto-corrects** → provides immediate feedback or stores results for teacher validation.  
- **Teacher publishes results** → students receive grades and can review corrected answers.  

## Risks & Challenges
- Scalability with many simultaneous users.  
- Maintaining performance in low-end institutional machines.  
- Ensuring security of sensitive academic data.  
- Clear and user-friendly design for diverse stakeholders.  


## Conclusion
Probum is a **modular, scalable, and secure solution** for managing academic exams, designed to improve the experience of both students and teachers.  
Its architecture allows **automation of key processes**, reducing workload, while ensuring reliability and adaptability for high institutional infrastructures.
