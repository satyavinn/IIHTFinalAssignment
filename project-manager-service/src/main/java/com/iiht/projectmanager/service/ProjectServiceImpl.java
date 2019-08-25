package com.iiht.projectmanager.service;

import com.iiht.projectmanager.dto.ProjectDto;
import com.iiht.projectmanager.entity.Project;
import com.iiht.projectmanager.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService{

    private final ProjectRepository projectRepository;

    private final UserService userService;

    public ProjectServiceImpl(ProjectRepository projectRepository, UserService userService) {
        this.projectRepository = projectRepository;
        this.userService = userService;
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProjectById(Long projectId) {
        Optional<Project> project = projectRepository.findById(projectId);
        return project.orElse(null);
    }

    @Override
    public void addProject(Project project) {
        projectRepository.save(project);
    }

    @Override
    public void updateProject(Project project) {
        projectRepository.save(project);
    }

    @Override
    public void suspendProject(Project project) {
            projectRepository.save(project);
    }

    @Override
    public Project getProjectFromProjectDto(ProjectDto projectDto)
    {
        Project project;
        Optional<Project> optionalProject;
        if(projectDto.getProjectId() != null && (optionalProject = projectRepository.findById(projectDto.getProjectId())).isPresent()) {
            project = optionalProject.get();
        }
        else
        {
            project = new Project();
        }
        project.setProjectId(projectDto.getProjectId());
        project.setProject(projectDto.getProject());
        project.setStartDate(projectDto.getStartDate());
        project.setEndDate(projectDto.getEndDate());
        project.setPriority(projectDto.getPriority());
        project.setUser(userService.getUserById(projectDto.getManagerId()));

        return project;
    }

    @Override
    public ProjectDto getProjectDtoFromProject(Project project)
    {
        ProjectDto projectDto = new ProjectDto();
        projectDto.setProjectId(project.getProjectId());
        projectDto.setProject(project.getProject());
        projectDto.setStartDate(project.getStartDate());
        projectDto.setEndDate(project.getEndDate());
        projectDto.setPriority(project.getPriority());
        projectDto.setManagerId(project.getUser().getUserId());
        projectDto.setManagerName(project.getUser().getFirstName().concat(",").concat(project.getUser().getLastName()));
        projectDto.setManagerEmployeeId(project.getUser().getEmployeeId());
        projectDto.setNoOfTasks(project.getTasks().size());
        projectDto.setNoOfCompletedTasks((int) project.getTasks().stream().filter(task -> !task.isStatus()).count());
        return projectDto;
    }

}
