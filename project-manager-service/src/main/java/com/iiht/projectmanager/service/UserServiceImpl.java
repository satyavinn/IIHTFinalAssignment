package com.iiht.projectmanager.service;

import com.iiht.projectmanager.dto.UserDto;
import com.iiht.projectmanager.entity.User;
import com.iiht.projectmanager.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    @Override
    public void addUser(User user) {
        userRepository.save(user);
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.save(user);
    }

    @Override
    public User getUserFromUserDto(UserDto userDto) {
        User user;
        Optional<User> optionalUser;
        if (userDto.getUserId() != null && (optionalUser = userRepository.findById(userDto.getUserId())).isPresent()) {
            user = optionalUser.get();
        } else {
            user = new User();
        }
        user.setUserId(userDto.getUserId());
        user.setEmployeeId(userDto.getEmployeeId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setActive(userDto.isActive());

        return user;
    }

    @Override
    public UserDto getUserDtoFromUser(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setEmployeeId(user.getEmployeeId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setActive(user.isActive());
        return userDto;
    }
}
