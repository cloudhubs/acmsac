package com.example.polls.security;

import org.apache.commons.lang3.RandomStringUtils;

import java.security.SecureRandom;

public class PasswordGenerator {
  // taken from this answer https://stackoverflow.com/questions/31260512/generate-a-secure-random-password-in-java-with-minimum-special-character-require
  public static String generatePassword(int length) {
    char[] possibleCharacters = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[{]}\\|;:\'\",./?").toCharArray();
    String randomStr = RandomStringUtils.random( length, 0, possibleCharacters.length-1, false, false, possibleCharacters, new SecureRandom() );
    return randomStr;
  }
}
