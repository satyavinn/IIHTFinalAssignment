package com.iiht.projectmanager;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.iiht.projectmanager.dto.ParentTaskDto;
import com.iiht.projectmanager.entity.ParentTask;
import com.iiht.projectmanager.repository.ParentTaskRepository;
import junit.framework.TestCase;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ContextConfiguration(classes = ProjectManagerApplication.class)
@ActiveProfiles("test")
public class ParentTaskControllerTest extends TestCase {

    @Value("${local.server.port}")
    private Integer port;
    private String baseUrl;
    private TestRestTemplate testRestTemplate;

    @Autowired
    private ParentTaskRepository parentTaskRepository;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        baseUrl = "http://localhost:".concat(port.toString()).concat("/projectmanager/api/v1");
        testRestTemplate = new TestRestTemplate();
    }


    @Test
    public void testGetAllParentTask() throws Exception {

        ParentTask parentTask = new ParentTask();
        parentTask.setParentTask("FSE S1 Certification JUnit");
        parentTaskRepository.save(parentTask);

        ResponseEntity<String> response = testRestTemplate.getForEntity(baseUrl.concat("/parenttask"), String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));

        List<ParentTaskDto> taskDto = convertJsonToParentTaskDto(response.getBody());
        assertThat(taskDto.size(), equalTo(1));
    }

    @Test
    public void testAddParentTask() {
        ParentTaskDto parentTaskDto = new ParentTaskDto();
        parentTaskDto.setParentTask("FSE S1 Certification JUnit");
        ResponseEntity<String> response = testRestTemplate.postForEntity(baseUrl.concat("/parenttask/add"), parentTaskDto, String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.CREATED));
    }

    @Test
    public void testAddParentTaskWithParentTaskId() {
        ParentTaskDto parentTaskDto = new ParentTaskDto();
        parentTaskDto.setParentId(50L);
        parentTaskDto.setParentTask("FSE S1 Certification JUnit");
        ResponseEntity<String> response = testRestTemplate.postForEntity(baseUrl.concat("/parenttask/add"), parentTaskDto, String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.CREATED));
    }

    @After
    public void tearDown() throws Exception {
        super.tearDown();
        baseUrl = null;
        testRestTemplate = null;
        parentTaskRepository.deleteAll();
    }

    private List<ParentTaskDto> convertJsonToParentTaskDto(String json) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, TypeFactory.defaultInstance().constructCollectionType(List.class, ParentTaskDto.class));
    }
}
