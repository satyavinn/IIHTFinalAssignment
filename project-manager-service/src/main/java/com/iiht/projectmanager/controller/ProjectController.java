package com.iiht.projectmanager.controller;

import com.iiht.projectmanager.dto.ProjectDto;
import com.iiht.projectmanager.entity.Project;
import com.iiht.projectmanager.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/projectmanager/api/v1")
public class ProjectController {

	private final ProjectService projectService;

	public ProjectController(ProjectService projectService) {
		this.projectService = projectService;
	}

	@GetMapping(path = "/project")
	public ResponseEntity<Object> getAllProjects() {
		return new ResponseEntity<>(projectService.getAllProjects().stream().map(project -> projectService.getProjectDtoFromProject(project)).collect(Collectors.toList()), HttpStatus.OK);
	}

	@PostMapping(path = "/project/add")
	public ResponseEntity<Object> addProject(@RequestBody ProjectDto projectDto) {
		Project project = projectService.getProjectFromProjectDto(projectDto);
		projectService.addProject(project);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@PutMapping(path = "/project/update")
	public ResponseEntity<Object> updateProject(@RequestBody ProjectDto projectDto) {
		Project project = projectService.getProjectFromProjectDto(projectDto);
		projectService.updateProject(project);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping(path = "/project/suspend")
	public ResponseEntity<Object> suspendProject(@RequestBody ProjectDto projectDto) {
		Project project = projectService.getProjectFromProjectDto(projectDto);
		projectService.suspendProject(project);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
