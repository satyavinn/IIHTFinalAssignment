package com.iiht.projectmanager.controller;

import com.iiht.projectmanager.dto.UserDto;
import com.iiht.projectmanager.entity.User;
import com.iiht.projectmanager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/projectmanager/api/v1")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping(path="/user")
	public ResponseEntity<Object> getAllUsers(){
		List<User> userList = userService.getAllUsers();
		List<UserDto> userListDto = userList.stream().map(activeUser -> userService.getUserDtoFromUser(activeUser)).collect(Collectors.toList());
		return new ResponseEntity<>(userListDto, HttpStatus.OK);
	}

	@PostMapping(path="/user/add")
	public ResponseEntity<Object> addUser(@RequestBody UserDto userDto) {
		User user = userService.getUserFromUserDto(userDto);
		userService.addUser(user);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@PutMapping(path="/user/update")
	public ResponseEntity<Object> updateUser(@RequestBody UserDto userDto){
		User user = userService.getUserFromUserDto(userDto);
		userService.updateUser(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping(path="/user/delete")
	public ResponseEntity<Object> deleteUser(@RequestBody UserDto userDto){
		User user = userService.getUserFromUserDto(userDto);
		userService.deleteUser(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
