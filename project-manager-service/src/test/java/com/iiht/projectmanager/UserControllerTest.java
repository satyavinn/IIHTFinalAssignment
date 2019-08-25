package com.iiht.projectmanager;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.iiht.projectmanager.dto.UserDto;
import com.iiht.projectmanager.entity.User;
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

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ContextConfiguration(classes = ProjectManagerApplication.class)
@ActiveProfiles("test")
public class UserControllerTest extends TestCase{

    @Value("${local.server.port}")
    private Integer port;
    private String baseUrl;
    private TestRestTemplate testRestTemplate;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        baseUrl = "http://localhost:".concat(port.toString()).concat("/projectmanager/api/v1");
        testRestTemplate = new TestRestTemplate();
    }

    @Test
    public void testAddUser() {
        UserDto userDto = new UserDto();
        userDto.setActive(true);
        userDto.setLastName("Annamalai");
        userDto.setFirstName("Alagappan");
        userDto.setEmployeeId(552845L);
        ResponseEntity<String> response = testRestTemplate.postForEntity(baseUrl.concat("/user/add"), userDto, String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.CREATED));
    }

    @Test
    public void testAddUserWithUserId() {
        UserDto userDto = new UserDto();
        userDto.setUserId(50L);
        userDto.setActive(true);
        userDto.setLastName("Annamalai");
        userDto.setFirstName("Alagappan");
        userDto.setEmployeeId(552845L);
        ResponseEntity<String> response = testRestTemplate.postForEntity(baseUrl.concat("/user/add"), userDto, String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.CREATED));
    }

    @Test
    public void testUpdateUser() {
        User user = new User();
        user.setActive(true);
        user.setLastName("Annamalai");
        user.setFirstName("Alagappan");
        user.setEmployeeId(552845L);
        /*Save the User & Get Id*/
        User resultUser = userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setUserId(resultUser.getUserId());
        userDto.setActive(true);
        userDto.setLastName("Vaithi");
        userDto.setFirstName("Alagappan");
        userDto.setEmployeeId(552845L);

        ResponseEntity<String> response = testRestTemplate.exchange(baseUrl.concat("/user/update"), HttpMethod.PUT, new HttpEntity<>(userDto), String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
    }

    @Test
    public void testDeleteUser() {
        User user = new User();
        user.setActive(true);
        user.setLastName("Annamalai");
        user.setFirstName("Alagappan");
        user.setEmployeeId(552845L);
        /*Save the User & Get Id*/
        User resultUser = userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setUserId(resultUser.getUserId());
        userDto.setActive(false);
        userDto.setLastName("Annamalai");
        userDto.setFirstName("Alagappan");
        userDto.setEmployeeId(552845L);

        ResponseEntity<String> response = testRestTemplate.exchange(baseUrl.concat("/user/delete"), HttpMethod.POST, new HttpEntity<>(userDto), String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
    }



    @Test
    public void testGetAllUser() throws Exception {
        User user = new User();
        user.setActive(true);
        user.setLastName("Annamalai");
        user.setFirstName("Alagappan");
        user.setEmployeeId(552845L);
        /*Save the User*/
        userRepository.save(user);

        User inactiveUser = new User();
        inactiveUser.setActive(false);
        inactiveUser.setLastName("Gopal");
        inactiveUser.setFirstName("Nandha");
        inactiveUser.setEmployeeId(552846L);
        /*Save the Inactive User */
        userRepository.save(inactiveUser);

        ResponseEntity<String> response = testRestTemplate.getForEntity(baseUrl.concat("/user"), String.class);
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));

        List<UserDto> taskDto = convertJsonToUserDto(response.getBody());
        assertThat(taskDto.size(), equalTo(2));
    }

    @After
    public void tearDown() throws Exception {
        super.tearDown();
        baseUrl = null;
        testRestTemplate = null;
        userRepository.deleteAll();
    }

    private List<UserDto> convertJsonToUserDto(String json) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, TypeFactory.defaultInstance().constructCollectionType(List.class, UserDto.class));
    }
}
