package com.iiht.projectmanager;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.iiht.projectmanager.dto.TaskDto;
import com.iiht.projectmanager.entity.ParentTask;
import com.iiht.projectmanager.entity.Project;
import com.iiht.projectmanager.entity.Task;
import com.iiht.projectmanager.entity.User;
import com.iiht.projectmanager.repository.ParentTaskRepository;
import com.iiht.projectmanager.repository.ProjectRepository;
import com.iiht.projectmanager.repository.TaskRepository;
import com.iiht.projectmanager.repository.UserRepository;
import junit.framework.TestCase;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ContextConfiguration(classes = ProjectManagerApplication.class)
@ActiveProfiles("test")
public class TaskControllerTest extends TestCase{


    @Value("${local.server.port}")
    private Integer port;
    private String baseUrl;
    private TestRestTemplate testRestTemplate;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ParentTaskRepository parentTaskRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        baseUrl = "http://localhost:".concat(port.toString()).concat("/projectmanager/api/v1");
        testRestTemplate = new TestRestTemplate();
    }


    @Test
    public void testAddTask() {

        User user = new User();
        user.setActive(true);
        user.setLastName("Annamalai");
        user.setFirstName("Alagappan");
        user.setEmployeeId(552845L);
        /*Save the User & Get Id*/
        User resultUser = userRepository.save(user);

        ParentTask parentTask = new ParentTask();
        parentTask.setParentTask("FSE S1 Certification JUnit");
        ParentTask resultParentTask = parentTaskRepository.save(parentTask);

        Project project = new Project();
        project.setProject("FSE S1 Certification Project");
        project.setStartDate(new Date());
        project.setEndDate(new Date());
        project.setPriority(25);
        project.setUser(resultUser);
        Project resultProject = projectRepository.save(project);

        TaskDto taskDto = new TaskDto();
        taskDto.setTask("Design Database");
        taskDto.setStatus(true);
        taskDto.setPriority(22);
        taskDto.setStartDate(new Date());
        taskDto.setEndDate(new Date());
        taskDto.setParentId(resultParentTask.getParentId());
        taskDto.setUserId(resultUser.getUserId());
        taskDto.setProjectId(resultProject.getProjectId());

        ResponseEntity<String> response = testRestTemplate.postForEntity(baseUrl.concat("/task/add"), taskDto, String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.CREATED));
    }

    @Test
    public void testAddTaskWithTaskId() {

        User user = new User();
        user.setActive(true);
        user.setLastName("Annamalai");
        user.setFirstName("Alagappan");
        user.setEmployeeId(552845L);
        /*Save the User & Get Id*/
        User resultUser = userRepository.save(user);

        ParentTask parentTask = new ParentTask();
        parentTask.setParentTask("FSE S1 Certification JUnit");
        ParentTask resultParentTask = parentTaskRepository.save(parentTask);

        Project project = new Project();
        project.setProject("FSE S1 Certification Project");
        project.setStartDate(new Date());
        project.setEndDate(new Date());
        project.setPriority(25);
        project.setUser(resultUser);
        Project resultProject = projectRepository.save(project);

        TaskDto taskDto = new TaskDto();
        taskDto.setTaskId(50L);
        taskDto.setTask("Design Database");
        taskDto.setStatus(true);
        taskDto.setPriority(22);
        taskDto.setStartDate(new Date());
        taskDto.setEndDate(new Date());
        taskDto.setParentId(resultParentTask.getParentId());
        taskDto.setUserId(resultUser.getUserId());
        taskDto.setProjectId(resultProject.getProjectId());

        ResponseEntity<String> response = testRestTemplate.postForEntity(baseUrl.concat("/task/add"), taskDto, String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.CREATED));
    }

    @Test
    public void testUpdateTask() {

        User user = new User();
        user.setActive(true);
        user.setLastName("Annamalai");
        user.setFirstName("Alagappan");
        user.setEmployeeId(552845L);
        /*Save the User & Get Id*/
        User resultUser = userRepository.save(user);

        Project project = new Project();
        project.setProject("FSE S1 Certification Project");
        project.setStartDate(new Date());
        project.setEndDate(new Date());
        project.setPriority(25);
        project.setUser(resultUser);
        Project resultProject = projectRepository.save(project);

        ParentTask parentTask = new ParentTask();
        parentTask.setParentTask("FSE S1 Certification JUnit");
        ParentTask resultParentTask = parentTaskRepository.save(parentTask);

        Task task = new Task();
        task.setTask("Design Database");
        task.setStatus(true);
        task.setPriority(22);
        task.setStartDate(new Date());
        task.setEndDate(new Date());
        task.setParentTask(resultParentTask);
        task.setUser(resultUser);
        task.setProject(resultProject);
        taskRepository.save(task);

        TaskDto taskDto = new TaskDto();
        taskDto.setTask("Design Database");
        taskDto.setStatus(true);
        taskDto.setPriority(28);
        taskDto.setStartDate(new Date());
        taskDto.setEndDate(new Date());
        taskDto.setParentId(resultParentTask.getParentId());
        taskDto.setUserId(resultUser.getUserId());
        taskDto.setProjectId(resultProject.getProjectId());

        ResponseEntity<String> response = testRestTemplate.exchange(baseUrl.concat("/task/update"), HttpMethod.PUT, new HttpEntity<>(taskDto), String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
    }

    @Test
    public void testEndTask() {


        User user = new User();
        user.setActive(true);
        user.setLastName("Annamalai");
        user.setFirstName("Alagappan");
        user.setEmployeeId(552845L);
        /*Save the User & Get Id*/
        User resultUser = userRepository.save(user);

        Project project = new Project();
        project.setProject("FSE S1 Certification Project");
        project.setStartDate(new Date());
        project.setEndDate(new Date());
        project.setPriority(25);
        project.setUser(resultUser);
        Project resultProject = projectRepository.save(project);

        ParentTask parentTask = new ParentTask();
        parentTask.setParentTask("FSE S1 Certification JUnit");
        ParentTask resultParentTask = parentTaskRepository.save(parentTask);

        Task task = new Task();
        task.setTask("Design Database");
        task.setStatus(true);
        task.setPriority(22);
        task.setStartDate(new Date());
        task.setEndDate(new Date());
        task.setParentTask(resultParentTask);
        task.setUser(resultUser);
        task.setProject(resultProject);
        taskRepository.save(task);

        TaskDto taskDto = new TaskDto();
        taskDto.setTask("Design Database");
        taskDto.setStatus(false);
        taskDto.setPriority(28);
        taskDto.setStartDate(new Date());
        taskDto.setEndDate(new Date());
        taskDto.setParentId(resultParentTask.getParentId());
        taskDto.setUserId(resultUser.getUserId());
        taskDto.setProjectId(resultProject.getProjectId());

        ResponseEntity<String> response = testRestTemplate.exchange(baseUrl.concat("/task/end"), HttpMethod.PUT, new HttpEntity<>(taskDto), String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
    }

    @Test
    public void testGetAllTask() throws Exception {

        User user = new User();
        user.setActive(true);
        user.setLastName("Annamalai");
        user.setFirstName("Alagappan");
        user.setEmployeeId(552845L);
        /*Save the User & Get Id*/
        User resultUser = userRepository.save(user);

        Project project = new Project();
        project.setProject("FSE S1 Certification Project");
        project.setStartDate(new Date());
        project.setEndDate(new Date());
        project.setPriority(25);
        project.setUser(resultUser);
        Project resultProject = projectRepository.save(project);

        ParentTask parentTask = new ParentTask();
        parentTask.setParentTask("FSE S1 Certification JUnit");
        ParentTask resultParentTask = parentTaskRepository.save(parentTask);

        Task task = new Task();
        task.setTask("Design Database");
        task.setStatus(true);
        task.setPriority(22);
        task.setStartDate(new Date());
        task.setEndDate(new Date());
        task.setParentTask(resultParentTask);
        task.setUser(resultUser);
        task.setProject(resultProject);
        taskRepository.save(task);

        ResponseEntity<String> response = testRestTemplate.getForEntity(baseUrl.concat("/task"), String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));

        List<TaskDto> taskDto = convertJsonToTaskDto(response.getBody());
        assertThat(taskDto.size(), equalTo(1));
    }

    @Test
    public void testGetTaskByProject() throws Exception {

        User user = new User();
        user.setActive(true);
        user.setLastName("Annamalai");
        user.setFirstName("Alagappan");
        user.setEmployeeId(552845L);
        /*Save the User & Get Id*/
        User resultUser = userRepository.save(user);

        Project project = new Project();
        project.setProject("FSE S1 Certification Project");
        project.setStartDate(new Date());
        project.setEndDate(new Date());
        project.setPriority(25);
        project.setUser(resultUser);
        Project resultProject = projectRepository.save(project);

        ParentTask parentTask = new ParentTask();
        parentTask.setParentTask("FSE S1 Certification JUnit");
        ParentTask resultParentTask = parentTaskRepository.save(parentTask);

        Task task = new Task();
        task.setTask("Design Database");
        task.setStatus(true);
        task.setPriority(22);
        task.setStartDate(new Date());
        task.setEndDate(new Date());
        task.setParentTask(resultParentTask);
        task.setUser(resultUser);
        task.setProject(resultProject);
        taskRepository.save(task);

        TaskDto taskDto = new TaskDto();
        taskDto.setProjectId(resultProject.getProjectId());

        ResponseEntity<String> response = testRestTemplate.postForEntity(baseUrl.concat("/task/projecttask"), taskDto, String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));

        List<TaskDto> taskDtoByProject = convertJsonToTaskDto(response.getBody());
        assertThat(taskDtoByProject.size(), equalTo(1));
    }

    @After
    public void tearDown() throws Exception {
        super.tearDown();
        baseUrl = null;
        testRestTemplate = null;
        taskRepository.deleteAll();
        projectRepository.deleteAll();
        parentTaskRepository.deleteAll();
        userRepository.deleteAll();
    }

    private List<TaskDto> convertJsonToTaskDto(String json) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, TypeFactory.defaultInstance().constructCollectionType(List.class, TaskDto.class));
    }
}
