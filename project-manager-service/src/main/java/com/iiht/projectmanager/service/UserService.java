package com.iiht.projectmanager.service;

import com.iiht.projectmanager.dto.UserDto;
import com.iiht.projectmanager.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long userId);
    void addUser(User user);
    void updateUser(User user);
    void deleteUser(User user);
    User getUserFromUserDto(UserDto userDto);
    UserDto getUserDtoFromUser(User user);
}
