package com.iiht.projectmanager.controller;

import com.iiht.projectmanager.dto.TaskDto;
import com.iiht.projectmanager.entity.Task;
import com.iiht.projectmanager.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/projectmanager/api/v1")
public class TaskController {
	
	final TaskService taskService;

	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}

	@GetMapping(path="/task")
	public ResponseEntity<Object> getAllTasks(){
		List<Task> taskList = taskService.getAllTasks();
		List<TaskDto> taskDtoList = taskList.stream().map(task -> taskService.getTaskDtoFromTask(task)).collect(Collectors.toList());
		return new ResponseEntity<>(taskDtoList, HttpStatus.OK);
	}
	@PostMapping(path="/task/projecttask")
	public ResponseEntity<Object> getTaskByProject(@RequestBody TaskDto taskDto){
		List<Task> taskList = taskService.getTasksByProjectId(taskDto.getProjectId());
		List<TaskDto> taskDtoList = taskList.stream().map(task -> taskService.getTaskDtoFromTask(task)).collect(Collectors.toList());
		return new ResponseEntity<>(taskDtoList, HttpStatus.OK);
	}
	
	@PostMapping(path="/task/add")
	public ResponseEntity<Object> addTask(@RequestBody TaskDto taskDto) {
		Task task = taskService.getTaskFromTaskDto(taskDto);
		taskService.addTask(task);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@PutMapping(path="/task/update")
	public ResponseEntity<Object> updateTask(@RequestBody TaskDto taskDto){
		Task task = taskService.getTaskFromTaskDto(taskDto);
		taskService.updateTask(task);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping(path="/task/end")
	public ResponseEntity<Object> endTask(@RequestBody TaskDto taskDto){
		Task task = taskService.getTaskFromTaskDto(taskDto);
		taskService.endTask(task);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
