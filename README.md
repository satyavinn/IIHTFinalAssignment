CONTENTS OF THIS FILE
---------------------

 * Introduction
 * DB Setup
 * Build Application
 * Run Application


 #Introduction:

 The  Project  Manager  Single  Page  Application allows  you  to  manage  projects  and their  respective tasks.
 It allows you to set priorities to each project and task. You can associate one manager to each project and  task-owner for  each task.
 Each task will have parent task,  start date, end date and task owner.

 #DB Setup:

  1. MySQL Server has to be up and running on the port 3306
  2. Create 'iihtprojectmng' Database,
  3. script file 'iihtprojectmngr-database-script.sql' has been included in the project for reference.

 #Build Application

   1. Build Application Using Jenkins Job / maven clean install
   2. Configure Jenkins Pipeline Job and refer to Jenkinsfile in root directory; build artifacts will be saved in given target location.
   3. npm goal is added as execution step and UI build files will be compiled in to static folder.
   4. Jenkins has been setup in VLAB, Pipeline job created for Project Manager application can be accessed using the URL: http://localhost:8080/job/iiht_ProjectManager/
   5. Sonarqube has been installed in VLAB, Code scan results can be viewed in above mentioned URL.
   
 #Run Application

   1. Application jar will be available in target folder after a successful build
   2. Trigger the command java -jar project-manager-app.jar
   3. Project Manager Application will be running in Port 8091. Access Application from http://localhost:8091
   4. Load Test (Using Jmeter) results have been included in the project
